# CRM Portal (React + Redux)

A **Customer Relationship Management (CRM)** portal built with **React, Redux, Material UI**, and **localStorage persistence**.  
Supports **Admin & User roles**, secure authentication, and CRUD operations for customer management.

---

## 🚀 Features

✅ **User Authentication**
- Signup (only Users by default)
- Login with role-based access
- Fixed **Admin credentials**:  
  - **Email:** `itzzswatii@gmail.com`  
  - **Password:** `12345678##@@`
- Only Admins can manage customers  

✅ **Role-Based Dashboard**
- **Admin** → Add, Edit, Delete customers  
- **User** → Read-only access  

✅ **Customer Management**
- Search & filter customers  
- Edit existing customer data  
- Delete customers  
- Data persists in **localStorage**

✅ **Protected Routes**
- Login required to access the dashboard  
- Unauthorized users redirected to login  

✅ **Branches**
- `dev` → Active development  
- `prod` → Stable, production-ready code  

✅ **Future Enhancements**
- API backend integration  
- Database persistence  
- Toast notifications  
- Deployment with CI/CD  

---

## 🛠️ Tech Stack

- **React 18**
- **Redux Toolkit / Redux**
- **React Router v6**
- **Material UI (MUI)**  
- **localStorage persistence**

---

## 📂 Project Structure

crm-portal/
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Login & Signup pages
│ ├── redux/ # State management
│ ├── App.js # Main routes & Dashboard
│ └── index.js # Entry point
├── public/
├── package.json
└── README.md
---

## 🔑 Admin Login

- **Email:** `itzzswatii@gmail.com`  
- **Password:** `12345678##@@`  

Only Admin can **add/edit/delete** customers.  
Users who sign up themselves are **read-only** by default.

---

## 🏃‍♀️ Quick Start

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Swatii18/crm-portal.git
cd crm-portal

 Install dependencies
npm install

Run locally
npm start

## 🛡️ Branching Workflow

We use **2 main branches**:

- **dev** → Active development branch  
- **prod** → Stable branch for deployment  

 **How we work:**  
- New features/fixes → push to `dev`  
- When stable → merge `dev` → `prod` → deploy

## 📝 License

MIT License © 2025 Swatii18
