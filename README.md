# 💼 Web HRIS - Human Resources Information System

A modern Human Resources Information System (HRIS) built with **React.js**, designed to manage employee attendance, profiles, leave requests, payroll, and essential HR functions in a user-friendly interface.

---

## 🚀 Features

- 🔐 **Authentication & Routing**
  - Login & Register pages
  - **Private Routes** to protect pages
  - Role-based access: Admin & User

- 🏠 **Dashboard**
  - Quick overview of employees, attendance, leave requests, and payroll
  - Responsive charts using **Chart.js**
  - Card hover effects with `useEffect`

- 🧑‍💼 **Employee Profile**
  - View and edit user info
  - Modal form for editing details

- 📝 **Leave Request**
  - Submit leave requests
  - View leave history
  - Manage statuses: Pending, Approved, Rejected
  - Only admins can approve/reject

- 🧑‍💻 **Employee Management**
  - Automatic sync of new users to employee list
  - View, edit, and delete employee data
  - Reusable data table component

- 🕒 **Attendance Tracking**
  - Daily Check-In / Check-Out
  - Weekly attendance chart using Chart.js
  - Data stored in localStorage

- 💰 **Payroll**
  - View and manage employee salary records
  - Status management: Paid / Unpaid
  - Export payslips to PDF/CSV
  - Admin-only approval for salary status

- 🧭 **Sidebar Navigation**
  - Easy-to-use sidebar with links to pages
  - Toggle sidebar & dropdown menus

- 🌐 **Responsive UI**
  - Clean interface styled with CSS & Bootstrap
  - Works across devices

- 📊 **Reusable Components**
  - Data Tables used across Employees, Attendance, and Payroll pages

---

## 🛠 Tech Stack

- **Frontend**: React.js
- **Routing**: React Router DOM
- **Charting**: Chart.js (`react-chartjs-2`)
- **Styling**: CSS3, Bootstrap
- **State Management**: useState, useEffect
- **Persistence**: localStorage

---

## 📁 Folder Structure
src/
├── components/
│ ├── Header.js
│ ├── Sidebar.js
│ ├── Footer.js
│ ├── AttendanceChart.js
│ ├── DataTable.js
│ └── PrivateRoute.js
├── pages/
│ ├── Login.js
│ ├── Register.js
│ ├── Dashboard.js
│ ├── Profile.js
│ ├── LeaveRequest.js
│ ├── Employees.js
│ ├── Attendance.js
│ └── Payroll.js
├── css/
│ └── layout.css
├── data/
│ └── dummyData.json
├── App.js
└── index.js

yaml
Copy
Edit

---

## 📸 Screenshots

> Add screenshots later:  
- Dashboard view  
- Attendance form + chart  
- Profile modal update  
- Leave request form & history  
- Employee management table  
- Payroll view & payslip export  

---

## ✅ How to Run Locally

```bash
git clone https://github.com/Efwan016/hris-project.git
cd hris-project
npm install
npm start
🌍 Demo
🔗 Deployed on Vercel: https://hris-project.vercel.app

👨‍💻 Author
Efwan Rizaldi
📫 LinkedIn: https://www.linkedin.com/in/efwan-rizaldi-7a9801265/