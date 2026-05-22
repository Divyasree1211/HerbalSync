import { useState } from "react";
import { useAuth } from "../../context/useAuth";

function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    hairType: user?.hairType || "Dry",
    skinType: user?.skinType || "Normal",
    nutritionGoal: user?.nutritionGoal || "Balanced wellness",
  });
  const [saved, setSaved] = useState(false);

  const update = (field, value) => {
    setSaved(false);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ ...user, ...form });
    setSaved(true);
  };

  return (
    <>
      <section className="page-heading">
        <span className="eyebrow">Profile</span>
        <h1>Manage your wellness profile.</h1>
      </section>
      <form className="panel form grid-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={form.name} onChange={(event) => update("name", event.target.value)} />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
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
        <label className="span-2">
          Nutrition Goal
          <select value={form.nutritionGoal} onChange={(event) => update("nutritionGoal", event.target.value)}>
            <option>Balanced wellness</option>
            <option>High protein</option>
            <option>Weight balance</option>
            <option>Hydration focus</option>
            <option>Energy support</option>
          </select>
        </label>
        <button className="btn primary" type="submit">
          Save profile
        </button>
        {saved && <p className="success-message">Profile saved locally.</p>}
      </form>
    </>
  );
}

export default Profile;
