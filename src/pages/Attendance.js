import React, { useState, useEffect } from "react";
import AttendanceChart from "../components/AttendanceChart";

const Attendance = () => {
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);

    const today = new Date().toISOString().split("T")[0];

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("attendanceData")) || [];
        const todayData = data.find(d => d.date === today);
        if (todayData) {
            setCheckInTime(todayData.checkIn || null);
            setCheckOutTime(todayData.checkOut || null);
        }
    }, [today]);

    const handleCheckIn = () => {
        const now = new Date().toTimeString().split(" ")[0]; // "HH:MM:SS"
        const data = JSON.parse(localStorage.getItem("attendanceData")) || [];
        const updatedData = [...data.filter(d => d.date !== today), { date: today, checkIn: now, checkOut: "" }];
        localStorage.setItem("attendanceData", JSON.stringify(updatedData));
        setCheckInTime(now);
    };

    const handleCheckOut = () => {
        const now = new Date().toTimeString().split(" ")[0];
        const data = JSON.parse(localStorage.getItem("attendanceData")) || [];
        const updatedData = data.map(d => {
            if (d.date === today) return { ...d, checkOut: now };
            return d;
        });
        localStorage.setItem("attendanceData", JSON.stringify(updatedData));
        setCheckOutTime(now);
    };

    return (
        <>
            <div className="attendance-card">
                <h5>Daily Attendance</h5>
                <div className="mb-3">
                    <strong>Check-In Time:</strong> {checkInTime || "-"}
                </div>
                <div className="mb-3">
                    <strong>Check-Out Time:</strong> {checkOutTime || "-"}
                </div>

                <div className="d-flex gap-3">
                    <button className="btn btn-success" onClick={handleCheckIn} disabled={!!checkInTime}>
                        ✅ Check-In
                    </button>
                    <button className="btn btn-danger" onClick={handleCheckOut} disabled={!checkInTime || !!checkOutTime}>
                        ⛔ Check-Out
                    </button>
                </div>
            </div>

            <div className="page-content">
                <AttendanceChart />
            </div>
        </>
    );
};

export default Attendance;
