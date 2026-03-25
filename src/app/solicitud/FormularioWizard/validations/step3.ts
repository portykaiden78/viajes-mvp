import { FormDataType } from "../types";

export const validateStep3 = (form: FormDataType) => {
  return !!form.tipo_viaje;
};

export const getStep3Error = (form: FormDataType) => {
  if (!form.tipo_viaje) return "Selecciona un tipo de viaje.";
  return null;
};
