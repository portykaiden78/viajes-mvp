import { FormDataType } from "../types";

export const validateStep12 = (form: FormDataType) => {
  return true; // El resumen siempre es válido
};

export const getStep12Error = (form: FormDataType) => {
  return null; // No hay errores en el resumen
};
