import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../../components/DashboardCard";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/useAuth";
import { getProducts } from "../../services/productService";
import { getNutritionHistory } from "../../services/nutritionService";
import { dailyGoals, formatDate, getDailyTotals, getGoalPercent, normalizeList } from "../../utils/helpers";

function Dashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const [productData, nutritionData] = await Promise.all([getProducts(), getNutritionHistory()]);
      setProducts(productData);
      setLogs(nutritionData);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  const recommended = useMemo(() => {
    const profileTerms = [user?.hairType, user?.skinType, user?.nutritionGoal].filter(Boolean).join(" ").toLowerCase();
    const matched = products.filter((product) =>
      normalizeList(product.recommendedFor).some((item) => profileTerms.includes(item.toLowerCase().split(" ")[0]))
    );
    return (matched.length ? matched : products).slice(0, 3);
  }, [products, user]);

  const totals = logs.reduce(
    (sum, log) => ({
      calories: sum.calories + Number(log.calories || 0),
      protein: sum.protein + Number(log.protein || 0),
      water: sum.water + Number(log.waterIntake || 0),
    }),
    { calories: 0, protein: 0, water: 0 }
  );
  const todayTotals = getDailyTotals(logs);
  const productCounts = products.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
    return counts;
  }, {});

  const flowSteps = [
    {
      title: "Complete Profile",
      text: `${user?.hairType || "Hair"} and ${user?.skinType || "skin"} profile active`,
      to: "/profile",
    },
    {
      title: "Explore Products",
      text: `${productCounts.Haircare || 0} haircare, ${productCounts.Skincare || 0} skincare, ${
        productCounts.Nutrition || 0
      } nutrition picks`,
      to: "/products",
    },
    {
      title: "Track Nutrition",
      text: `${getGoalPercent(todayTotals.protein, dailyGoals.protein)}% protein, ${getGoalPercent(
        todayTotals.water,
        dailyGoals.water
      )}% water today`,
      to: "/nutrition",
    },
    {
      title: "Save Favorites",
      text: "Build a routine from products you want to revisit",
      to: "/favorites",
    },
  ];

  if (loading) return <Loader label="Building dashboard" />;

  return (
    <>
      <section className="page-heading">
        <span className="eyebrow">Dashboard</span>
        <h1>Hi {user?.name || "there"}, your wellness snapshot is ready.</h1>
      </section>
      <section className="stats-grid">
        <DashboardCard title="Hair Type" value={user?.hairType || "Not set"} detail="Used for herbal haircare picks" />
        <DashboardCard title="Skin Type" value={user?.skinType || "Not set"} detail="Guides skincare suggestions" tone="mint" />
        <DashboardCard title="Today Protein" value={`${todayTotals.protein}g`} detail={`${totals.protein}g overall`} tone="gold" />
        <DashboardCard title="Today Water" value={`${todayTotals.water}L`} detail={`${totals.water}L overall`} tone="rose" />
      </section>
      <section className="flow-grid">
        {flowSteps.map((step, index) => (
          <Link className="flow-card" key={step.title} to={step.to}>
            <span>{index + 1}</span>
            <strong>{step.title}</strong>
            <p>{step.text}</p>
          </Link>
        ))}
      </section>
      <section className="content-grid">
        <div className="panel">
          <div className="section-title">
            <h2>Nutrition Trend</h2>
            <span>{logs.length} entries</span>
          </div>
          <div className="bar-chart">
            {(logs.length ? logs.slice(0, 7).reverse() : [{ calories: 1200, date: new Date() }]).map((log) => (
              <div key={log._id || log.date} className="bar-item">
                <span style={{ height: `${Math.min(100, Number(log.calories || 0) / 25)}%` }} />
                <small>{formatDate(log.date || new Date())}</small>
              </div>
            ))}
          </div>
          <p className="muted">Total logged calories: {totals.calories}</p>
        </div>
        <div className="panel">
          <div className="section-title">
            <h2>Profile Match</h2>
            <span>{user?.nutritionGoal || "Balanced wellness"}</span>
          </div>
          <div className="routine-list">
            <p>Morning: hydration check, scalp or skin care, balanced breakfast.</p>
            <p>Afternoon: protein-focused meal and water intake update.</p>
            <p>Evening: save products that fit your next care routine.</p>
          </div>
        </div>
      </section>
      <section className="section-title">
        <h2>Recommended Products</h2>
      </section>
      <div className="product-grid">
        {recommended.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
