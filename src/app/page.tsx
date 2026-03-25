export default function Home() {
  return (
    <main className="min-h-screen max-w-2xl mx-auto py-20 px-4 fade">
      <h1 className="text-4xl font-bold mb-4 leading-tight">
        Planificación de viajes personalizada, gratis
      </h1>

      <p className="text-lg text-gray-600 mb-8">
        Te creamos un itinerario día a día totalmente personalizado, con soporte 24/7 durante tu viaje.
      </p>

      <a href="/solicitud" className="btn-primary">
        Solicitar mi viaje
      </a>
    </main>
  );
}
