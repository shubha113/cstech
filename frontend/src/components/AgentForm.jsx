import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAgent, clearError, clearMessage } from "../redux/agentSlice";
import "../styles/Agent.css";

const AgentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.agent);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAgent(formData));
  };

  useEffect(() => {
    if (message) {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
      });
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [message, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 3000);
    }
  }, [error, dispatch]);

  return (
    <div className="dashboard-card">
      <h2 className="card-title">Add New Agent</h2>

      {error && <div className="alert alert-error">{error}</div>}

      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="agent-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g., +1234567890"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
              minLength="6"
            />
          </div>

          <div className="form-group full-width">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating Agent..." : "Create Agent"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgentForm;
