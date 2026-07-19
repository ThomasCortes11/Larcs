import crypto from "node:crypto";

type EventPayload = {
  event?: string;
  data?: {
    transaction?: Record<string, unknown>;
  };
  signature?: {
    properties?: string[];
    checksum?: string;
  };
  timestamp?: number;
};

function readNestedValue(source: Record<string, unknown>, path: string) {
  return path.split(".").reduce<unknown>((current, key) => {
    if (current && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }

    return undefined;
  }, source);
}

export function buildEventChecksum(payload: EventPayload, eventsSecret: string) {
  const properties = payload.signature?.properties ?? [];
  const transaction = payload.data?.transaction ?? {};
  const concatenatedProperties = properties.map((property) => String(readNestedValue({ transaction }, property) ?? "")).join("");

  return crypto
    .createHash("sha256")
    .update(`${concatenatedProperties}${payload.timestamp ?? ""}${eventsSecret}`)
    .digest("hex")
    .toUpperCase();
}

export function validateWompiEvent(payload: EventPayload, checksumHeader: string | null) {
  const eventsSecret = process.env.WOMPI_EVENTS_SECRET;

  if (!eventsSecret) {
    return { valid: false, reason: "Falta configurar WOMPI_EVENTS_SECRET." };
  }

  const expectedChecksum = buildEventChecksum(payload, eventsSecret);
  const providedChecksum = (checksumHeader ?? payload.signature?.checksum ?? "").toUpperCase();

  if (!providedChecksum || providedChecksum !== expectedChecksum) {
    return { valid: false, reason: "Checksum de evento invalido." };
  }

  return { valid: true as const, event: payload };
}