import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/cart-context";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(6, "Please enter a valid phone"),
  email: z.string().email("Please enter a valid email"),
  address: z.string().min(5, "Please enter your address"),
  message: z.string().min(5, "Please add a short message"),
});
type FormValues = z.infer<typeof schema>;

export function Contact() {
  const { items, subtotal, clear } = useCart();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    if (items.length > 0) {
      toast.success("Order placed! 🎉", {
        description: `Thanks ${data.name}! Total ৳${subtotal.toFixed(0)} — confirmation sent to ${data.email}.`,
      });
      clear();
    } else {
      toast.success("Message sent! 💌", {
        description: `Thanks ${data.name}, we'll be in touch soon.`,
      });
    }
    reset();
  };

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24 md:py-28 lg:py-32">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-pink/40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-brand-peach/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-brand-purple/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange shadow-sm ring-1 ring-brand-pink/40 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Place Your Order
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Let's Make Some <span className="gradient-text">Magic</span>
          </h2>
          <p className="mt-4 text-foreground/70 md:text-lg">
            Fill in your details to place an order or send us a message — we reply within 24 hours.
          </p>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-xs font-semibold text-foreground/70"
        >
          {[
            { icon: Truck, label: "Fast Delivery" },
            { icon: ShieldCheck, label: "100% Authentic" },
            { icon: CheckCircle2, label: "Easy Returns" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm ring-1 ring-brand-pink/30 backdrop-blur"
            >
              <Icon className="h-4 w-4 text-brand-pink-deep" />
              {label}
            </span>
          ))}
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto mt-10 max-w-6xl sm:mt-14"
        >
          {/* Gradient border wrapper */}
          <div className="rounded-[2rem] bg-gradient-to-br from-brand-pink-deep/60 via-brand-orange/50 to-brand-purple/50 p-[1.5px] shadow-[0_30px_80px_-30px_rgba(236,72,153,0.35)]">
            <div className="grid overflow-hidden rounded-[calc(2rem-1.5px)] bg-white/85 backdrop-blur-xl lg:grid-cols-5">
              {/* Left: contact info */}
              <aside className="relative overflow-hidden bg-gradient-to-br from-brand-pink-deep via-brand-orange to-brand-red p-5 text-white sm:p-8 lg:col-span-2 lg:p-10">
                <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

                <h3 className="font-display text-2xl font-bold md:text-3xl">Get in touch</h3>
                <p className="mt-2 text-sm text-white/85">
                  Have a question or ready to place an order? We're here to help.
                </p>

                <ul className="mt-8 space-y-5 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                        Phone
                      </div>
                      <a href="tel:01781984427" className="font-semibold hover:underline">
                        01781-984427
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                        Email
                      </div>
                      <a
                        href="mailto:ismailsiam231@gmail.com"
                        className="break-all font-semibold hover:underline"
                      >
                        ismailsiam231@gmail.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/30 backdrop-blur">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                        Address
                      </div>
                      <p className="font-semibold leading-relaxed">
                        Bashundhara City Shopping Mall,
                        <br />
                        Level-1, Block-C, Shop-77,
                        <br />
                        Dhaka, Bangladesh, 1229
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-10 rounded-2xl bg-white/15 p-4 text-xs text-white/90 ring-1 ring-white/25 backdrop-blur">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" /> Working hours
                  </div>
                  <p className="mt-1">Sat – Thu · 10:00 AM – 10:00 PM</p>
                </div>
              </aside>

              {/* Right: form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-5 sm:p-8 lg:col-span-3 lg:p-10">
                {items.length > 0 && (
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-gradient-to-r from-brand-pink/40 to-brand-peach/40 p-4 text-sm ring-1 ring-brand-pink/40">
                    <div>
                      <div className="font-bold">Order summary</div>
                      <p className="text-xs text-foreground/70">
                        {items.reduce((s, i) => s + i.quantity, 0)} item(s) in cart
                      </p>
                    </div>
                    <div className="text-lg font-bold text-brand-pink-deep">
                      ৳{subtotal.toFixed(0)}
                    </div>
                  </div>
                )}

                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Full name" error={errors.name?.message}>
                    <Input
                      placeholder="Jane Doe"
                      {...register("name")}
                      className="h-12 rounded-xl border-brand-pink/40 bg-white/70 focus-visible:ring-brand-pink-deep"
                    />
                  </Field>
                  <Field label="Phone" error={errors.phone?.message}>
                    <Input
                      placeholder="+880 1XXX XXX XXX"
                      {...register("phone")}
                      className="h-12 rounded-xl border-brand-pink/40 bg-white/70 focus-visible:ring-brand-pink-deep"
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <Input
                      type="email"
                      placeholder="jane@email.com"
                      {...register("email")}
                      className="h-12 rounded-xl border-brand-pink/40 bg-white/70 focus-visible:ring-brand-pink-deep"
                    />
                  </Field>
                  <Field label="Address" error={errors.address?.message}>
                    <Input
                      placeholder="123 Main St, City"
                      {...register("address")}
                      className="h-12 rounded-xl border-brand-pink/40 bg-white/70 focus-visible:ring-brand-pink-deep"
                    />
                  </Field>
                </div>
                <div className="mt-5">
                  <Field label="Message" error={errors.message?.message}>
                    <Textarea
                      rows={4}
                      placeholder="Any special instructions?"
                      {...register("message")}
                      className="rounded-xl border-brand-pink/40 bg-white/70 focus-visible:ring-brand-pink-deep"
                    />
                  </Field>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group mt-7 h-14 w-full rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red text-base font-bold text-white shadow-toy transition hover:brightness-105 hover:shadow-lg"
                >
                  <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  {items.length > 0 ? "Submit Order" : "Send Message"}
                </Button>

                <p className="mt-4 text-center text-xs text-foreground/60">
                  By submitting, you agree to our friendly terms. We never share your info. 💕
                </p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
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
