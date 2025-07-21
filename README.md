CRM Portal (React + Redux)
A simple CRM (Customer Relationship Management) portal built using React, Redux, and Material UI.
It allows Admins to manage customers (Add/Edit/Delete) and Users to view customers in read-only mode.

✨ Features
✅ User Authentication (Signup/Login)
✅ Role-based Access Control
✅ Admin → Can Add, Edit, Delete Customers
✅ User → Read-only access
✅ Customer Search & Filter
✅ Persistent Data with localStorage
✅ Protected Dashboard (only logged-in users can access)
✅ Responsive Material UI Design

🛠️ Tech Stack
React.js → Frontend library

Redux → State management

Material UI (MUI) → UI components

React Router v6 → Routing

Redux Thunk → Async state handling

localStorage → Data persistence

📂 Project Structure
csharp
Copy
Edit
crm-portal/
│── src/
│   ├── components/         # Reusable UI components
│   │   ├── CustomerForm.js
│   │   └── CustomerList.js
│   │
│   ├── pages/              # Auth Pages
│   │   ├── LoginPage.js
│   │   └── SignUpPage.js
│   │
│   ├── redux/              # Redux State Management
│   │   ├── actions/
│   │   ├── reducers/
│   │   └── store.js
│   │
│   ├── utils/              # Helpers (auth, localStorage, etc.)
│   ├── App.js              # Main App Component
│   └── index.js            # Entry point
│
├── public/                 # Static files
├── package.json
└── README.md
🔑 Admin Login
Default Admin account (only this account has full control):

Email: itzzswatii@gmail.com

Password: 12345678##@@

✅ Admin can: Add, Edit, Delete Customers
✅ Users signing up themselves → read-only by default

🏃‍♀️ Quick Start
1️⃣ Clone the repo
bash
Copy
Edit
git clone https://github.com/Swatii18/crm-portal.git
cd crm-portal
2️⃣ Install dependencies
bash
Copy
Edit
npm install
3️⃣ Run locally
bash
Copy
Edit
npm start
Now visit http://localhost:3000

🛡️ Branching Workflow
We use 2 main branches:

dev → Active development branch

prod → Stable branch for deployment

✅ How we work:

New features/fixes → push to dev

When stable → merge dev → prod → deploy

🚀 Deployment
We recommend Netlify or Vercel for hosting.

✅ Deploy to Netlify
Go to Netlify Dashboard

Click New site → Import from GitHub

Select your repo crm-portal

Choose prod branch

Build command: npm run build

Publish directory: build/

Click Deploy

✅ In 1-2 minutes your CRM will be live!

🤝 Contributing
Always create new branches from dev

Test your changes

Merge into prod only after approval

📝 License
MIT License © 2025 Swatii18
