import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/toyspark/Navbar";
import { Footer } from "@/components/toyspark/Footer";
import { ProductCard } from "@/components/toyspark/ProductCard";
import { PRODUCTS } from "@/components/toyspark/products-data";
import { useSearch } from "@/context/search-context";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "All Products — Mafi Toys" },
      { name: "description", content: "Browse our complete collection of magical toys for girls." },
      { property: "og:title", content: "All Products — Mafi Toys" },
      {
        property: "og:description",
        content: "Browse our complete collection of magical toys for girls.",
      },
    ],
  }),
  component: ProductsPage,
});

type SortOption = "featured" | "price-low" | "price-high" | "name";
type PriceRange = "all" | "under-20" | "20-40" | "40-plus";

function ProductsPage() {
  const { query } = useSearch();
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter by search query
  const q = query.trim().toLowerCase();
  let filtered = q
    ? PRODUCTS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      )
    : [...PRODUCTS];

  // Filter by price range
  if (priceRange === "under-20") {
    filtered = filtered.filter((p) => p.price < 20);
  } else if (priceRange === "20-40") {
    filtered = filtered.filter((p) => p.price >= 20 && p.price <= 40);
  } else if (priceRange === "40-plus") {
    filtered = filtered.filter((p) => p.price > 40);
  }

  // Sort
  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />

      <main className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              All <span className="gradient-text">Products</span>
            </h1>
            <p className="mt-3 text-foreground/70">
              {filtered.length} magical {filtered.length === 1 ? "toy" : "toys"} for your little
              one
            </p>
          </motion.div>

          {/* Filters & Sort */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full border-brand-pink/60 hover:bg-brand-pink/20"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground/70">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-full border border-brand-pink/60 bg-white px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-pink"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>

          {/* Price Range Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 rounded-2xl bg-white p-6 shadow-md ring-1 ring-brand-pink/40"
            >
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-brand-pink-deep" />
                <h3 className="font-display text-lg font-bold">Filter by Price</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <FilterButton
                  active={priceRange === "all"}
                  onClick={() => setPriceRange("all")}
                  label="All Prices"
                />
                <FilterButton
                  active={priceRange === "under-20"}
                  onClick={() => setPriceRange("under-20")}
                  label="Under $20"
                />
                <FilterButton
                  active={priceRange === "20-40"}
                  onClick={() => setPriceRange("20-40")}
                  label="$20 - $40"
                />
                <FilterButton
                  active={priceRange === "40-plus"}
                  onClick={() => setPriceRange("40-plus")}
                  label="$40+"
                />
              </div>
            </motion.div>
          )}

          {/* Products Grid */}
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-md ring-1 ring-brand-pink/40"
            >
              <p className="text-foreground/70">
                No toys found matching your criteria. Try adjusting your filters.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
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
      </main>

      <Footer />
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
        active
          ? "bg-gradient-to-r from-brand-pink-deep to-brand-orange text-white shadow-md"
          : "bg-brand-pink/20 text-brand-pink-deep hover:bg-brand-pink/30"
      }`}
    >
      {label}
    </button>
  );
}
