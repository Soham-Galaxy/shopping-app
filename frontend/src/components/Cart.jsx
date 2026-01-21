import React from 'react';

/**
 * Cart Component
 * Displays cart items with quantity controls and checkout
 */
const Cart = ({ cart, onUpdateQuantity, onRemoveItem, onCheckout, loading }) => {
    // Calculate totals
    const itemCount = cart?.items?.length || 0;
    const totalAmount = cart?.items?.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0) || 0;

    if (loading) {
        return (
            <div className="cart-container">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading cart...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h2>Shopping Cart</h2>
                <span className="cart-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
            </div>

            {itemCount === 0 ? (
                <div className="empty-cart">
                    <div className="empty-cart-icon">🛒</div>
                    <h3>Your cart is empty</h3>
                    <p>Add some products to get started!</p>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.items.map((item) => (
                            <div key={item._id} className="cart-item">
                                <div className="cart-item-image">
                                    <img
                                        src={item.product?.image}
                                        alt={item.product?.name}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/100x100?text=Product';
                                        }}
                                    />
                                </div>
                                <div className="cart-item-details">
                                    <h4>{item.product?.name}</h4>
                                    <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                                </div>
                                <div className="cart-item-quantity">
                                    <button
                                        className="btn-quantity"
                                        onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        −
                                    </button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button
                                        className="btn-quantity"
                                        onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
                                        disabled={item.quantity >= item.product?.stock}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="cart-item-total">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                <button
                                    className="btn-remove"
                                    onClick={() => onRemoveItem(item.product._id)}
                                    aria-label="Remove item"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="cart-total">
                            <span>Total:</span>
                            <span className="total-amount">${totalAmount.toFixed(2)}</span>
                        </div>
                        <button className="btn btn-checkout" onClick={onCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
