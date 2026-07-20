import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/toyspark/Navbar";
import { Hero } from "@/components/toyspark/Hero";
import { Categories } from "@/components/toyspark/Categories";
import { Products } from "@/components/toyspark/Products";
import { Reviews } from "@/components/toyspark/Reviews";
import { Contact } from "@/components/toyspark/Contact";
import { Footer } from "@/components/toyspark/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <Products />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
