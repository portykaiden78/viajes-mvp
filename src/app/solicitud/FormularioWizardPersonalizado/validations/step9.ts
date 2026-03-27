import { FormDataType } from "../types";

export const validateStep9 = (form: FormDataType) => {
  return form.intereses.length > 0;
};

export const getStep9Error = (form: FormDataType) => {
  if (!form.intereses.length) return "Selecciona al menos un interés.";
  return null;
};
