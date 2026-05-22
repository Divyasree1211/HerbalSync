import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { getProductById, getProductImage } from "../../services/productService";
import { normalizeList } from "../../utils/helpers";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loader label="Opening product" />;

  if (!product) {
    return (
      <section className="panel">
        <h1>Product not found</h1>
        <Link className="btn primary" to="/products">
          Back to products
        </Link>
      </section>
    );
  }

  return (
    <article className="detail-layout">
      <img
        src={getProductImage(product)}
        alt={product.name}
        onError={(event) => {
          event.currentTarget.src = getProductImage({ ...product, image: "" });
        }}
      />
      <div className="detail-copy">
        <span className="pill">{product.category}</span>
        <h1>{product.name}</h1>
        <p>
          Designed for {normalizeList(product.recommendedFor).join(", ") || "balanced wellness"} with a clean herbal
          ingredient profile.
        </p>
        <section>
          <h2>Ingredients</h2>
          <div className="tag-row large">
            {normalizeList(product.ingredients).map((ingredient) => (
              <span key={ingredient}>{ingredient}</span>
            ))}
          </div>
        </section>
        <section>
          <h2>Benefits</h2>
          <ul className="check-list">
            {normalizeList(product.benefits).map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}

export default ProductDetails;
