import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Star, ShoppingCart, Eye, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart, type Product } from "@/context/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [added, setAdded] = useState(false);
  const [buying, setBuying] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(addedTimer.current), []);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1500);
    toast.success(`${product.name} added to cart`, {
      description: `৳${product.price.toFixed(0)}`,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    setBuying(true);
    addItem(product);
    navigate({ to: "/cart" });
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-shadow hover:shadow-toy"
    >
      <Link
        to="/products/$productId"
        params={{ productId: product.id }}
        className="relative aspect-square overflow-hidden bg-brand-pink/30"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          width={768}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-brand-pink-deep backdrop-blur">
            <Eye className="h-4 w-4" />
            View Details
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-5">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${i < product.rating ? "fill-brand-orange text-brand-orange" : "text-muted"}`}
            />
          ))}
        </div>
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="font-display text-base font-semibold hover:text-brand-pink-deep transition-colors sm:text-xl"
        >
          {product.name}
        </Link>
        <p className="text-xs text-foreground/70 line-clamp-2 sm:text-sm">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-1 sm:pt-2">
          <span className="font-display text-lg font-bold text-brand-pink-deep sm:text-2xl">
            ৳{product.price.toFixed(0)}
          </span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className={`flex-1 rounded-full border-2 font-semibold transition-all duration-150 active:scale-95 ${
              added
                ? "scale-105 border-brand-pink-deep bg-brand-pink-deep text-white shadow-md hover:bg-brand-pink-deep hover:text-white"
                : "border-brand-pink-deep bg-white text-brand-pink-deep hover:bg-brand-pink/20 hover:text-brand-pink-deep"
            }`}
          >
            {added ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="mr-1 h-4 w-4" />
                Add
              </>
            )}
          </Button>
          <Button
            onClick={handleBuyNow}
            disabled={buying}
            className="flex-1 rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange text-white shadow-md transition-all duration-150 hover:opacity-95 active:scale-95 disabled:opacity-100"
          >
            {buying ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Going...
              </>
            ) : (
              "Buy Now"
            )}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
