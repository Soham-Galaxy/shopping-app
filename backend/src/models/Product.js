import mongoose from 'mongoose';

/**
 * Product Schema
 * Represents products available in the shopping catalog
 */
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative'],
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/300x300?text=Product',
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative'],
        default: 0,
    },
    category: {
        type: String,
        default: 'General',
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt
});

const Product = mongoose.model('Product', productSchema);

export default Product;
