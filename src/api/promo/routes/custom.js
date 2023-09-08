module.exports =  {
    routes: [
        {
            method: 'GET',
            path: '/getPromo/:slug',
            handler: 'promo.getPromo'
        },
        {
            method: 'GET',
            path: '/getLocaleList/:slug',
            handler: 'promo.getLocaleList'
        }
    ]
}