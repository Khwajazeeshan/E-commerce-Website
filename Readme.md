
---

# **🛍️ MERN Stack E-Commerce Website 🛍️**

This is a full-featured **E-Commerce Web Application** built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**. The platform enables users to create their accounts, manage their own stores, upload products, and perform complete shopping functionalities including cart management, order placement, and order tracking.

---

## **Table of Contents**

- [**Features**](#features)
- [**Tech Stack**](#tech-stack)
- [**Installation**](#installation)
- [**Usage**](#usage)
- [**Project Structure**](#project-structure)
- [**Authentication**](#authentication)
- [**Contributing**](#contributing)

---

## **Features**

### **🔐 User Account and Store Management**
- User registration and login system.
- Each user can create their **own store**.
- Upload and manage multiple products under their store.
- Edit or delete their account, store, or products anytime.

### **🛒 Product Browsing and Shopping**
- Browse all available products with **detailed product pages**.
- Add products to the **shopping cart**.
- Update quantities or remove items from the cart.
- Place orders and track the status of each order.

### **📦 Order Management**
- Users can view all their orders and see real-time tracking/status updates.
- Admin-level features can be added to manage all user orders (optional).

### **ℹ️ Informational Pages**
- **About Us** page for company details.
- **Contact Us** page for customer queries or support.

---

## **Tech Stack**

### **Frontend**
- **React.js** – For building a responsive and dynamic user interface
- **CSS** – For styling and layout

### **Backend**
- **Node.js + Express.js** – RESTful API development and server-side logic

### **Database**
- **MongoDB** – For storing user info, store data, product details, and order history

### **Authentication**
- **JWT (JSON Web Tokens)** – For secure login and access control

---

## **Installation**

To run the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Khwajazeeshan/E-commerce-Website--MERN-STACK
   cd E-commerce-Website--MERN-STACK
   ```

2. **Install Dependencies**

   - Backend:
     ```bash
     cd backend
     npm install
     ```

   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Run the App**
   ```bash
   # Run backend
   cd backend
   npx nodemon index.js


   # Run frontend in another terminal
   cd frontend
   npm run dev
   ```

---

## **Usage**

- **Create Account/Login:** Access all features after signing up or logging in.
- **Create Store:** Once logged in, users can create their store and manage it.
- **Upload Products:** Easily add product title, description, image, and price.
- **Shopping Experience:** Add to cart, place order, and track your purchases.
- **Explore More:** Visit the About Us and Contact Us pages for more info.

---

## **Project Structure**

```
mern-ecommerce/
│
├── backend/           # Express backend API
│   ├── models/        # Mongoose schemas for User, Product, Order, etc.
│   ├── routes/        # All API routes
│   |── middleware/    # JWT auth, error handling
│   ├── uploads/       # Product Images
│
├── frontend/          # React frontend
│   ├── components/    # Reusable UI components
│   ├── Assets/        # SVg for Website
│   └── Styles/        # Style and Layouts
```

---

## **Authentication**

- All user-protected routes are secured using **JWT tokens**.
- Tokens are stored securely and verified on each request.
- Only authorized users can access their store, products, and orders.

---

## **Contributing**

We welcome contributions to enhance the features and performance of this app.

- Fork the repository
- Create a new branch
- Make changes and submit a pull request

Feel free to submit issues or pull requests for new features or bug fixes. Contributions to enhance functionality or improve performance are always welcome.
---
