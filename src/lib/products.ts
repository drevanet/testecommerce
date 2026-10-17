export const categories = [
  { name: "Audio", slug: "audio", description: "Sound that moves you", icon: "headphones" },
  { name: "Wearables", slug: "wearables", description: "Smart looks, smarter tech", icon: "watch" },
  { name: "Mobile", slug: "mobile", description: "Your world, upgraded", icon: "smartphone" },
  { name: "Computing", slug: "computing", description: "Power your next big thing", icon: "laptop" },
  { name: "Gaming", slug: "gaming", description: "Level up everything", icon: "gamepad-2" },
  { name: "Home Tech", slug: "home-tech", description: "A little more intelligent", icon: "house" }
];

export type ProductView = {
  id: string; slug: string; name: string; description: string; category: string;
  price: number; compareAt: number | null; image: string; badge: string | null;
  rating: number; stock: number; featured: boolean;
};

export const fallbackProducts: ProductView[] = [
  // Used only as a friendly visual fallback if the database has not been seeded yet.
  {
    id: "demo-1", slug: "sonic-pro-headphones", name: "Sonic Pro Wireless Headphones",
    description: "Immersive sound with adaptive noise cancellation.", category: "Audio",
    price: 12999, compareAt: 15999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85",
    badge: "BESTSELLER", rating: 4.9, stock: 25, featured: true
  }
];
