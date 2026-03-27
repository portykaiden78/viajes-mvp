import { FormDataType } from "../types";

export const validateStep4 = (form: FormDataType) => {
  return form.num_viajeros > 0 && form.num_viajeros <= 10;
};

export const getStep4Error = (form: FormDataType) => {
  if (form.num_viajeros < 1) return "Debe haber al menos un viajero.";
  if (form.num_viajeros > 10) return "Máximo 10 viajeros.";
  return null;
};
