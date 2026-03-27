import { FormDataType } from "../types";

export const validateStep9 = (form: FormDataType) => {
  const tieneClima = form.clima && form.clima.trim().length > 0;
  const tieneOtro = form.climaOtro && form.climaOtro.trim().length > 0;

  return tieneClima || tieneOtro;
};

export const getStep9Error = (form: FormDataType) => {
  const tieneClima = form.clima && form.clima.trim().length > 0;
  const tieneOtro = form.climaOtro && form.climaOtro.trim().length > 0;

  if (!tieneClima && !tieneOtro) {
    return "Selecciona un clima o especifica uno en 'Otro'.";
  }

  return null;
};
