import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Sparkles, Banknote, CheckCircle2, Download, Home, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart, type CartItem } from "@/context/cart-context";
import { Navbar } from "@/components/toyspark/Navbar";
import { Footer } from "@/components/toyspark/Footer";
import logo from "@/assets/toyshop_logo.jpg";
import { toast } from "sonner";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Checkout — Toy Shop" },
      { name: "description", content: "Place your order with cash on delivery." },
      { property: "og:title", content: "Checkout — Toy Shop" },
      { property: "og:description", content: "Place your order with cash on delivery." },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal > 0 && subtotal < 100 ? 8 : 0;
  const total = subtotal + shipping;
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  // Empty cart and no order placed yet → nothing to check out.
  useEffect(() => {
    if (!order && items.length === 0) {
      const t = setTimeout(() => navigate({ to: "/cart" }), 1200);
      return () => clearTimeout(t);
    }
  }, [order, items.length, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pink/30 via-background to-background font-body text-foreground">
      <Navbar />

      <main className="pt-24 pb-16 md:pt-40 md:pb-20 xl:pt-44">
        {order ? (
          <ThankYou order={order} />
        ) : items.length === 0 ? (
          <div className="mx-auto max-w-xl px-4 text-center">
            <p className="text-foreground/70">Your cart is empty — taking you back…</p>
          </div>
        ) : (
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Link
                to="/cart"
                className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-pink-deep hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> Back to cart
              </Link>
              <h1 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">
                Complete Your <span className="text-brand-pink-deep">Order</span>
              </h1>
              <p className="mt-2 text-foreground/70">
                Fill in your delivery details — you pay cash when it arrives.
              </p>
            </motion.div>

            <CheckoutForm
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onPlaced={(o) => {
                setOrder(o);
                clear();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

// ============ Checkout + Thank you + Invoice ============

type PlacedOrder = {
  invoiceNo: string;
  date: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  note?: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

const checkoutSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(6, "Please enter a valid phone"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(5, "Please enter your address"),
  note: z.string().optional(),
});
type CheckoutValues = z.infer<typeof checkoutSchema>;

function CheckoutForm({
  items,
  subtotal,
  shipping,
  total,
  onPlaced,
}: {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onPlaced: (o: PlacedOrder) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({ resolver: zodResolver(checkoutSchema) });

  const onSubmit = async (data: CheckoutValues) => {
    await new Promise((r) => setTimeout(r, 600));
    const invoiceNo = `TOY-${Date.now().toString().slice(-8)}`;
    const order: PlacedOrder = {
      invoiceNo,
      date: new Date().toLocaleString(),
      ...data,
      items,
      subtotal,
      shipping,
      total,
    };
    toast.success("Order placed!", { description: `Invoice ${invoiceNo}` });
    onPlaced(order);
  };

  return (
    <motion.section
      id="checkout"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-[2rem] bg-gradient-to-br from-brand-pink-deep/60 via-brand-orange/50 to-brand-purple/50 p-[1.5px] shadow-[0_30px_80px_-30px_rgba(236,72,153,0.35)]"
    >
      <div className="grid overflow-hidden rounded-[calc(2rem-1.5px)] bg-white/95 backdrop-blur-xl lg:grid-cols-5">
        <aside className="relative overflow-hidden bg-gradient-to-br from-brand-pink-deep via-brand-orange to-brand-red p-5 text-white sm:p-8 lg:col-span-2 lg:p-10">
          <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest ring-1 ring-white/30">
            <Sparkles className="h-3 w-3" /> Checkout
          </span>
          <h3 className="mt-4 font-display text-3xl font-bold md:text-4xl">Cash on Delivery</h3>
          <p className="mt-2 text-sm text-white/85">
            Pay in cash when your order arrives at your doorstep — no cards, no hassle.
          </p>

          <div className="mt-8 rounded-2xl bg-white/15 p-5 ring-1 ring-white/25 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/25">
                <Banknote className="h-5 w-5" />
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                  Payment Method
                </div>
                <div className="font-bold">Cash on Delivery (COD)</div>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-white/85">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5" /> Pay when you receive
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5" /> Inspect before paying
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5" /> Free delivery over $100
              </li>
            </ul>
          </div>

          <div className="mt-8 rounded-2xl bg-white/10 p-4 text-sm ring-1 ring-white/20">
            <div className="flex justify-between">
              <span className="text-white/80">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-white/80">Shipping</span>
              <span className="font-semibold">
                {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-white/20 pt-3">
              <span className="font-bold">Total</span>
              <span className="font-display text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        </aside>

        <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-8 lg:col-span-3 lg:p-10">
          <h3 className="font-display text-2xl font-bold">Delivery details</h3>
          <p className="mt-1 text-sm text-foreground/60">We'll call to confirm before dispatch.</p>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <FieldC label="Full name" error={errors.name?.message}>
              <Input
                placeholder="Jane Doe"
                {...register("name")}
                className="h-12 rounded-xl border-brand-pink/40 bg-white/70"
              />
            </FieldC>
            <FieldC label="Phone" error={errors.phone?.message}>
              <Input
                placeholder="+880 1XXX XXX XXX"
                {...register("phone")}
                className="h-12 rounded-xl border-brand-pink/40 bg-white/70"
              />
            </FieldC>
            <FieldC label="Email" error={errors.email?.message}>
              <Input
                type="email"
                placeholder="jane@email.com"
                {...register("email")}
                className="h-12 rounded-xl border-brand-pink/40 bg-white/70"
              />
            </FieldC>
            <FieldC label="Address" error={errors.address?.message}>
              <Input
                placeholder="House, Road, City"
                {...register("address")}
                className="h-12 rounded-xl border-brand-pink/40 bg-white/70"
              />
            </FieldC>
          </div>
          <div className="mt-5">
            <FieldC label="Order note (optional)" error={errors.note?.message}>
              <Textarea
                rows={3}
                placeholder="Any special instructions?"
                {...register("note")}
                className="rounded-xl border-brand-pink/40 bg-white/70"
              />
            </FieldC>
          </div>

          <label className="mt-5 flex cursor-not-allowed items-center gap-3 rounded-2xl border-2 border-brand-pink-deep/70 bg-brand-pink/10 p-4">
            <input type="radio" checked readOnly className="h-4 w-4 accent-brand-pink-deep" />
            <Banknote className="h-5 w-5 text-brand-pink-deep" />
            <div>
              <div className="font-bold">Cash on Delivery</div>
              <div className="text-xs text-foreground/60">Only payment method available</div>
            </div>
          </label>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 h-14 w-full rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red text-base font-bold text-white shadow-toy hover:brightness-105"
          >
            {isSubmitting ? "Placing order…" : `Place Order · $${total.toFixed(2)}`}
          </Button>
          <p className="mt-3 text-center text-xs text-foreground/60">
            By placing this order you agree to our friendly terms. 💕
          </p>
        </form>
      </div>
    </motion.section>
  );
}

function FieldC({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold">{label}</Label>
      {children}
      {error && <p className="text-xs text-brand-red">{error}</p>}
    </div>
  );
}

async function downloadInvoicePDF(order: PlacedOrder) {
  const { jsPDF } = await import("jspdf");
  const autoTableMod = await import("jspdf-autotable");
  const autoTable = (autoTableMod as unknown as { default: (doc: unknown, opts: unknown) => void })
    .default;

  const doc = new jsPDF();
  // Header band
  doc.setFillColor(236, 72, 153);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("TOY SHOP", 14, 18);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Every Children's First Choice", 14, 24);

  doc.setTextColor(30, 30, 30);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 160, 18);

  // Meta
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  doc.text(`Invoice #: ${order.invoiceNo}`, 14, 40);
  doc.text(`Date: ${order.date}`, 14, 46);
  doc.text(`Payment: Cash on Delivery`, 14, 52);

  doc.setFont("helvetica", "bold");
  doc.text("Billed To:", 130, 40);
  doc.setFont("helvetica", "normal");
  doc.text(order.name, 130, 46);
  doc.text(order.phone, 130, 52);
  doc.text(order.email, 130, 58);
  const addrLines = doc.splitTextToSize(order.address, 65) as string[];
  doc.text(addrLines, 130, 64);

  autoTable(doc, {
    startY: 85,
    head: [["#", "Item", "Qty", "Price", "Total"]],
    body: order.items.map((it, i) => [
      String(i + 1),
      it.name,
      String(it.quantity),
      `$${it.price.toFixed(2)}`,
      `$${(it.price * it.quantity).toFixed(2)}`,
    ]),
    headStyles: { fillColor: [236, 72, 153], textColor: 255, fontStyle: "bold" },
    styles: { fontSize: 10, cellPadding: 3 },
    columnStyles: {
      0: { cellWidth: 12 },
      2: { halign: "center" },
      3: { halign: "right" },
      4: { halign: "right" },
    },
  });

  const finalY =
    (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 10;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Subtotal:", 140, finalY);
  doc.text(`$${order.subtotal.toFixed(2)}`, 195, finalY, { align: "right" });
  doc.text("Shipping:", 140, finalY + 6);
  doc.text(order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`, 195, finalY + 6, {
    align: "right",
  });
  doc.setDrawColor(236, 72, 153);
  doc.line(140, finalY + 10, 195, finalY + 10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("TOTAL:", 140, finalY + 17);
  doc.text(`$${order.total.toFixed(2)}`, 195, finalY + 17, { align: "right" });

  // Footer
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Thank you for shopping with Toy Shop!", 14, 280);
  doc.text("Bashundhara City, Level-1, Block-C, Shop-77, Dhaka · 01781-984427", 14, 286);

  doc.save(`${order.invoiceNo}.pdf`);
}

function ThankYou({ order }: { order: PlacedOrder }) {
  return (
    <div className="mx-auto max-w-4xl px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-[2rem] bg-white shadow-toy ring-1 ring-brand-pink/40"
      >
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-pink-deep via-brand-orange to-brand-red p-6 text-center text-white sm:p-10">
          <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/15 blur-3xl" />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-brand-pink-deep shadow-xl"
          >
            <CheckCircle2 className="h-10 w-10" />
          </motion.div>
          <h1 className="mt-5 break-words font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Thank You{order.name ? `, ${order.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="mt-3 text-white/90 md:text-lg">
            Your order has been placed successfully. We'll call you shortly to confirm.
          </p>
          <div className="mt-5 inline-flex max-w-full flex-wrap items-center justify-center gap-2 break-all rounded-full bg-white/20 px-4 py-2 text-sm ring-1 ring-white/30 backdrop-blur">
            <Package className="h-4 w-4" />
            Invoice <span className="font-bold">{order.invoiceNo}</span>
          </div>
        </div>

        {/* Invoice body */}
        <div className="p-5 sm:p-8 md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-brand-pink/40 pb-6">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Toy Shop"
                width={512}
                height={512}
                className="h-12 w-auto shrink-0 object-contain sm:h-14"
              />
              <div>
                <div className="font-display text-xl font-bold">Toy Shop</div>
                <p className="text-xs text-foreground/60">
                  Bashundhara City, Level-1, Block-C, Shop-77
                </p>
                <p className="text-xs text-foreground/60">Dhaka, Bangladesh · 01781-984427</p>
              </div>
            </div>
            <div className="text-left text-sm sm:text-right">
              <div className="text-xs uppercase tracking-widest text-foreground/50">Payment</div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-pink/20 px-3 py-1 font-semibold text-brand-pink-deep">
                <Banknote className="h-4 w-4" /> Cash on Delivery
              </div>
              <div className="mt-2 text-xs text-foreground/60">{order.date}</div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-foreground/50">
                Billed To
              </div>
              <p className="mt-1 font-semibold">{order.name}</p>
              <p className="text-sm text-foreground/70">{order.phone}</p>
              <p className="text-sm text-foreground/70">{order.email}</p>
              <p className="mt-1 text-sm text-foreground/70">{order.address}</p>
            </div>
            {order.note && (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-foreground/50">
                  Note
                </div>
                <p className="mt-1 text-sm text-foreground/70">{order.note}</p>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="mt-8 overflow-x-auto rounded-2xl ring-1 ring-brand-pink/30">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-brand-pink/20 text-xs uppercase tracking-wider text-foreground/70">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((it) => (
                  <tr key={it.id} className="border-t border-brand-pink/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={it.image}
                          alt={it.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <span className="font-semibold">{it.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">{it.quantity}</td>
                    <td className="px-4 py-3 text-right">${it.price.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right font-semibold">
                      ${(it.price * it.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-6 ml-auto w-full max-w-sm space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-foreground/70">Subtotal</span>
              <span className="font-semibold">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/70">Shipping</span>
              <span className="font-semibold">
                {order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="my-2 border-t border-dashed border-brand-pink/60" />
            <div className="flex items-baseline justify-between">
              <span className="font-bold">Total</span>
              <span className="font-display text-3xl font-bold text-brand-pink-deep">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={() => downloadInvoicePDF(order)}
              className="flex-1 rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red py-6 text-base font-bold text-white shadow-toy hover:brightness-105"
            >
              <Download className="mr-2 h-4 w-4" /> Download Invoice (PDF)
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 rounded-full border-2 border-brand-pink-deep py-6 text-base font-semibold text-brand-pink-deep hover:bg-brand-pink/20"
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
