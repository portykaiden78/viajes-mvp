import { FormDataType } from "../types";

export const validateStep11 = (form: FormDataType) => {
  const tieneEntorno = form.entorno && form.entorno.length > 0;
  const tieneOtro = form.entornoOtro && form.entornoOtro.trim().length > 0;

  return tieneEntorno || tieneOtro;
};

export const getStep11Error = (form: FormDataType) => {
  const tieneEntorno = form.entorno && form.entorno.length > 0;
  const tieneOtro = form.entornoOtro && form.entornoOtro.trim().length > 0;

  if (!tieneEntorno && !tieneOtro) {
    return "Selecciona al menos un entorno o especifica uno en 'Otro'.";
  }

  return null;
};
