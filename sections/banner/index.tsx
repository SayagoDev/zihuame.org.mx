"use client";

import { SingleBanner } from "./_components/SingleBanner";

const message = "súmate al cambio, dona ahora";

export default function Banner() {
  return (
    <>
      <section
        id="banner"
        className="relative @container/banner py-15 md:py-[7.5rem] h-[18rem] overflow-hidden"
      >
        <SingleBanner
          message={message}
          className="bg-warning absolute rotate-[6deg] @sm/banner:rotate-[4deg] @md/banner:rotate-[3deg] @lg/banner:rotate-[4deg] @xl/banner:rotate-[1.8deg] top-1/2 -translate-y-2/3"
        />
        <SingleBanner
          message={message}
          className="bg-primary absolute -rotate-[3deg] @sm/banner:-rotate-[2deg] @md/banner:-rotate-[1.5deg] @lg/banner:-rotate-[1deg] @xl/banner:-rotate-[1.deg] top-[45%]"
        />
      </section>
    </>
  );
}
