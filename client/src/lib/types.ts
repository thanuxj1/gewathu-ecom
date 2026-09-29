export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  unit: string | null;
  badge: string | null;
  featured: boolean;
  priceCents: number;
  imageUrl: string | null;
  stock: number;
  categoryId: string;
  category: Category;
};

export type OrderStatus = "PENDING" | "PAID" | "FAILED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type PaymentMethod = "COD" | "BANK_TRANSFER" | "PAYHERE";

export type PayhereCheckoutInfo = {
  merchantId: string;
  hash: string;
  sandbox: boolean;
  notifyUrl: string;
  currency: "LKR";
};

export type OrderItem = {
  id: string;
  productId: string;
  quantity: number;
  priceCents: number;
  product: Product;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  notes: string | null;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  totalCents: number;
  items: OrderItem[];
  createdAt: string;
  payhere?: PayhereCheckoutInfo;
};

export type SessionUser = {
  id: string;
  name: string | null;
  email: string;
  role: "CUSTOMER" | "ADMIN";
};

// --- CMS content ---

export type HeroSlide = {
  id: string;
  order: number;
  eyebrow: string;
  titleWhite: string;
  titleAccent: string;
  body: string;
  imageUrl: string | null;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  active: boolean;
};

export type TrustBadgeItem = {
  id: string;
  order: number;
  icon: string;
  title: string;
  description: string;
  active: boolean;
};

export type TestimonialItem = {
  id: string;
  order: number;
  quote: string;
  author: string;
  active: boolean;
};

export type GuideCardItem = {
  id: string;
  order: number;
  number: string;
  title: string;
  blurb: string;
  active: boolean;
};

export type SiteSettings = {
  id: string;
  deliveryBannerText: string;
  logoUrl: string | null;
  footerTagline: string;
  whatsappNumber: string;
  whatsappLink: string;
  contactEmail: string;
  contactLocation: string;
  seasonalEyebrow: string;
  seasonalTitle: string;
  seasonalBody: string;
  seasonalCtaLabel: string;
  starterEyebrow: string;
  starterTitle: string;
  starterBody: string;
  starterBadge: string;
  starterCtaLabel: string;
  newsletterEyebrow: string;
  newsletterTitle: string;
  newsletterBody: string;
};

export type HomepageContent = {
  settings: SiteSettings;
  heroSlides: HeroSlide[];
  trustBadges: TrustBadgeItem[];
  testimonials: TestimonialItem[];
  guideCards: GuideCardItem[];
};

export type AdminAnalytics = {
  revenueTrend: { date: string; totalCents: number }[];
  statusBreakdown: { status: OrderStatus; count: number }[];
  topProducts: { productId: string; name: string; quantitySold: number }[];
};
