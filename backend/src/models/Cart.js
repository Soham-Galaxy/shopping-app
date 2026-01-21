import mongoose from 'mongoose';

/**
 * Cart Schema
 * Stores shopping cart data in MongoDB (no in-memory storage)
 * Persists across server restarts
 */
const cartSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
        index: true, // Index for faster lookups
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1'],
            default: 1,
        },
        price: {
            type: Number,
            required: true, // Store price at time of adding to cart
        },
    }],
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

// Update the updatedAt timestamp before saving
cartSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
