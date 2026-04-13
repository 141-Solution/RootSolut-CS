"use client";

import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FieldError {
  name?: string;
  email?: string;
  message?: string;
}

export default function KontaktPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const validate = (): boolean => {
    const newErrors: FieldError = {};
    if (!form.name.trim()) newErrors.name = "Bitte geben Sie Ihren Namen ein.";
    if (!form.email.trim()) {
      newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }
    if (!form.message.trim()) newErrors.message = "Bitte geben Sie eine Nachricht ein.";
    else if (form.message.trim().length < 10) newErrors.message = "Die Nachricht muss mindestens 10 Zeichen lang sein.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="section-shell mb-8 rounded-[2rem] px-5 py-7 sm:px-8 sm:py-9">
        <h1 className="mb-2 text-5xl font-semibold text-[var(--brown-deep)] sm:text-6xl">Kontakt</h1>
        <p className="max-w-2xl text-base leading-relaxed text-[rgba(45,36,23,0.78)] sm:text-lg">
          Haben Sie Ergänzungen, Korrekturen oder Fragen zur Familienchronik?
          Schreiben Sie uns!
        </p>
      </div>

      {status === "success" ? (
        <div className="paper-panel rounded-[2rem] p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="mb-2 text-3xl font-semibold text-[var(--green-deep)]">Nachricht gesendet!</h2>
          <p className="text-[var(--brown-deep)]/80">
            Vielen Dank für Ihre Nachricht. Wir werden uns so bald wie möglich bei Ihnen melden.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-sm font-semibold text-[var(--green-deep)] underline hover:text-[var(--brown-deep)]"
          >
            Weitere Nachricht senden
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="paper-panel rounded-[2rem] p-5 space-y-5 sm:p-7">
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
            </div>
          )}

          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-[var(--brown-deep)]">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full rounded-2xl border bg-white/90 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] ${
                errors.name ? "border-red-400" : "border-amber-300"
              }`}
              placeholder="Ihr Name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-[var(--brown-deep)]">
              E-Mail <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full rounded-2xl border bg-white/90 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] ${
                errors.email ? "border-red-400" : "border-amber-300"
              }`}
              placeholder="ihre@email.de"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-[var(--brown-deep)]">
              Nachricht <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`w-full resize-none rounded-2xl border bg-white/90 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--green-deep)] ${
                errors.message ? "border-red-400" : "border-amber-300"
              }`}
              placeholder="Ihre Nachricht…"
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-full bg-[var(--green-deep)] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[var(--brown-deep)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "sending" ? "Wird gesendet…" : "Nachricht senden"}
          </button>

          <p className="text-center text-xs text-stone-500">
            Mit dem Absenden stimmen Sie zu, dass Ihre Daten zur Bearbeitung Ihrer Anfrage verwendet werden.
          </p>
        </form>
      )}
    </div>
  );
}
