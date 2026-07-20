import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// Using only real product photos - removed promotional banners with external website links
import slide1 from "@/assets/slider/s1.png";
import slide3 from "@/assets/slider/s3.jpg";
import slide5 from "@/assets/slider/s5.png";
import slide6 from "@/assets/slider/s6.jpg";

// Ordered so the two Hot Wheels banners (s6, s5) never sit next to each other.
const SLIDES = [slide3, slide6, slide1, slide5];

export function Hero() {
  const autoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  return (
    <section
      id="home"
      className="relative w-full"
      style={{ paddingTop: "var(--site-navbar-height, 72px)" }}
    >
      <Carousel plugins={[autoplay.current]} opts={{ loop: true }} className="w-full">
        <CarouselContent>
          {SLIDES.map((src, i) => (
            <CarouselItem key={i}>
              {/* Mobile: natural ratio so the full banner is visible (no cropping).
                  md+: fixed viewport height with cover for a full-bleed look. */}
              <img
                src={src}
                alt={`Banner ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-auto w-full object-contain md:h-[60vh] md:object-cover lg:h-[70vh] xl:h-[85vh]"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 h-9 w-9 bg-white/80 text-foreground shadow-md hover:bg-white sm:left-4 sm:h-12 sm:w-12 md:left-6 md:h-14 md:w-14" />
        <CarouselNext className="right-2 h-9 w-9 bg-white/80 text-foreground shadow-md hover:bg-white sm:right-4 sm:h-12 sm:w-12 md:right-6 md:h-14 md:w-14" />
      </Carousel>
    </section>
  );
}
