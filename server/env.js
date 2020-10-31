module.exports = {
    PORT: parseInt(process.env.PORT,10) || 3000,
    NODE_ENV: process.env.NODE_ENV || 'develop',
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USE_SSL: process.env.SMTP_USE_SSL || 'false',
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SEND_EMAILS: process.env.SEND_EMAILS || 'true',
    SEND_NOTIFICATIONS_TO: process.env.SEND_NOTIFICATIONS_TO || '',
    MONGODB_URI: process.env.MONGODB_URI || '',
    QUEUE_WORKER_COUNT: process.env.QUEUE_WORKER_COUNT || 0,
    QUEUE_MAX_ATTEMPTS: process.env.QUEUE_MAX_ATTEMPTS || 3,
};
