const path = require('path');

const express = require('express');
const {body} = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

const validate = [
    body('title')
        .isString()
        .isLength({min: 3})
        .trim(),    
    body('price')
        .isFloat(),
    body('description')
        .isLength({min: 5, max: 400})
        .trim()
];
 
router.get(
    '/add-product', validate, isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product', validate, isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct); 

router.post('/edit-product', validate, isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDeleteProduct);

module.exports = router;

