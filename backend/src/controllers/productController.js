import * as productService from '../services/productService.js';

/**
 * Product Controller
 * Handles HTTP requests/responses for product endpoints
 */

/**
 * Get all products
 * GET /api/products
 */
export const getProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get single product by ID
 * GET /api/products/:id
 */
export const getProduct = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};
