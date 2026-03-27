import { FormDataType } from "../types";

export const validateStepFinal = (form: FormDataType) => {
  const emailValido =
    form.email &&
    form.email.trim().length > 5 &&
    form.email.includes("@");

  const telefonoValido =
    form.telefono &&
    form.telefono.trim().length >= 6;

  return emailValido && telefonoValido;
};

export const getStepFinalError = (form: FormDataType) => {
  if (!form.email || form.email.trim().length <= 5) {
    return "Introduce un email válido.";
  }

  if (!form.email.includes("@")) {
    return "El email debe contener '@'.";
  }

  if (!form.telefono || form.telefono.trim().length < 6) {
    return "Introduce un teléfono válido.";
  }

  return null;
};
