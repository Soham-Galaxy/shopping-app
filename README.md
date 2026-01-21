# Shopping Application

A production-quality full-stack shopping application built with React, Node.js/Express, and MongoDB. Features a clean layered architecture with proper separation of concerns and MongoDB persistence.

## 🚀 Features

- **Product Catalog**: Browse products with images, descriptions, and pricing
- **Shopping Cart**: Add/remove items, adjust quantities with real-time updates
- **Order Management**: Complete checkout with customer information
- **Persistent Storage**: All data stored in MongoDB (no in-memory storage)
- **Session Management**: Cart persists across browser sessions
- **Responsive Design**: Modern, mobile-friendly UI
- **Clean Architecture**: Layered backend with routes → controllers → services → database

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** 18+ installed ([Download](https://nodejs.org/))
- **MongoDB** installed and running ([Installation Guide](https://www.mongodb.com/docs/manual/installation/))
- **npm** or **yarn** package manager

### MongoDB Installation

#### Windows:
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and select "Complete" installation
3. Install as a Windows Service (recommended)
4. MongoDB will start automatically on port 27017

To verify MongoDB is running:
```powershell
# Check if MongoDB service is running
Get-Service -Name MongoDB

# Or try to connect
mongosh
```

#### macOS (using Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu/Debian):
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -sc)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

## 🛠️ Installation & Setup

### 1. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Environment is already configured in .env file
# Verify the file exists with proper settings:
# - PORT=5000
# - MONGODB_URI=mongodb://localhost:27017/shopping-app
# - CORS_ORIGIN=http://localhost:5173
```

### 2. Frontend Setup

```powershell
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Environment is already configured in .env file
# Verify the file contains:
# - VITE_API_BASE_URL=http://localhost:5000/api
```

## 🚀 Running the Application

### Start Backend Server

```powershell
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

You should see:
```
✓ MongoDB Connected: localhost
✓ Sample products seeded successfully
✓ Server is running on port 5000
✓ Environment: development
```

### Start Frontend Application

In a new terminal:

```powershell
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173` and open automatically in your browser.

## 📁 Project Structure

```
shopping-app/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   │   └── db.js
│   │   ├── models/         # MongoDB schemas
│   │   │   ├── Product.js
│   │   │   ├── Cart.js
│   │   │   └── Order.js
│   │   ├── services/       # Business logic layer
│   │   │   ├── productService.js
│   │   │   ├── cartService.js
│   │   │   └── orderService.js
│   │   ├── controllers/    # Request handlers
│   │   │   ├── productController.js
│   │   │   ├── cartController.js
│   │   │   └── orderController.js
│   │   ├── routes/         # API routes
│   │   │   ├── productRoutes.js
│   │   │   ├── cartRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── middleware/     # Custom middleware
│   │   │   └── errorHandler.js
│   │   └── server.js       # Application entry point
│   ├── .env                # Environment variables
│   ├── .env.example        # Environment template
│   └── package.json
│
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # React components
    │   │   ├── ProductList.jsx
    │   │   ├── Cart.jsx
    │   │   └── OrderForm.jsx
    │   ├── services/       # API communication
    │   │   └── api.js
    │   ├── App.jsx         # Main app component
    │   ├── main.jsx        # React entry point
    │   └── index.css       # Global styles
    ├── .env                # Environment variables
    ├── .env.example        # Environment template
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart/:sessionId` - Get cart
- `POST /api/cart/:sessionId/items` - Add item to cart
  - Body: `{ productId, quantity }`
- `PUT /api/cart/:sessionId/items/:productId` - Update item quantity
  - Body: `{ quantity }`
- `DELETE /api/cart/:sessionId/items/:productId` - Remove item
- `DELETE /api/cart/:sessionId` - Clear cart

### Orders
- `POST /api/orders` - Create order
  - Body: `{ sessionId, customer: { name, email, address, phone } }`
- `GET /api/orders/history/:sessionId` - Get order history
- `GET /api/orders/:orderId` - Get single order

## 🏗️ Architecture

### Backend (Layered Architecture)

```
Client Request
     ↓
Routes (API endpoints)
     ↓
Controllers (Request/Response handling)
     ↓
Services (Business logic)
     ↓
Models (Database operations)
     ↓
MongoDB
```

### Frontend (Component Architecture)

- **App.jsx**: Main component, state management, view routing
- **ProductList.jsx**: Display products, add to cart
- **Cart.jsx**: View cart, update quantities, checkout
- **OrderForm.jsx**: Customer info, place order, confirmation
- **api.js**: Centralized API communication with axios

## 🔧 Configuration

All configuration is managed through environment variables:

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `CORS_ORIGIN` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `VITE_API_BASE_URL` - Backend API base URL

**No hardcoded URLs or secrets in the codebase!**

## 🎨 Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **Modern CSS** - Responsive styling

## 🧪 Testing the Application

1. **Browse Products**: View the product catalog on the home page
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the "Cart" button in the header
4. **Update Quantities**: Use +/- buttons to adjust quantities
5. **Remove Items**: Click the × button to remove items
6. **Checkout**: Click "Proceed to Checkout"
7. **Place Order**: Fill in customer information and submit
8. **Restart Backend**: Stop and restart the backend server
9. **Verify Persistence**: Refresh the browser - cart should persist

## 🛡️ Error Handling

- MongoDB connection failures are caught and logged with helpful messages
- All API errors return proper HTTP status codes
- Frontend displays user-friendly error messages
- Input validation on both frontend and backend
- Graceful degradation when backend is unavailable

## 📝 Development Notes

- **Session Management**: Uses localStorage for session persistence
- **Cart Persistence**: All cart data stored in MongoDB (survives restarts)
- **Product Seeding**: Sample products auto-seed on first startup
- **Stock Validation**: Prevents adding more items than available stock
- **Stateless API**: Backend is fully stateless, all state in database

## 🚦 Troubleshooting

### "MongoDB connection failed"
- Ensure MongoDB is installed and running
- Check if MongoDB service is active: `Get-Service -Name MongoDB` (Windows)
- Verify connection URI in `backend/.env`

### "Failed to load products"
- Ensure backend server is running on port 5000
- Check backend terminal for error messages
- Verify `frontend/.env` has correct API URL

### Port already in use
- Change port in `backend/.env` (PORT=5001)
- Update `backend/.env` (CORS_ORIGIN=http://localhost:5173)
- Update `frontend/.env` (VITE_API_BASE_URL=http://localhost:5001/api)

## 📄 License

MIT

## 👨‍💻 Author

Built as a demonstration of clean, production-quality full-stack development.
