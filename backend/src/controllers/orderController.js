import * as orderService from '../services/orderService.js';

/**
 * Order Controller
 * Handles HTTP requests/responses for order endpoints
 */

/**
 * Create new order
 * POST /api/orders
 * Body: { sessionId, customer: { name, email, address, phone } }
 */
export const createOrder = async (req, res, next) => {
    try {
        const { sessionId, customer } = req.body;

        if (!sessionId) {
            return res.status(400).json({
                success: false,
                error: 'Session ID is required',
            });
        }

        if (!customer) {
            return res.status(400).json({
                success: false,
                error: 'Customer information is required',
            });
        }

        const order = await orderService.createOrder(sessionId, customer);
        res.status(201).json({
            success: true,
            data: order,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get order history for session
 * GET /api/orders/history/:sessionId
 */
export const getOrderHistory = async (req, res, next) => {
    try {
        const { sessionId } = req.params;
        const orders = await orderService.getOrderHistory(sessionId);
        res.json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get single order by ID
 * GET /api/orders/:orderId
 */
export const getOrder = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.orderId);
        res.json({
            success: true,
            data: order,
        });
    } catch (error) {
        next(error);
    }
};
