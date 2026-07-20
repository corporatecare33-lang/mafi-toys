import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Sophia M.",
    role: "Mom of Lily, 5",
    color: "from-brand-pink to-brand-pink-deep",
    accent: "bg-brand-pink/15",
    text: "My daughter absolutely adores her unicorn plush! The quality is amazing and shipping was super fast. ToySpark is now our go-to.",
  },
  {
    name: "Aisha K.",
    role: "Mom of Zara, 7",
    color: "from-brand-peach to-brand-orange",
    accent: "bg-brand-peach/25",
    text: "The princess doll became Zara's best friend overnight. Beautiful craftsmanship and such cheerful colors — exactly as pictured!",
  },
  {
    name: "Emma R.",
    role: "Mom of twins, 4",
    color: "from-brand-purple to-brand-sky",
    accent: "bg-brand-purple/20",
    text: "We ordered the kitchen set for the twins and they haven't stopped 'cooking' since. So happy with this magical little brand.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden py-14 sm:py-20 md:py-24 lg:py-28">
      <div className="absolute inset-0 -z-10 gradient-hero opacity-30" />
      <div className="absolute -top-24 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-pink/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 -z-10 h-72 w-72 rounded-full bg-brand-purple/20 blur-3xl" />
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
            Loved By Families
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pink-deep" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            What Parents <span className="gradient-text">Say</span> ❤️
          </h2>
          <p className="mt-4 text-base text-foreground/60 md:text-lg">
            Real stories from families who chose magic, quality and joy.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-2 text-sm sm:flex-row sm:gap-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-brand-orange text-brand-orange" />
              ))}
            </div>
            <span className="font-semibold text-foreground/80">4.9 / 5 · 2,400+ reviews</span>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group relative overflow-hidden rounded-3xl bg-white p-6 shadow-md ring-1 ring-black/5 transition-all hover:shadow-toy sm:p-8 ${i === 1 ? "lg:-translate-y-4" : ""}`}
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full ${r.accent} blur-2xl transition-transform duration-500 group-hover:scale-125`}
              />
              <Quote className="absolute right-6 top-6 h-10 w-10 rotate-180 text-brand-pink/40" />
              <div className="mb-5 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-5 w-5 fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <p className="relative text-base leading-relaxed text-foreground/85">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-7 flex items-center gap-3 border-t border-dashed border-foreground/10 pt-5">
                <div
                  className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${r.color} font-display text-xl font-bold text-white shadow-lg`}
                >
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold">{r.name}</h4>
                  <p className="text-xs text-foreground/60">{r.role} · Verified Buyer</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
