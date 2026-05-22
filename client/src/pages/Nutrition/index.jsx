import { useEffect, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import DashboardCard from "../../components/DashboardCard";
import { createNutritionLog, getNutritionHistory } from "../../services/nutritionService";
import { dailyGoals, formatDate, getDailyTotals, getGoalPercent, getLastSevenDayTotals } from "../../utils/helpers";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const initialForm = { calories: "", protein: "", waterIntake: "" };

function ProgressMeter({ label, value, goal, unit }) {
  const percent = getGoalPercent(value, goal);

  return (
    <div className="progress-meter">
      <div>
        <strong>{label}</strong>
        <span>
          {value}
          {unit} / {goal}
          {unit}
        </span>
      </div>
      <div className="progress-track" aria-label={`${label} progress`}>
        <span style={{ width: `${percent}%` }} />
      </div>
      <small>{percent}% complete</small>
    </div>
  );
}

function Nutrition() {
  const [form, setForm] = useState(initialForm);
  const [logs, setLogs] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getNutritionHistory().then(setLogs);
  }, []);

  const totals = logs.reduce(
    (sum, log) => ({
      calories: sum.calories + Number(log.calories || 0),
      protein: sum.protein + Number(log.protein || 0),
      water: sum.water + Number(log.waterIntake || 0),
    }),
    { calories: 0, protein: 0, water: 0 }
  );
  const todayTotals = getDailyTotals(logs);
  const weeklyTotals = getLastSevenDayTotals(logs);
  const chartData = {
    labels: weeklyTotals.map((day) => day.label),
    datasets: [
      {
        label: "Protein (g)",
        data: weeklyTotals.map((day) => day.protein),
        backgroundColor: "#d7a84f",
        borderRadius: 6,
      },
      {
        label: "Water (L)",
        data: weeklyTotals.map((day) => day.water),
        backgroundColor: "#507861",
        borderRadius: 6,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 12, color: "#20332c" },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { color: "#edf0ea" } },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    const saved = await createNutritionLog(form);
    setLogs((current) => [saved, ...current]);
    setForm(initialForm);
    setSaving(false);
  };

  return (
    <>
      <section className="page-heading">
        <span className="eyebrow">Nutrition Tracker</span>
        <h1>Log calories, protein, and water intake.</h1>
      </section>
      <section className="stats-grid">
        <DashboardCard title="Today Calories" value={todayTotals.calories} detail={`${dailyGoals.calories} daily goal`} />
        <DashboardCard title="Today Protein" value={`${todayTotals.protein}g`} detail={`${dailyGoals.protein}g daily goal`} tone="gold" />
        <DashboardCard title="Today Water" value={`${todayTotals.water}L`} detail={`${dailyGoals.water}L daily goal`} tone="mint" />
        <DashboardCard title="All Logs" value={logs.length} detail={`${totals.calories} calories tracked`} tone="rose" />
      </section>
      <section className="content-grid">
        <form className="panel form" onSubmit={handleSubmit}>
          <h2>Add today's log</h2>
          <label>
            Calories
            <input
              type="number"
              min="0"
              value={form.calories}
              onChange={(event) => setForm({ ...form, calories: event.target.value })}
              required
            />
          </label>
          <label>
            Protein grams
            <input
              type="number"
              min="0"
              value={form.protein}
              onChange={(event) => setForm({ ...form, protein: event.target.value })}
              required
            />
          </label>
          <label>
            Water litres
            <input
              type="number"
              step="0.1"
              min="0"
              value={form.waterIntake}
              onChange={(event) => setForm({ ...form, waterIntake: event.target.value })}
              required
            />
          </label>
          <button className="btn primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save log"}
          </button>
        </form>
        <section className="panel">
          <div className="section-title">
            <h2>Today's Progress</h2>
            <span>{logs.length} logs</span>
          </div>
          <div className="progress-stack">
            <ProgressMeter label="Calories" value={todayTotals.calories} goal={dailyGoals.calories} unit="" />
            <ProgressMeter label="Protein" value={todayTotals.protein} goal={dailyGoals.protein} unit="g" />
            <ProgressMeter label="Water" value={todayTotals.water} goal={dailyGoals.water} unit="L" />
          </div>
        </section>
      </section>
      <section className="content-grid">
        <section className="panel">
          <div className="section-title">
            <h2>Protein and Water Trend</h2>
            <span>7 days</span>
          </div>
          <div className="chart-box">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </section>
        <section className="panel">
          <div className="section-title">
            <h2>History</h2>
            <span>{logs.length} entries</span>
          </div>
          <div className="history-list">
            {logs.map((log) => (
              <article key={log._id || log.date}>
                <strong>{formatDate(log.date || new Date())}</strong>
                <span>{log.calories} cal</span>
                <span>{log.protein}g protein</span>
                <span>{log.waterIntake}L water</span>
              </article>
            ))}
            {!logs.length && <p className="empty-state">No nutrition logs yet.</p>}
          </div>
        </section>
      </section>
    </>
  );
}

export default Nutrition;
