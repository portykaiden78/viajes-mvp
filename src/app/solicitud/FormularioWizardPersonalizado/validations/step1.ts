import { FormDataType } from "../types";

// Validación del Step 1 (por ejemplo: validar DESTINO)
export const validateStep1 = (form: FormDataType) => {
  return form.destino.trim().length >= 2;
};

export const getStep1Error = (form: FormDataType) => {
  if (!form.destino.trim()) return "El destino es obligatorio.";
  if (form.destino.trim().length < 2) return "Introduce un destino válido.";
  return null;
};
