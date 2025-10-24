import SimpleMarquee from "@/components/fancy/blocks/simple-marquee";
import { cn } from "@/lib/utils/cn";

interface BannerProps {
  message: string;
  separator?: string;
  separatorColor?: string;
  className?: string;
}

export const SingleBanner = ({
  message = "este es el mensaje de default",
  separator = "✦",
  separatorColor = "#F6F4EF",
  className,
}: BannerProps) => {
  return (
    <div
      className={cn(`bg-primary py-5 lg:py-6`, className)}
      style={{ width: "200vw", marginLeft: "-50vw" }}
    >
      <SimpleMarquee
        direction="right"
        baseVelocity={10}
        repeat={5}
        useScrollVelocity={true}
        scrollAwareDirection={true}
        className="text-2xl lg:text-5xl font-komet font-extrabold uppercase text-base-100"
      >
        <div className="flex items-center whitespace-nowrap">
          <span
            className="after:ml-2"
            style={
              {
                "--tw-content": `'${separator}'`,
              } as React.CSSProperties
            }
          >
            {message}
            <span className="ml-2" style={{ color: separatorColor }}>
              {separator}
            </span>
          </span>
        </div>
      </SimpleMarquee>
    </div>
  );
};
