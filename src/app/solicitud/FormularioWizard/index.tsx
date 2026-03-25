"use client";

import { useState, useMemo, useEffect } from "react";
import StepWrapper from "./StepWrapper";
import { FormDataType, StepPropsWithUpdate, StepPropsResumen } from "./types";

import Step1Origen from "./steps/Step1Origen";
import Step2Destino from "./steps/Step2Destino";
import Step3TipoViaje from "./steps/Step3TipoViaje";
import Step4NumViajeros from "./steps/Step4NumViajeros";
import Step5Edades from "./steps/Step5Edades";
import Step6Fechas from "./steps/Step6Fechas";
import Step7Ritmo from "./steps/Step7Ritmo";
import Step8Gastronomia from "./steps/Step8Gastronomia";
import Step9Intereses from "./steps/Step9Intereses";
import Step10Presupuesto from "./steps/Step10Presupuesto";
import Step11Alojamiento from "./steps/Step11Alojamiento";
import Step12Resumen from "./steps/Step12Resumen";

import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  validateStep5,
  validateStep6,
  validateStep7,
  validateStep8,
  validateStep9,
  validateStep10,
  validateStep11,
} from "./validations";

import { validateStep12 } from "./validations/step12";

const TOTAL_STEPS = 12;
const STORAGE_KEY = "wizardForm_v1";

export default function FormularioWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  const [form, setForm] = useState<FormDataType>({
    origen: "",
    destino: "",
    tipo_viaje: "",
    num_viajeros: 1,
    edades: [""],
    fecha_inicio: "",
    fecha_fin: "",
    ritmo_viaje: "",
    gastronomia: "",
    intereses: [],
    presupuesto: "",
    alojamiento: "",
  });

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setForm(JSON.parse(saved));
    } catch { }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch { }
  }, [form]);

  // Ocultar mensaje después de 3 segundos
  useEffect(() => {
    if (!mensaje) return;
    const timer = setTimeout(() => setMensaje(null), 3000);
    return () => clearTimeout(timer);
  }, [mensaje]);

  const update = (field: keyof FormDataType, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async () => {
    setLoading(true);
    setMensaje(null);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          fd.set(key + "_json", JSON.stringify(value));
        } else {
          fd.set(key, String(value));
        }
      });

      const res = await fetch("/api/crear-solicitud", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje("Error: " + data.error);
      } else {
        setMensaje("Itinerario creado correctamente");

        setForm({
          origen: "",
          destino: "",
          tipo_viaje: "",
          num_viajeros: 1,
          edades: [""],
          fecha_inicio: "",
          fecha_fin: "",
          ritmo_viaje: "",
          gastronomia: "",
          intereses: [],
          presupuesto: "",
          alojamiento: "",
        });

        setStep(1);
      }
    } finally {
      setLoading(false);
    }
  };

  // Selección del componente del step
  const StepComponent = useMemo(() => {
    const steps: Record<number, any> = {
      1: Step1Origen,
      2: Step2Destino,
      3: Step3TipoViaje,
      4: Step11Alojamiento,
      5: Step4NumViajeros,
      6: Step5Edades,
      7: Step6Fechas,
      8: Step7Ritmo,
      9: Step8Gastronomia,
      10: Step10Presupuesto,
      11: Step9Intereses,
      12: Step12Resumen,
    };
    return steps[step];
  }, [step]);

  // Validación del step actual
  const isStepValid = (() => {
    const validators: Record<number, any> = {
      1: validateStep1,
      2: validateStep2,
      3: validateStep3,
      4: validateStep11,
      5: validateStep4,
      6: validateStep5,
      7: validateStep6,
      8: validateStep7,
      9: validateStep8,
      10: validateStep10,
      11: validateStep9,
      12: validateStep12,
    };
    return validators[step]?.(form) ?? false;
  })();

  const progress = (step / TOTAL_STEPS) * 100;
  const isResumenStep = step === 12;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">

      {mensaje && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-out">
            {mensaje}
          </div>
        </div>
      )}

      <div className="w-full max-w-md glass-card text-gray-900 rounded-3xl p-6 space-y-6">
        {/* Barra de progreso */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-white/80">
              Paso {step} de {TOTAL_STEPS}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Contenido del Step */}
        <StepWrapper key={step}>
          {isResumenStep ? (
            <StepComponent
              form={form}
              back={back}
              submit={handleSubmit}
              loading={loading}
              mensaje={mensaje}
              isValid={isStepValid}
            />
          ) : (
            <StepComponent
              form={form}
              update={update}
              next={next}
              back={step > 1 ? back : undefined}
              isValid={isStepValid}
            />
          )}
        </StepWrapper>

      </div>
    </main>
  );
}  
