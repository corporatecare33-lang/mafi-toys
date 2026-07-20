import { motion } from "motion/react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart, type Product } from "@/context/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`, {
      description: `$${product.price.toFixed(2)}`,
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    navigate({ to: "/cart" });
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-md transition-shadow hover:shadow-toy"
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
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < product.rating ? "fill-brand-orange text-brand-orange" : "text-muted"}`}
            />
          ))}
        </div>
        <Link
          to="/products/$productId"
          params={{ productId: product.id }}
          className="font-display text-xl font-semibold hover:text-brand-pink-deep transition-colors"
        >
          {product.name}
        </Link>
        <p className="text-sm text-foreground/70 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-2xl font-bold text-brand-pink-deep">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex-1 rounded-full border-2 border-brand-pink-deep text-brand-pink-deep hover:bg-brand-pink/20"
          >
            <ShoppingCart className="mr-1 h-4 w-4" />
            Add
          </Button>
          <Button
            onClick={handleBuyNow}
            className="flex-1 rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange text-white shadow-md hover:opacity-95"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
