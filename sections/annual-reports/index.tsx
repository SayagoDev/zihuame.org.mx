import Heading from "@/components/Heading";
import Image from "next/image";
import Button from "./_components/Button";
import { Arrows } from "./_components/Arrows";
import { ReportService } from "@/data/reports";

export default async function AnnualReports() {
  const reports = await new ReportService().getAllReports();
  const hasFeatured = Array.isArray(reports) && reports.length > 0;
  const featured = hasFeatured ? reports[0] : undefined;
  return (
    <section id="informes" className="container max-w-full py-12 md:py-16 ">
      <Heading>Informe Anual</Heading>
      <div className="md:max-w-136 lg:max-w-160 xl:max-w-240 3xl:max-w-340 flex flex-col items-center md:justify-between gap-4 md:flex-row mt-8 sm:mt-14 lg:mt-18 xl:mt-32 mx-auto">
        <div className="relative">
          <Arrows />
          {hasFeatured && featured?.pdfUrl && featured?.imgUrl ? (
            <a href={featured.pdfUrl} target="_blank">
              <Image
                src={featured.imgUrl as string}
                alt={featured.title ?? "Informe Anual"}
                width={440}
                height={572}
                className="w-65 md:w-70 xl:w-90 3xl:w-100 hover:scale-102 transition-all duration-300"
                style={{
                  filter: `drop-shadow(${
                    featured.shadowColor ?? "rgba(0,0,0,0.2)"
                  } 0 0 0.7rem)`,
                }}
              />
            </a>
          ) : (
            <div className="w-65 md:w-70 xl:w-90 3xl:w-100 aspect-[440/572] grid place-items-center bg-gray-100 text-gray-500 rounded">
              <span>No hay informe destacado disponible</span>
            </div>
          )}
        </div>
        <div className="grid gap-5 justify-items-start mt-8 md:mt-0">
          <h3 className="font-bold text-xl xl:text-3xl 3xl:text-4xl">
            Informes Anteriores:
          </h3>
          <div className="grid xl:grid-cols-2 gap-2 overflow-y-auto max-h-[19.5rem] informes-container">
            {Array.isArray(reports) && reports.length > 0 ? (
              reports.map((report) => (
                <Button
                  key={report.id ?? report.title}
                  href={report.pdfUrl ?? "#"}
                  target="_blank"
                >
                  {report.title ?? "Informe sin título"}
                </Button>
              ))
            ) : (
              <span className="text-gray-500">
                Aún no hay informes publicados
              </span>
            )}
          </div>
          <Image
            src="/images/down_arrow.svg"
            alt="Flecha hacia abajo"
            width={25}
            height={25}
            className="mx-auto"
            style={{ animation: "a-down 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
