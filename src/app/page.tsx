export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">

      {/* HERO */}
      <section className="relative h-screen w-full flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img
            src="/hero-travel.jpg"
            alt="Viajar por el mundo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-3xl px-6 animate-fade-slide">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Viajes Por‑Ti
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10">
            Tu viaje empieza aquí. Nosotros planificamos, organizamos y te acompañamos en cada paso.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="/solicitud"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg transition-all"
            >
              Configurar mi viaje
            </a>

            <a
              href="/solicitud-personalizada"
              className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 rounded-xl text-lg font-semibold shadow-lg transition-all"
            >
              Que Viajes Por‑Ti lo organice todo
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN: QUÉ HACEMOS */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Viajar sin preocupaciones</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
          Nos dedicamos a organizar, planificar y acompañar a nuestros viajeros a cualquier parte del mundo.
          Con presupuesto fijo o abierto, buscando la opción más barata o la más cómoda.
          Tú solo disfrutas. Nosotros nos encargamos del resto.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg animate-fade">
            <h3 className="text-xl font-semibold mb-2">Planificación completa</h3>
            <p className="text-gray-600">Vuelos, hoteles, traslados, excursiones y más.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg animate-fade delay-150">
            <h3 className="text-xl font-semibold mb-2">Acompañamiento 24/7</h3>
            <p className="text-gray-600">Siempre contigo durante el viaje.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg animate-fade delay-300">
            <h3 className="text-xl font-semibold mb-2">Geolocalización inteligente</h3>
            <p className="text-gray-600">Para que nunca te sientas perdido.</p>
          </div>
        </div>
      </section>

      {/* SECCIÓN: FOTOS GRANDES */}
      <section className="grid md:grid-cols-2 gap-0">
        <div className="relative h-[400px] md:h-[500px]">
          <img
            src="/travel-1.jpg"
            className="w-full h-full object-cover"
            alt="Viaje por el mundo"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="flex flex-col justify-center p-10 bg-white">
          <h2 className="text-3xl font-bold mb-4">Viajes a tu medida</h2>
          <p className="text-gray-700 text-lg">
            Puedes configurar tu viaje paso a paso o dejar que nosotros lo diseñemos por ti.
            Fechas fijas, abiertas, presupuesto cerrado o flexible.
            Tú decides cómo viajar.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 text-center px-6">
        <h2 className="text-4xl font-bold mb-6">¿Listo para tu próximo viaje?</h2>
        <p className="text-lg text-gray-700 mb-10">
          Elige cómo quieres empezar tu aventura.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="/solicitud"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold shadow-lg transition-all"
          >
            Configurar mi viaje
          </a>

          <a
            href="/solicitud-personalizada"
            className="px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-xl text-lg font-semibold shadow-lg transition-all"
          >
            Que Viajes Por‑Ti lo organice todo
          </a>
        </div>
      </section>
    </main>
  );
}
