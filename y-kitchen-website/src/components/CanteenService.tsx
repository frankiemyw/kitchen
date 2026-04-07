export default function CanteenService() {
  return (
    <section id="canteen-service" className="py-16 sm:py-24 bg-warm-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            Canteen Service
          </h2>
          <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto">
            We provide canteen food service solutions for offices, schools, and
            business facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-warm-border bg-white overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-SCFfh3IPBvOfkTdeAapwQhZMndxds7.jpeg"
                alt="Y Kitchen canteen service operations showing office cafeterias, food counters, and dining areas"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-charcoal mb-2">
                Daily Meal Operations
              </h3>
              <p className="text-sm text-charcoal-muted">
                Consistent food preparation and service for everyday canteen needs.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-warm-border bg-white overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-5mF1737MLK66P5HjC72rzG2rAui9kS.png"
                alt="Y Kitchen customized canteen service showing staff, buffet food warmers, and dining facilities"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-charcoal mb-2">
                Customized Service Plans
              </h3>
              <p className="text-sm text-charcoal-muted">
                Flexible arrangements based on headcount, budget, and service
                setup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
