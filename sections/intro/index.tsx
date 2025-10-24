import Break from "@/components/Break";
import Button from "@/components/Button";

export default function Intro() {
  return (
    <>
      <section className="container max-w-full py-6" id="intro">
        <div className="grid md:grid-cols-[auto_auto] md:grid-rows-[auto_1fr_auto] xl:grid-cols-[auto_auto_auto_auto] xl:grid-rows-[auto] gap-6">
          <div className="relative md:col-start-1 md:row-start-1 xl:col-start-1 xl:row-start-1 w-fit h-fit">
            <div className="absolute left-0 top-1/2 -translate-y-[11px] w-[18px] h-[18px] bg-primary rounded-full animate-pulse"></div>
            <h2 className="text-xl pl-6 font-medium text-primary">
              Nuestra Misión
            </h2>
          </div>
          <h2 className="md:w-[13.75rem] h-fit uppercase text-lg md:col-start-1 md:row-start-2 xl:col-start-2 xl:row-start-1">
            Transformando vidas: el camino de zihuame hacia el desarrollo
          </h2>
          <div className="max-w-[35rem] md:row-span-2">
            <div className="text-xl flex flex-col gap-6">
              <p>
                Nuestra misión es contribuir al desarrollo social y humano de
                las famlias indígenas, y las comunidades que habitan en el área
                metropolitana de Monterrey. Creemos firmemente en el potencial
                de cada mujer para ser agente de cambio y construir, juntas, un
                presente y un futuro más justo y equitativo.
              </p>
              <p>
                A través de nuestros programas de Salud, Educación, Economía y
                Desarrollo Comunitario, abordamos los desafíos desde una
                perspectiva de género y derechos humanos, fomentando la
                autonomía y creando soluciones duraderas que fortalecen el
                tejido social para las nuevas generaciones.
              </p>
            </div>
          </div>
          <div className="flex justify-center md:justify-start xl:justify-end md:col-start-2 md:row-start-3 xl:col-start-4 xl:row-start-1 z-10">
            <Button href="#" className="btn-error text-base-100">
              Únete Ahora
            </Button>
          </div>
        </div>
      </section>
      <Break aria-hidden={true} />
    </>
  );
}
