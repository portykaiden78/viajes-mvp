"use client";

import { useState } from "react";
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

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);

    // Delay suave para mostrar el spinner
    setTimeout(() => {
      onSubmit();
    }, 300);
  };

  return (
    <div className="space-y-6 animate-fade-slide">

      {/* Título */}
      <h2 className={`text-3xl font-semibold text-center ${text}`}>
        ¿Dónde te enviamos tu itinerario?
      </h2>

      <p className={`text-center ${textMuted}`}>
        Déjanos tus datos de contacto y te enviaremos tu itinerario personalizado.
      </p>

      {/* FORMULARIO OCULTO SI ESTÁ CARGANDO */}
      {!loading && (
        <>
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
              onClick={handleSubmit}
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
        </>
      )}

      {/* SPINNER DE CARGA PREMIUM */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6 animate-fade-in">

          {/* Spinner premium */}
          <div className="w-14 h-14 border-4 border-blue-500/40 border-t-blue-600 rounded-full animate-spin"></div>

          {/* Mensaje principal */}
          <p className={`text-xl font-semibold tracking-wide text-center ${text}`}>
            Generando tu itinerario personalizado…
          </p>

          {/* Mensaje secundario */}
          <p className={`text-sm ${textMuted} text-center`}>
            Esto puede tardar unos segundos
          </p>
        </div>
      )}
    </div>
  );
}
