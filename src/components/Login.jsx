import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        username,
        password,
      });

      const { token, role, name, email, username: uname } = res.data;

      // ✅ Save token and user info to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("username", uname); // logged-in username

      console.log("Login success:", res.data);
      alert(`Welcome ${name}!`);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid username or password");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderTop: "5px solid #0d6efd",
          borderRadius: "10px",
        }}
      >
        <h3 className="text-center mb-4 text-primary">Welcome Back</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-semibold">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Log In
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          <span className="text-muted">Don't have an account? </span>
          <Link to="/signup" className="text-decoration-none text-primary fw-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
