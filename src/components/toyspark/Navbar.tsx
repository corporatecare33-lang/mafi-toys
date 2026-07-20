import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Heart, Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { useSearch } from "@/context/search-context";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import logo from "@/assets/mafi-toys-logo.png";

const NAV = [
  { id: "home", label: "Home", route: "/" },
  { id: "products", label: "Products", route: "/products" },
  { id: "about", label: "About", route: "/about" },
  { id: "contact", label: "Contact", route: "/" },
];

export function Navbar() {
  const { count, openCart } = useCart();
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>("[data-site-navbar]");
    if (!navbar) return;

    const updateNavbarHeight = () => {
      if (mobileOpen) return;
      document.documentElement.style.setProperty(
        "--site-navbar-height",
        `${navbar.getBoundingClientRect().height}px`,
      );
    };

    updateNavbarHeight();
    const observer = new ResizeObserver(updateNavbarHeight);
    observer.observe(navbar);
    window.addEventListener("resize", updateNavbarHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (pathname !== "/") return;

    const id = window.location.hash.slice(1);
    if (!id) return;

    const frame = window.requestAnimationFrame(() => scrollToSection(id));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const go = async (id: string, route: string) => {
    setMobileOpen(false);

    // If it's a different page route, navigate to that route
    if (route !== "/") {
      await navigate({ to: route as "/" | "/products" | "/about" });
      return;
    }

    // If we're on home page and want to scroll to section
    if (pathname === "/") {
      scrollToSection(id);
      return;
    }

    // Navigate to home page with hash
    await navigate({ to: "/", hash: id });
    window.requestAnimationFrame(() => scrollToSection(id));
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      void navigate({ to: "/products" });
    }
  };

  return (
    <header
      data-site-navbar
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b border-brand-pink/20 bg-white/95 backdrop-blur-xl transition-all duration-300 md:border-b-0",
        scrolled
          ? "shadow-[0_10px_40px_-15px_rgba(236,72,153,0.35)] md:bg-white/90"
          : "shadow-[0_8px_24px_-18px_rgba(30,30,30,0.45)] md:bg-white/75 md:shadow-none",
      )}
    >
      {/* Main bar */}
      <div className="mx-auto flex min-h-[68px] max-w-7xl items-center gap-2 px-4 py-2 sm:gap-3 md:min-h-0 md:px-6 md:py-4 xl:gap-4 xl:px-8">
        {/* Logo */}
        <button
          onClick={() => void go("home", "/")}
          className="flex shrink-0 items-center gap-2 transition-transform hover:scale-105"
          aria-label="Mafi Toys home"
        >
          <img src={logo} alt="Mafi Toys" className="h-12 w-auto object-contain md:h-14 xl:h-16" />
        </button>

        {/* Nav pills */}
        <nav className="mx-2 hidden items-center gap-1 min-[1100px]:flex">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => void go(n.id, n.route)}
              className="group relative rounded-full px-4 py-2 text-sm font-bold text-foreground/80 transition-colors hover:text-brand-pink-deep"
            >
              {n.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-gradient-to-r from-brand-pink-deep to-brand-orange transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </nav>

        {/* Search */}
        <form onSubmit={onSearchSubmit} className="hidden min-w-0 flex-1 md:flex" role="search">
          <div className="group relative w-full max-w-lg mx-auto">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red opacity-60 blur-md transition duration-300 group-focus-within:opacity-100 group-hover:opacity-90" />
            <div className="relative flex items-center rounded-full bg-white p-1 pl-5 shadow-lg ring-1 ring-brand-pink/40">
              <Search className="mr-2 h-4 w-4 text-brand-pink-deep" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search magical toys..."
                className="h-9 border-0 bg-transparent px-0 text-sm shadow-none focus-visible:ring-0"
                aria-label="Search products"
              />
              <Button
                type="submit"
                size="sm"
                className="h-9 rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red px-5 text-white shadow-md hover:shadow-lg hover:opacity-95"
              >
                <Search className="h-4 w-4 md:hidden" />
                <span className="hidden md:inline">Search</span>
              </Button>
            </div>
          </div>
        </form>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-2">
          <button
            aria-label="Wishlist"
            className="hidden h-11 w-11 place-items-center rounded-full ring-1 ring-brand-pink/40 bg-white text-brand-pink-deep shadow-sm transition hover:scale-105 hover:bg-brand-pink/30 min-[1100px]:grid"
          >
            <Heart className="h-5 w-5" />
          </button>
          <Link
            to="/cart"
            aria-label={`View cart, ${count} items`}
            className="relative grid h-10 w-10 place-items-center rounded-xl bg-white text-brand-pink-deep shadow-sm ring-1 ring-brand-pink/30 transition hover:scale-105 hover:bg-brand-pink/30 md:h-11 md:w-11 md:rounded-full md:ring-brand-pink/40"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-brand-red to-brand-orange px-1 text-[11px] font-bold text-white shadow-md ring-2 ring-white"
              >
                {count}
              </motion.span>
            )}
          </Link>
          <Button
            onClick={() => void go("contact", "/")}
            className="hidden rounded-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red px-5 text-white shadow-toy transition hover:shadow-lg hover:brightness-105 min-[1100px]:inline-flex"
          >
            <Sparkles className="mr-1.5 h-4 w-4" /> Buy Now
          </Button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-pink-deep to-brand-orange text-white shadow-md transition active:scale-95 md:h-11 md:w-11 md:rounded-full min-[1100px]:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-[18px] w-[18px] md:h-5 md:w-5" />
            ) : (
              <Menu className="h-[18px] w-[18px] md:h-5 md:w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-brand-pink-deep via-brand-orange to-brand-red opacity-70" />

      {mobileOpen && (
        <nav className="mx-3 mt-2 rounded-2xl border border-brand-pink/20 bg-white/[0.98] p-3 shadow-[0_18px_45px_-20px_rgba(30,30,30,0.35)] md:mx-0 md:mt-0 md:rounded-none md:border-x-0 md:border-b-0 md:px-4 md:pb-4 md:pt-2 md:shadow-none min-[1100px]:hidden">
          <form onSubmit={onSearchSubmit} className="mb-3 md:hidden" role="search">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/50" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search toys..."
                className="h-11 w-full rounded-xl border-brand-pink/40 bg-brand-pink/5 pl-9 shadow-none"
                aria-label="Search products"
              />
            </div>
          </form>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => void go(n.id, n.route)}
              className="block w-full border-b border-border/60 px-3 py-3 text-left text-sm font-semibold transition-colors last:border-b-0 hover:bg-brand-pink/20 hover:text-brand-pink-deep md:rounded-lg md:border-b-0 md:text-base md:hover:bg-brand-pink/40"
            >
              {n.label}
            </button>
          ))}
          <Button
            onClick={() => void go("contact", "/")}
            className="mt-3 w-full rounded-xl bg-gradient-to-r from-brand-pink-deep to-brand-orange text-white shadow-md md:mt-2 md:rounded-full"
          >
            Buy Now
          </Button>
        </nav>
      )}
    </header>
  );
}
