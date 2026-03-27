import { FormDataType } from "../types";

export const validateStep3 = (form: FormDataType) => {
  const { fechaInicio, fechaFin, fechasFlexibles, cualquierFecha } = form;

  // Si el usuario marca alguna opción flexible → no exigimos fechas
  if (fechasFlexibles || cualquierFecha) {
    return true;
  }

  // Si no hay flexibilidad → ambas fechas obligatorias
  return !!fechaInicio && !!fechaFin;
};

export const getStep3Error = (form: FormDataType) => {
  const { fechaInicio, fechaFin, fechasFlexibles, cualquierFecha } = form;

  if (fechasFlexibles || cualquierFecha) {
    return null; // No pedimos fechas
  }

  if (!fechaInicio) return "La fecha de inicio es obligatoria.";
  if (!fechaFin) return "La fecha de fin es obligatoria.";

  return null;
};
