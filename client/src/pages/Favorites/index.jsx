import { useState } from "react";
import ProductCard from "../../components/ProductCard";

function Favorites() {
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites") || "[]"));

  const removeFavorite = (product) => {
    const nextFavorites = favorites.filter((item) => item._id !== product._id);
    setFavorites(nextFavorites);
    localStorage.setItem("favorites", JSON.stringify(nextFavorites));
  };

  return (
    <>
      <section className="page-heading">
        <span className="eyebrow">Favorites</span>
        <h1>Saved herbal products and routines.</h1>
      </section>
      <div className="product-grid">
        {favorites.map((product) => (
          <ProductCard key={product._id} product={product} onFavorite={removeFavorite} isFavorite />
        ))}
      </div>
      {!favorites.length && <p className="empty-state">Saved products will appear here.</p>}
    </>
  );
}

export default Favorites;
