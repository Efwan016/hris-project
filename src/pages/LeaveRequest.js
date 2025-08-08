import React, { useState, useEffect } from "react";
import "../css/leave.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const LeaveRequest = () => {
    const [form, setForm] = useState({
        type: "",
        startDate: "",
        endDate: "",
        reason: "",
    });
    const [requests, setRequests] = useState([]);
    const [filters, setFilters] = useState({
        type: "",
        status: "",
    });


    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("leaveRequests")) || [];
        setRequests(stored);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmitOrUpdate = (e) => {
        e.preventDefault();

        if (isEditing) {
            const updatedRequests = requests.map((req) =>
                req.id === editingId ? { ...req, ...form } : req
            );
            setRequests(updatedRequests);
            localStorage.setItem("leaveRequests", JSON.stringify(updatedRequests));
            setIsEditing(false);
            setEditingId(null);
        } else {
            const newRequest = {
                ...form,
                id: Date.now(),
                status: "Pending",
            };
            const updated = [...requests, newRequest];
            setRequests(updated);
            localStorage.setItem("leaveRequests", JSON.stringify(updated));
        }

        setForm({ type: "", startDate: "", endDate: "", reason: "" });
    };


    const updateStatus = (id, newStatus) => {
        const updated = requests.map((req) =>
            req.id === id ? { ...req, status: newStatus } : req
        );
        setRequests(updated);
        localStorage.setItem("leaveRequests", JSON.stringify(updated));
    };

    const pendingCount = requests.filter((req) => req.status === "Pending").length;

    const activeLeaves = requests.filter((req) => {
        const start = new Date(req.startDate);
        const end = new Date(req.endDate);
        const now = new Date();

        return req.status === "Approved" && start <= now && end >= now;
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const handleEdit = (id) => {
        const requestToEdit = requests.find((req) => req.id === id);
        if (requestToEdit) {
            setForm({
                type: requestToEdit.type,
                startDate: requestToEdit.startDate,
                endDate: requestToEdit.endDate,
                reason: requestToEdit.reason,
            });
            setIsEditing(true);
            setEditingId(id);
            window.scrollTo({ top: 0, behavior: "smooth" }); 
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this leave request?");
        if (!confirmDelete) return;

        const updated = requests.filter((req) => req.id !== id);
        setRequests(updated);
        localStorage.setItem("leaveRequests", JSON.stringify(updated));
    };

    const exportToCSV = () => {
        const headers = ["Type", "Start Date", "End Date", "Reason", "Status"];
        const rows = requests.map(req => [req.type, req.startDate, req.endDate, req.reason, req.status]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "leave_requests.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.text("Leave Requests", 14, 16);

        const tableColumn = ["Type", "Start Date", "End Date", "Reason", "Status"];
        const tableRows = requests.map(req => [
            req.type,
            req.startDate,
            req.endDate,
            req.reason,
            req.status,
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            styles: { fontSize: 10 },
        });

        doc.save("leave_requests.pdf");
    };






    return (
        <div className="container mt-4 leave-container">
            {pendingCount > 0 && (
                <div className="alert alert-warning d-flex align-items-center gap-2">
                    <span>🔔 You have {pendingCount} pending leave request(s) to review!</span>
                </div>
            )}
            <h3 className="mb-4 text-primary fw-bold">📋 Leave Request Form</h3>
            <form className="leave-form shadow-sm p-4 bg-white rounded" onSubmit={handleSubmitOrUpdate}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Leave Type</label>
                        <select
                            className="form-select"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select Leave Type --</option>
                            <option value="Sick">Sick</option>
                            <option value="Annual">Annual</option>
                            <option value="Emergency">Emergency</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">Start Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label">End Date</label>
                        <input
                            type="date"
                            className="form-control"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Reason</label>
                    <textarea
                        className="form-control"
                        name="reason"
                        value={form.reason}
                        onChange={handleChange}
                        rows="3"
                        required
                    ></textarea>
                </div>

                <button className="btn btn-primary w-100">
                    {isEditing ? "Update Request" : "Submit Request"}
                </button>

            </form>

            <hr className="my-4" />

            <h4 className="mb-3 fw-semibold">🧾 Leave History</h4>
            <h5 className="mt-4 fw-semibold text-success">🟢 Currently Active Leaves</h5>
            {activeLeaves.length === 0 ? (
                <p className="text-muted">Active leave today.</p>
            ) : (
                <ul className="list-group">
                    {activeLeaves.map((leave) => (
                        <li key={leave.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                                {leave.type} leave - <strong>{leave.startDate}</strong> to <strong>{leave.endDate}</strong>
                            </span>
                            <span className="badge bg-success">{leave.status}</span>
                        </li>
                    ))}
                </ul>
            )}

            {requests.length === 0 ? (
                <p className="text-muted">No leave requests found.</p>
            ) : (
                <div className="table-responsive">
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Filter by Leave Type</label>
                            <select
                                className="form-select"
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                            >
                                <option value="">All Types</option>
                                <option value="Sick">Sick</option>
                                <option value="Annual">Annual</option>
                                <option value="Emergency">Emergency</option>
                                <option value="Unpaid">Unpaid</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Filter by Status</label>
                            <select
                                className="form-select"
                                value={filters.status}
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            >
                                <option value="">All Statuses</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-end gap-2 mb-3">
                        <button className="btn btn-success" onClick={exportToCSV}>
                            📁 Export CSV
                        </button>
                        <button className="btn btn-danger" onClick={exportToPDF}>
                            📄 Export PDF
                        </button>
                    </div>


                    <table className="table table-striped table-hover">
                        <thead className="table-primary">
                            <tr>
                                <th>Type</th>
                                <th>Start</th>
                                <th>End</th>
                                <th>Reason</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests
                                .filter((req) => {
                                    const matchType = filters.type ? req.type === filters.type : true;
                                    const matchStatus = filters.status ? req.status === filters.status : true;
                                    return matchType && matchStatus;
                                })
                                .map((req) => (
                                    <tr key={req.id}>
                                        <td>{req.type}</td>
                                        <td>{req.startDate}</td>
                                        <td>{req.endDate}</td>
                                        <td>{req.reason}</td>
                                        <td>
                                            {req.status === "Pending" ? (
                                                <div className="d-flex gap-2 flex-wrap">
                                                    <button
                                                        className="btn btn-sm btn-success"
                                                        onClick={() => updateStatus(req.id, "Approved")}
                                                    >
                                                        ✅ Approve
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => updateStatus(req.id, "Rejected")}
                                                    >
                                                        ❌ Reject
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-warning"
                                                        onClick={() => handleEdit(req.id)}
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDelete(req.id)}
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className={`badge bg-${req.status === "Approved" ? "success" : "danger"}`}>
                                                    {req.status}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LeaveRequest;
