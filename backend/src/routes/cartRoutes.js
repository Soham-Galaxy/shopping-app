import express from 'express';
import * as cartController from '../controllers/cartController.js';

const router = express.Router();

/**
 * Cart Routes
 * Base path: /api/cart
 */

// GET /api/cart/:sessionId - Get cart
router.get('/:sessionId', cartController.getCart);

// POST /api/cart/:sessionId/items - Add item to cart
router.post('/:sessionId/items', cartController.addToCart);

// PUT /api/cart/:sessionId/items/:productId - Update item quantity
router.put('/:sessionId/items/:productId', cartController.updateCartItem);

// DELETE /api/cart/:sessionId/items/:productId - Remove item from cart
router.delete('/:sessionId/items/:productId', cartController.removeFromCart);

// DELETE /api/cart/:sessionId - Clear cart
router.delete('/:sessionId', cartController.clearCart);

export default router;
