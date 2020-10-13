const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const env = require('./env');

const router = express.Router();



async function sendEmail(receiver, subject, html) {
    let transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_USE_SSL === 'true',
        auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: `"Notificación CEIM" <${env.SMTP_USER}>`,
        to: receiver,
        subject,
        html,
    });

    console.log('Email sent: %s', info.messageId);
}


router.post('/contact', [
    body('name').notEmpty({ignore_whitespace: true}).trim().escape(),
    body('email').trim().isEmail(),
    body('phone').trim(), //.isMobilePhone('es-MX'), we can maybe validate for only mexican phones
    body('subject').trim().escape(),
    body('message').trim().escape(),
], async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({ status: 400, message: "Validation error", errors: errors.array() });
    }

    const body = req.body;

    try {
        // await sendEmail('luis.almaguerdlg@gmail.com', body.subject, `${body.name} dijo: ${req.message}`);
        res.status(200).json({ status: 200, message: "Email sent" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ status: 500, message: "An error occurred when trying to send an email" });
    }
});

module.exports = router;