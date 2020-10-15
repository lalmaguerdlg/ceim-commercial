const path = require('path')
const express = require('express');
const router = express.Router();

const ROOT_DIR = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

const staticRoutes = [
    '/index', '/contact', '/about-us',
]

function cleanRoutes(routes, publicDir) {
    return (req, res, next) => {
        let found = false;
        for(let item of routes) {
            let route = { path: '', file: ''};
            if(typeof item === 'string') {
                route.path = item;
                route.file = item + '.html';
            } else {
                route = item;
            }
    
            if(route.path === req.path) {
                res.sendFile( path.join(publicDir, route.file) );
                found = true;
                break;
            }
        }
    
        if(!found) next();
    }
}

router.get('/*.html', (req, res) => {
    const redirectUrl = req.path.replace('.html', '');
    res.redirect(redirectUrl);
});

router.use( express.static(PUBLIC_DIR) );

router.use( cleanRoutes(staticRoutes, PUBLIC_DIR) );

// fallback: route not found
router.get('/*', (req, res) => {
    res.sendFile(path.join(PUBLIC_DIR, '/404.html'));
})

module.exports = router;