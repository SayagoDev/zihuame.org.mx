"use client";

import Logo from "@/components/Logo";
import DesktopMenu from "./_components/DesktopMenu";
import MobileMenu from "./_components/MobileMenu";
import { useEffect, useState } from "react";
import Break from "@/components/Break";
import ButtonLine from "@/components/ButtonLine";
import { EventDTO } from "@/data/events";

export default function Header({ events }: { events: EventDTO[] }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <header className="container max-w-full py-2 md:py-4 flex justify-between items-center relative">
        <MobileMenu events={events} />
        <div className="flex-1 flex justify-center lg:justify-start">
          <Logo
            width={115}
            height={59}
            className="w-[72px] h-[36px] sm:w-[79px] sm:h-[41] md:w-[115px] md:h-[59px] select-none"
          />
        </div>
        <div className="hidden lg:flex lg:justify-end lg:gap-6 2xl:gap-[180px] align-baseline">
          <DesktopMenu events={events} />
          <ButtonLine href="#">Quiero Donar</ButtonLine>
        </div>
        <ButtonLine
          href="#"
          className="right-4 text-xl md:text-2xl md:right-12 lg:hidden"
        >
          Donar
        </ButtonLine>
      </header>
      <Break aria-hidden={true} />
    </>
  );
}
