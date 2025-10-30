import Button from "@/components/Button";
import { EventService } from "@/data/events";
import Footer from "@/sections/footer";
import { PortableText } from "next-sanity";
import Image from "next/image";

// export const dynamic = "force-static";

export async function generateStaticParams() {
  const events = await new EventService().getEventsForNav();
  return events.map(({ slug }) => slug);
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await new EventService().getEventBySlug(slug);

  console.log(
    crypto.randomUUID().slice(0, 5) +
      ` >>> Rerendered the event page cache for /${slug} <<<`
  );

  return (
    <>
      <main className="container max-w-full py-12 md:py-16 lg:pb-30 min-h-[calc(100vh-25rem)] grid justify-items-center gap-8">
        <section className="prose prose-p prose-headings:font-komet prose-headings:text-3xl md:prose-headings:text-4xl xl:prose-headings:text-5xl prose-headings:font-bold prose-bull md:prose-p:text-xl xl:prose-p:text-2xl md:prose-ul:text-xl xl:prose-ul:text-2xl prose-ul:marker:text-base-content prose-p:m-0 text-base-content max-w-400">
          <div className="flex flex-col md:flex-row gap-8">
            <Image
              src={event?.imageUrl || ""}
              alt={event?.title || ""}
              width={750}
              height={400}
              className="md:order-2 md:float-right md:h-full md:w-1/2"
            />
            <div className="md:w-1/2">
              <PortableText value={event?.description || []} />
            </div>
          </div>
          <Button
            href={event?.buttonUrl || ""}
            className="btn bg-primary text-base-100 w-fit"
          >
            {event?.buttonLabel}
          </Button>
        </section>
        {(event?.sponsors.length as number) > 0 ? (
          <>
            <p className="mb-6 md:text-xl mt-8 md:mt-12">
              Este espacio es posible gracias al apoyo recibido de:
            </p>
            <section className="flex gap-8 flex-wrap justify-center">
              {event?.sponsors?.map((sponsor) => (
                <div key={sponsor}>
                  <Image src={sponsor || ""} alt="" width={250} height={100} />
                </div>
              ))}
            </section>
          </>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
