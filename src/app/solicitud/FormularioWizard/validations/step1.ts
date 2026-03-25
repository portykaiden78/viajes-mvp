import { FormDataType } from "../types";

export const validateStep1 = (form: FormDataType) => {
  return form.origen.trim().length >= 2;
};

export const getStep1Error = (form: FormDataType) => {
  if (!form.origen.trim()) return "El origen es obligatorio.";
  if (form.origen.trim().length < 2) return "Introduce un origen válido.";
  return null;
};
