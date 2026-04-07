import { FormDataType } from "../types";

export const validateStep2 = (form: FormDataType) => {
  // Debe haber al menos un destino
  if (!form.destinos || form.destinos.length === 0) return false;

  // Ningún destino puede ser igual al origen
  const origen = form.origen.trim().toLowerCase();

  const destinoInvalido = form.destinos.some(
    (d) => d.trim().toLowerCase() === origen
  );

  if (destinoInvalido) return false;

  return true;
};

export const getStep2Error = (form: FormDataType) => {
  if (!form.destinos || form.destinos.length === 0) {
    return "Selecciona o añade al menos un destino.";
  }

  const origen = form.origen.trim().toLowerCase();

  const destinoInvalido = form.destinos.some(
    (d) => d.trim().toLowerCase() === origen
  );

  if (destinoInvalido) {
    return "El destino no puede ser igual al origen.";
  }

  return null;
};
