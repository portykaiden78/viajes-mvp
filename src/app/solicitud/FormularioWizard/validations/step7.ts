import { FormDataType } from "../types";

export const validateStep7 = (form: FormDataType) => {
  return !!form.ritmo_viaje;
};

export const getStep7Error = (form: FormDataType) => {
  if (!form.ritmo_viaje) return "Selecciona un ritmo de viaje.";
  return null;
};
