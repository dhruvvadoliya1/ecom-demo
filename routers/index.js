const router = require('express').Router();
const userRoute = require('./user');
const adminRoute = require('./admin');
const authRoute = require('./auth');
const productRoute = require('./product');
const orderRoute = require('./order');
const logRoute = require('./log');

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/admin', adminRoute);
router.use('/product', productRoute);
router.use('/order', orderRoute);
router.use('/log', logRoute)

module.exports = router;