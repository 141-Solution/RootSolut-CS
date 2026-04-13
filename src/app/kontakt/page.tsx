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
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Kontakt</h1>
        <p className="text-gray-600">
          Haben Sie Ergänzungen, Korrekturen oder Fragen zur Familienchronik?
          Schreiben Sie uns!
        </p>
      </div>

      {status === "success" ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="text-xl font-semibold text-green-800 mb-2">Nachricht gesendet!</h2>
          <p className="text-green-700">
            Vielen Dank für Ihre Nachricht. Wir werden uns so bald wie möglich bei Ihnen melden.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-green-700 hover:text-green-900 underline text-sm"
          >
            Weitere Nachricht senden
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-amber-200 rounded-xl p-6 space-y-5">
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.name ? "border-red-400" : "border-amber-300"
              }`}
              placeholder="Ihr Name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                errors.email ? "border-red-400" : "border-amber-300"
              }`}
              placeholder="ihre@email.de"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Nachricht <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none ${
                errors.message ? "border-red-400" : "border-amber-300"
              }`}
              placeholder="Ihre Nachricht…"
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-amber-900 text-white rounded-lg px-6 py-3 font-medium hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Wird gesendet…" : "Nachricht senden"}
          </button>

          <p className="text-xs text-gray-400 text-center">
            Mit dem Absenden stimmen Sie zu, dass Ihre Daten zur Bearbeitung Ihrer Anfrage verwendet werden.
          </p>
        </form>
      )}
    </div>
  );
}
