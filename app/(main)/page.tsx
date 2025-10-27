import Home from "@/sections/home";
import Intro from "@/sections/intro";
import Stats from "@/sections/stats";
import Loop from "@/sections/loop";
import Carousel from "@/sections/carousel";
import Banner from "@/sections/banner";
import AreasOfIntervention from "@/sections/areas-of-intervention";
import AnnualReports from "@/sections/annual-reports";
import Allies from "@/sections/allies";
import Footer from "@/sections/footer";
import { StatsService } from "@/data/stats";

export default async function HomePage() {
  const { year, peopleAttended, womenAttended, menAttended } =
    await new StatsService().getStatsData();
  return (
    <>
      <Home />
      <Intro />
      <Stats
        year={year}
        peopleAttended={peopleAttended}
        womenAttended={womenAttended}
        menAttended={menAttended}
      />
      <Loop />
      <Carousel />
      <Banner />
      <AreasOfIntervention />
      <AnnualReports />
      <Allies />
      <Footer />
    </>
  );
}
