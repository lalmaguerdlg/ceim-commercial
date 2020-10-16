const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
    from: { type: String, required: true },
    to: { type: [String], required: true },
    cc: [String],
    subject: String,
    template: { 
        name: { type: String, required: true },
        data: Object,
    },
    created_at: { type: Date, default: Date.now() },
    status: { type: String, enum: ['new', 'processing', 'failed', 'retrying', 'sent'], default: 'new' },
    sent_at: Date,
    attempts: { type: Number, default: 0 },
    last_attempt_at: Date,
    error_message: String,
});



module.exports = {
    Email: mongoose.model('Email', EmailSchema),
    FailedEmail: mongoose.model('FailedEmail', EmailSchema)
} 