const express = require('express');
const { body, validationResult } = require('express-validator');
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

function validateForm(req, res, next) {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ status: 400, message: "Validation error", errors: errors.array() });
    }
    next();
}

async function saveContact(req, res, next) {
    try {
        const contact = new Contact({ ...req.body });
        await contact.save();
    }
    catch (err) {
        console.error(`[ERROR] attempting to save ${req.body} failed`, err);
        return res.status(500).json({ status: 500, message: 'Internal server error' });
    }
    next();
}

router.post('/contact', [
    body('name').notEmpty({ignore_whitespace: true}).trim().escape(),
    body('email').trim().isEmail(),
    body('phone').trim(), //.isMobilePhone('es-MX'), we can maybe validate for only mexican phones
], validateForm, saveContact, async (req, res) => {

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
        res.status(200).json({ status: 200, message: "Email sent" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ status: 500, message: "An error occurred when trying to send an email" });
    }
});

router.post('/message', [
    body('name').notEmpty({ignore_whitespace: true}).trim().escape(),
    body('email').trim().isEmail(),
    body('subject').trim().escape(),
    body('message').notEmpty({ignore_whitespace: true}).trim().escape(),
], validateForm, saveContact, async (req, res) => {

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
        res.status(200).json({ status: 200, message: "Email sent" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ status: 500, message: "An error occurred when trying to send an email" });
    }
});

module.exports = router;