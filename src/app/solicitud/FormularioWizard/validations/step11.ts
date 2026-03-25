import { FormDataType } from "../types";

export const validateStep11 = (form: FormDataType) => {
  return !!form.alojamiento;
};

export const getStep11Error = (form: FormDataType) => {
  if (!form.alojamiento) return "Selecciona un tipo de alojamiento.";
  return null;
};
