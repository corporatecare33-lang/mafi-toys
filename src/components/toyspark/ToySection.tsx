import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/toyspark/ProductCard";
import { getCollectionProducts, type Collection } from "@/components/toyspark/products-data";

/** Home-page collection strip: four picks plus a "View All" link to the filtered list. */
export function ToySection({ collection }: { collection: Collection }) {
  const products = getCollectionProducts(collection.slug).slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section id={collection.slug} className="relative py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-pink/30 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-pink-deep shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pink-deep" />
            {collection.eyebrow}
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pink-deep" />
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            {collection.title} <span className="gradient-text">{collection.highlight}</span>
          </h2>
          <p className="mt-3 text-foreground/70">{collection.subtitle}</p>
        </motion.div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-4">
          {products.map((p, i) => (
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange px-8 py-6 text-base font-semibold text-white shadow-toy hover:opacity-95"
          >
            <Link to="/products" search={{ collection: collection.slug }}>
              View All
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
