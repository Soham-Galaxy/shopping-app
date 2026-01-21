import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

/**
 * Order Routes
 * Base path: /api/orders
 */

// POST /api/orders - Create new order
router.post('/', orderController.createOrder);

// GET /api/orders/history/:sessionId - Get order history for session
router.get('/history/:sessionId', orderController.getOrderHistory);

// GET /api/orders/:orderId - Get single order
router.get('/:orderId', orderController.getOrder);

export default router;
