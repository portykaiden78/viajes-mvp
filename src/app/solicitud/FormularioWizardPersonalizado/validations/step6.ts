import { FormDataType } from "../types";

export const validateStep6 = (form: FormDataType) => {
  const { acompanado, edadesFamilia, numAmigos, acompanadoOtro } = form;

  if (!acompanado) return false;

  if (acompanado === "familia") {
    return !!edadesFamilia && edadesFamilia.trim().length > 0;
  }

  if (acompanado === "amigos") {
    return !!numAmigos && numAmigos.trim().length > 0;
  }

  if (acompanado === "otro") {
    return !!acompanadoOtro && acompanadoOtro.trim().length > 0;
  }

  // "solo" o "pareja" → válido sin subcampos
  return true;
};

export const getStep6Error = (form: FormDataType) => {
  const { acompanado, edadesFamilia, numAmigos, acompanadoOtro } = form;

  if (!acompanado) return "Selecciona una opción.";

  if (acompanado === "familia" && (!edadesFamilia || !edadesFamilia.trim())) {
    return "Indica las edades de los miembros de la familia.";
  }

  if (acompanado === "amigos" && (!numAmigos || !numAmigos.trim())) {
    return "Indica cuántas personas viajan contigo.";
  }

  if (acompanado === "otro" && (!acompanadoOtro || !acompanadoOtro.trim())) {
    return "Especifica con quién viajas.";
  }

  return null;
};
