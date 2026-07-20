import type { Product } from "@/context/cart-context";
import teddy from "@/assets/toy-teddy.jpg";
import doll from "@/assets/toy-doll.jpg";
import unicorn from "@/assets/toy-unicorn.jpg";
import fashionDoll from "@/assets/toy-fashion-doll.jpg";
import bunny from "@/assets/toy-bunny.jpg";
import kitchen from "@/assets/toy-kitchen.jpg";

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Cuddle Pink Teddy",
    description: "Super-soft pink teddy bear, perfect for hugs and naps.",
    price: 24.99,
    image: teddy,
    rating: 5,
  },
  {
    id: "p2",
    name: "Sparkle Princess Doll",
    description: "Glittering tiara and a sparkly gown — magic in every twirl.",
    price: 34.99,
    image: doll,
    rating: 5,
  },
  {
    id: "p3",
    name: "Rainbow Unicorn Plush",
    description: "A magical unicorn with a rainbow mane and shimmering horn.",
    price: 22.5,
    image: unicorn,
    rating: 5,
  },
  {
    id: "p4",
    name: "Sweet Sunshine Doll",
    description: "A cheerful little doll with a heart and pink-bow buns.",
    price: 19.99,
    image: fashionDoll,
    rating: 4,
  },
  {
    id: "p5",
    name: "Bow-Tie Bunny",
    description: "Fluffy white bunny with a darling pink ribbon bow.",
    price: 18.0,
    image: bunny,
    rating: 5,
  },
  {
    id: "p6",
    name: "Dream Kitchen Set",
    description: "Pretend play kitchen with stove, sink and tiny utensils.",
    price: 49.99,
    image: kitchen,
    rating: 5,
  },
];
