const { redirect } = require("next/dist/next-server/server/api-utils");

const { NODE_ENV } = require('./server/env');

module.exports = {
    async headers() {
        const cacheableDirs = [ 'vendors', 'img', 'fonts' ]

        let cacheControl = [];
        if(NODE_ENV === 'production'){
            cacheControl = cacheableDirs.map( dir => ({
                source: `/${dir}/:path*`,
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ]
            }));
        }

        return [
            ...cacheControl
        ]
    }
}