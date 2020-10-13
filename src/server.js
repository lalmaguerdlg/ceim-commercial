require('dotenv').config();
const express = require('express');

const app = express();
const mailer = require('./mailer');
const web = require('./web');

const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/', web );
app.use('/mail', mailer );

app.post('*', function(req, res) {
    res.status(404).send({ status: 404, message: 'Not found'});
});

app.listen(PORT, () => {
    console.log(`ceim-commercial service running on port ${PORT}`);
});