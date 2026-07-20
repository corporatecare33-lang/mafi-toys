import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Real product images from categories
import buildingBlocks from "@/assets/categories/building.jpg";
import dollsImg from "@/assets/categories/dolls.jpg";
import plushImg from "@/assets/categories/plush.jpg";
import vehiclesImg from "@/assets/categories/vehicles.jpg";
import educationalImg from "@/assets/categories/educational.jpg";
import animalsImg from "@/assets/categories/animals.jpg";
import musicalImg from "@/assets/categories/musical.jpg";
import actionImg from "@/assets/categories/action.jpg";

const POPULAR_PRODUCTS = [
  {
    id: 1,
    name: "Building Blocks Set",
    price: "700.00",
    image: buildingBlocks,
    category: "Building & Construction",
  },
  {
    id: 2,
    name: "Building Block Insects",
    price: "2,180.00",
    image: educationalImg,
    category: "Educational Toys",
  },
  {
    id: 3,
    name: "Building Block Cars",
    price: "270.00",
    image: vehiclesImg,
    category: "Vehicles",
  },
  {
    id: 4,
    name: "Building Block Cars",
    price: "270.00",
    image: actionImg,
    category: "Action Toys",
  },
  {
    id: 5,
    name: "Building Block Flowers",
    price: "300.00",
    image: dollsImg,
    category: "Dolls & Accessories",
  },
  {
    id: 6,
    name: "Building Block Planes",
    price: "2,960.00",
    image: plushImg,
    category: "Plush Toys",
  },
  {
    id: 7,
    name: "Building Block Planes",
    price: "2,190.00",
    image: musicalImg,
    category: "Musical Instruments",
  },
  {
    id: 8,
    name: "Cartoon Building Blocks",
    price: "290.00",
    image: animalsImg,
    category: "Animals & Nature",
  },
];

export function LovedByFamilies() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-brand-pink/5 to-background py-16 md:py-24">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-brand-pink/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-brand-orange/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-pink/30 bg-white/90 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-pink-deep shadow-sm backdrop-blur">
            <Heart className="h-4 w-4 fill-current" />
            Loved By Families
            <Heart className="h-4 w-4 fill-current" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Popular <span className="gradient-text">Products</span>
          </h2>
          <p className="mt-3 text-base text-foreground/70 md:text-lg">
            Best-selling toys that bring smiles to thousands of families
          </p>
        </motion.div>

        {/* Layout with Sidebar */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left Sidebar - Filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-72 lg:flex-shrink-0"
          >
            <div className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-brand-pink/20">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-pink-deep to-brand-orange p-1.5">
                  <svg className="h-full w-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold">Filter by Price</h3>
              </div>

              <div className="space-y-3">
                <button className="w-full rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90">
                  All Prices
                </button>
                <button className="w-full rounded-full border-2 border-brand-pink/30 bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-brand-pink/10">
                  Under $20
                </button>
                <button className="w-full rounded-full border-2 border-brand-pink/30 bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-brand-pink/10">
                  $20 - $40
                </button>
                <button className="w-full rounded-full border-2 border-brand-pink/30 bg-white px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-brand-pink/10">
                  $40+
                </button>
              </div>

              {/* Categories */}
              <div className="mt-8">
                <h4 className="mb-4 font-display text-lg font-bold">Categories</h4>
                <div className="space-y-2">
                  {['All Toys', 'Dolls', 'Building Blocks', 'Plush Toys', 'Educational', 'Vehicles'].map((cat) => (
                    <label key={cat} className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-brand-pink/10">
                      <input type="checkbox" className="h-4 w-4 rounded border-brand-pink/40 text-brand-pink-deep focus:ring-brand-pink" />
                      <span className="text-sm font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Right Side - Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {POPULAR_PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-brand-pink/20 transition-all hover:shadow-toy"
                >
                  {/* Wishlist Heart */}
                  <button
                    className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-foreground/50 shadow-sm backdrop-blur transition hover:scale-110 hover:text-brand-red"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="h-4 w-4" />
                  </button>

                  {/* Image */}
                  <Link to="/products" className="block">
                    <div className="relative aspect-square overflow-hidden bg-brand-pink/10">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-3 sm:p-4">
                    <Link
                      to="/products"
                      className="block text-sm font-semibold leading-tight hover:text-brand-pink-deep sm:text-base"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-xs text-foreground/60">{product.category}</p>

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="h-3 w-3 fill-brand-orange text-brand-orange sm:h-3.5 sm:w-3.5"
                        />
                      ))}
                    </div>

                    {/* Price & Cart */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="font-display text-lg font-bold text-brand-pink-deep sm:text-xl">
                        {product.price}
                        <span className="text-xs font-normal text-foreground/60">৳</span>
                      </span>
                      <Button
                        size="sm"
                        className="h-8 rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange px-3 text-xs text-white shadow-md hover:opacity-95 sm:h-9 sm:px-4"
                      >
                        <ShoppingCart className="mr-1 h-3 w-3 sm:h-3.5 sm:w-3.5" />
                        <span className="hidden sm:inline">Add</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 text-center"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange px-8 py-6 text-base font-semibold text-white shadow-toy hover:opacity-95"
              >
                <Link to="/products">View All Products</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
