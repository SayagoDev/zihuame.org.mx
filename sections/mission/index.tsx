import { Star } from "lucide-react";
import Image from "next/image";

export default function Mission() {
  return (
    <section
      className="container max-w-full py-12 md:py-16 lg:pb-[7.5rem]"
      id="mision"
    >
      <div className="mx-auto">
        <div className="grid gap-8 xl:grid-cols-2 xl:gap-12 items-center max-w-[1600px] mx-auto">
          {/* Left Content */}
          <div className="space-y-6 xl:space-y-8 max-w-[50rem] mx-auto xl:mx-0">
            <div className="space-y-4">
              <p className="text-sm md:text-lg font-komet tracking-wide text-base-content/70 uppercase">
                Por qué existimos
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-komet font-bold leading-tight text-balance">
                Únete a Nosotras por un Futuro con Dignidad y Esperanza
              </h1>
            </div>

            <p className="text-base md:text-xl leading-relaxed">
              Zihuame Mochilla nació en 2003 como respuesta a las condiciones
              adversas y la discriminación que enfrentan las comunidades
              indígenas. Somos una organización colectiva que busca transformar
              esa realidad, promoviendo el desarrollo humano y social desde
              nuestras propias raíces.
            </p>

            <div className="space-y-6">
              {/* Nuestra Misión */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Star className="w-6 h-6 fill-accent text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
                    Nuestra Misión
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                    Facilitar el desarrollo pleno y autogestivo de las
                    comunidades, respetando su diversidad y fortaleciendo sus
                    capacidades para que sean los principales agentes de su
                    propio cambio.
                  </p>
                </div>
              </div>

              {/* Nuestra Visión */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Star className="w-6 h-6 fill-accent text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
                    Nuestra Visión
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                    Construir un futuro donde las personas y comunidades
                    indígenas gocen de igualdad de oportunidades, preserven su
                    identidad cultural y vivan con dignidad y plenos derechos.
                  </p>
                </div>
              </div>

              {/* Nuestros Valores */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Star className="w-6 h-6 fill-accent text-accent" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
                    Nuestros Valores
                  </h3>
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                    Actuamos siempre desde el{" "}
                    <span className="bg-accent px-1 pt-1 rounded-md">
                      Respeto
                    </span>
                    , la{" "}
                    <span className="bg-accent px-1 pt-1 rounded-md">
                      Igualdad
                    </span>
                    , la{" "}
                    <span className="bg-accent px-1 pt-1 rounded-md">
                      Solidaridad
                    </span>{" "}
                    y la{" "}
                    <span className="bg-accent px-1 pt-1 rounded-md">
                      Cooperación
                    </span>
                    , creyendo en la autonomía y la honestidad como pilares de
                    nuestro trabajo.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <Image
            src="/images/nina_mision.png"
            alt="Niña sonriente con vestimenta tradicional indígena"
            width={937}
            height={951}
            className="object-contain mx-auto xl:absolute xl:-right-20 3xl:right-10 xl:w-[50rem] 3xl:w-[62rem]"
            priority
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
