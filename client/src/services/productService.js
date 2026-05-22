import api from "../utils/api";

export const productCategories = ["All", "Hair care", "Skin care", "Nutrition"];

export const fallbackProducts = [
  {
    _id: "reetha-shikakai-shampoo",
    name: "Reetha Shikakai Herbal Shampoo",
    category: "Hair care",
    ingredients: ["Reetha", "Shikakai", "Amla"],
    benefits: ["Gentle cleanse", "Scalp freshness", "Natural shine"],
    recommendedFor: ["Oily hair", "Hair fall", "Straight hair"],
    image: "/products/reetha-shikakai-shampoo.png",
  },
  {
    _id: "hibiscus-repair-mask",
    name: "Hibiscus Repair Hair Mask",
    category: "Hair care",
    ingredients: ["Hibiscus", "Fenugreek", "Shea butter"],
    benefits: ["Frizz control", "Softness", "Breakage care"],
    recommendedFor: ["Damaged hair", "Dry hair", "Curly hair"],
    image: "/products/hibiscus-repair-hair-mask.png",
  },
  {
    _id: "neem-tulsi-cleanser",
    name: "Neem Tulsi Clear Skin Wash",
    category: "Skin care",
    ingredients: ["Neem", "Tulsi", "Aloe vera"],
    benefits: ["Oil balance", "Calming", "Gentle cleanse"],
    recommendedFor: ["Oily skin", "Acne prone", "Sensitive skin"],
    image: "/products/neem-tulsi-face-wash.png",
  },
  {
    _id: "aloe-licorice-serum",
    name: "Aloe Licorice Calm Serum",
    category: "Skin care",
    ingredients: ["Aloe vera", "Licorice", "Green tea"],
    benefits: ["Redness care", "Even tone", "Light hydration"],
    recommendedFor: ["Sensitive skin", "Combination skin", "Dull skin"],
    image: "/products/aloe-licorice-calm-serum.png",
  },
  {
    _id: "moringa-protein-blend",
    name: "Moringa Protein Blend",
    category: "Nutrition",
    ingredients: ["Moringa", "Pea protein", "Flaxseed"],
    benefits: ["Protein support", "Fiber", "Daily micronutrients"],
    recommendedFor: ["High protein", "Weight balance", "Active lifestyle"],
    image: "/products/protein-blend.svg",
  },
  {
    _id: "ashwagandha-energy-mix",
    name: "Ashwagandha Energy Mix",
    category: "Nutrition",
    ingredients: ["Ashwagandha", "Dates", "Almond protein"],
    benefits: ["Steady energy", "Recovery support", "Protein boost"],
    recommendedFor: ["Energy support", "High protein", "Active lifestyle"],
    image: "/products/energy-mix.svg",
  },
  {
    _id: "rose-saffron-gel",
    name: "Rose Saffron Glow Gel",
    category: "Skin care",
    ingredients: ["Rose", "Saffron", "Hyaluronic acid"],
    benefits: ["Hydration", "Glow", "Tone support"],
    recommendedFor: ["Dry skin", "Dull skin", "Normal skin"],
    image: "/products/rose-saffron-glow-gel.png",
  },
];

export function getProductImage(product) {
  const image = product?.image?.trim();

  if (image) return image;

  const category = product?.category?.toLowerCase() || "";
  const name = product?.name?.toLowerCase() || "";

  if (name.includes("reetha") || name.includes("shikakai")) return "/products/reetha-shikakai-shampoo.png";
  if (name.includes("shampoo")) return "/products/trichup-garden-shampoo.png";
  if (name.includes("hibiscus") && name.includes("mask")) return "/products/hibiscus-repair-hair-mask.png";
  if (name.includes("mask")) return "/products/hair-mask.svg";
  if (name.includes("neem") && (name.includes("tulsi") || name.includes("wash"))) {
    return "/products/neem-tulsi-face-wash.png";
  }
  if (name.includes("cleanser")) return "/products/neem-cleanser.svg";
  if (name.includes("aloe") && name.includes("serum")) return "/products/aloe-licorice-calm-serum.png";
  if (name.includes("serum")) return "/products/aloe-serum.svg";
  if ((name.includes("rose") || name.includes("saffron")) && name.includes("gel")) {
    return "/products/rose-saffron-glow-gel.png";
  }
  if (name.includes("gel")) return "/products/glow-gel.svg";
  if (category.includes("hair")) return "/products/trichup-garden-shampoo.png";
  if (category.includes("skin")) return "/products/neem-cleanser.svg";
  if (category.includes("nutrition")) return "/products/protein-blend.svg";

  return "/products/trichup-garden-shampoo.png";
}

export function normalizeCategory(category = "") {
  const value = category.toLowerCase().replace(/\s+/g, "");

  if (value.includes("hair")) return "Hair care";
  if (value.includes("skin")) return "Skin care";
  if (value.includes("nutrition") || value.includes("protein") || value.includes("food")) return "Nutrition";

  return category || "Hair care";
}

function normalizeProduct(product) {
  return {
    ...product,
    category: normalizeCategory(product.category),
    image: getProductImage(product),
  };
}

function mergeWithStarterProducts(products) {
  const normalizedProducts = products.map(normalizeProduct);
  const seen = new Set(normalizedProducts.map((product) => product._id || product.name.toLowerCase()));
  const missingStarterProducts = fallbackProducts.filter((product) => !seen.has(product._id));

  return [...normalizedProducts, ...missingStarterProducts];
}

export async function getProducts() {
  try {
    const { data } = await api.get("/products");
    const products = Array.isArray(data) ? data : data.products || [];
    return mergeWithStarterProducts(products);
  } catch {
    return fallbackProducts;
  }
}

export async function getProductById(id) {
  try {
    const { data } = await api.get(`/products/${id}`);
    return normalizeProduct(data.product || data);
  } catch {
    return fallbackProducts.find((product) => product._id === id);
  }
}

export async function addFavorite(productId) {
  const { data } = await api.post("/products/favorite", { productId });
  return data;
}
