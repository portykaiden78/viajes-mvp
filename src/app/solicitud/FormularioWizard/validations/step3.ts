import { FormDataType } from "../types";

export const validateStep3 = (form: FormDataType) => {
  return !!form.tipo_viaje;
};

export const getStep3Error = (form: FormDataType) => {
  const tieneOpciones = form.tipo_viaje?.length > 0;
  const tieneOtro = form.tipo_viaje_otro?.trim().length > 0;

  if (!tieneOpciones && !tieneOtro) {
    return "Selecciona al menos un tipo de viaje o escribe uno en 'Otro'.";
  }

  return null;
};


