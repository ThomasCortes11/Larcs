export type PaymentProviderKey = "stripe" | "mercado-pago" | "wompi" | "payu";

export interface CheckoutPayload {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
  shippingMethod: "standard" | "express";
  amount: number;
  currency: "COP";
  reference: string;
}

export interface PaymentResult {
  provider: PaymentProviderKey;
  status: "approved" | "pending" | "rejected";
  transactionId: string;
  redirectUrl?: string;
}

export interface PaymentGateway {
  provider: PaymentProviderKey;
  createPayment: (payload: CheckoutPayload) => Promise<PaymentResult>;
}
