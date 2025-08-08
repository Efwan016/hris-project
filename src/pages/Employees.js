import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // load dari localStorage saat komponen dimount
    useEffect(() => {
        const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
        setEmployees(storedEmployees);
    }, []);

    const handleDelete = (id) => {
        const filtered = employees.filter(emp => emp.id !== id);
        setEmployees(filtered);
        localStorage.setItem("employees", JSON.stringify(filtered));
    };

    const handleEdit = (id) => {
        navigate(`/employees/${id}`);
    };

    const handleAdd = () => {
        navigate("/employees/new");
    };

    const filteredEmployees = employees.filter(
        (emp) =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="emp-container mt-4">
            <h2>Employee List</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="🔍 Search by name or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button className="btn btn-primary mb-3" onClick={handleAdd}>
                ➕ Add Employee
            </button>

            {filteredEmployees.length === 0 ? (
                <p>No employees found.</p>
            ) : (
                <table className="table table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>position</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id}>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.position}</td>
                                <td>
                                    <button className="btn btn-info btn-sm me-2" onClick={() => handleEdit(emp.id)}>
                                        View/Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Employees;