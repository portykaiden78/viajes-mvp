import { FormDataType } from "../types";

export const validateStep2 = (form: FormDataType) => {
  return form.destino.trim().length >= 2;
};

export const getStep2Error = (form: FormDataType) => {
  if (!form.destino.trim()) return "El destino es obligatorio.";
  if (form.destino.trim().length < 2) return "Introduce un destino válido.";
  return null;
};
