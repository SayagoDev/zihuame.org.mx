import Heading from "@/components/Heading";
import Image from "next/image";
import Button from "./_components/Button";
import { Arrows } from "./_components/Arrows";
import { ReportService } from "@/data/reports";

export default async function AnnualReports() {
  const reports = await new ReportService().getAllReports();
  return (
    <section id="informes" className="container max-w-full py-12 md:py-16 ">
      <Heading>Informe Anual</Heading>
      <div className="md:max-w-136 lg:max-w-160 xl:max-w-240 3xl:max-w-340 flex flex-col items-center md:justify-between gap-4 md:flex-row mt-8 sm:mt-14 lg:mt-18 xl:mt-32 mx-auto">
        <div className="relative">
          <Arrows />
          <a href="#">
            <Image
              src={reports[0].imgUrl as string}
              alt="Informe Anual 2024"
              width={440}
              height={572}
              className="w-65 md:w-70 xl:w-90 3xl:w-100 hover:scale-102 transition-all duration-300"
              style={{
                filter: `drop-shadow(${reports[reports.length - 1].shadowColor} 0 0 0.7rem)`,
              }}
            />
          </a>
        </div>
        <div className="grid gap-5 justify-items-start mt-8 md:mt-0">
          <h3 className="font-bold text-xl xl:text-3xl 3xl:text-4xl">
            Informes Anteriores:
          </h3>
          <div className="grid xl:grid-cols-2 gap-2 overflow-y-auto max-h-[19.5rem] informes-container">
            {reports.map((report) => (
              <Button key={report.id} href={report.pdfUrl} target="_blank">
                {report.title}
              </Button>
            ))}
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
