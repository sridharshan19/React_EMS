import { useEffect, useState } from "react";
import axios from "axios";

const GetEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); 

  const isAdmin = role === "ADMIN" || role === "ROLE_ADMIN";

  useEffect(() => {
    if (!token) {
      setError("Unauthorized: No token found");
      setLoading(false);
      return;
    }

    axios.get("http://localhost:3001/employee", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setEmployees(res.data))
      .catch(err => {
        console.error("Fetch error", err);
        setError("Failed to fetch employees");
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleDelete = async (empId) => {
    try {
      await axios.delete(`http://localhost:3001/employee/${empId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.filter(emp => emp.empId !== empId));
      alert("Employee deleted successfully");
    } catch (err) {
      console.error("Error deleting employee", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Employee List</h2>
      
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                {isAdmin && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.empId}>
                  <td>{emp.empId}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  {isAdmin && (
                    <td>
                      <button
                        onClick={() => handleDelete(emp.empId)}
                        className="btn btn-danger btn-sm me-2"
                      >
                        Delete
                      </button>
                      <button className="btn btn-primary btn-sm">
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GetEmployees;
