# 💼 Web HRIS - Human Resources Information System

A modern Human Resources Information System (HRIS) built with **React.js**, designed to manage employee attendance, profiles, and essential HR functions in a user-friendly interface.

## 🚀 Features

- 🔐 **Authentication**: Login & Register with `localStorage`
- 🏠 **Dashboard**: Quick overview of employees, attendance, and leave requests
- 🧑‍💼 **Employee Profile**: View and edit user profile with modal form
- 🕒 **Attendance Tracking**:
  - Check-In / Check-Out
  - Local data storage for daily logs
  - Weekly attendance chart with working hours
- 📊 **Attendance Chart**: Visualize weekly working hours using `Chart.js`
- 🧭 **Sidebar Navigation**: Easy-to-use sidebar with page links
- 🌐 **Responsive UI**: Clean and responsive interface styled with CSS & Bootstrap
- 🔒 **Protected Routes** using `PrivateRoute`

## 🛠 Tech Stack

- **Frontend**: React.js
- **Routing**: React Router DOM
- **Charting**: Chart.js (`react-chartjs-2`)
- **Styling**: CSS3, Bootstrap
- **State Management**: useState, useEffect
- **Persistence**: localStorage

## 📁 Folder Structure
src/
├── components/
│ ├── Header.js
│ ├── Sidebar.js
│ ├── AttendanceChart.js
│ └── PrivateRoute.js
├── pages/
│ ├── Login.js
│ ├── Register.js
│ ├── Dashboard.js
│ ├── Profile.js
│ └── Attendance.js
├── css/
│ └── layout.css
├── App.js
└── index.js

bash
Copy
Edit

## 📸 Screenshots

> Tambahkan nanti:
- Dashboard view
- Attendance form + chart
- Profile modal update

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
📫 LinkedIn : https://www.linkedin.com/in/efwan-rizaldi-7a9801265/


