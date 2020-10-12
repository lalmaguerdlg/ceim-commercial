require('dotenv').config();
const express = require('express');
const body_parser = require('body-parser');

const app = express();
const mailer = require('./mailer');
const web = require('./web');

const PORT = 3000;


app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

app.use('/', web );
app.use('/mail', mailer );

app.post('*', function(req, res) {
    res.status(404).send({ error: 404, message: 'Not found'});
});

app.listen(PORT, () => {
    console.log(`ceim-commercial service running on port ${PORT}`);
});