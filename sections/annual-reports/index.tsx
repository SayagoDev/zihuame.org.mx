import Heading from "@/components/Heading";
import Image from "next/image";
import Button from "./_components/Button";
import { Arrows } from "./_components/Arrows";

export default function AnnualReports() {
  return (
    <section id="informes" className="container max-w-full py-12 md:py-16 ">
      <Heading>Informe Anual</Heading>
      <div className=" md:max-w-[34rem] lg:max-w-[40rem] xl:max-w-[60rem] 3xl:max-w-[85rem] flex flex-col items-center md:justify-between gap-4 md:flex-row mt-8 sm:mt-14 lg:mt-[4.5rem] xl:mt-[8rem] mx-auto">
        <div className="relative">
          <Arrows />
          <a href="#">
            <Image
              src="/images/reports/informe_2024.png"
              alt="Informe Anual 2024"
              width={440}
              height={572}
              className="w-65 md:w-70 xl:w-90 3xl:w-full drop-shadow-lg drop-shadow-success hover:scale-102 transition-all duration-300"
            />
          </a>
        </div>
        <div className="grid gap-5 justify-items-start mt-8 md:mt-0">
          <h3 className="font-bold text-xl xl:text-3xl 3xl:text-4xl">
            Informes Anteriores:
          </h3>
          <div className="grid xl:grid-cols-2 gap-2 overflow-y-auto max-h-[19.5rem] informes-container">
            <Button href="#">Informe 2023</Button>
            <Button href="#">Informe 2022</Button>
            <Button href="#">Informe 2021</Button>
            <Button href="#">Informe 2020</Button>
            <Button href="#">Informe 2018</Button>
            <Button href="#">Informe 2017</Button>
            <Button href="#">Informe 2016</Button>
            <Button href="#">Informe 2015</Button>
            <Button href="#">Informe 2014</Button>
            <Button href="#">Informe 2013</Button>
            <Button href="#">Informe 2012</Button>
            <Button href="#">Informe 2011</Button>
            <Button href="#">Informe 2010</Button>
          </div>
          <img
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
