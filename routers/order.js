const router = require('express').Router()
const OrderController = require('../controllers/orderController');
const { validateUser, validateFor } = require('../middlewares/auth');

router.post('/',validateUser, OrderController.addOrder);
router.get('/reciept/:id', validateUser, OrderController.getReciept);
router.patch('/:id', validateFor('admin'), OrderController.updateOrderStatus);
router.get('/', validateFor('admin'), OrderController.getOrders);

module.exports = router;