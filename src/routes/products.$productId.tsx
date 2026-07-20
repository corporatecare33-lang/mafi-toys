import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/toyspark/Navbar";
import { Footer } from "@/components/toyspark/Footer";
import { PRODUCTS } from "@/components/toyspark/products-data";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ProductCard } from "@/components/toyspark/ProductCard";

export const Route = createFileRoute("/products/$productId")({
  head: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.productId);
    const title = product ? `${product.name} — Toy Shop` : "Product — Toy Shop";
    const desc = product?.description || "View product details";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:image", content: product?.image || "" },
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === productId);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background font-body text-foreground">
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center px-4 pt-32">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold">Product not found</h1>
            <p className="mt-2 text-foreground/70">
              The toy you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild className="mt-6 rounded-full bg-brand-pink-deep">
              <Link to="/products">Browse All Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success("Added to cart!", {
      description: `${quantity}x ${product.name}`,
    });
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate({ to: "/cart" });
  };

  // Related products (excluding current)
  const relatedProducts = PRODUCTS.filter((p) => p.id !== productId).slice(0, 3);

  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />

      <main className="pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-pink-deep hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </motion.div>

          {/* Product Detail */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-pink/30 to-brand-purple/30 p-8 shadow-toy ring-1 ring-brand-pink/40"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`absolute top-6 right-6 grid h-12 w-12 place-items-center rounded-full bg-white shadow-md transition ${
                  isFavorite ? "text-brand-red" : "text-foreground/40"
                } hover:scale-110`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < product.rating
                          ? "fill-brand-yellow text-brand-yellow"
                          : "text-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground/70">
                  {product.rating}.0 ({Math.floor(Math.random() * 50 + 20)} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-4xl font-bold text-brand-pink-deep">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-foreground/60">In stock</span>
              </div>

              {/* Description */}
              <p className="mt-6 text-lg text-foreground/80">{product.description}</p>

              {/* Quantity selector */}
              <div className="mt-8">
                <label className="mb-2 block text-sm font-semibold">Quantity</label>
                <div className="flex items-center gap-1 rounded-full border-2 border-brand-pink/60 bg-white p-1 w-fit">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="grid h-10 w-10 place-items-center rounded-full text-brand-pink-deep transition hover:bg-brand-pink/40"
                    aria-label="Decrease"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-lg font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="grid h-10 w-10 place-items-center rounded-full text-brand-pink-deep transition hover:bg-brand-pink/40"
                    aria-label="Increase"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-full bg-white text-brand-pink-deep border-2 border-brand-pink-deep hover:bg-brand-pink/20 py-6 text-base font-semibold"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange py-6 text-base font-semibold text-white shadow-toy hover:opacity-95"
                >
                  Buy Now
                </Button>
              </div>

              {/* Features */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <Feature icon={Truck} title="Free Delivery" desc="Over $100" />
                <Feature icon={ShieldCheck} title="Authentic" desc="Guaranteed" />
                <Feature icon={RotateCcw} title="Easy Returns" desc="7 days" />
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-16 md:mt-24"
            >
              <h2 className="mb-8 text-center font-display text-3xl font-bold">
                You Might Also <span className="gradient-text">Like</span>
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: typeof Truck; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-brand-pink/40">
      <div className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-gradient-to-br from-brand-pink-deep to-brand-orange text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xs text-foreground/60">{desc}</div>
      </div>
    </div>
  );
}
