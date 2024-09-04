const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:idProd', updateProduct);
router.delete('/:idProd', deleteProduct);

module.exports = router;
