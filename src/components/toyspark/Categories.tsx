import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { motion } from "motion/react";
import { scrollToSection } from "@/lib/scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import action from "@/assets/categories/action.jpg";
import animals from "@/assets/categories/animals.jpg";
import art from "@/assets/categories/art.jpg";
import baby from "@/assets/categories/baby.jpg";
import beach from "@/assets/categories/beach.jpg";
import building from "@/assets/categories/building.jpg";
import dolls from "@/assets/categories/dolls.jpg";
import educational from "@/assets/categories/educational.jpg";
import vehicles from "@/assets/categories/vehicles.jpg";
import plush from "@/assets/categories/plush.jpg";
import musical from "@/assets/categories/musical.jpg";
import sports from "@/assets/categories/sports.jpg";

const CATEGORIES = [
  { name: "Action Figures & Hero Toys", img: action, count: 11 },
  { name: "Animals & Nature-Inspired Toys", img: animals, count: 25 },
  { name: "Art & DIY Toys", img: art, count: 10 },
  { name: "Baby & Toddler Toys", img: baby, count: 17 },
  { name: "Beach & Water Toys", img: beach, count: 1 },
  { name: "Building & Construction Toys", img: building, count: 39 },
  { name: "Dolls & Dollhouses", img: dolls, count: 22 },
  { name: "Educational & STEM Toys", img: educational, count: 18 },
  { name: "Vehicles & RC Toys", img: vehicles, count: 14 },
  { name: "Plush & Soft Toys", img: plush, count: 27 },
  { name: "Musical Instruments", img: musical, count: 9 },
  { name: "Sports & Outdoor Toys", img: sports, count: 12 },
];

export function Categories() {
  const autoplay = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );
  return (
    <section className="bg-gradient-to-b from-background to-muted/40 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Explore
          </span>
          <h2 className="mt-3 font-heading text-3xl md:text-4xl">Shop by Category</h2>
          <p className="mt-2 text-sm text-muted-foreground">Discover toys your kids will love</p>
        </motion.div>

        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {CATEGORIES.map((c, i) => (
              <CarouselItem
                key={c.name}
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <motion.button
                  onClick={() => scrollToSection("products")}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  whileHover={{ y: -6 }}
                  className="group w-full text-center"
                >
                  <div className="relative overflow-hidden rounded-3xl bg-white p-2 shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-xl group-hover:ring-primary/30">
                    <img
                      src={c.img}
                      alt={c.name}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="aspect-square w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold leading-tight text-foreground md:text-base">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{c.count} Products</p>
                </motion.button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4" />
          <CarouselNext className="hidden md:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
}
