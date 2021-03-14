require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));
const express = require('express');
const next = require('next');
const helmet = require('helmet');
const { PORT, NODE_ENV } = require('./env');
const connectDB = require('./db');
// connectDB();

const dev = NODE_ENV !== 'production';
const server = express();
const app = next({
    dev
});
const defaultNextHandle = app.getRequestHandler();
const mailer = require('./mailer');
const web = require('./web');

if ( NODE_ENV === 'production') {
    server.use(helmet({ contentSecurityPolicy: {
        directives: {
            'default-src': ["'self'"],
            'base-uri': ["'self'"],
            'block-all-mixed-content': [],
            'font-src': ["'self'", 'https:', 'data:'],
            'frame-ancestors': ["'self'"],
            'frame-src': ["'self'", '*.google.com'],
            'img-src': ["'self'", 'data:', 'https:' ],
            'object-src': ['none'],
            'script-src': ["'self'", "'unsafe-inline'"],
            'script-src-attr': ['none'],
            'style-src': ["'self'", 'https:', "'unsafe-inline'"],
            'style-src-elem': ["'self'", 'https:', "'unsafe-inline'"],
            'upgrade-insecure-requests': []
        }
    } }));
}
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

if (argv.v || argv.verbose) {
    const morgan = require('morgan');
    server.use(morgan('tiny'));
}

const Contact = require('./models/contact');

server.get('/contacts', async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts); 
    } catch(err) {
        next(err);
    }
});

// server.use('/', web );
server.use('/mail', mailer );

server.all('*', (req, res) => {
    return defaultNextHandle(req, res);
});

const HTTP_SERVER_ERROR = 500;
server.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  const status = err.status || HTTP_SERVER_ERROR;
  return res.status(status).json({ status: status, message: 'Internal server error' });
});

app.prepare().then(() => {
    server.listen(PORT, (err) => {
        if(err) throw err;
        console.log(`ceim-commercial service running on http://localhost:${PORT}`);
    });
});