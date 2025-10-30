import { DataCount } from "@/sections/stats/_components/DataCount";
import Gallery from "./Gallery";
import { InterventionDTO } from "@/data/intervention";
import { DonationButtonWrapper } from "./DonationButtonWrapper";

export default function AreaPageTemplate({
  areaData,
}: {
  areaData: InterventionDTO;
}) {
  const gallery: string[] = areaData.gallery?.map((img) => img.url) || [];
  return (
    <>
      <section className="container max-w-full py-12 md:py-16 lg:pb-[7.5rem]">
        <div
          className="relative flex flex-col justify-end items-center bg-cover bg-no-repeat bg-[center_35%] top-0 left-0 w-full h-[clamp(20rem,_70vh,_48rem)] rounded-xl"
          style={{
            backgroundImage: `url(${areaData.imageUrl})`,
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full rounded-xl pointer-events-none bg-linear-to-t from-black/100 to-transparent"></div>
          <div className="z-10 p-8 flex flex-col justify-center items-center max-w-[50rem] gap-3">
            <h1 className="font-komet font-black text-3xl sm:text-4xl md:text-6xl text-base-100 uppercase text-center">
              {areaData.title}
            </h1>
            <p className="text-base md:text-xl xl:text-2xl text-center text-base-100">
              {areaData.description}
            </p>
            <DonationButtonWrapper
              className="btn md:btn-lg xl:btn-xl btn-dash hover:bg-transparent text-base-100"
              initialProgram={areaData.slug}
            >
              {areaData.buttonLabel}
            </DonationButtonWrapper>
          </div>
        </div>
      </section>

      <section className="container max-w-full pb-12 md:pb-16">
        <div className="col-start-1 lg:col-start-2 col-span-3 lg:col-span-1 flex flex-col items-center">
          <h2 className="font-komet font-bold text-2xl lg:text-3xl xl:text-[2.5rem] text-center">
            Personas atendidas
          </h2>
          {areaData.peopleAttendance === undefined ? (
            <DataCount
              label="y pertenecen a las siguientes comunidades"
              to={100}
              showGradient={true}
              gradientColor="primary"
              className="text-primary text-6xl lg:text-7xl xl:text-8xl"
              labelClassName="font-komet font-bold text-2xl lg:text-3xl xl:text-[2.5rem] text-center"
            />
          ) : (
            <DataCount
              label="y pertenecen a las siguientes comunidades"
              to={areaData.peopleAttendance as number}
              showGradient={true}
              gradientColor="primary"
              className="text-primary text-6xl lg:text-7xl xl:text-8xl"
              labelClassName="font-komet font-bold text-2xl lg:text-3xl xl:text-[2.5rem] text-center"
            />
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 lg:gap-5 xl:gap-6 mt-15">
          {areaData.communities?.map((community) => (
            <h3
              key={community.name}
              className="p-2 bg-base-50 text-xl md:text-2xl lg:text-3xl xl:text-4xl font-komet font-extrabold rounded drop-shadow-md hover:scale-105 transition-all duration-300"
              style={{
                color: `${community.color}`,
                boxShadow: `0 5px 15px -5px ${community.color}90`,
              }}
            >
              {community.name}
            </h3>
          ))}
        </div>
      </section>

      {gallery.length > 0 && <Gallery photos={gallery} title="Galería" />}
    </>
  );
}
