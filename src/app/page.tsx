export default function Home() {
  return (
    <main className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-6">
        Planificación de viajes personalizada, gratis
      </h1>

      <p className="text-lg mb-6">
        Te creamos un itinerario día a día totalmente personalizado, con soporte 24/7 durante tu viaje.
      </p>

      <a
        href="/solicitud"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
      >
        Solicitar mi viaje
      </a>
    </main>
  );
}
