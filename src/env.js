module.exports = {
    PORT: process.env.PORT || 3000,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USE_SSL: process.env.SMTP_USE_SSL || 'false',
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SEND_EMAILS: process.env.SEND_EMAILS || 'true',
    SEND_NOTIFICATIONS_TO: process.env.SEND_NOTIFICATIONS_TO || '',
    MONGO_DB: process.env.MONGO_DB || '',
};
