# HerbalSync
HerbalSync is a full-stack MERN web application focused on natural wellness, herbal care, and nutrition products. The platform allows users to securely register, log in, explore herbal products, and manage their personalized wellness experience.
<br>
<br>

Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), HerbalSync demonstrates real-world full stack development concepts including authentication, protected routes, REST APIs, frontend-backend integration, and MongoDB database management.
<br>
<br>
User Registration & Login
WT Authentication & Authorization
Protected Routes
MongoDB Atlas Integration
Product Management System
REST API Architecture
React Frontend with React Router
Axios API Integration
Responsive MERN Stack Structure
Secure Password Hashing using bcrypt
<br>
<br>
**Tech Stack**
Frontend
React.js
React Router DOM
Axios
HTML5
CSS3
JavaScript (ES6)
<br>
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
JWT Authentication
bcryptjs
<br>
Authentication Flow
Register → Login → JWT Token → Protected Dashboard
<br>
Users can:
<br>
create accounts
securely log in
access protected pages
maintain authenticated sessions using JWT tokens
<br>
HerbalSync/
│
├── client/                # React Frontend
│
├── server/                # Node + Express Backend
│
├── README.md
└── .gitignore

FRONTEND STRUCTURE (React)
<br>
<br>
client/
│
├── public/
│
├── src/
│   │
│   ├── assets/                # Images, icons
│   │
│   ├── components/            # Reusable components
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   ├── ProductCard/
│   │   ├── DashboardCard/
│   │   ├── Loader/
│   │   └── ProtectedRoute/
│   │
│   ├── pages/                 # Main pages
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── Dashboard/
│   │   ├── Products/
│   │   ├── ProductDetails/
│   │   ├── Nutrition/
│   │   ├── Favorites/
│   │   ├── Profile/
│   │   └── NotFound/
│   │
│   ├── services/              # Axios API calls
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── nutritionService.js
│   │
│   ├── context/               # Global state
│   │   └── AuthContext.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/
│   │   ├── api.js
│   │   └── helpers.js
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js

<br>
<br>





BACKEND STRUCTURE (Node + Express)

<br>

server/
│
├── config/
│   └── db.js                 # MongoDB connection
│
├── controllers/              # Business logic
│   ├── authController.js
│   ├── productController.js
│   ├── nutritionController.js
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/                   # MongoDB schemas
│   ├── User.js
│   ├── Product.js
│   ├── NutritionLog.js
│   └── Favorite.js
│
├── routes/                   # API routes
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── nutritionRoutes.js
│   └── userRoutes.js
│
├── utils/
│   └── generateToken.js
│
├── .env
├── server.js
├── package.json
└── nodemon.json
<br>
**Future Improvements**
Product search & filtering
Favorites/Wishlist system
Nutrition tracker
AI-based herbal recommendations
Admin dashboard
Product reviews & ratings
Payment gateway integration
