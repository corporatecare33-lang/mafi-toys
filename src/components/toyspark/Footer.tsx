import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
  Send,
  BadgeCheck,
  Truck,
  Headphones,
  BadgePercent,
  ArrowRight,
} from "lucide-react";
import { scrollToSection } from "@/lib/scroll";
import logo from "@/assets/mafi-toys-logo.png";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "products", label: "Products" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

const SOCIAL = [
  { Icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-brand-pink" },
  { Icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-brand-sky" },
  { Icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-brand-purple" },
  { Icon: Youtube, href: "#", label: "YouTube", color: "hover:bg-brand-red" },
];

const PERKS = [
  {
    Icon: Truck,
    title: "Shipping all over Bangladesh",
    desc: "Order from anywhere in Bangladesh and get your product delivered by Mafi Toys",
    iconStyle: "from-brand-pink-deep to-brand-red",
    glowStyle: "bg-brand-pink/40",
  },
  {
    Icon: Headphones,
    title: "Online call support",
    desc: "WhatsApp support available through text message only from 10:00 AM to 12:00 AM",
    iconStyle: "from-brand-orange to-brand-red",
    glowStyle: "bg-brand-peach/60",
  },
  {
    Icon: BadgePercent,
    title: "Special discount",
    desc: "We often offer special discount for our premium members",
    iconStyle: "from-brand-purple to-brand-pink-deep",
    glowStyle: "bg-brand-purple/30",
  },
  {
    Icon: BadgeCheck,
    title: "Satisfaction guaranteed",
    desc: "Your satisfaction is our unwavering promise — guaranteed",
    iconStyle: "from-brand-sky to-brand-purple",
    glowStyle: "bg-brand-sky/40",
  },
];

export function Footer() {
  return (
    <footer className="relative mt-16 overflow-hidden gradient-footer text-white">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-brand-pink/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-brand-purple/30 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Perks strip — white service highlights */}
      <div className="relative border-b border-brand-pink/20 bg-gradient-to-b from-white to-brand-pink/10 text-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-10 sm:grid-cols-2 md:px-8 lg:grid-cols-4 lg:py-12">
          {PERKS.map(({ Icon, title, desc, iconStyle, glowStyle }) => (
            <div
              key={title}
              className="group relative flex h-full items-start gap-4 overflow-hidden rounded-2xl bg-white p-5 shadow-[0_12px_35px_-24px_rgba(30,30,30,0.45)] ring-1 ring-black/[0.06] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-24px_rgba(236,72,153,0.35)] hover:ring-brand-pink/40 sm:p-6 lg:flex-col lg:gap-5"
            >
              <span
                className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full ${glowStyle} opacity-40 blur-2xl transition-opacity group-hover:opacity-70`}
              />
              <span
                className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${iconStyle} text-white shadow-md ring-4 ring-white`}
              >
                <Icon className="h-5 w-5 stroke-[1.8]" />
              </span>
              <div className="relative min-w-0">
                <h4 className="font-display text-base font-bold leading-snug text-foreground">
                  {title}
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="relative mx-auto max-w-7xl px-4 pt-14 md:px-8">
        <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur sm:p-6 lg:flex lg:items-center lg:justify-between lg:p-8">
          <div className="max-w-md">
            <h3 className="font-display text-2xl font-bold md:text-3xl">Join the Mafi family</h3>
            <p className="mt-1 text-sm text-white/80">
              Get 10% off your first order plus new arrivals in your inbox.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex w-full flex-col items-stretch gap-2 rounded-3xl bg-white/95 p-1.5 shadow-lg sm:flex-row sm:items-center sm:rounded-full lg:mt-0 lg:w-auto"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="min-w-0 flex-1 rounded-full bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none lg:w-72"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-red px-5 py-2.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-105"
            >
              Subscribe <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <div className="inline-flex items-center rounded-2xl bg-white/95 p-3 shadow-lg">
            <img src={logo} alt="Mafi Toys" className="h-16 w-auto object-contain" />
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80">
            Mafi Toys is Bangladesh&rsquo;s magical destination for beautifully crafted, safe and
            joyful toys — curated to spark imagination in every child.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIAL.map(({ Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`grid h-10 w-10 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15 transition-all hover:scale-110 hover:ring-white/40 ${color}`}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="font-display text-lg font-bold">Quick Links</h4>
          <span className="mt-2 block h-0.5 w-10 rounded-full bg-brand-yellow" />
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollToSection(l.id)}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-brand-yellow"
                >
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-display text-lg font-bold">Contact Us</h4>
          <span className="mt-2 block h-0.5 w-10 rounded-full bg-brand-yellow" />
          <ul className="mt-4 space-y-3.5 text-sm text-white/85">
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <Phone className="h-4 w-4 text-brand-yellow" />
              </span>
              <a href="tel:01781984427" className="hover:text-white">
                01781-984427
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <MapPin className="h-4 w-4 text-brand-yellow" />
              </span>
              <span className="leading-relaxed">
                Bashundhara City Shopping Mall
                <br />
                Level-1, Block-C, Shop-77
                <br />
                Dhaka, Bangladesh, 1229
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15">
                <Mail className="h-4 w-4 text-brand-yellow" />
              </span>
              <a href="mailto:ismailsiam231@gmail.com" className="break-all hover:text-white">
                ismailsiam231@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/15 bg-black/10 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text-xs text-white/70 md:flex-row md:px-8 md:text-left">
          <p>© {new Date().getFullYear()} Mafi Toys. All rights reserved.</p>
          <p>
            Design and Developed by{" "}
            <a
              href="https://digitalwebars.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-yellow hover:underline"
            >
              Digital Webars
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
