require('dotenv').config();
const cluster = require('cluster');
const { QUEUE_WORKER_COUNT, SMTP_USER } = require('./env');


if(cluster.isMaster) {
    require('./db')();
    const Email = require('./models/email');
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
                prev += template({...data, ...current._doc});
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
            return res.status(200).send(html);
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
    const Email = require('./models/email');
    const pug = require('pug');
    const path = require('path');
    const EMAILS_DIR = path.join(__dirname, 'emails');
    const templates = {
        test_email: pug.compileFile( path.join(EMAILS_DIR, 'test_email.pug' ) ),
    }

    function processEmail() {

    }

    async function doWork() {
        let timeoutTime = 50;
        try {
            // const email = await Email.findOneAndUpdate({ status: 'Somethign else' }, { status: 'New' }, {sort: { created_at: 1 }}).exec();
            const email = await Email.findOne({ status: 'Somethign else' }).sort({ created_at: 1 }).exec();
            if(email){
                console.log(email);
            } else {
                timeoutTime = 500;
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