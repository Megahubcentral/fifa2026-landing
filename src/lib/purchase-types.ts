export type PPVProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  regular_price: number;
  sale_price: number | null;
  currency: string;
  image: string | null;
  access: {
    type: string;
    days: number;
  };
};

export type PurchaseResponse = {
  success: boolean;
  data: {
    order_id: number;
    product_id: number;
    total: number;
    currency: string;
    status: string;
    payment_url: string | null;
  };
};

export type AccessResponse = {
  success: boolean;
  data: {
    has_access: boolean;
    expires_at: string | null;
    order_id: number | null;
    product_id: number;
    subscription_status: string | null;
    purchased_at: string | null;
  };
};
