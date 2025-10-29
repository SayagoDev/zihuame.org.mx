import { Home, Book, Scale, Settings } from "lucide-react";

export default function Pillars() {
  return (
    <main
      className="container max-w-full py-12 md:py-16 lg:py-20 xl:py-[7.5rem]"
      id="pilares"
    >
      {/* Pilares Section */}
      <section>
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-4 text-md font-komet uppercase tracking-wider text-base-content/70 md:text-base xl:text-3xl">
              Nuestro Pilares
            </p>
            <h1 className="mb-6 text-balance text-3xl font-bold md:text-4xl lg:text-5xl xl:text-5xl">
              Somos una Fuerza de Cambio
            </h1>
            <p className="mx-auto text-lg max-w-4xl text-pretty leading-relaxed md:text-xl">
              Somos una organización que nace para impulsar el desarrollo social
              y cultural de los pueblos originarios. A través de estos pilares,
              buscamos eliminar la marginación y construir un futuro con
              dignidad.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 lg:gap-8">
            {/* Pilar 1: Fomento Comunitario */}
            <div className="group rounded-lg bg-base-50 p-6 transition-all drop-shadow-xl drop-shadow-primary/20 hover:drop-shadow-xl hover:drop-shadow-primary/30 md:p-8 max-w-xs sm:max-w-none mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-blue-100 p-4 transition-transform group-hover:scale-110">
                  <Home
                    className="h-12 w-12 text-primary md:h-14 md:w-14"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-medium text-foreground md:text-2xl text-center">
                Fomento Comunitario
              </h3>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg text-center">
                Impulsamos la acción colectiva y la organización desde las
                bases, permitiendo que las propias comunidades identifiquen sus
                necesidades y lideren proyectos de cambio real y sostenible.
              </p>
            </div>

            {/* Pilar 2: Identidad y Cultura */}
            <div className="group rounded-lg bg-base-50 p-6 transition-all drop-shadow-xl drop-shadow-accent/20 hover:drop-shadow-xl hover:drop-shadow-accent/30 md:p-8 max-w-xs sm:max-w-none mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-yellow-100 p-4 transition-transform group-hover:scale-110">
                  <Book
                    className="h-12 w-12 text-yellow-500 md:h-14 md:w-14"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-medium text-foreground md:text-2xl text-center">
                Identidad y Cultura
              </h3>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg text-center">
                Fomentamos el respeto por las tradiciones con programas
                educativos que fortalecen la identidad, permitiendo que las
                comunidades transmitan su valioso legado a las nuevas
                generaciones.
              </p>
            </div>

            {/* Pilar 3: Derechos e Igualdad */}
            <div className="group rounded-lg bg-base-50 p-6 transition-all drop-shadow-xl drop-shadow-success/20 hover:drop-shadow-xl hover:drop-shadow-success/30 md:p-8 max-w-xs sm:max-w-none mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-lime-100 p-4 transition-transform group-hover:scale-110">
                  <Scale
                    className="h-12 w-12 text-lime-600 md:h-14 md:w-14"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-medium text-foreground md:text-2xl text-center">
                Derechos e Igualdad
              </h3>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg text-center">
                Promovemos la igualdad de oportunidades y el respeto a los
                derechos humanos de todas las personas, trabajando para
                erradicar la discriminación y construir una sociedad justa.
              </p>
            </div>

            {/* Pilar 4: Autonomía y Desarrollo */}
            <div className="group rounded-lg bg-base-50 p-6 transition-all drop-shadow-xl drop-shadow-error/20 hover:drop-shadow-xl hover:drop-shadow-error/30 md:p-8 max-w-xs sm:max-w-none mx-auto">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-red-100 p-4 transition-transform group-hover:scale-110">
                  <Settings
                    className="h-12 w-12 text-red-500 md:h-14 md:w-14"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-medium text-foreground md:text-2xl text-center">
                Autonomía y Desarrollo
              </h3>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg text-center">
                Facilitamos la autonomía y el desarrollo pleno con herramientas
                de gestión para las propias comunidades, permitiendo que las
                personas mejoren su calidad de vida de manera real y sostenible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
