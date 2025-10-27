"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export interface CarouselImage {
  src: string;
  alt: string;
  url?: string;
}

interface CarouselSliderProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}

export default function CarouselSlider({
  images,
  autoPlayInterval = 3000,
}: CarouselSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [mobileContainerWidth, setMobileContainerWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Referencias para desktop
  const desktopCarouselRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);

  // Referencias para mobile
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);

  // Detectar si es mobile y actualizar anchos
  useEffect(() => {
    const updateSizes = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);

      if (mobile && mobileContainerRef.current) {
        const width = mobileContainerRef.current.offsetWidth;
        setMobileContainerWidth(width);
      } else if (!mobile && desktopContainerRef.current) {
        const width = desktopContainerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    // Pequeño delay para asegurar que el DOM esté listo
    setTimeout(updateSizes, 0);

    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const goToSlide = (index: number) => {
    if (isAnimatingRef.current) return;
    setCurrentIndex((prev) => {
      if (prev === index) return prev;
      return index;
    });
  };

  const nextSlide = () => {
    if (isAnimatingRef.current) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    if (isAnimatingRef.current) return;
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  // Auto-play
  useEffect(() => {
    // Limpiar cualquier intervalo existente
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }

    // Solo crear un nuevo intervalo si no está pausado y el intervalo es válido
    if (autoPlayInterval > 0 && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % images.length;
          return nextIndex;
        });
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };
  }, [isPaused, autoPlayInterval, images.length]);

  // Ejecutar la animación cuando cambie currentIndex
  useEffect(() => {
    const currentCarouselRef = isMobile
      ? mobileCarouselRef
      : desktopCarouselRef;
    const currentWidth = isMobile ? mobileContainerWidth : containerWidth;

    if (!currentCarouselRef.current || currentWidth === 0) return;

    isAnimatingRef.current = true;
    gsap.to(currentCarouselRef.current, {
      x: -currentIndex * currentWidth,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });
  }, [currentIndex, containerWidth, mobileContainerWidth, isMobile]);

  // Recalcular anchos cuando cambie el modo (mobile/desktop)
  useEffect(() => {
    const updateCurrentSize = () => {
      if (isMobile && mobileContainerRef.current) {
        const width = mobileContainerRef.current.offsetWidth;
        setMobileContainerWidth(width);
      } else if (!isMobile && desktopContainerRef.current) {
        const width = desktopContainerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    // Pequeño delay para asegurar que el DOM esté listo después del cambio
    setTimeout(updateCurrentSize, 100);
  }, [isMobile]);

  // Pausar auto-play al hacer hover
  const pauseAutoPlay = () => {
    setIsPaused(true);
  };

  const resumeAutoPlay = () => {
    setIsPaused(false);
  };

  // Helper para renderizar imagen con o sin enlace
  const renderImage = (image: CarouselImage) => {
    const imgElement = (
      <img src={image.src} alt={image.alt} className="w-full max-h-[400px]" />
    );

    if (image.url) {
      return (
        <a href={image.url} className="block w-full h-full cursor-pointer">
          {imgElement}
        </a>
      );
    }

    return imgElement;
  };

  return (
    <div
      className="mx-auto px-4"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Desktop: contenedor con botones a los lados */}
      <div className="hidden md:flex items-center justify-center gap-[26px] mx-auto max-w-[802px]">
        {/* Botón Anterior - Desktop */}
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border-2 border-black bg-transparent flex items-center justify-center transition-all hover:scale-102 flex-shrink-0"
          aria-label="Anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Contenedor del carrusel - Desktop */}
        <div
          ref={desktopContainerRef}
          className="relative overflow-hidden rounded-lg shadow-lg max-w-[750px] w-full"
        >
          <div ref={desktopCarouselRef} className="flex transition-none">
            {images.map((image, index) => (
              <div
                key={index}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="flex-shrink-0 w-full"
                style={{
                  width: containerWidth > 0 ? `${containerWidth}px` : "100%",
                }}
              >
                {renderImage(image)}
              </div>
            ))}
          </div>
        </div>

        {/* Botón Siguiente - Desktop */}
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border-2 border-black bg-transparent flex items-center justify-center transition-all hover:scale-102 flex-shrink-0"
          aria-label="Siguiente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile: contenedor con botones abajo */}
      <div className="md:hidden mx-auto">
        {/* Contenedor del carrusel - Mobile */}
        <div
          ref={mobileContainerRef}
          className="relative overflow-hidden rounded-lg shadow-lg"
        >
          <div ref={mobileCarouselRef} className="flex transition-none">
            {images.map((image, index) => (
              <div
                key={index}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="flex-shrink-0 w-full"
                style={{
                  width:
                    mobileContainerWidth > 0
                      ? `${mobileContainerWidth}px`
                      : "100%",
                }}
              >
                {renderImage(image)}
              </div>
            ))}
          </div>
        </div>

        {/* Botones rectangulares - Mobile */}
        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={prevSlide}
            className="w-[120px] h-12 rounded-lg border-1 border-black bg-transparent flex items-center justify-center transition-all hover:scale-102"
            aria-label="Anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="w-[120px] h-12 rounded-lg border-1 border-black bg-transparent flex items-center justify-center transition-all hover:scale-102"
            aria-label="Siguiente"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center gap-2.5 mt-4 md:mt-7">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-5 h-5 rounded-full border-1 transition-all duration-300 relative ${
              index === currentIndex
                ? "border-black"
                : "border-black/20 hover:border-black"
            }`}
            aria-label={`Ir a la imagen ${index + 1}`}
          >
            {index === currentIndex && (
              <div className="absolute w-[14px] h-[14px] bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
