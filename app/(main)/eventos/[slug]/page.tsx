import Footer from "@/sections/footer";

export default async function EventPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <main className="container max-w-full py-12 md:py-16 lg:pb-[7.5rem]"></main>
      <Footer />
    </>
  );
}
