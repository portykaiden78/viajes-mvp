import { useState } from "react";
import { StepPropsWithUpdate } from "@/app/solicitud/FormularioWizardPersonalizado/types";

export default function Step12Festivales({
  form,
  update,
  next,
  back,
}: StepPropsWithUpdate) {
  const estilos = ["Rock", "Electrónica", "Rock duro", "Folk", "Clásica"];

  const toggle = (op: string) => {
    const arr = form.festivales.estilos || [];
    if (arr.includes(op)) {
      update("festivales", {
        ...form.festivales,
        estilos: arr.filter((x) => x !== op),
      });
    } else {
      update("festivales", {
        ...form.festivales,
        estilos: [...arr, op],
      });
    }
  };

  const [otroActivo, setOtroActivo] = useState(false);

  return (
    <div className="space-y-6 animate-fade-slide">
      <h2 className="text-2xl font-semibold text-white">
        ¿Te gustan los festivales de música?
      </h2>

      <div className="space-y-3">
        <label className="flex items-center gap-3 text-white">
          <input
            type="radio"
            name="festivales"
            checked={form.festivales.gusta === true}
            onChange={() =>
              update("festivales", {
                gusta: true,
                estilos: [],
              })
            }
            className="w-5 h-5"
          />
          Sí
        </label>

        <label className="flex items-center gap-3 text-white">
          <input
            type="radio"
            name="festivales"
            checked={form.festivales.gusta === false}
            onChange={() =>
              update("festivales", {
                gusta: false,
                estilos: [],
              })
            }
            className="w-5 h-5"
          />
          No
        </label>
      </div>

      {/* Subpregunta */}
      {form.festivales.gusta === true && (
        <div className="space-y-3 mt-4">
          <h3 className="text-xl text-white">¿Qué música te gusta?</h3>

          {estilos.map((op: string) => (
            <label key={op} className="flex items-center gap-3 text-white">
              <input
                type="checkbox"
                checked={form.festivales.estilos?.includes(op)}
                onChange={() => toggle(op)}
                className="w-5 h-5"
              />
              {op}
            </label>
          ))}

          {/* Opción Otro */}
          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              checked={otroActivo}
              onChange={() => setOtroActivo(!otroActivo)}
              className="w-5 h-5"
            />
            Otro
          </label>

          {otroActivo && (
            <input
              type="text"
              placeholder="Especifica tu estilo musical"
              className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white"
              value={form.festivalesOtro || ""}
              onChange={(e) => update("festivalesOtro", e.target.value)}
            />
          )}
        </div>
      )}

      <div className="flex gap-4 mt-4">
        {back && (
          <button
            onClick={back}
            className="w-1/2 py-3 bg-white/20 border border-white/30 rounded-xl text-white"
          >
            Atrás
          </button>
        )}

        <button
          onClick={next}
          disabled={
            form.festivales.gusta === null ||
            (form.festivales.gusta === true &&
              form.festivales.estilos.length === 0 &&
              !form.festivalesOtro?.trim())
          }
          className="w-1/2 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold disabled:opacity-40"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
