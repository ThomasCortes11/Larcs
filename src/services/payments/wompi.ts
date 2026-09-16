import crypto from "node:crypto";

import { SHIPPING_COST } from "@/lib/constants";
import { getAllProducts } from "@/lib/products";

export interface WompiCustomerData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  department: string;
}

export interface WompiCartItemInput {
  id: string;
  quantity: number;
  size: string;
}

export interface WompiCheckoutRequest extends WompiCustomerData {
  items: WompiCartItemInput[];
}

export interface WompiCheckoutSummary {
  items: Array<{
    id: string;
    name: string;
    size: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
  subtotal: number;
  shipping: number;
  total: number;
}

export interface WompiTransactionSummary {
  id?: string;
  status?: string;
  reference?: string;
  currency?: string;
  amount_in_cents?: number;
  payment_method_type?: string;
  created_at?: string;
}

export function createWompiReference() {
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();

  return `LARCS-${timestamp}-${random}`;
}

export function buildWompiSignature(reference: string, amountInCents: number, currency: "COP", integritySecret: string) {
  return crypto
    .createHash("sha256")
    .update(`${reference}${amountInCents}${currency}${integritySecret}`)
    .digest("hex");
}

export async function resolveCheckoutSummary(items: WompiCartItemInput[]): Promise<WompiCheckoutSummary> {
  const products = await getAllProducts();

  const resolvedItems = items.map((item) => {
    const product = products.find((candidate) => candidate.id === item.id);

    if (!product) {
      throw new Error(`No se encontro el producto ${item.id}.`);
    }

    const quantity = Math.max(1, item.quantity);
    const lineTotal = product.price * quantity;

    return {
      id: product.id,
      name: product.name,
      size: item.size,
      quantity,
      unitPrice: product.price,
      lineTotal
    };
  });

  const subtotal = resolvedItems.reduce((accumulator, item) => accumulator + item.lineTotal, 0);
  const shipping = resolvedItems.length > 0 ? SHIPPING_COST : 0;

  return {
    items: resolvedItems,
    subtotal,
    shipping,
    total: subtotal + shipping
  };
}

export function buildWompiCheckoutUrl(options: {
  origin: string;
  publicKey: string;
  integritySecret: string;
  customer: WompiCustomerData;
  reference: string;
  total: number;
}) {
  const amountInCents = options.total * 100;
  const configuredRedirectUrl = process.env.WOMPI_REDIRECT_URL;
  const originUrl = new URL(options.origin);
  const isLocalOrigin =
    originUrl.hostname === "localhost" ||
    originUrl.hostname === "127.0.0.1" ||
    originUrl.hostname.startsWith("192.168.") ||
    originUrl.hostname.startsWith("10.") ||
    originUrl.hostname.startsWith("172.");
  const redirectUrl = configuredRedirectUrl
    ? new URL(configuredRedirectUrl)
    : isLocalOrigin
      ? null
      : new URL("/pago/resultado", options.origin);

  redirectUrl?.searchParams.set("reference", options.reference);

  const signature = buildWompiSignature(options.reference, amountInCents, "COP", options.integritySecret);
  const checkoutUrl = new URL("https://checkout.wompi.co/p/");

  checkoutUrl.searchParams.set("public-key", options.publicKey);
  checkoutUrl.searchParams.set("currency", "COP");
  checkoutUrl.searchParams.set("amount-in-cents", String(amountInCents));
  checkoutUrl.searchParams.set("reference", options.reference);
  checkoutUrl.searchParams.set("signature:integrity", signature);
  if (redirectUrl) {
    checkoutUrl.searchParams.set("redirect-url", redirectUrl.toString());
  }
  checkoutUrl.searchParams.set("customer-data:email", options.customer.email);
  checkoutUrl.searchParams.set("customer-data:full-name", options.customer.customerName);
  checkoutUrl.searchParams.set("customer-data:phone-number", options.customer.phone);
  checkoutUrl.searchParams.set("customer-data:phone-number-prefix", "+57");
  checkoutUrl.searchParams.set("shipping-address:address-line-1", options.customer.address);
  checkoutUrl.searchParams.set("shipping-address:country", "CO");
  checkoutUrl.searchParams.set("shipping-address:city", options.customer.city);
  checkoutUrl.searchParams.set("shipping-address:region", options.customer.department);
  checkoutUrl.searchParams.set("shipping-address:phone-number", options.customer.phone);
  checkoutUrl.searchParams.set("shipping-address:name", options.customer.customerName);

  return {
    checkoutUrl: checkoutUrl.toString(),
    amountInCents,
    redirectUrl: redirectUrl?.toString(),
    signature
  };
}

export async function fetchWompiTransaction(transactionId: string) {
  const privateKey = process.env.WOMPI_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("Falta configurar WOMPI_PRIVATE_KEY.");
  }

  const apiBaseUrl = process.env.WOMPI_API_BASE_URL ?? "https://sandbox.wompi.co/v1";
  const response = await fetch(`${apiBaseUrl}/transactions/${transactionId}`, {
    headers: {
      Authorization: `Bearer ${privateKey}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`No se pudo consultar la transaccion ${transactionId}.`);
  }

  const payload = (await response.json()) as { data?: WompiTransactionSummary };
  return payload.data ?? null;
}