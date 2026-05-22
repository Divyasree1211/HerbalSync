import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const initialForm = {
  name: "",
  email: "",
  password: "",
  hairType: "Dry",
  skinType: "Normal",
  nutritionGoal: "Balanced wellness",
};

function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Unable to register. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <main className="auth-page">
      <section className="auth-panel wide">
        <div>
          <span className="eyebrow">Start your profile</span>
          <h1>Create your HerbalSync account</h1>
          <p>Set the basics so recommendations can reflect your real care goals.</p>
        </div>
        <form onSubmit={handleSubmit} className="form grid-form">
          <label>
            Name
            <input value={form.name} onChange={(event) => update("name", event.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} required />
          </label>
          <label>
            Password
            <input
              type="password"
              minLength="6"
              value={form.password}
              onChange={(event) => update("password", event.target.value)}
              required
            />
          </label>
          <label>
            Hair Type
            <select value={form.hairType} onChange={(event) => update("hairType", event.target.value)}>
              <option>Dry</option>
              <option>Oily</option>
              <option>Curly</option>
              <option>Straight</option>
              <option>Damaged</option>
            </select>
          </label>
          <label>
            Skin Type
            <select value={form.skinType} onChange={(event) => update("skinType", event.target.value)}>
              <option>Normal</option>
              <option>Dry</option>
              <option>Oily</option>
              <option>Combination</option>
              <option>Sensitive</option>
            </select>
          </label>
          <label>
            Nutrition Goal
            <select value={form.nutritionGoal} onChange={(event) => update("nutritionGoal", event.target.value)}>
              <option>Balanced wellness</option>
              <option>High protein</option>
              <option>Weight balance</option>
              <option>Hydration focus</option>
              <option>Energy support</option>
            </select>
          </label>
          {error && <p className="form-error span-2">{error}</p>}
          <button className="btn primary span-2" type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Register"}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
