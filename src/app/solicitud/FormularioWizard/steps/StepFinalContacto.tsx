"use client";

import { StepPropsContacto } from "../types";

type StepFinalContactoProps = StepPropsContacto & {
  theme?: "light" | "dark";
};


export default function StepFinalContacto({
  form,
  update,
  onSubmit,
  back,
  theme = "light",
}: StepFinalContactoProps) {
  const isValid =
    form.email.trim().length > 5 &&
    form.email.includes("@") &&
    form.telefono.trim().length >= 6;

  // Estilos dinámicos según tema
  const text = theme === "dark" ? "text-white" : "text-gray-900";
  const textMuted = theme === "dark" ? "text-white/70" : "text-gray-600";
  const cardBg = theme === "dark" ? "bg-white/10" : "bg-gray-100";
  const inputBg = theme === "dark" ? "bg-white/20" : "bg-white";
  const inputText = theme === "dark" ? "text-white" : "text-gray-900";
  const border = theme === "dark" ? "border-white/30" : "border-gray-300";
  const btnBack =
    theme === "dark"
      ? "bg-white/20 border-white/30 text-white"
      : "bg-gray-200 border-gray-300 text-gray-700";

  return (
    <div className="space-y-6 animate-fade-slide">
      <h2 className={`text-3xl font-semibold text-center ${text}`}>
        ¿Dónde te enviamos tu itinerario?
      </h2>

      <p className={`text-center ${textMuted}`}>
        Déjanos tus datos de contacto y te enviaremos tu itinerario personalizado.
      </p>

      <div className={`space-y-4 p-6 rounded-2xl ${cardBg} ${border}`}>
        <input
          type="email"
          placeholder="Tu email"
          className={`w-full p-4 rounded-xl ${inputBg} ${border} ${inputText} placeholder-gray-400`}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />

        <input
          type="tel"
          placeholder="Tu teléfono"
          className={`w-full p-4 rounded-xl ${inputBg} ${border} ${inputText} placeholder-gray-400`}
          value={form.telefono}
          onChange={(e) => update("telefono", e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        {back && (
          <button
            onClick={back}
            className={`w-1/2 py-3 rounded-xl border font-medium ${btnBack}`}
          >
            Atrás
          </button>
        )}

        <button
          onClick={onSubmit}
          disabled={!isValid}
          className={`w-1/2 py-3 rounded-xl font-semibold transition-all ${
            isValid
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow"
              : "bg-gray-300 text-gray-400 cursor-not-allowed"
          }`}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
