import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Sparkles, Users, Shield, MapPin, Phone, Mail } from "lucide-react";
import { Navbar } from "@/components/toyspark/Navbar";
import { Footer } from "@/components/toyspark/Footer";
import logo from "@/assets/mafi-toys-logo.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Mafi Toys" },
      { name: "description", content: "Learn about Mafi Toys - Every Children's First Choice" },
      { property: "og:title", content: "About Us — Mafi Toys" },
      {
        property: "og:description",
        content: "Learn about Mafi Toys - Every Children's First Choice",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />

      <main className="pt-24 pb-16 md:pt-32 md:pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-pink/30 via-brand-orange/20 to-brand-purple/30 py-16 md:py-24">
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-pink/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand-orange/30 blur-3xl" />
          <div className="relative mx-auto max-w-4xl px-4 text-center md:px-8">
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              src={logo}
              alt="Mafi Toys"
              className="mx-auto mb-6 h-32 w-auto object-contain"
            />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl font-bold sm:text-5xl md:text-6xl"
            >
              About <span className="gradient-text">Mafi Toys</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-lg text-foreground/70 md:text-xl"
            >
              Every Children's First Choice
            </motion.p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-white p-8 shadow-toy ring-1 ring-brand-pink/40 md:p-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-pink-deep to-brand-orange text-white">
                  <Heart className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-bold">Our Story</h2>
              </div>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Mafi Toys was founded with a simple mission: to bring joy and magic into the lives
                  of children through high-quality, safe, and delightful toys. We believe every child
                  deserves toys that spark imagination, encourage creativity, and create lasting
                  memories.
                </p>
                <p>
                  Located in the heart of Dhaka at Bashundhara City, we've been serving families for
                  years with authentic, carefully curated toys from around the world. From cuddly
                  plush companions to educational playsets, each item in our collection is chosen with
                  love and care.
                </p>
                <p>
                  We're not just a toy store—we're part of your child's journey of discovery, wonder,
                  and growth. Thank you for making us your first choice! 💕
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-gradient-to-b from-transparent to-brand-pink/10 py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                Why Choose <span className="gradient-text">Us?</span>
              </h2>
              <p className="mt-3 text-foreground/70">What makes Mafi Toys special</p>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ValueCard
                icon={Sparkles}
                title="Authentic Products"
                description="100% genuine toys from trusted brands worldwide. We never compromise on quality."
                color="pink"
              />
              <ValueCard
                icon={Shield}
                title="Safety First"
                description="All our toys meet international safety standards. Your child's safety is our priority."
                color="orange"
              />
              <ValueCard
                icon={Users}
                title="Customer Care"
                description="Friendly support team ready to help. We're here for you every step of the way."
                color="purple"
              />
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl bg-gradient-to-br from-brand-pink-deep via-brand-orange to-brand-red p-8 text-white shadow-toy md:p-12"
            >
              <h2 className="mb-8 text-center font-display text-3xl font-bold">Get in Touch</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <ContactItem icon={MapPin} title="Visit Us" content="Bashundhara City, Level-1, Block-C, Shop-77, Dhaka" />
                <ContactItem icon={Phone} title="Call Us" content="01781-984427" />
                <ContactItem icon={Mail} title="Email Us" content="info@mafitoys.com" />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: typeof Sparkles;
  title: string;
  description: string;
  color: "pink" | "orange" | "purple";
}) {
  const colors = {
    pink: {
      grad: "from-brand-pink-deep to-brand-red",
      ring: "ring-brand-pink/40",
    },
    orange: {
      grad: "from-brand-orange to-brand-red",
      ring: "ring-brand-orange/40",
    },
    purple: {
      grad: "from-brand-purple to-brand-pink-deep",
      ring: "ring-brand-purple/40",
    },
  }[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group rounded-3xl bg-white p-6 shadow-toy ring-1 ${colors.ring} hover:shadow-xl`}
    >
      <div
        className={`mb-4 inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${colors.grad} text-white shadow-md`}
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="font-display text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm text-foreground/70">{description}</p>
    </motion.div>
  );
}

function ContactItem({ icon: Icon, title, content }: { icon: typeof MapPin; title: string; content: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-white/20">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-1 text-sm text-white/90">{content}</p>
    </div>
  );
}
