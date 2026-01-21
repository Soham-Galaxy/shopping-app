import Product from '../models/Product.js';

/**
 * Product Service
 * Business logic for product operations
 */

/**
 * Get all products from the database
 */
export const getAllProducts = async () => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        return products;
    } catch (error) {
        throw new Error(`Error fetching products: ${error.message}`);
    }
};

/**
 * Get a single product by ID
 */
export const getProductById = async (productId) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    } catch (error) {
        throw new Error(`Error fetching product: ${error.message}`);
    }
};

/**
 * Seed initial products (for demo purposes)
 * This is called on server startup if no products exist
 */
export const seedProducts = async () => {
    try {
        const count = await Product.countDocuments();

        if (count === 0) {
            const sampleProducts = [
                {
                    name: 'Wireless Headphones',
                    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
                    price: 199.99,
                    stock: 50,
                    category: 'Electronics',
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
                },
                {
                    name: 'Smart Watch',
                    description: 'Fitness tracker with heart rate monitor and GPS',
                    price: 299.99,
                    stock: 30,
                    category: 'Electronics',
                    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
                },
                {
                    name: 'Laptop Backpack',
                    description: 'Water-resistant backpack with USB charging port',
                    price: 49.99,
                    stock: 100,
                    category: 'Accessories',
                    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
                },
                {
                    name: 'Mechanical Keyboard',
                    description: 'RGB backlit mechanical gaming keyboard with blue switches',
                    price: 129.99,
                    stock: 25,
                    category: 'Electronics',
                    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
                },
                {
                    name: 'Wireless Mouse',
                    description: 'Ergonomic wireless mouse with adjustable DPI',
                    price: 39.99,
                    stock: 75,
                    category: 'Electronics',
                    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
                },
                {
                    name: 'USB-C Hub',
                    description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader',
                    price: 59.99,
                    stock: 60,
                    category: 'Accessories',
                    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=300&fit=crop',
                },
            ];

            await Product.insertMany(sampleProducts);
            console.log('✓ Sample products seeded successfully');
        }
    } catch (error) {
        console.error('Error seeding products:', error.message);
    }
};
