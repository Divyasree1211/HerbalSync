function DashboardCard({ title, value, detail, tone = "sage" }) {
  return (
    <article className={`dashboard-card ${tone}`}>
      <p>{title}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </article>
  );
}

export default DashboardCard;
