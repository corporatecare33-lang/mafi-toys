import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/toyspark/Navbar";
import { Hero } from "@/components/toyspark/Hero";
import { Categories } from "@/components/toyspark/Categories";
import { Reviews } from "@/components/toyspark/Reviews";
import { HotDeals } from "@/components/toyspark/HotDeals";
import { Contact } from "@/components/toyspark/Contact";
import { Footer } from "@/components/toyspark/Footer";
import { ProductCard } from "@/components/toyspark/ProductCard";
import { ToySection } from "@/components/toyspark/ToySection";
import { PRODUCTS, COLLECTIONS } from "@/components/toyspark/products-data";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  // Show only first 8 featured products on home page (two rows of four)
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Categories />

        {/* Featured Products Section */}
        <section id="products" className="relative py-14 sm:py-20 md:py-24 lg:py-28">
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
                Our Collection
                <span className="h-1.5 w-1.5 rounded-full bg-brand-pink-deep" />
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                Featured <span className="gradient-text">Toys</span>
              </h2>
              <p className="mt-3 text-foreground/70">
                Hand-picked favorites loved by little dreamers everywhere.
              </p>
            </motion.div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
              {featuredProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange px-8 py-6 text-base font-semibold text-white shadow-toy hover:opacity-95"
              >
                <Link to="/products">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Curated collections — 4 picks each, "View All" opens the filtered list */}
        {COLLECTIONS.map((c) => (
          <ToySection key={c.slug} collection={c} />
        ))}

        <Reviews />
        <HotDeals />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
