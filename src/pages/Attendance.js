import React, { useState, useEffect } from "react";
import AttendanceChart from "../components/AttendanceChart";


const Attendance = () => {
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);

    const today = new Date().toISOString().split("T")[0];


    // Simulasi ambil userId dari auth (sesuaikan dengan auth system kamu)
    const auth = JSON.parse(localStorage.getItem("auth")) || {};
    const userId = auth.id || "guest";

    useEffect(() => {
        const attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];
        const userAttendance = attendanceData.find(a => a.userId === userId);
        const todayRecord = userAttendance?.records?.find(r => r.date === today);
        if (todayRecord) {
            setCheckInTime(todayRecord.checkIn || null);
            setCheckOutTime(todayRecord.checkOut || null);
        }
    }, [today, userId]);

    const handleCheckIn = () => {
        const now = new Date().toTimeString().split(" ")[0];
        const attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];
        let userAttendance = attendanceData.find(a => a.userId === userId);

        if (!userAttendance) {
            userAttendance = { userId, records: [] };
            attendanceData.push(userAttendance);
        }

        const todayRecord = userAttendance.records.find(r => r.date === today);
        if (!todayRecord) {
            userAttendance.records.push({ date: today, checkIn: now, checkOut: null });
        } else {
            alert("You have already checked in today!");
            return;
        }

        localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
        setCheckInTime(now);
    };

    const handleCheckOut = () => {
        const now = new Date().toTimeString().split(" ")[0];
        const attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];
        const userAttendance = attendanceData.find(a => a.userId === userId);

        if (!userAttendance) {
            alert("You haven't checked in yet!");
            return;
        }

        const todayRecord = userAttendance.records.find(r => r.date === today);

        if (!todayRecord || todayRecord.checkOut) {
            alert("You haven't checked in yet or already checked out!");
            return;
        }

        todayRecord.checkOut = now;
        localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
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

            <div className="page-content mt-4">
                <AttendanceChart />
            </div>
        </>
    );

};

export default Attendance;
