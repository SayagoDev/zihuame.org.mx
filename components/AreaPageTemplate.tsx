import { AreaOfIntervention } from "@/sections/areas-of-intervention/types";
import { DataCount } from "@/sections/stats/_components/DataCount";
import Gallery from "./Gallery";

interface AreaPageTemplateProps {
  area: AreaOfIntervention;
}

const COLORS = [
  "#8DC63E",
  "#6AB7E6",
  "#DD65A5",
  "#EFDE2E",
  "#9B89C0",
  "#00B3D8",
  "#F1C7D5",
  "#E26D2F",
];

export default function AreaPageTemplate({ area }: AreaPageTemplateProps) {
  return (
    <>
      <section className="container max-w-full py-12 md:py-16 lg:pb-[7.5rem]">
        <div
          className="relative flex flex-col justify-end items-center bg-cover bg-no-repeat bg-[center_35%] top-0 left-0 w-full h-[clamp(20rem,_70vh,_48rem)] rounded-xl"
          style={{
            backgroundImage: `url(${area.img})`,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none bg-linear-to-t from-black/100 to-transparent"></div>
          <div className="z-10 p-8 flex flex-col justify-center items-center max-w-[50rem] gap-3">
            <h1 className="font-komet font-black text-3xl sm:text-4xl md:text-6xl text-base-100 uppercase text-center">
              {area.title}
            </h1>
            <p className="text-base md:text-xl xl:text-2xl text-center text-base-100">
              {area.description}
            </p>
            <a
              href={area.hrefDonate}
              className="btn md:btn-lg xl:btn-xl btn-dash hover:bg-transparent text-base-100"
            >
              Donar
            </a>
          </div>
        </div>
      </section>

      <section className="container max-w-full pb-12 md:pb-16">
        <div className="col-start-1 lg:col-start-2 col-span-3 lg:col-span-1 flex flex-col items-center">
          <h2 className="font-komet font-bold text-2xl lg:text-3xl xl:text-[2.5rem] text-center">
            Personas atendidas
          </h2>
          <DataCount
            label="y pertenecen a las siguientes comunidades"
            to={area.totalPeople}
            showGradient={true}
            gradientColor="primary"
            className="text-primary text-6xl lg:text-7xl xl:text-8xl"
            labelClassName="font-komet font-bold text-2xl lg:text-3xl xl:text-[2.5rem] text-center"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-15">
          {area.communities.map((community, index) => (
            <h3
              key={community}
              className="p-2 bg-base-50 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-komet font-extrabold rounded drop-shadow-md hover:scale-105 transition-all duration-300"
              style={{
                // Aplica sombra de color de forma inline,
                // ya que Tailwind no soporta valores dinámicos custom aquí
                color: COLORS[index % COLORS.length],
                boxShadow: `0 5px 15px -5px ${COLORS[index % COLORS.length]}90`,
              }}
            >
              {community}
            </h3>
          ))}
        </div>
      </section>

      {area.gallery && area.gallery.length > 0 && (
        <Gallery photos={area.gallery} title="Galería" />
      )}
    </>
  );
}
