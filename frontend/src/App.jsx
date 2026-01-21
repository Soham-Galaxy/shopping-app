import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import { productAPI, cartAPI, orderAPI } from './services/api';
import './index.css';

/**
 * Main App Component
 * Manages application state and orchestrates components
 */
function App() {
    // State
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({ items: [] });
    const [sessionId, setSessionId] = useState('');
    const [view, setView] = useState('products'); // 'products', 'cart', 'checkout'
    const [loading, setLoading] = useState(false);

    // Initialize session ID (stored in localStorage for persistence)
    useEffect(() => {
        let storedSessionId = localStorage.getItem('shopping_session_id');

        if (!storedSessionId) {
            storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('shopping_session_id', storedSessionId);
        }

        setSessionId(storedSessionId);
    }, []);

    // Load products on mount
    useEffect(() => {
        loadProducts();
    }, []);

    // Load cart when session ID is available
    useEffect(() => {
        if (sessionId) {
            loadCart();
        }
    }, [sessionId]);

    // API calls
    const loadProducts = async () => {
        try {
            setLoading(true);
            const response = await productAPI.getAll();
            setProducts(response.data || []);
        } catch (error) {
            console.error('Failed to load products:', error);
            alert('Failed to load products. Please ensure the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    const loadCart = async () => {
        try {
            const response = await cartAPI.get(sessionId);
            setCart(response.data || { items: [] });
        } catch (error) {
            console.error('Failed to load cart:', error);
        }
    };

    const handleAddToCart = async (product) => {
        try {
            const response = await cartAPI.addItem(sessionId, product._id, 1);
            setCart(response.data);

            // Show success feedback
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = 'Added!';
            button.classList.add('success-flash');

            setTimeout(() => {
                button.textContent = originalText;
                button.classList.remove('success-flash');
            }, 1000);
        } catch (error) {
            alert('Failed to add to cart: ' + error.message);
        }
    };

    const handleUpdateQuantity = async (productId, newQuantity) => {
        try {
            const response = await cartAPI.updateItem(sessionId, productId, newQuantity);
            setCart(response.data);
        } catch (error) {
            alert('Failed to update quantity: ' + error.message);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            const response = await cartAPI.removeItem(sessionId, productId);
            setCart(response.data);
        } catch (error) {
            alert('Failed to remove item: ' + error.message);
        }
    };

    const handleCheckout = () => {
        if (cart.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        setView('checkout');
    };

    const handlePlaceOrder = async (customerInfo) => {
        try {
            const response = await orderAPI.create(sessionId, customerInfo);
            // Reload cart (should be empty now)
            await loadCart();
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const handleBackToProducts = () => {
        setView('products');
    };

    const handleBackToCart = () => {
        setView('cart');
    };

    // Cart item count for badge
    const cartItemCount = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

    return (
        <div className="app">
            {/* Header */}
            <header className="app-header">
                <div className="container">
                    <h1 className="app-title">
                        <span className="logo-icon">🛍️</span>
                        Shopping App
                    </h1>
                    <nav className="app-nav">
                        <button
                            className={`nav-btn ${view === 'products' ? 'active' : ''}`}
                            onClick={handleBackToProducts}
                        >
                            Products
                        </button>
                        <button
                            className={`nav-btn ${view === 'cart' || view === 'checkout' ? 'active' : ''}`}
                            onClick={handleBackToCart}
                        >
                            Cart
                            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="app-main">
                <div className="container">
                    {view === 'products' && (
                        <ProductList
                            products={products}
                            onAddToCart={handleAddToCart}
                            loading={loading}
                        />
                    )}

                    {view === 'cart' && (
                        <Cart
                            cart={cart}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemoveItem={handleRemoveItem}
                            onCheckout={handleCheckout}
                        />
                    )}

                    {view === 'checkout' && (
                        <OrderForm
                            cart={cart}
                            onPlaceOrder={handlePlaceOrder}
                            onBack={handleBackToCart}
                        />
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="app-footer">
                <div className="container">
                    <p>© 2026 Shopping App - Built with React, Node.js & MongoDB</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
