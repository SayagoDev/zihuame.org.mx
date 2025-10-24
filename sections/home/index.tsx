import Break from "@/components/Break";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section
        className="container max-w-full pt-10 lg:py-15 relative overflow-x-clip"
        id="home"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-komet font-extrabold uppercase">
          <div className="text-container flex flex-col justify-start relative">
            <span className="text-lg sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl 3xl:text-4xl">
              De la raíz al futuro
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-4xl md:absolute md:top-8 md:w-[33.125rem] lg:text-[3.125rem] lg:w-[50rem] xl:text-[4.0625rem] xl:w-[60rem] 3xl:text-[6.4rem] 3xl:w-[80rem]">
              Dignidad y <br /> autonomía para <br /> mujeres con esperanza
            </h1>
          </div>
          {/* En md, la imagen toma la parte derecha del grid */}
          <div className="hidden md:flex relative justify-end items-start">
            <Image
              loading="eager"
              src="/images/hero_image.png"
              alt="Imagen de la página de inicio | Niña sonriendo"
              width={683}
              height={524}
              className="relative -top-8 lg:-top-10 -right-15 lg:-right-20 max-w-full h-auto"
            />
          </div>
        </div>
        {/* Imagen como overlay en pantallas pequeñas */}
        <div className="md:hidden mt-4 relative">
          <Image
            loading="eager"
            src="/images/hero_image.png"
            alt="Imagen de la página de inicio | Niña sonriendo"
            width={683}
            height={524}
            className="relative max-w-full mx-auto h-auto"
          />
          <Break
            aria-hidden={true}
            className="absolute inset-x-0 -bottom-0 -mt-[1px] z-0"
          />
        </div>
      </section>
      <div className="hidden md:block">
        <Break aria-hidden={true} className="-mt-[33px] lg:-mt-[101px]" />
      </div>
    </>
  );
}
