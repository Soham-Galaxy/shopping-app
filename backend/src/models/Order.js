import mongoose from 'mongoose';

/**
 * Order Schema
 * Stores completed orders with customer information
 */
const orderSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        index: true, // Index for faster lookups by session
    },
    orderNumber: {
        type: String,
        required: true,
        unique: true,
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        productName: String, // Store name in case product is deleted later
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
        },
    }],
    customer: {
        name: {
            type: String,
            required: [true, 'Customer name is required'],
        },
        email: {
            type: String,
            required: [true, 'Customer email is required'],
        },
        address: {
            type: String,
            required: [true, 'Delivery address is required'],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
        },
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
