import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

/**
 * Cart Service
 * Business logic for shopping cart operations
 * All cart data is persisted in MongoDB (no in-memory storage)
 */

/**
 * Get cart by session ID
 * Creates a new cart if one doesn't exist
 */
export const getCart = async (sessionId) => {
    try {
        let cart = await Cart.findOne({ sessionId }).populate('items.product');

        if (!cart) {
            // Create new cart if it doesn't exist
            cart = await Cart.create({ sessionId, items: [] });
        }

        return cart;
    } catch (error) {
        throw new Error(`Error fetching cart: ${error.message}`);
    }
};

/**
 * Add item to cart
 * If item already exists, increase quantity
 */
export const addToCart = async (sessionId, productId, quantity = 1) => {
    try {
        // Validate product exists and has stock
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        if (product.stock < quantity) {
            throw new Error('Insufficient stock available');
        }

        let cart = await Cart.findOne({ sessionId });

        if (!cart) {
            // Create new cart
            cart = new Cart({
                sessionId,
                items: [{
                    product: productId,
                    quantity,
                    price: product.price,
                }],
            });
        } else {
            // Check if product already in cart
            const existingItemIndex = cart.items.findIndex(
                item => item.product.toString() === productId
            );

            if (existingItemIndex > -1) {
                // Update quantity
                const newQuantity = cart.items[existingItemIndex].quantity + quantity;

                if (product.stock < newQuantity) {
                    throw new Error('Insufficient stock available');
                }

                cart.items[existingItemIndex].quantity = newQuantity;
            } else {
                // Add new item
                cart.items.push({
                    product: productId,
                    quantity,
                    price: product.price,
                });
            }
        }

        await cart.save();

        // Populate product details before returning
        await cart.populate('items.product');

        return cart;
    } catch (error) {
        throw new Error(`Error adding to cart: ${error.message}`);
    }
};

/**
 * Update item quantity in cart
 */
export const updateCartItem = async (sessionId, productId, quantity) => {
    try {
        if (quantity < 1) {
            throw new Error('Quantity must be at least 1');
        }

        const cart = await Cart.findOne({ sessionId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            throw new Error('Item not found in cart');
        }

        // Check stock availability
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        if (product.stock < quantity) {
            throw new Error('Insufficient stock available');
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        await cart.populate('items.product');
        return cart;
    } catch (error) {
        throw new Error(`Error updating cart item: ${error.message}`);
    }
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (sessionId, productId) => {
    try {
        const cart = await Cart.findOne({ sessionId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();
        await cart.populate('items.product');

        return cart;
    } catch (error) {
        throw new Error(`Error removing from cart: ${error.message}`);
    }
};

/**
 * Clear all items from cart
 */
export const clearCart = async (sessionId) => {
    try {
        const cart = await Cart.findOne({ sessionId });
        if (!cart) {
            throw new Error('Cart not found');
        }

        cart.items = [];
        await cart.save();

        return cart;
    } catch (error) {
        throw new Error(`Error clearing cart: ${error.message}`);
    }
};
