import { FormDataType } from "../types";

export const validateStep12 = (form: FormDataType) => {
  const { festivales, festivalesOtro } = form;

  // Debe elegir sí o no
  if (festivales.gusta === null) return false;

  // Si NO → válido sin más
  if (festivales.gusta === false) return true;

  // Si SÍ → debe elegir estilos o escribir "otro"
  const tieneEstilos = festivales.estilos && festivales.estilos.length > 0;
  const tieneOtro = festivalesOtro && festivalesOtro.trim().length > 0;

  return tieneEstilos || tieneOtro;
};

export const getStep12Error = (form: FormDataType) => {
  const { festivales, festivalesOtro } = form;

  if (festivales.gusta === null) {
    return "Indica si te gustan los festivales.";
  }

  if (festivales.gusta === true) {
    const tieneEstilos = festivales.estilos && festivales.estilos.length > 0;
    const tieneOtro = festivalesOtro && festivalesOtro.trim().length > 0;

    if (!tieneEstilos && !tieneOtro) {
      return "Selecciona al menos un estilo musical o especifica uno en 'Otro'.";
    }
  }

  return null;
};
