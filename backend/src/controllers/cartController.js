import * as cartService from '../services/cartService.js';

/**
 * Cart Controller
 * Handles HTTP requests/responses for cart endpoints
 */

/**
 * Get cart by session ID
 * GET /api/cart/:sessionId
 */
export const getCart = async (req, res, next) => {
    try {
        const cart = await cartService.getCart(req.params.sessionId);
        res.json({
            success: true,
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Add item to cart
 * POST /api/cart/:sessionId/items
 * Body: { productId, quantity }
 */
export const addToCart = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                error: 'Product ID is required',
            });
        }

        const cart = await cartService.addToCart(sessionId, productId, quantity || 1);
        res.json({
            success: true,
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update cart item quantity
 * PUT /api/cart/:sessionId/items/:productId
 * Body: { quantity }
 */
export const updateCartItem = async (req, res, next) => {
    try {
        const { sessionId, productId } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                error: 'Valid quantity is required',
            });
        }

        const cart = await cartService.updateCartItem(sessionId, productId, quantity);
        res.json({
            success: true,
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Remove item from cart
 * DELETE /api/cart/:sessionId/items/:productId
 */
export const removeFromCart = async (req, res, next) => {
    try {
        const { sessionId, productId } = req.params;
        const cart = await cartService.removeFromCart(sessionId, productId);
        res.json({
            success: true,
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Clear cart
 * DELETE /api/cart/:sessionId
 */
export const clearCart = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        const cart = await cartService.clearCart(sessionId);
        res.json({
            success: true,
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};
