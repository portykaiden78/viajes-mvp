"use client";

import { usePathname } from "next/navigation";
import FormularioWizard from "./FormularioWizard";
import FormularioWizardPersonalizado from "./FormularioWizardPersonalizado";

export default function Page() {
  const pathname = usePathname();

  // Si la ruta contiene "personalizado", cargamos el wizard personalizado
  const isPersonalizado = pathname.includes("personalizado");

  return isPersonalizado ? (
    <FormularioWizardPersonalizado />
  ) : (
    <FormularioWizard />
  );
}
