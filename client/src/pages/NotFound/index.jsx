import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The page you opened is not part of the HerbalSync flow.</p>
        <Link className="btn primary" to="/dashboard">
          Go to dashboard
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
