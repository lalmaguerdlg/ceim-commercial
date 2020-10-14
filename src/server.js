require('dotenv').config();
const argv = require('minimist')(process.argv.slice(2));
const express = require('express');
const { PORT } = require('./env');
require('./db')(); // This initialices the mongodb connection

const app = express();
const mailer = require('./mailer');
const web = require('./web');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (argv.v || argv.verbose) {
    app.use((req, res, next) => {
        const body = Object.keys(req.body).length > 0 ? JSON.stringify(req.body) : '';
        console.log(`[${new Date().toLocaleString('en-US')}] ${req.method} ${req.path} ${body}`);
        next();
    })
}

const Contact = require('./models/contact');

app.get('/contacts', async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

app.use('/', web );
app.use('/mail', mailer );

app.post('*', function(req, res) {
    res.status(404).json({ status: 404, message: 'Not found'});
});

app.listen(PORT, () => {
    console.log(`ceim-commercial service running on port ${PORT}`);
});