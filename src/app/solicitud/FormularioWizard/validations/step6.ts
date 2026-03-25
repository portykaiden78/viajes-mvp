import { FormDataType } from "../types";

export const validateStep6 = (form: FormDataType) => {
  if (!form.fecha_inicio || !form.fecha_fin) return false;

  const start = new Date(form.fecha_inicio);
  const end = new Date(form.fecha_fin);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return start >= today && end > start;
};

export const getStep6Error = (form: FormDataType) => {
  if (!form.fecha_inicio || !form.fecha_fin)
    return "Debes seleccionar ambas fechas.";

  const start = new Date(form.fecha_inicio);
  const end = new Date(form.fecha_fin);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start < today) return "La fecha de inicio no puede ser anterior a hoy.";
  if (end <= start) return "La fecha de fin debe ser posterior al inicio.";

  return null;
};
