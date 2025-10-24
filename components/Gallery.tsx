"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "./Heading";

// Registrar el plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface GalleryProps {
  photos: string[];
  title: string;
}

export default function Gallery({ photos, title }: GalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || imageRefs.current.length === 0) return;

    // Configurar animaciones para cada imagen
    imageRefs.current.forEach((imageRef, index) => {
      if (!imageRef) return;

      gsap.set(imageRef, {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      gsap.to(imageRef, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.1, // Stagger effect
        scrollTrigger: {
          trigger: imageRef,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [photos]);

  if (!photos || photos.length === 0) return null;

  return (
    <section className="container max-w-full py-12 md:py-16">
      <Heading headingLevel="h2" className="mb-8 md:mb-16">
        Galería
      </Heading>
      <div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            ref={(el) => {
              if (!el) return;
              imageRefs.current[index] = el;
            }}
            className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={photo}
              alt={`${title} - Foto ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
