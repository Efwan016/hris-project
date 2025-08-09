import React, { useEffect, useState } from "react";
import "../css/payroll.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Payroll = () => {
    const [payrolls, setPayrolls] = useState([]);
    const [filterMonth, setFilterMonth] = useState("");
    const [searchName, setSearchName] = useState("");

    const currentMonth = new Date().toISOString().slice(0, 7);

    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        let storedPayrolls = JSON.parse(localStorage.getItem("payrolls")) || [];

        // Auto-generate payrolls for current month if not exists
        const existingIds = storedPayrolls.map(p => `${p.name}-${p.month}`);
        const newPayrolls = storedEmployees.map(emp => {
            const key = `${emp.name}-${currentMonth}`;
            if (!existingIds.includes(key)) {
                return {
                    id: Date.now() + Math.random(),
                    name: emp.name,
                    month: currentMonth,
                    salary: emp.salary || 0,
                    status: "Unpaid"
                };
            }
            return null;
        }).filter(Boolean);

        const updatedPayrolls = [...storedPayrolls, ...newPayrolls];
        setPayrolls(updatedPayrolls);
        localStorage.setItem("payrolls", JSON.stringify(updatedPayrolls));
    }, [currentMonth]);

    const saveToStorage = (data) => {
        setPayrolls(data);
        localStorage.setItem("payrolls", JSON.stringify(data));
    };

    const handleEditStatus = (id, status) => {
        const updated = payrolls.map((p) =>
            p.id === id ? { ...p, status } : p
        );
        saveToStorage(updated);
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this payroll?")) {
            const updated = payrolls.filter((p) => p.id !== id);
            saveToStorage(updated);
        }
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text("Payroll Report", 14, 16);
        const tableColumn = ["Name", "Month", "Salary", "Status"];
        const tableRows = payrolls.map((p) => [p.name, p.month, p.salary, p.status]);
        doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
        doc.save("payroll_report.pdf");
    };

    const exportSlipPDF = (employee) => {
        const doc = new jsPDF();
        doc.text("Salary Slip", 14, 16);
        doc.autoTable({
            head: [["Field", "Detail"]],
            body: [
                ["Name", employee.name],
                ["Month", employee.month],
                ["Salary", `Rp ${Number(employee.salary).toLocaleString()}`],
                ["Status", employee.status],
            ],
        });
        doc.save(`salary_slip_${employee.name}.pdf`);
    };

    const filtered = payrolls.filter(
        (p) =>
            (!filterMonth || p.month === filterMonth) &&
            (!searchName || p.name.toLowerCase().includes(searchName.toLowerCase()))
    );

    const totalSalary = filtered.reduce((sum, p) => sum + Number(p.salary), 0);

    const pieData = {
        labels: ["Paid", "Unpaid"],
        datasets: [
            {
                data: [
                    payrolls.filter((p) => p.status === "Paid").length,
                    payrolls.filter((p) => p.status === "Unpaid").length,
                ],
                backgroundColor: ["#198754", "#ffc107"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container mt-4 payroll-container">
            <h3 className="mb-4 fw-bold text-primary">💰 Payroll Management</h3>

            <div className="row mb-4">
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="pie-container">
                        <Pie data={pieData} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="payroll-summary-card shadow-sm">
                        <h6 className="text-muted">Total Payroll</h6>
                        <h4 className="text-primary">Rp {totalSalary.toLocaleString()}</h4>
                    </div>
                </div>
            </div>

            <div className="mb-3 d-flex justify-content-between">
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search name..."
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                    <select className="form-select" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
                        <option value="">All Months</option>
                        {[...new Set(payrolls.map((p) => p.month))].map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                </div>
                <div className="d-flex gap-2">
                    <button className="btn btn-success" onClick={exportToPDF}>📄 Export PDF</button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Month</th>
                            <th>Salary</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((p) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.month}</td>
                                <td>Rp {Number(p.salary).toLocaleString()}</td>
                                <td>
                                    <span className={`badge bg-${p.status === "Paid" ? "success" : "warning"}`}>{p.status}</span>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        {p.status === "Unpaid" && (
                                            <button className="btn btn-sm btn-success" onClick={() => handleEditStatus(p.id, "Paid")}>✔️ Mark as Paid</button>
                                        )}
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
                                        <button className="btn btn-sm btn-info" onClick={() => exportSlipPDF(p)}>📥 Slip</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">No payroll data found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payroll;
