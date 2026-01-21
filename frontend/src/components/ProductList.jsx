import React from 'react';

/**
 * ProductList Component
 * Displays products in a grid layout with add to cart functionality
 */
const ProductList = ({ products, onAddToCart, loading }) => {
    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="empty-state">
                <h2>No products available</h2>
                <p>Check back later for new items!</p>
            </div>
        );
    }

    return (
        <div className="product-list">
            <h2>Our Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <div className="product-image">
                            <img
                                src={product.image}
                                alt={product.name}
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x300?text=Product';
                                }}
                            />
                            {product.stock < 10 && product.stock > 0 && (
                                <span className="low-stock-badge">Only {product.stock} left!</span>
                            )}
                            {product.stock === 0 && (
                                <span className="out-of-stock-badge">Out of Stock</span>
                            )}
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="product-description">{product.description}</p>
                            <div className="product-footer">
                                <span className="product-price">${product.price.toFixed(2)}</span>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => onAddToCart(product)}
                                    disabled={product.stock === 0}
                                >
                                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
