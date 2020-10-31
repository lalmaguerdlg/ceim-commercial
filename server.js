require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));
const express = require('express');
const next = require('next');
const helmet = require('helmet');
const { PORT, NODE_ENV } = require('./server/env');
const connectDB = require('./server/db');
connectDB();

const dev = NODE_ENV !== 'production';
const server = express();
const app = next({
    dev
});
const defaultNextHandle = app.getRequestHandler();
const mailer = require('./server/mailer');
const web = require('./server/web');

// server.use(helmet({ contentSecurityPolicy: {
//     directives: {
//         'default-src': ["'self'"],
//         'base-uri': ["'self'"],
//         'block-all-mixed-content': [],
//         'font-src': ["'self'", 'https:', 'data:'],
//         'frame-ancestors': ["'self'"],
//         'frame-src': ["'self'", '*.google.com'],
//         'img-src': ["'self'", 'data:', ],
//         'object-src': ['none'],
//         'script-src': ["'self'", "'unsafe-inline'"],
//         'script-src-attr': ['none'],
//         'style-src': ["'self'", 'https:', "'unsafe-inline'"],
//         'style-src-elem': ["'self'", 'https:', "'unsafe-inline'"],
//         'upgrade-insecure-requests': []
//     }
// } }));
// server.use(helmet());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

if (argv.v || argv.verbose) {
    const morgan = require('morgan');
    server.use(morgan('tiny'));
}

const Contact = require('./server/models/contact');

server.get('/contacts', async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts); 
    } catch(err) {
        next(err);
    }
});

server.use('/', web );
server.use('/mail', mailer );

server.all('*', (req, res) => {
    return defaultNextHandle(req, res);
});
// server.post('*', function(req, res) {
//     res.status(404).json({ status: 404, message: 'Not found'});
// });

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