import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [employee, setEmployee] = useState({
    id: "",
    name: "",
    position: "",
    salary: "",
    email: "",
  });

  useEffect(() => {
    if (!isNew) {
      const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
      const found = storedEmployees.find((emp) => emp.id === id);
      if (found) setEmployee(found);
    } else {
      const newId = Date.now().toString();
      setEmployee((prev) => ({ ...prev, id: newId }));
    }
  }, [id, isNew]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!employee.name || !employee.position || !employee.email) {
      alert("Please fill in all fields.");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("employees")) || [];

    let updated;
    if (isNew) {
      updated = [...stored, employee];
    } else {
      updated = stored.map((emp) => (emp.id === id ? employee : emp));
    }

    localStorage.setItem("employees", JSON.stringify(updated));
    alert(isNew ? "Employee added!" : "Employee updated!");
    navigate("/employees");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    const stored = JSON.parse(localStorage.getItem("employees")) || [];
    const updated = stored.filter((emp) => emp.id !== id);
    localStorage.setItem("employees", JSON.stringify(updated));
    alert("Employee deleted!");
    navigate("/employees");
  };

  return (
    <div className="employee-form-container">
      <h2>{isNew ? "Add New Employee" : "Edit Employee"}</h2>

      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={employee.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Position</label>
        <input
          type="text"
          name="position"
          className="form-control"
          value={employee.position}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Salary</label>
        <input
          type="number"
          name="salary"
          className="form-control"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={employee.email}
          onChange={handleChange}
        />
      </div>

      <div className="d-flex gap-3">
        <button className="btn btn-primary" onClick={handleSave}>
          💾 {isNew ? "Add" : "Save"}
        </button>

        {!isNew && (
          <button className="btn btn-danger" onClick={handleDelete}>
            🗑️ Delete
          </button>
        )}

        <button className="btn btn-secondary" onClick={() => navigate("/employees")}>
          ↩️ Back
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetail;
