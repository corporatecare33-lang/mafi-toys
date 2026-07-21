import { motion } from "motion/react";
import { ProductCard } from "./ProductCard";
import { PRODUCTS } from "./products-data";
import { useSearch } from "@/context/search-context";

export function Products() {
  const { query } = useSearch();
  const q = query.trim().toLowerCase();
  const filtered = q
    ? PRODUCTS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q),
      )
    : PRODUCTS;
  return (
    <section id="products" className="relative py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full bg-brand-pink/60 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-pink-deep">
            Our Collection
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Our Featured <span className="gradient-text">Toys</span>
          </h2>
          <p className="mt-3 text-foreground/70">
            Hand-picked favorites loved by little dreamers everywhere.
          </p>
        </motion.div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-foreground/60">
            No toys match "{query}". Try another search.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                className="h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
