"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WHATSAPP_NUMBER } from "@/lib/constants";

function cleanContactValue(value: string) {
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
}

export function ContactForm() {
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = cleanContactValue(String(data.get("name") ?? ""));
    const phone = cleanContactValue(String(data.get("phone") ?? ""));
    const email = cleanContactValue(String(data.get("email") ?? ""));
    const messageText = cleanContactValue(String(data.get("message") ?? ""));
    const message = [
      "Hola, quiero ponerme en contacto con LARCS.",
      "",
      `Nombre: ${name}`,
      `Celular: ${phone}`,
      email ? `Correo: ${email}` : "",
      `Mensaje: ${messageText}`
    ]
      .filter(Boolean)
      .join("\n");
    const phoneNumber = WHATSAPP_NUMBER.replace(/\D/g, "");
    const whatsappWindow = window.open("about:blank", "_blank");
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    if (whatsappWindow) {
      whatsappWindow.opener = null;
      whatsappWindow.location.replace(url);
    } else {
      window.location.assign(url);
    }

    setIsSent(true);
    event.currentTarget.reset();
  }

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-white p-5 sm:p-6">
      <h2 className="text-xl font-semibold">Escríbenos</h2>
      <p className="mt-1 text-sm text-[var(--muted-foreground)]">
        Déjanos tus datos y abriremos WhatsApp con tu mensaje listo para enviar.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="contact-name" className="text-sm font-medium">Nombre completo *</label>
          <Input id="contact-name" name="name" autoComplete="name" minLength={3} maxLength={100} required />
        </div>
        <div className="space-y-1">
          <label htmlFor="contact-phone" className="text-sm font-medium">Celular *</label>
          <Input id="contact-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" minLength={7} maxLength={20} required />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label htmlFor="contact-email" className="text-sm font-medium">Correo electrónico (opcional)</label>
          <Input id="contact-email" name="email" type="email" autoComplete="email" maxLength={160} />
        </div>
        <div className="space-y-1 sm:col-span-2">
          <label htmlFor="contact-message" className="text-sm font-medium">¿Cómo podemos ayudarte? *</label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            minLength={5}
            maxLength={1000}
            required
            className="w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          />
        </div>
        <Button type="submit" className="min-h-11 w-full sm:col-span-2">
          Continuar por WhatsApp
        </Button>
        {isSent ? (
          <p role="status" className="text-sm text-[var(--accent-green)] sm:col-span-2">
            Se abrió WhatsApp con tu mensaje preparado.
          </p>
        ) : null}
      </form>
    </section>
  );
}