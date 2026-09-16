import {
  mercadoPagoGateway,
  payUGateway,
  stripeGateway,
  wompiGateway
} from "@/services/payments/gateways";
import type { PaymentGateway, PaymentProviderKey } from "@/services/payments/types";

const registry: Record<PaymentProviderKey, PaymentGateway> = {
  stripe: stripeGateway,
  "mercado-pago": mercadoPagoGateway,
  wompi: wompiGateway,
  payu: payUGateway
};

export function getPaymentGateway(provider: PaymentProviderKey) {
  return registry[provider];
}
