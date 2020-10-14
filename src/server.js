require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));
const express = require('express');
const helmet = require('helmet');
const { PORT } = require('./env');
require('./db')(); // This initialices the mongodb connection

const app = express();
const mailer = require('./mailer');
const web = require('./web');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (argv.v || argv.verbose) {
    const morgan = require('morgan');
    app.use(morgan('tiny'));
}

const Contact = require('./models/contact');

app.get('/contacts', async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts); 
    } catch(err) {
        next(err);
    }
});

app.use('/', web );
app.use('/mail', mailer );

app.post('*', function(req, res) {
    res.status(404).json({ status: 404, message: 'Not found'});
});

const HTTP_SERVER_ERROR = 500;
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  const status = err.status || HTTP_SERVER_ERROR;
  return res.status(status).json({ status: status, message: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`ceim-commercial service running on http://localhost:${PORT}`);
});