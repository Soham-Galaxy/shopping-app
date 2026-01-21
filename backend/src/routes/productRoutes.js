import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

/**
 * Product Routes
 * Base path: /api/products
 */

// GET /api/products - Get all products
router.get('/', productController.getProducts);

// GET /api/products/:id - Get single product
router.get('/:id', productController.getProduct);

export default router;
