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

export default function HomePage() {
  return (
    <>
      <Home />
      <Intro />
      <Stats />
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
