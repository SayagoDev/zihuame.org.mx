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

export default function HomePage() {
  const statsData = new StatsService().getStatsData();
  return (
    <>
      <Home />
      <Intro />
      <Stats data={statsData} />
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
