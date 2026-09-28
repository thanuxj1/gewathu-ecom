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
export type PaymentMethod = "COD" | "BANK_TRANSFER";

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
};

export type SessionUser = {
  id: string;
  name: string | null;
  email: string;
  role: "CUSTOMER" | "ADMIN";
};
