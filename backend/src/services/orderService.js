import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

/**
 * Order Service
 * Business logic for order operations
 */

/**
 * Create a new order from cart
 */
export const createOrder = async (sessionId, customerInfo) => {
    try {
        // Get cart
        const cart = await Cart.findOne({ sessionId }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            throw new Error('Cart is empty');
        }

        // Validate customer info
        const { name, email, address, phone } = customerInfo;
        if (!name || !email || !address || !phone) {
            throw new Error('All customer information fields are required');
        }

        // Calculate total
        const totalAmount = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        // Generate order number
        const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Prepare order items (store product name in case product is deleted later)
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.price,
        }));

        // Create order
        const order = await Order.create({
            sessionId,
            orderNumber,
            items: orderItems,
            customer: {
                name,
                email,
                address,
                phone,
            },
            totalAmount,
            status: 'pending',
        });

        // Clear cart after order is placed
        cart.items = [];
        await cart.save();

        // Populate product details
        await order.populate('items.product');

        return order;
    } catch (error) {
        throw new Error(`Error creating order: ${error.message}`);
    }
};

/**
 * Get order history for a session
 */
export const getOrderHistory = async (sessionId) => {
    try {
        const orders = await Order.find({ sessionId })
            .populate('items.product')
            .sort({ createdAt: -1 });

        return orders;
    } catch (error) {
        throw new Error(`Error fetching order history: ${error.message}`);
    }
};

/**
 * Get a single order by ID
 */
export const getOrderById = async (orderId) => {
    try {
        const order = await Order.findById(orderId).populate('items.product');

        if (!order) {
            throw new Error('Order not found');
        }

        return order;
    } catch (error) {
        throw new Error(`Error fetching order: ${error.message}`);
    }
};
