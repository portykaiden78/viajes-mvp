import { FormDataType } from "../types";

export const validateStep5 = (form: FormDataType) => {
  const tieneEstilos = form.estilo && form.estilo.length > 0;
  const tieneOtro = form.estiloOtro && form.estiloOtro.trim().length > 0;

  return tieneEstilos || tieneOtro;
};

export const getStep5Error = (form: FormDataType) => {
  const tieneEstilos = form.estilo && form.estilo.length > 0;
  const tieneOtro = form.estiloOtro && form.estiloOtro.trim().length > 0;

  if (!tieneEstilos && !tieneOtro) {
    return "Selecciona al menos un estilo o especifica uno en 'Otro'.";
  }

  return null;
};
