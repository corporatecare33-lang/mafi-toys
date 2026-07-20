import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  ShieldCheck,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { Navbar } from "@/components/toyspark/Navbar";
import { Footer } from "@/components/toyspark/Footer";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Toy Shop" },
      { name: "description", content: "Review the magical toys in your cart before checkout." },
      { property: "og:title", content: "Your Cart — Toy Shop" },
      {
        property: "og:description",
        content: "Review the magical toys in your cart before checkout.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, updateQty, removeItem, clear } = useCart();
  const shipping = subtotal > 0 && subtotal < 100 ? 8 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink/30 via-background to-background font-body text-foreground">
      <Navbar />

      <main className="pt-24 pb-16 md:pt-40 md:pb-20 xl:pt-44">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex flex-wrap items-end justify-between gap-4"
          >
            <div>
              <Link
                to="/"
                className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-pink-deep hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> Continue shopping
              </Link>
              <h1 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                Your Shopping <span className="text-brand-pink-deep">Cart</span>
              </h1>
              <p className="mt-2 text-foreground/70">
                {items.length === 0
                  ? "Nothing here yet — let’s find some magic."
                  : `${items.length} item${items.length > 1 ? "s" : ""} ready for checkout.`}
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clear}
                className="text-sm font-semibold text-foreground/60 hover:text-brand-red"
              >
                Clear cart
              </button>
            )}
          </motion.div>

          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
              {/* Items */}
              <ul className="space-y-4">
                <AnimatePresence initial={false}>
                  {items.map((item, i) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="flex min-w-0 flex-col gap-4 rounded-3xl bg-white p-4 shadow-md ring-1 ring-brand-pink/40 sm:flex-row sm:items-center md:p-5"
                    >
                      <div className="relative h-32 w-full flex-none overflow-hidden rounded-2xl bg-brand-pink/30 sm:h-28 sm:w-28">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-display text-lg font-semibold leading-tight">
                              {item.name}
                            </h3>
                            <p className="mt-0.5 line-clamp-1 text-sm text-foreground/60">
                              {item.description}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="grid h-9 w-9 place-items-center rounded-full text-foreground/50 transition hover:bg-brand-red/10 hover:text-brand-red"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-1 rounded-full border-2 border-brand-pink/60 bg-white p-1">
                            <button
                              onClick={() => updateQty(item.id, item.quantity - 1)}
                              className="grid h-8 w-8 place-items-center rounded-full text-brand-pink-deep transition hover:bg-brand-pink/40"
                              aria-label="Decrease"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.id, item.quantity + 1)}
                              className="grid h-8 w-8 place-items-center rounded-full text-brand-pink-deep transition hover:bg-brand-pink/40"
                              aria-label="Increase"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-foreground/50">
                              ${item.price.toFixed(2)} each
                            </div>
                            <div className="font-display text-xl font-bold text-brand-pink-deep">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>

                {/* Perks */}
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <Perk
                    icon={Truck}
                    title="Free Delivery"
                    sub="Inside Dhaka over $100"
                    tone="pink"
                  />
                  <Perk
                    icon={ShieldCheck}
                    title="100% Authentic"
                    sub="Genuine toys, guaranteed"
                    tone="orange"
                  />
                  <Perk icon={Gift} title="Free Gift Wrap" sub="On every order" tone="red" />
                </div>
              </ul>

              {/* Summary */}
              <motion.aside
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="lg:sticky lg:top-32 lg:self-start"
              >
                <div className="overflow-hidden rounded-3xl bg-white shadow-toy ring-1 ring-brand-pink/40">
                  <div className="bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red p-5 text-white">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Order Summary
                      </span>
                    </div>
                    <p className="mt-1 font-display text-xl font-bold">
                      {items.reduce((s, i) => s + i.quantity, 0)} magical items
                    </p>
                  </div>

                  <div className="space-y-3 p-5">
                    <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                    <Row
                      label="Shipping"
                      value={shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                      accent={shipping === 0}
                    />
                    <div className="my-2 border-t border-dashed border-brand-pink/60" />
                    <div className="flex items-baseline justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-display text-3xl font-bold text-brand-pink-deep">
                        ${total.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      asChild
                      className="mt-2 w-full rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange py-6 text-base font-semibold text-white shadow-toy hover:opacity-95"
                    >
                      <Link to="/order">Proceed to Checkout</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full border-2 border-brand-pink-deep text-brand-pink-deep hover:bg-brand-pink/30"
                    >
                      <Link to="/">Keep Shopping</Link>
                    </Button>
                  </div>
                </div>
              </motion.aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-foreground/70">{label}</span>
      <span className={accent ? "font-bold text-brand-orange" : "font-semibold"}>{value}</span>
    </div>
  );
}

function Perk({
  icon: Icon,
  title,
  sub,
  tone,
}: {
  icon: typeof Truck;
  title: string;
  sub: string;
  tone: "pink" | "orange" | "red";
}) {
  const tones = {
    pink: {
      grad: "from-brand-pink/60 to-white",
      ring: "ring-brand-pink/50",
      icon: "from-brand-pink-deep to-brand-red text-white",
      glow: "bg-brand-pink/50",
    },
    orange: {
      grad: "from-brand-peach/70 to-white",
      ring: "ring-brand-orange/40",
      icon: "from-brand-orange to-brand-red text-white",
      glow: "bg-brand-orange/40",
    },
    red: {
      grad: "from-brand-yellow/60 to-white",
      ring: "ring-brand-red/30",
      icon: "from-brand-red to-brand-pink-deep text-white",
      glow: "bg-brand-red/30",
    },
  }[tone];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${tones.grad} p-4 ring-1 ${tones.ring} shadow-sm hover:shadow-toy`}
    >
      <div
        className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full ${tones.glow} blur-2xl transition-opacity group-hover:opacity-80`}
      />
      <div className="relative flex items-center gap-3">
        <div
          className={`grid h-11 w-11 flex-none place-items-center rounded-2xl bg-gradient-to-br ${tones.icon} shadow-md`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-sm font-bold text-foreground">{title}</div>
          <div className="text-xs text-foreground/60">{sub}</div>
        </div>
      </div>
    </motion.div>
  );
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto grid max-w-xl place-items-center rounded-3xl bg-white p-6 text-center shadow-md ring-1 ring-brand-pink/40 sm:p-10 md:p-14"
    >
      <div className="relative mb-6">
        <div className="absolute inset-0 animate-pulse rounded-full bg-brand-pink/40 blur-2xl" />
        <div className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-brand-pink-deep to-brand-orange text-white shadow-toy">
          <ShoppingBag className="h-10 w-10" />
        </div>
      </div>
      <h2 className="font-display text-2xl font-bold md:text-3xl">Your cart is empty</h2>
      <p className="mt-2 max-w-sm text-foreground/70">
        Looks like you haven’t picked any toys yet. Let’s find something magical!
      </p>
      <Button
        asChild
        className="mt-6 rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange px-8 py-6 text-base font-semibold text-white shadow-toy hover:opacity-95"
      >
        <Link to="/">Start Shopping</Link>
      </Button>
    </motion.div>
  );
}
