"use client";

import { useState, useMemo, useEffect } from "react";
import StepWrapper from "./StepWrapper";
import { FormDataType } from "./types";

// IMPORTS DE LOS STEPS
import Step1TipoViaje from "./steps/Step1TipoViaje";
import Step2Destino from "./steps/Step2Destino";
import Step3Fechas from "./steps/Step3Fechas";
import Step4Presupuesto from "./steps/Step4Presupuesto";
import Step5Estilo from "./steps/Step5Estilo";
import Step6Acompanado from "./steps/Step6Acompanado";
import Step7Detalles from "./steps/Step7Detalles";
import Step8Transporte from "./steps/Step8Transporte";
import Step9Clima from "./steps/Step9Clima";
import Step10Deporte from "./steps/Step10Deporte";
import Step11Entorno from "./steps/Step11Entorno";
import Step12Festivales from "./steps/Step12Festivales";
import Step13Deportes from "./steps/Step13Deportes";
import Step14Resumen from "./steps/StepFinalResumen";
import StepFinalContacto from "./steps/StepFinalContacto";

// VALIDACIONES
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
  validateStep13,
} from "./validations";

const TOTAL_STEPS = 15;
const STORAGE_KEY = "wizardFormPersonalizado_v1";

export default function FormularioWizardPersonalizado() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  // FORM COMPLETO
  const [form, setForm] = useState<FormDataType>({
    tipoViaje: "",
    destino: "",
    fechaInicio: "",
    fechaFin: "",
    fechasFlexibles: false,
    cualquierFecha: false,

    presupuesto: "",
    estilo: [],
    estiloOtro: "",

    acompanado: "",
    edadesFamilia: "",
    numAmigos: "",
    acompanadoOtro: "",

    detalles: "",

    transporte: [],
    transporteOtro: "",

    clima: "",
    climaOtro: "",

    deporteDiario: "",
    deporteDiarioOtro: "",

    entorno: [],
    entornoOtro: "",

    festivales: {
      gusta: null,
      estilos: [],
    },
    festivalesOtro: "",

    eventosDeportivos: {
      gusta: null,
      deportes: [],
    },
    eventosDeportivosOtro: "",

    email: "",
    telefono: "",
  });

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setForm(JSON.parse(saved));
    } catch {}
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {}
  }, [form]);

  // Ocultar mensaje
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

  // Enviar formulario
  const handleSubmit = async () => {
    setLoading(true);
    setMensaje(null);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (typeof value === "object") {
          fd.set(key, JSON.stringify(value));
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
        setMensaje("Solicitud enviada correctamente");

        // Reset
        setForm({
          tipoViaje: "",
          destino: "",
          fechaInicio: "",
          fechaFin: "",
          fechasFlexibles: false,
          cualquierFecha: false,

          presupuesto: "",
          estilo: [],
          estiloOtro: "",

          acompanado: "",
          edadesFamilia: "",
          numAmigos: "",
          acompanadoOtro: "",

          detalles: "",

          transporte: [],
          transporteOtro: "",

          clima: "",
          climaOtro: "",

          deporteDiario: "",
          deporteDiarioOtro: "",

          entorno: [],
          entornoOtro: "",

          festivales: {
            gusta: null,
            estilos: [],
          },
          festivalesOtro: "",

          eventosDeportivos: {
            gusta: null,
            deportes: [],
          },
          eventosDeportivosOtro: "",

          email: "",
          telefono: "",
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
      1: Step1TipoViaje,
      2: Step2Destino,
      3: Step3Fechas,
      4: Step4Presupuesto,
      5: Step5Estilo,
      6: Step6Acompanado,
      7: Step7Detalles,
      8: Step8Transporte,
      9: Step9Clima,
      10: Step10Deporte,
      11: Step11Entorno,
      12: Step12Festivales,
      13: Step13Deportes,
      14: Step14Resumen,
      15: StepFinalContacto,
    };
    return steps[step];
  }, [step]);

  // Validación del step actual
  const isStepValid = (() => {
    const validators: Record<number, any> = {
      1: validateStep1,
      2: validateStep2,
      3: validateStep3,
      4: validateStep4,
      5: validateStep5,
      6: validateStep6,
      7: validateStep7,
      8: validateStep8,
      9: validateStep9,
      10: validateStep10,
      11: validateStep11,
      13: validateStep13,
      // Step 14 y 15 se validan internamente
    };
    return validators[step]?.(form) ?? true;
  })();

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      {mensaje && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-out">
            {mensaje}
          </div>
        </div>
      )}

      <div className="w-full max-w-md glass-card text-white rounded-3xl p-6 space-y-6">
        {/* Barra de progreso */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-white/80">
              Paso {step} de {TOTAL_STEPS}
            </span>
            <span className="text-xs text-white/60">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Contenido del Step */}
        <StepWrapper key={step}>
          {step === 15 ? (
            <StepComponent
              form={form}
              update={update}
              next={handleSubmit}
              back={back}
            />
          ) : step === 14 ? (
            <StepComponent
              form={form}
              back={back}
              onSubmit={() => setStep(15)}
              loading={loading}
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
