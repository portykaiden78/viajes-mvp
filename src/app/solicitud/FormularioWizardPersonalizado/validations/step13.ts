import { FormDataType } from "../types";

export const validateStep13 = (form: FormDataType) => {
  return true; // El resumen siempre es válido
};

export const getStep13Error = (form: FormDataType) => {
  return null; // No hay errores en el resumen
};
