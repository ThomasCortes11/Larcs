import type { CheckoutPayload, PaymentGateway, PaymentProviderKey, PaymentResult } from "./types";

function fakeResult(provider: PaymentProviderKey, payload: CheckoutPayload): PaymentResult {
  return {
    provider,
    status: "pending",
    transactionId: `${provider}-${payload.reference}-${Date.now()}`,
    redirectUrl: `/pago?status=pending&provider=${provider}`
  };
}

export const stripeGateway: PaymentGateway = {
  provider: "stripe",
  async createPayment(payload) {
    return fakeResult("stripe", payload);
  }
};

export const mercadoPagoGateway: PaymentGateway = {
  provider: "mercado-pago",
  async createPayment(payload) {
    return fakeResult("mercado-pago", payload);
  }
};

export const wompiGateway: PaymentGateway = {
  provider: "wompi",
  async createPayment(payload) {
    return fakeResult("wompi", payload);
  }
};

export const payUGateway: PaymentGateway = {
  provider: "payu",
  async createPayment(payload) {
    return fakeResult("payu", payload);
  }
};
