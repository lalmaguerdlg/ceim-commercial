const express = require('express');
const yup = require('yup');
const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path')
const env = require('./env');

const Contact = require('./models/contact');

const router = express.Router();

const EMAILS_DIR = path.join(__dirname, 'emails');
const templates = {
    contact:    pug.compileFile( path.join(EMAILS_DIR, 'contact.pug' ) ),
    message:    pug.compileFile( path.join(EMAILS_DIR, 'message.pug' ) ),
    thanksUser: pug.compileFile( path.join(EMAILS_DIR, 'thanks_user.pug' ) ),
}

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_USE_SSL === 'true',
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
    },
});

class Email {
    constructor({ from, to, cc, subject, html } = {}) {
        this.from = from;
        this.to = to;
        this.cc = cc;
        this.subject = subject;
        this.html = html;
    }
}

const email_to_admin_template = new Email({ 
    from: `"Notificación CEIM" <${env.SMTP_USER}>`,
    to: env.SEND_NOTIFICATIONS_TO ? env.SEND_NOTIFICATIONS_TO.split(',') : [],
});

const email_to_user_template = new Email({
    from: `"Atención CEIM" <${env.SMTP_USER}>`
});

if (email_to_admin_template.to.length === 0) { 
    console.warn('[WARNING]: No recipients were specified for email notifications. No one will receive notifications');
}

function sendEmails(emails) {
    if ( env.SEND_EMAILS === 'false' ) return false; 

    function sendEmail(email) {
        return transporter.sendMail({ ...email })
            .then(info => console.log( `[${new Date().toUTCString()}] Email ${info.messageId} sent to ${email.to}`));
    }

    const promises = [];
    if (Array.isArray(emails)) {
        for (let email of emails) {
            promises.push( sendEmail(email) );
        }
    }
    else {
        promises.push( sendEmail(emails) );
    }
    return Promise.all(promises);
}

async function saveContact(req, res, next) {
    try {
        const contact = new Contact({ ...req.body });
        const doc = await contact.save();
        res.locals.contact = doc;
    }
    catch (err) {
        console.error(`[ERROR] attempting to save ${JSON.stringify(req.body)} failed`, err);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
    next();
}

function validateSchema(schema) {
    return async (req, res, next) => {
        try {
            const result = await schema.validate({ ...req.body });
            req.body = { ...result };
        } catch(err) {
            return res.status(500).json({ status: 400, message: 'Validation Error', errors: err.errors });
        }
        next();
    }
}

const contact_request = yup.object().shape({
    name: yup.string().required().trim(),
    email: yup.string().required().email(),
    phone: yup.string().trim()
});
router.post('/contact', validateSchema(contact_request), saveContact,
    async (req, res) => {

    const emails = [];
    if ( email_to_admin_template.to.length > 0) {
        emails.push(new Email({
            ...email_to_admin_template,
            subject: `Solicitud de contacto de ${body.email}`,
            html: templates.contact( {...req.body} )
        }))
    }

    emails.push(new Email({
        ...email_to_user_template,
        to: req.body.email,
        subject: 'Gracias por contactarnos',
        html: templates.thanksUser(),
    }));


    try {
        await sendEmails(emails);
        res.status(200).json({ status: 200, message: "Email sent", contact: res.locals.contact });
    } catch(err) {
        console.error(err);
        res.status(500).json({ status: 500, message: "An error occurred when trying to send an email" });
    }
});

const messate_request = yup.object().shape({
    name: yup.string().required().trim(),
    email: yup.string().required().email(),
    subject: yup.string().trim(),
    message: yup.string().required().trim(),
});
router.post('/message', validateSchema(messate_request), saveContact, async (req, res) => {

    const emails = [];
    if ( email_to_admin_template.to.length > 0) {
        emails.push(new Email({
            ...email_to_admin_template,
            subject: `Nuevo mensaje de ${req.body.email}`,
            html: templates.message( {...req.body} )
        }))
    }

    emails.push(new Email({
        ...email_to_user_template,
        to: req.body.email,
        subject: 'Gracias por contactarnos',
        html: templates.thanksUser(),
    }));


    try {
        await sendEmails(emails);
        res.status(200).json({ status: 200, message: "Email sent", contact: res.locals.contact  });
    } catch(err) {
        console.error(err);
        res.status(500).json({ status: 500, message: "An error occurred when trying to send an email" });
    }
});

module.exports = router;