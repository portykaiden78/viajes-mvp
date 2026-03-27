import { FormDataType } from "../types";

export const validateStep10 = (form: FormDataType) => {
  const tieneDeporte = form.deporteDiario && form.deporteDiario.trim().length > 0;
  const tieneOtro = form.deporteDiarioOtro && form.deporteDiarioOtro.trim().length > 0;

  return tieneDeporte || tieneOtro;
};

export const getStep10Error = (form: FormDataType) => {
  const tieneDeporte = form.deporteDiario && form.deporteDiario.trim().length > 0;
  const tieneOtro = form.deporteDiarioOtro && form.deporteDiarioOtro.trim().length > 0;

  if (!tieneDeporte && !tieneOtro) {
    return "Selecciona un nivel de actividad o especifica uno en 'Otro'.";
  }

  return null;
};
