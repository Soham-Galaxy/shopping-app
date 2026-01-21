import React, { useState } from 'react';

/**
 * OrderForm Component
 * Customer information form and order placement
 */
const OrderForm = ({ cart, onPlaceOrder, onBack }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    // Calculate total
    const totalAmount = cart?.items?.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0) || 0;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^\+?[\d\s\-()]+$/.test(formData.phone)) {
            newErrors.phone = 'Phone number is invalid';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            const order = await onPlaceOrder(formData);
            setOrderDetails(order);
            setOrderPlaced(true);
        } catch (error) {
            alert('Failed to place order: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderPlaced && orderDetails) {
        return (
            <div className="order-confirmation">
                <div className="success-icon">✓</div>
                <h2>Order Placed Successfully!</h2>
                <div className="order-info">
                    <p><strong>Order Number:</strong> {orderDetails.orderNumber}</p>
                    <p><strong>Total Amount:</strong> ${orderDetails.totalAmount.toFixed(2)}</p>
                    <p><strong>Status:</strong> {orderDetails.status}</p>
                </div>
                <div className="order-items-summary">
                    <h3>Order Summary</h3>
                    {orderDetails.items.map((item, index) => (
                        <div key={index} className="order-item-row">
                            <span>{item.productName} × {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <button className="btn btn-primary" onClick={onBack}>
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="order-form-container">
            <h2>Checkout</h2>

            <div className="order-summary">
                <h3>Order Summary</h3>
                <div className="summary-items">
                    {cart?.items?.map((item, index) => (
                        <div key={index} className="summary-item">
                            <span>{item.product?.name} × {item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="summary-total">
                    <strong>Total:</strong>
                    <strong>${totalAmount.toFixed(2)}</strong>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="customer-form">
                <h3>Customer Information</h3>

                <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                        placeholder="John Doe"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="john@example.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                        placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="address">Delivery Address *</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? 'error' : ''}
                        placeholder="123 Main St, City, State, ZIP"
                        rows="3"
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={onBack}>
                        Back to Cart
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;
