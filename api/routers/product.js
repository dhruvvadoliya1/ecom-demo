const router = require('express').Router()
const ProductController = require('../controllers/productController');
const { validateUser, validateFor } = require('../middlewares/auth');

router.post('/',validateFor('admin'), ProductController.create);
router.get('/', validateUser, ProductController.getProducts);
router.get('/:id',validateUser, ProductController.getProducts);
router.put('/:id',validateFor('admin'), ProductController.updateProduct);
router.delete('/:id', validateFor('admin'), ProductController.deleteProduct);

module.exports = router;