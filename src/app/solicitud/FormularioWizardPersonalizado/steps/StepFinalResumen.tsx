import { StepPropsResumen } from "@/app/solicitud/FormularioWizardPersonalizado/types";

export default function StepFinalResumen({
  form,
  back,
  onSubmit,
}: StepPropsResumen) {
  return (
    <div className="space-y-8 animate-fade-slide">
      <h2 className="text-3xl font-semibold text-white text-center">
        ¡Todo listo para tu viaje!
      </h2>

      <p className="text-white/80 text-center">
        Aquí tienes un resumen de tu solicitud. Si todo está correcto, envíanoslo
        y prepararemos las mejores opciones de viaje para ti.
      </p>

      {/* RESUMEN */}
      <div className="space-y-4 bg-white/10 p-6 rounded-2xl border border-white/20">
        <ResumenItem label="Tipo de viaje" value={form.tipoViaje} />

        <ResumenItem label="Destino" value={form.destino} />

        <ResumenItem
          label="Fechas"
          value={
            form.cualquierFecha
              ? "Cualquier fecha si es más barato"
              : form.fechasFlexibles
              ? "Fechas flexibles"
              : `${form.fechaInicio || "?"} → ${form.fechaFin || "?"}`
          }
        />

        <ResumenItem label="Presupuesto" value={form.presupuesto} />

        <ResumenItem
          label="Estilo de viaje"
          value={[...form.estilo, form.estiloOtro].filter(Boolean).join(", ")}
        />

        <ResumenItem
          label="Acompañado"
          value={
            form.acompanado === "familia"
              ? `Familia (${form.edadesFamilia || "sin edades"})`
              : form.acompanado === "amigos"
              ? `Amigos (${form.numAmigos || "?"} personas)`
              : form.acompanado === "otro"
              ? form.acompanadoOtro
              : form.acompanado
          }
        />

        <ResumenItem label="Detalles importantes" value={form.detalles} />

        <ResumenItem
          label="Transporte preferido"
          value={[...form.transporte, form.transporteOtro]
            .filter(Boolean)
            .join(", ")}
        />

        <ResumenItem
          label="Clima preferido"
          value={form.clima || form.climaOtro}
        />

        <ResumenItem
          label="Actividad física diaria"
          value={form.deporteDiario || form.deporteDiarioOtro}
        />

        <ResumenItem
          label="Entorno preferido"
          value={[...form.entorno, form.entornoOtro]
            .filter(Boolean)
            .join(", ")}
        />

        <ResumenItem
          label="Festivales"
          value={
            form.festivales.gusta === false
              ? "No"
              : form.festivales.gusta === true
              ? [...form.festivales.estilos, form.festivalesOtro]
                  .filter(Boolean)
                  .join(", ")
              : "No especificado"
          }
        />

        <ResumenItem
          label="Eventos deportivos"
          value={
            form.eventosDeportivos.gusta === false
              ? "No"
              : form.eventosDeportivos.gusta === true
              ? [...form.eventosDeportivos.deportes, form.eventosDeportivosOtro]
                  .filter(Boolean)
                  .join(", ")
              : "No especificado"
          }
        />
      </div>

      {/* BOTONES */}
      <div className="flex flex-col gap-4">
        <button
          onClick={onSubmit}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold text-lg shadow-lg"
        >
          Enviar solicitud
        </button>

        <button
          onClick={back}
          className="w-full py-3 bg-white/20 border border-white/30 rounded-xl text-white"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
}

interface ResumenItemProps {
  label: string;
  value: string | number | null | undefined;
}

function ResumenItem({ label, value }: ResumenItemProps) {
  return (
    <div className="flex flex-col">
      <span className="text-white/60 text-sm">{label}</span>
      <span className="text-white font-medium">{value || "—"}</span>
    </div>
  );
}
