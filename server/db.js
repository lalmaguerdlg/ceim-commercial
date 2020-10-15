const mongoose = require('mongoose');
const { MONGODB_URI } = require('./env');

if (MONGODB_URI === '') {
    throw new Error('[ERROR] MongoDB uri not specified');
}

function connect({ retryAttempts = -1, retryTimeout = 5000, buffer = false } = {}) {
    let attempts = 0;

    function _connect() {
        mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
            if(error) {
                if ( retryAttempts < 0 || attempts <= retryAttempts) {
                    console.error(`[ERROR] MongoDB connection could not be established, retrying on ${retryTimeout} ms`)
                    setTimeout(_connect, retryTimeout);
                } else if( retryAttempts >= 0 && attempts >= retryAttempts ) {
                    throw new Error('[ERROR] Could not establish connection with MongoDB');
                }
            }
            else {
                if(!buffer)
                    mongoose.set('bufferCommands', true);
            }
        });
        attempts++;
    }
    if(!buffer)
        mongoose.set('bufferCommands', false);
    _connect();
}


mongoose.connection.on('open', (...args) => console.log('MongoDB connected', ...args) );
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = connect;