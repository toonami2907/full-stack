import express from 'express'
const router = express.Router();
import { createProduct, getProductByPrice, AllProducts } from '../controller/Product.controller.js';


router.post('/create', createProduct);
router.get('/:price', getProductByPrice)
router.get('/', AllProducts)

export default router;