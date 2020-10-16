require('dotenv').config();
const cluster = require('cluster');
const { QUEUE_WORKER_COUNT, SMTP_USER, QUEUE_MAX_ATTEMPTS } = require('./env');


if(cluster.isMaster) {
    require('./db')();
    const { Email, FailedEmail } = require('./models/email');
    const WORKER_COUNT = Math.min(require('os').cpus().length, QUEUE_WORKER_COUNT);    
    const express = require('express');
    const app = express();

    function dispatchTask(task) {
        const email = new Email({...task});
        return email.save();
    }

    const pug = require('pug');
    const path = require('path');
    const EMAILS_DIR = path.join(__dirname, 'emails');
    const templates = {
        test_email: pug.compileFile( path.join(EMAILS_DIR, 'test_email.pug' ) ),
    }

    function renderEmails(emails) {
        const html = emails.reduce((prev, current) => {
            const template = templates[current.template.name];
            const data = current.template.data;
            if( template ) {
                prev += template({...data, ...current.toObject()});
            } else {
                prev += `<hr><h4>${current._id}</h4><p> Template: ${current.template.name} not found</p>`
            }
            return prev;
        }, '');
        return html;
    }

    app.get('/emails', async (req, res) => {
        try {
            const emails = await Email.find().exec();
            const html = renderEmails(emails);
            return res.status(200).send(`<h1>${emails.length} emails</h1> ${html}`);
        } catch (error) {
            console.error(error);
            return res.status(500).send(`<h1>Internal server error</h1><pre>${error.stack}</pre>`);
        }
    });

    app.get('/emails/:status', async (req, res) => {
        try {
            const emails = await Email.find({ status: req.params.status }).exec();
            if (emails) {
                const html = renderEmails(emails);
                return res.status(200).send(`<h1>${emails.length} ${req.params.status} emails</h1> ${html}`);
            }
            return res.status(200).send(`<h1>No emails</h1> <p>There where no emails with status: <b>${req.params.status}</></p>`);
        } catch (error) {
            console.error(error);
            return res.status(500).send(`<h1>Internal server error</h1><pre>${error.stack}</pre>`);
        }
    });

    app.get('*', async (req, res) => {
        try {
            const email = await dispatchTask({
                from: `Atencion CEIM <${SMTP_USER}>`,
                to: ['luis.almaguerdlg@gmail.com'],
                subject: 'Queue tests',
                template: { 
                    name: 'test_email',
                    data: {
                        name: 'Luis Almaguer',
                        phone: '8110741639',
                        email: 'luis.almaguerdlg@gmail.com',
                        message: `User visited ${req.path}`
                    },
                },
            });
            res.status(200).send(`<h1>Hello from ${req.path}</h1><pre>${JSON.stringify(email)}</pre>`);
        } catch (error) {
            console.error(error);
            res.status(500).send(`<h1>Internal server error</h1><code>${error.stack}</code>`);
        }
    });

    app.listen(1337, () => {
        console.log('Master process running at http://localhost:1337');
    });
    
    for(let i = 0; i < WORKER_COUNT; i++) {
        cluster.fork();
    }
    
    if (WORKER_COUNT === 0) {
        console.warn('[WARNING] No workers were spawned');
    }
}
else {
    require('./db')({buffer: true});
    const { Email, FailedEmail } = require('./models/email');
    const pug = require('pug');
    const path = require('path');
    const EMAILS_DIR = path.join(__dirname, 'emails');
    const templates = {
        test_email: pug.compileFile( path.join(EMAILS_DIR, 'test_email.pug' ) ),
    }

    
    function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function sendEmail({ from, to, cc, subject, html }) {
        await timeout(1000);
        if(Math.random() < 0.95){
            console.log({from, to, cc, subject, html});
        }
        else {
            throw new Error('Error trying to send email');
        }
    }

    async function processEmail(email) {
        console.log(email);
        const template = templates[email.template.name];
        const data = email.template.data;
        try {
            if( template ) {
                const html = template({...data, ...email.toObject()});
                await sendEmail({ ...email.toObject(), html })
                email.status = 'sent';
                email.sent_at = Date.now();
            } else {
                throw new Error(`Template: ${email.template.name} not found`)
            }
        }
        catch(error) {
            console.error(error);
            email.status = 'failed';
            email.error_message = error.message;
        }
        await email.save();
    }

    async function getNextEmail() {
        let email = await Email.findOneAndUpdate(
            { status: 'new' }, 
            { status: 'processing', last_attempt_at: Date.now(), $inc: { attempts: 1 } }, 
            { sort: { created_at: 1 } }
        ).exec();
        // if ( email ) return email;
        return email;

        // let email = await Email.findOneAndUpdate({ status: 'Failed' })
    }

    async function gcFailedEmails() {
        const email = await Email.findOneAndUpdate(
            { status: 'failed' },
            { status: 'retrying' }, 
            { sort: { last_attempt_at: 1 } }
        ).exec();

        if (email) {
            if (email.attempts < QUEUE_MAX_ATTEMPTS) {
                email.status = 'new';
                await email.save();
            }
            else {
                const swap = new FailedEmail(email.toObject());
                await email.remove();
                await swap.save();
            }
            return true;
        }
        return false;
    }

    async function gcStuckEmails() {
        const email = await Email.findOneAndUpdate(
            { $or: [{ status: 'processing' }, { status: 'retrying' }], last_attempt_at: { $lte: new Date(Date.now() - 10 * 60 * 1000) } },
            { last_attempt_at: Date.now() }, 
            { sort: { last_attempt_at: 1 } }
        ).exec();

        if (email) {
            if (email.attempts < QUEUE_MAX_ATTEMPTS) {
                email.status = 'new';
                await email.save();
            }
            else {
                const swap = new FailedEmail(email.toObject());
                await email.remove();
                await swap.save();
            }
            return true;
        }
        return false;
    }

    async function doWork() {
        let timeoutTime = 50;
        try {

            const email = await getNextEmail();
            if(email){
                await processEmail(email);
            } else {
                const didGCWork = gcFailedEmails() || gcStuckEmails();
                if(!didGCWork) {
                    timeoutTime = 500;
                }
            }
        }
        catch(error) {
            console.log(error);
            timeoutTime = 5000;
        }
        setTimeout(doWork, timeoutTime);
    }
    doWork();
}