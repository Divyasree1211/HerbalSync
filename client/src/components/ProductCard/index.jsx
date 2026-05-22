import { Link } from "react-router-dom";
import { getProductImage } from "../../services/productService";
import { normalizeList } from "../../utils/helpers";

function ProductCard({ product, onFavorite, isFavorite = false }) {
  const ingredients = normalizeList(product.ingredients).slice(0, 3);
  const fallbackImage = getProductImage({ ...product, image: "" });

  return (
    <article className="product-card">
      <img
        src={getProductImage(product)}
        alt={product.name}
        onError={(event) => {
          event.currentTarget.src = fallbackImage;
        }}
      />
      <div className="product-card-body">
        <div>
          <span className="pill">{product.category}</span>
          <h3>{product.name}</h3>
        </div>
        <p>{normalizeList(product.benefits).slice(0, 2).join(" | ")}</p>
        <div className="tag-row">
          {ingredients.map((ingredient) => (
            <span key={ingredient}>{ingredient}</span>
          ))}
        </div>
        <div className="card-actions">
          <Link className="btn ghost" to={`/products/${product._id}`}>
            View
          </Link>
          <button className="icon-btn" type="button" onClick={() => onFavorite?.(product)} aria-label="Save favorite">
            {isFavorite ? "*" : "+"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
