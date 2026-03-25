"use client";

import { useState, useMemo, useEffect } from "react";
import StepWrapper from "./StepWrapper";
import { FormDataType } from "./types";

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

import {
  StepPropsWithUpdate,
  StepPropsResumen,
} from "./types";
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
      if (saved) {
        setForm(JSON.parse(saved));
      }
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
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
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
        // 🔥 MENSAJE DE ÉXITO
        setMensaje("Itinerario creado correctamente");

        // 🔥 LIMPIAR FORMULARIO
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

        // 🔥 REINICIAR WIZARD
        setStep(1);
      }
    } finally {
      setLoading(false);
    }
  };


  // Selección del componente del step
  const StepComponent = useMemo<
    React.ComponentType<StepPropsWithUpdate> | React.ComponentType<StepPropsResumen>
  >(() => {
    switch (step) {
      case 1:
        return Step1Origen;
      case 2:
        return Step2Destino;
      case 3:
        return Step3TipoViaje;
      case 4:
        return Step11Alojamiento;
      case 5:
        return Step4NumViajeros;
      case 6:
        return Step5Edades;
      case 7:
        return Step6Fechas;
      case 8:
        return Step7Ritmo;
      case 9:
        return Step8Gastronomia;
      case 10:
        return Step10Presupuesto;
      case 11:
        return Step9Intereses;
      case 12:
        return Step12Resumen;
      default:
        return Step1Origen;
    }
  }, [step]);

  // Validación del step actual
  const isStepValid = (() => {
    switch (step) {
      case 1:
        return validateStep1(form);
      case 2:
        return validateStep2(form);
      case 3:
        return validateStep3(form);
      case 4:
        return validateStep11(form);
      case 5:
        return validateStep4(form);
      case 6:
        return validateStep5(form);
      case 7:
        return validateStep6(form);
      case 8:
        return validateStep7(form);
      case 9:
        return validateStep8(form);
      case 10:
        return validateStep10(form);
      case 11:
        return validateStep9(form);
      case 12:
        return validateStep12(form);
      default:
        return false;
    }
  })();

  const progress = (step / TOTAL_STEPS) * 100;
  const isResumenStep = step === 12;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      {mensaje && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-out">
            {mensaje}
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white text-gray-900 rounded-3xl shadow-lg p-6 space-y-4">

        {/* Barra de progreso */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              Paso {step} de {TOTAL_STEPS}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-2 bg-green-500 transition-all duration-300"
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
              isValid={isStepValid} update={function (field: keyof FormDataType, value: any): void {
                throw new Error("Function not implemented.");
              }} next={function (): void {
                throw new Error("Function not implemented.");
              }} />
          ) : (
            <StepComponent
              form={form}
              update={update}
              next={next}
              back={step > 1 ? back : undefined}
              isValid={isStepValid} submit={function (): Promise<void> {
                throw new Error("Function not implemented.");
              }} loading={false} mensaje={null} />
          )}
        </StepWrapper>

      </div>
    </main>
  );
}
