import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/toyspark/Navbar";
import { Footer } from "@/components/toyspark/Footer";
import { ProductCard } from "@/components/toyspark/ProductCard";
import { PRODUCTS, COLLECTIONS } from "@/components/toyspark/products-data";
import { useSearch } from "@/context/search-context";

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): { collection?: string } =>
    typeof search.collection === "string" ? { collection: search.collection } : {},
  head: () => ({
    meta: [
      { title: "All Products — Toy Shop" },
      { name: "description", content: "Browse our complete collection of magical toys for girls." },
      { property: "og:title", content: "All Products — Toy Shop" },
      {
        property: "og:description",
        content: "Browse our complete collection of magical toys for girls.",
      },
    ],
  }),
  component: ProductsPage,
});

type PriceRange = "all" | "under20" | "20-40" | "40plus";

function ProductsPage() {
  const { query } = useSearch();
  const { collection } = Route.useSearch();
  const activeCollection = COLLECTIONS.find((c) => c.slug === collection);
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    if (category === "All Toys") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category)
          : [...prev, category]
      );
    }
  };

  // Narrow to a home-page collection when one was requested
  const base = activeCollection
    ? PRODUCTS.filter((p) => p.collection === activeCollection.slug)
    : PRODUCTS;

  // Filter by search query
  const q = query.trim().toLowerCase();
  let filtered = q
    ? base.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      )
    : [...base];

  // Filter by price range (BDT)
  if (selectedPriceRange === "under20") {
    filtered = filtered.filter((p) => p.price < 2000);
  } else if (selectedPriceRange === "20-40") {
    filtered = filtered.filter((p) => p.price >= 2000 && p.price <= 5000);
  } else if (selectedPriceRange === "40plus") {
    filtered = filtered.filter((p) => p.price > 5000);
  }

  // Filter by category
  if (selectedCategories.length > 0) {
    filtered = filtered.filter((p) => 
      selectedCategories.some(cat => p.category.toLowerCase().includes(cat.toLowerCase()))
    );
  }

  const categories = ["All Toys", "Dolls", "Building Blocks", "Plush Toys", "Educational", "Vehicles"];

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />

      <main className="relative overflow-hidden bg-gradient-to-b from-background via-brand-pink/5 to-background pt-24 pb-16 md:pt-32 md:pb-20">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-brand-pink/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-brand-orange/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-pink/30 bg-white/90 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-pink-deep shadow-sm backdrop-blur">
              <Heart className="h-4 w-4 fill-current" />
              {activeCollection ? activeCollection.eyebrow : "Loved By Families"}
              <Heart className="h-4 w-4 fill-current" />
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              {activeCollection ? activeCollection.title : "All"}{" "}
              <span className="gradient-text">
                {activeCollection ? activeCollection.highlight : "Products"}
              </span>
            </h1>
            <p className="mt-3 text-base text-foreground/70 md:text-lg">
              {filtered.length} magical {filtered.length === 1 ? "toy" : "toys"} for your little one
            </p>
            {activeCollection && (
              <Link
                to="/products"
                search={{ collection: undefined }}
                className="mt-3 inline-block text-sm font-semibold text-brand-pink-deep underline-offset-4 hover:underline"
              >
                ← Browse all products
              </Link>
            )}
          </motion.div>

          {/* Layout with Sidebar */}
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Left Sidebar - Filters */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-72 lg:flex-shrink-0"
            >
              <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-brand-pink/20 sticky top-24">
                <div className="mb-6 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-pink-deep to-brand-orange p-1.5">
                    <svg className="h-full w-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold">Filter by Price</h3>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedPriceRange("all")}
                    className={`w-full rounded-full px-4 py-2.5 text-sm font-semibold shadow-md transition ${
                      selectedPriceRange === "all"
                        ? "bg-gradient-to-r from-brand-pink-deep to-brand-orange text-white"
                        : "border-2 border-brand-pink/30 bg-white text-foreground hover:bg-brand-pink/10"
                    }`}
                  >
                    All Prices
                  </button>
                  <button
                    onClick={() => setSelectedPriceRange("under20")}
                    className={`w-full rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      selectedPriceRange === "under20"
                        ? "bg-gradient-to-r from-brand-pink-deep to-brand-orange text-white shadow-md"
                        : "border-2 border-brand-pink/30 bg-white text-foreground hover:bg-brand-pink/10"
                    }`}
                  >
                    Under ৳2,000
                  </button>
                  <button
                    onClick={() => setSelectedPriceRange("20-40")}
                    className={`w-full rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      selectedPriceRange === "20-40"
                        ? "bg-gradient-to-r from-brand-pink-deep to-brand-orange text-white shadow-md"
                        : "border-2 border-brand-pink/30 bg-white text-foreground hover:bg-brand-pink/10"
                    }`}
                  >
                    ৳2,000 - ৳5,000
                  </button>
                  <button
                    onClick={() => setSelectedPriceRange("40plus")}
                    className={`w-full rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                      selectedPriceRange === "40plus"
                        ? "bg-gradient-to-r from-brand-pink-deep to-brand-orange text-white shadow-md"
                        : "border-2 border-brand-pink/30 bg-white text-foreground hover:bg-brand-pink/10"
                    }`}
                  >
                    ৳5,000+
                  </button>
                </div>

                {/* Categories */}
                <div className="mt-8">
                  <h4 className="mb-4 font-display text-lg font-bold">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => {
                      const isAllToys = cat === "All Toys";
                      const isChecked = isAllToys ? selectedCategories.length === 0 : selectedCategories.includes(cat);
                      
                      return (
                        <label
                          key={cat}
                          className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-brand-pink/10"
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCategory(cat)}
                            className="h-4 w-4 rounded border-brand-pink/40 text-brand-pink-deep focus:ring-brand-pink"
                          />
                          <span className="text-sm font-medium">{cat}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Right Side - Product Grid */}
            <div className="flex-1">
              {filtered.length === 0 ? (
                <div className="flex min-h-[400px] items-center justify-center rounded-3xl bg-white p-12 text-center shadow-md">
                  <div>
                    <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-brand-pink/10 p-4">
                      <svg className="h-full w-full text-brand-pink-deep" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">No Products Found</h3>
                    <p className="mt-2 text-foreground/60">Try adjusting your filters to see more products</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
                  {filtered.map((p, i) => (
                    <motion.div
                      key={p.id}
                      className="h-full"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
