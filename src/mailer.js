const express = require('express');
const nodemailer = require('nodemailer');
const Mail = require('nodemailer/lib/mailer');
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

router.post('/contact', async (req, res) => {

    // const { name, phone, email, subject, message } = req.body;
    const body = req.body;

    try {
        await sendEmail('luis.almaguerdlg@gmail.com', body.subject, `${body.name} dijo: ${req.message}`);
        res.status(200).send({status: "ok"});
    } catch(err) {
        console.error(err);
        res.status(500).send({status: "error"});
    }
});

module.exports = router;