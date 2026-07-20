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
import slide3 from "@/assets/slider/s3.jpg";
import slide6 from "@/assets/slider/s6.jpg";

const SLIDES = [slide3, slide6];

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
              <img
                src={src}
                alt={`Banner ${i + 1}`}
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/9] md:aspect-auto md:h-[60vh] lg:h-[70vh] xl:h-[85vh]"
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
