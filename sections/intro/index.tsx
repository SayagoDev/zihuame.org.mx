import Break from "@/components/Break";
import Button from "@/components/Button";
import { IntroService } from "@/data/intro";

export default async function Intro() {
  const { missionTitle, missionDes, missionDes2, buttonLabel, buttonUrl } =
    await new IntroService().getIntroData();
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
            {missionTitle}
          </h2>
          <div className="max-w-[35rem] md:row-span-2">
            <div className="text-xl flex flex-col gap-6">
              <p>{missionDes}</p>
              <p>{missionDes2}</p>
            </div>
          </div>
          <div className="flex justify-center md:justify-start xl:justify-end md:col-start-2 md:row-start-3 xl:col-start-4 xl:row-start-1 z-10">
            <Button href={buttonUrl} className="btn-error text-base-100">
              {buttonLabel}
            </Button>
          </div>
        </div>
      </section>
      <Break aria-hidden={true} />
    </>
  );
}
