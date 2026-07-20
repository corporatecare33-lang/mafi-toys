import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

// Real product images from categories
import buildingBlocks from "@/assets/categories/building.jpg";
import dollsImg from "@/assets/categories/dolls.jpg";
import plushImg from "@/assets/categories/plush.jpg";
import vehiclesImg from "@/assets/categories/vehicles.jpg";
import educationalImg from "@/assets/categories/educational.jpg";
import animalsImg from "@/assets/categories/animals.jpg";
import musicalImg from "@/assets/categories/musical.jpg";
import actionImg from "@/assets/categories/action.jpg";

const HOT_PRODUCTS = [
  {
    id: 101,
    name: "Stacks of squares",
    price: "700.00",
    image: buildingBlocks,
    category: "Building & Construction",
  },
  {
    id: 102,
    name: "Building block insects",
    price: "2,180.00",
    image: educationalImg,
    category: "Educational Toys",
  },
  {
    id: 103,
    name: "Building block cars",
    price: "270.00",
    image: vehiclesImg,
    category: "Vehicles",
  },
  {
    id: 104,
    name: "Building block cars",
    price: "270.00",
    image: actionImg,
    category: "Action Toys",
  },
  {
    id: 105,
    name: "Building block flowers",
    price: "300.00",
    image: dollsImg,
    category: "Dolls & Accessories",
  },
  {
    id: 106,
    name: "Building block planes",
    price: "2,960.00",
    image: plushImg,
    category: "Plush Toys",
  },
  {
    id: 107,
    name: "Building block planes",
    price: "2,190.00",
    image: musicalImg,
    category: "Musical Instruments",
  },
  {
    id: 108,
    name: "Cartoon building blocks",
    price: "290.00",
    image: animalsImg,
    category: "Animals & Nature",
  },
];

export function HotDeals() {
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof HOT_PRODUCTS[0]) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      description: product.category,
      price: parseFloat(product.price.replace(/,/g, "")),
      image: product.image,
      rating: 5,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <section className="relative py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Promo Banner Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#e2f0d9] px-5 py-5 sm:px-8 md:flex-row"
        >
          <p className="flex flex-wrap items-center justify-center gap-2 text-sm font-medium uppercase tracking-wide text-foreground/80 sm:text-base">
            Shop and
            <span className="rounded-full bg-brand-orange px-3 py-1 text-xs font-bold text-white sm:text-sm">
              Save big on hottest
            </span>
            Products
          </p>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <div className="text-center sm:text-right">
              <p className="text-sm text-foreground/80 sm:text-base">
                starting from{" "}
                <span className="font-display text-lg font-bold text-brand-red sm:text-xl">
                  ৳150
                </span>
              </p>
              <p className="text-xs text-foreground/50">
                Don't miss this special opportunity today.
              </p>
            </div>
            <Button
              asChild
              className="rounded-full bg-[#1f6b45] px-6 text-sm font-semibold text-white hover:bg-[#1a5c3b]"
            >
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {HOT_PRODUCTS.map((product, i) => (
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
                    onClick={() => handleAddToCart(product)}
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
      </div>
    </section>
  );
}
