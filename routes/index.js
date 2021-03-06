const router = require('express').Router();
const apiRoutes = require('./api');
// When front end is added, uncomment front end route info
//const htmlRoutes = require('./html/html-routes');

router.use('/api', apiRoutes);
//router.use('/', htmlRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>Uh, oh! 404 Not Found</h1>');
});

module.exports = router;