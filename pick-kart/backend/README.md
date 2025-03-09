# **Pick-Kart Backend API** 🎯🚀

## 📌 **About Pick-Kart**

Pick-Kart is a **feature-rich e-commerce application** that allows users to browse, purchase, and manage products seamlessly. The backend service is built using **Node.js** with **Express.js** to handle RESTful APIs, ensuring scalability, maintainability, and efficiency.

This backend service powers the **Pick-Kart** platform by providing APIs for:

- **User Management** (Registration, Authentication, Profile Management)
- **Product Management** (CRUD Operations)
- **Order Processing**
- **Wishlist & Cart Management**
- **Admin & Seller Privileges**
- **JWT-based Authentication & Authorization**

## 🛠 **Tech Stack**

| Technology               | Usage                                                  |
| ------------------------ | ------------------------------------------------------ |
| **Node.js**              | Backend runtime                                        |
| **Express.js**           | Web framework for handling API requests                |
| **MongoDB (Mongoose)**   | NoSQL Database for storing users, products, and orders |
| **JWT (JSON Web Token)** | Secure authentication & authorization                  |
| **Swagger (OpenAPI)**    | API documentation                                      |
| **Prettier**             | Code formatting                                        |
| **ESLint**               | Code linting                                           |
| **Bcrypt.js**            | Password hashing                                       |
| **Vercel**               | Production deployment                                  |

---

## ⚙ **Project Functionalities**

🔹 **User Features**

- User authentication (Login, Register)
- Profile update, Wishlist & Cart Management
- Order placement & tracking

🔹 **Admin Features**

- Manage users, sellers, and product listings
- Update order statuses

🔹 **Seller Features**

- Manage their products
- Track orders from customers

🔹 **Security Features**

- **JWT-based authentication** for secured API access
- **Role-based access control (RBAC)** for Users, Sellers, and Admins
- **Encrypted passwords** using bcrypt.js

🔹 **Best Engineering Practices**
✅ **Modular Code Structure** → Organized into controllers, models, routes, and middlewares  
✅ **Environment Variables** → `.env` file for sensitive configurations  
✅ **Error Handling Middleware** → Centralized error management  
✅ **Code Formatting (Prettier)** → Ensuring consistent code styling  
✅ **Code Linting (ESLint)** → Enforcing best coding standards  
✅ **Swagger API Documentation** → Standardized and auto-generated API documentation

---

## 🔥 **Live Server**

The **production API** is deployed on **Vercel**:  
🔗 [Live Server URL](https://pick-kart-api.vercel.app/api)

To test the API, visit the **Swagger Documentation**:  
📑 [Swagger Docs](https://pick-kart-api.vercel.app/api/docs)

---

## 🏗 **Project Setup**

### **Step 1: Clone the repository**

```bash
git clone https://github.com/Zakir-Ansari/projects.git
cd pick-kart/backend
```

### **Step 2: Install dependencies**

```bash
npm install
```

### **Step 3: Configure Environment Variables**

Create a `.env` file in the root directory and add:

```
PORT=5000
MONGO_DB_URL=your-mongodb-connection-string
JWT_SECRET=your-secret-key
ENV=DEV
SALT_ROUND=your-salt-number
FRONTEND_URL=http://localhost:4200
```

### **Step 4: Start the Development Server**

```bash
npm run dev
```

The API will be available at `http://localhost:5000/api`

---

## 🛠 **Code Formatting with Prettier**

Prettier ensures a **consistent code style** across the project.

### **Using Prettier**

To manually format files:

```bash
npx prettier --write .
```

To format on every commit, **configure Prettier in VS Code**:

1. Open `settings.json`
2. Add:

```json
"editor.formatOnSave": true,
"prettier.singleQuote": true
```

---

## 🔎 **Code Linting with ESLint**

ESLint helps maintain **code quality and best practices**.

### **Using ESLint**

To check for linting issues:

```bash
npx eslint .
```

To fix auto-fixable issues:

```bash
npx eslint . --fix
```

---

## 📜 **API Documentation (Swagger)**

Pick-Kart follows **OpenAPI standards** for API documentation.

### **Access API Docs**

Run the server and open:
🔗 `http://localhost:5000/api/docs`

### **Updating Swagger Docs**

Swagger is configured inside route files with:

```javascript
/**
 * @swagger
 * /user/me:
 *   get:
 *     summary: Get logged-in user's profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 */
router.get('/me', verifyToken, userController.getUserProfile);
```

---

## 👥 **Contributors & Acknowledgments**

Special thanks to the **developers and contributors** working on Pick-Kart! 🎉  
If you'd like to contribute, please fork the repo and create a PR.

---

## 📧 **Contact & Support**

📩 **Email:** azakir780@gmail.com
