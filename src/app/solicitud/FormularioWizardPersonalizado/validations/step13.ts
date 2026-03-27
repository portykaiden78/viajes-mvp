import { FormDataType } from "../types";

export const validateStep13 = (form: FormDataType) => {
  const { eventosDeportivos, eventosDeportivosOtro } = form;

  // Debe elegir sí o no
  if (eventosDeportivos.gusta === null) return false;

  // Si NO → válido sin más
  if (eventosDeportivos.gusta === false) return true;

  // Si SÍ → debe elegir deportes o escribir "otro"
  const tieneDeportes =
    eventosDeportivos.deportes &&
    eventosDeportivos.deportes.length > 0;

  const tieneOtro =
    eventosDeportivosOtro &&
    eventosDeportivosOtro.trim().length > 0;

  return tieneDeportes || tieneOtro;
};

export const getStep13Error = (form: FormDataType) => {
  const { eventosDeportivos, eventosDeportivosOtro } = form;

  if (eventosDeportivos.gusta === null) {
    return "Indica si te gustan los eventos deportivos.";
  }

  if (eventosDeportivos.gusta === true) {
    const tieneDeportes =
      eventosDeportivos.deportes &&
      eventosDeportivos.deportes.length > 0;

    const tieneOtro =
      eventosDeportivosOtro &&
      eventosDeportivosOtro.trim().length > 0;

    if (!tieneDeportes && !tieneOtro) {
      return "Selecciona al menos un deporte o especifica uno en 'Otro'.";
    }
  }

  return null;
};
