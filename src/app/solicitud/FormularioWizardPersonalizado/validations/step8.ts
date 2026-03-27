import { FormDataType } from "../types";

export const validateStep8 = (form: FormDataType) => {
  const tieneTransportes = form.transporte && form.transporte.length > 0;
  const tieneOtro = form.transporteOtro && form.transporteOtro.trim().length > 0;

  return tieneTransportes || tieneOtro;
};

export const getStep8Error = (form: FormDataType) => {
  const tieneTransportes = form.transporte && form.transporte.length > 0;
  const tieneOtro = form.transporteOtro && form.transporteOtro.trim().length > 0;

  if (!tieneTransportes && !tieneOtro) {
    return "Selecciona al menos un transporte o especifica uno en 'Otro'.";
  }

  return null;
};
