import { useEffect, useMemo, useState } from "react";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import { addFavorite, getProducts, productCategories } from "../../services/productService";

function Products() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites") || "[]"));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => {
    const availableCategories = new Set(products.map((product) => product.category));
    return productCategories.filter((item) => item === "All" || availableCategories.has(item));
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesQuery = [product.name, product.category, product.ingredients, product.benefits]
      .flat()
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesQuery && matchesCategory;
  });

  const handleFavorite = async (product) => {
    const exists = favorites.some((item) => item._id === product._id);
    const nextFavorites = exists ? favorites.filter((item) => item._id !== product._id) : [product, ...favorites];

    setFavorites(nextFavorites);
    localStorage.setItem("favorites", JSON.stringify(nextFavorites));

    try {
      if (!exists) await addFavorite(product._id);
    } catch {
      // Local favorites keep the UI useful while backend favorite routes are added.
    }
  };

  if (loading) return <Loader label="Loading products" />;

  return (
    <>
      <section className="page-heading">
        <span className="eyebrow">Products</span>
        <h1>Herbal recommendations for haircare, skincare, and nutrition.</h1>
      </section>
      <section className="toolbar">
        <input
          type="search"
          placeholder="Search by product, ingredient, or benefit"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </section>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onFavorite={handleFavorite}
            isFavorite={favorites.some((item) => item._id === product._id)}
          />
        ))}
      </div>
      {!filteredProducts.length && <p className="empty-state">No products match your search.</p>}
    </>
  );
}

export default Products;
