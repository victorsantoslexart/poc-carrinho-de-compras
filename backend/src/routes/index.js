const express = require('express');
const errorMiddleware = require('../middleware/ErrorMiddleware');
const { getProducts } = require('../controller/products');


const router = express();


router.get('/products', getProducts);
router.use(errorMiddleware);

module.exports = router;
