import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../components/DataTable";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role") || "user";

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleDelete = (id) => {
    if (userRole !== "admin") return;
    const filtered = employees.filter(emp => emp.id !== id);
    setEmployees(filtered);
    localStorage.setItem("employees", JSON.stringify(filtered));
  };

  const handleEdit = (id) => {
    if (userRole !== "admin") return;
    navigate(`/employees/${id}`);
  };

  const handleAdd = () => {
    if (userRole !== "admin") return;
    navigate("/employees/new");
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredEmployees.sort((a, b) => {
    const salaryA = Number(a.salary || 0);
    const salaryB = Number(b.salary || 0);
    return sortAsc ? salaryA - salaryB : salaryB - salaryA;
  });

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Position", accessor: "position" },
    { header: "Salary", accessor: "salary" },
    {
      header: "Action",
      accessor: "action",
      cell: (row) =>
        userRole === "admin" ? (
          <>
            <button
              className="btn btn-info btn-sm me-2"
              onClick={() => handleEdit(row.id)}
            >
              View/Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </button>
          </>
        ) : (
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate(`/employees/${row.id}`)}
          >
            View
          </button>
        ),
    },
  ];

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

      {userRole === "admin" && (
        <button className="btn btn-primary mb-3" onClick={handleAdd}>
          ➕ Add Employee
        </button>
      )}

      <th
        style={{ cursor: "pointer" }}
        onClick={() => setSortAsc(!sortAsc)}
        title="Click to sort"
      >
        Salary {sortAsc ? "⬆️" : "⬇️"}
      </th>
      <DataTable columns={columns} data={filteredEmployees} rowsPerPage={5} />
      <div className="mt-2 fw-bold">
        💰 Total Salary: Rp{" "}
        {filteredEmployees
          .reduce((sum, emp) => sum + Number(emp.salary || 0), 0)
          .toLocaleString()}
      </div>
    </div>
  );
};

export default Employees;
