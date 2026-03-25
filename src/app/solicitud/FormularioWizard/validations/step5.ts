import { FormDataType } from "../types";

export const validateStep5 = (form: FormDataType) => {
  return form.edades.every((e) => {
    const n = Number(e);
    return n > 0 && n < 120;
  });
};

export const getStep5Error = (form: FormDataType) => {
  if (!form.edades.length) return "Introduce al menos una edad.";
  if (!validateStep5(form)) return "Introduce edades válidas (1–120).";
  return null;
};
