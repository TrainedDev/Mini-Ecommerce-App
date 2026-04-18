# 🛒 Mini E-commerce App

A full-stack mini e-commerce application that demonstrates core online shopping features like product browsing, cart management, and user authentication. Built with modern web technologies, focusing on clean architecture and user experience.

---

## 🚀 Features

* 🔐 User Authentication (Login / Signup)
* 🛍️ Product Listing & Details
* 🛒 Add to Cart & Cart Management
* 🔍 Search & Filtering (if implemented)
* 📱 Responsive UI for all devices
* ⚡ Fast and interactive frontend

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios (API calls)

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* PostgreSQL (Sequelize ORM)

---

## 📂 Project Structure

```
Mini-Ecommerce-App/
│
├── server/        # Backend (APIs, models, routes)
├── client/        # Frontend (React app)
├── .env           # Environment variables
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/TrainedDev/Mini-Ecommerce-App.git
cd Mini-Ecommerce-App
```

### 2. Install dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the server folder:

```
PORT=5000
DB_URL=your_database_url
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

---

### 4. Run the project

#### Start backend

```bash
cd server
npm run dev
```

#### Start frontend

```bash
cd client
npm run dev
```

---

## 🌐 Live Demo

* **Frontend:** https://mini-ecommerce-app-rina.vercel.app
* **Backend:** https://mini-ecommerce-app-6eq4.onrender.com/
- Backend might take time cause i am in free tier

---

## ⚖️ Trade-offs & Decisions

* Simplified payment flow (no external gateway like Razorpay)
* Used localStorage for token storage (instead of HTTP-only cookies)
* No caching layer (Redis) to keep architecture simple
* Focused on core features over advanced optimizations

---

## ⏭️ Future Improvements

* 💳 Payment integration (Razorpay / Stripe)
* 🧪 Testing (Jest / Supertest)
* ⚡ Performance optimization with caching
* 🎨 Enhanced UI/UX design
* ⭐ Product reviews & ratings

---

## ❌ Skipped (Out of Scope)

* Automated testing setup
* Advanced validation (express-validator)
* Rate limiting & API security enhancements

---

## 🤖 AI Usage Report

### Tools Used

* **Claude** — Code generation
* **ChatGPT** — Prompt refinement & architecture guidance

### Sample Prompt Used

```
Build a Mini E-commerce App using Node.js, Express, PostgreSQL (Sequelize), React (Vite), and Tailwind CSS with authentication, cart system, and clean architecture.
```

### Improvements Made

* Fixed UI visibility issues
* Improved environment-based configurations
* Adjusted backend structure for better scalability

---

## 📌 Conclusion

This project demonstrates a solid understanding of full-stack development, REST APIs, authentication, and frontend design. It serves as a foundation for building scalable e-commerce applications.

---
