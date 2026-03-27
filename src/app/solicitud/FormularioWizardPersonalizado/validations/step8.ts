import { FormDataType } from "../types";

export const validateStep8 = (form: FormDataType) => {
  return !!form.gastronomia;
};

export const getStep8Error = (form: FormDataType) => {
  if (!form.gastronomia) return "Selecciona una preferencia gastronómica.";
  return null;
};
