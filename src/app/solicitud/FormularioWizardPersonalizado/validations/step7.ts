import { FormDataType } from "../types";

export const validateStep7 = (form: FormDataType) => {
  // Este campo es opcional → siempre válido
  return true;
};

export const getStep7Error = (form: FormDataType) => {
  // No hay errores porque no es obligatorio
  return null;
};
