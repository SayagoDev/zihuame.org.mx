import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/draft-mode", "/api"],
      },
    ],
    sitemap: `${
      process.env.NEXT_PUBLIC_BASE_URL || "https://zihuame.org.mx"
    }/sitemap.xml`,
  };
}
