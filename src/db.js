const mongoose = require('mongoose');
const { MONGO_DB } = require('./env');

if (MONGO_DB === '') {
    throw new Error('[Error] MongoDB uri not specified');
}

mongoose.connect(MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('open', (...args) => console.log('MongoDB connected', ...args) );
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;