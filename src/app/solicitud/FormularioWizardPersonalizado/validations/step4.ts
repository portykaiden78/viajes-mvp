import { FormDataType } from "../types";

export const validateStep4 = (form: FormDataType) => {
  return !!form.presupuesto && form.presupuesto.trim().length > 0;
};

export const getStep4Error = (form: FormDataType) => {
  if (!form.presupuesto || !form.presupuesto.trim()) {
    return "Selecciona un presupuesto aproximado.";
  }

  return null;
};
