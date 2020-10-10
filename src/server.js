const path = require('path');
const express = require('express');
const { URL } = require('url');

const app = express();

const PORT = 3000;
const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

app.get('/*.html', (req, res) => {
    const redirectUrl = req.path.replace('.html', '');
    res.redirect(redirectUrl);
});

app.use(express.static(PUBLIC_DIR));


const staticRoutes = [
    '/index', '/contact', '/about-us',
]

app.get('*', (req, res, next) => {
    let found = false;
    for(let item of staticRoutes) {
        let route = { path: '', file: ''};
        if(typeof item === 'string') {
            route.path = item;
            route.file = item + '.html';
        } else {
            route = item;
        }

        if(route.path === req.path) {
            res.sendFile( path.join(PUBLIC_DIR, route.file) );
            found = true;
            break;
        }
    }

    if(!found) next();
});

// fallback: route not found
app.get('*', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, '/404.html'));
})

app.listen(PORT, () => {
    console.log(`ceim-commercial service running on port ${PORT}`);
});