"use client";

import { useEffect, useState, useRef } from "react";

interface Certification {
  id: string;
  title: string;
  company: string;
  link: string | null;
  years: string;
}

const rotations = [
  "rotate-[-5deg] md:-rotate-2",
  "rotate-[3deg] md:rotate-3 translate-x-2 md:translate-x-0",
  "rotate-[-2deg] md:-rotate-1 -translate-x-1 md:translate-x-0",
  "rotate-[2deg] md:rotate-2",
];

const iconColors = ["text-neon-blue", "text-neon-pink", "text-pure-black", "text-neon-blue"];
const cardBgs = ["bg-white", "bg-neon-yellow", "bg-white", "bg-neon-pink"];

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch("/api/certifications");
        if (response.ok) {
          const data = await response.json();
          setCertifications(data);
        }
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <section
        id="certifications"
        className="py-10 sm:py-14 md:py-18 lg:py-24 bg-surface border-y-4 border-pure-black overflow-hidden flex flex-col items-center"
      >
        <h2 className="font-headline text-xl sm:text-2xl md:text-3xl lg:text-[48px] font-black leading-[110%] tracking-tight uppercase bg-white inline-block px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 brutal-border brutal-shadow mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-center z-10 mx-4">
          Wall of Validation
        </h2>
        <p className="font-mono font-bold text-on-surface-variant">Loading...</p>
      </section>
    );
  }
  return (
    <section
      id="certifications"
      className="py-10 sm:py-14 md:py-18 lg:py-24 bg-surface border-y-4 border-pure-black overflow-hidden flex flex-col items-center"
    >
      <h2 className="font-headline text-xl sm:text-2xl md:text-3xl lg:text-[48px] font-black leading-[110%] tracking-tight uppercase bg-white inline-block px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 brutal-border brutal-shadow mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-center z-10 mx-4">
        Wall of Validation
      </h2>

      {/* Mobile: vertical stack, md+: horizontal scroll */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 relative">
        {/* Decorative dashed line */}
        <div
          className="absolute top-1/2 left-0 w-[200%] h-1 border-t-4 border-dashed border-pure-black -translate-y-1/2 z-0"
          aria-hidden="true"
        />

        {/* Horizontal scroll with navigation buttons */}
        <div className="relative mt-4 md:mt-0">
          {/* Left Navigation Button - Hidden on tablet, visible on desktop */}
          <button
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-neon-blue border-4 border-pure-black p-3 brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all items-center justify-center"
            aria-label="Scroll left"
          >
            <span className="material-symbols-outlined text-3xl text-pure-black">
              chevron_left
            </span>
          </button>

          {/* Right Navigation Button - Hidden on tablet, visible on desktop */}
          <button
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-neon-pink border-4 border-pure-black p-3 brutal-shadow hover:translate-x-[2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all items-center justify-center"
            aria-label="Scroll right"
          >
            <span className="material-symbols-outlined text-3xl text-pure-black">
              chevron_right
            </span>
          </button>

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 lg:pb-8 hide-scrollbar"
          >
            <div className="flex gap-6 lg:gap-12 w-max relative z-10 py-4">
              {certifications.map((cert, index) => (
                <CertCard
                  key={cert.id}
                  cert={cert}
                  iconColor={iconColors[index % iconColors.length]}
                  cardBg={cardBgs[index % cardBgs.length]}
                  rotate={rotations[index % rotations.length]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CertCard({
  cert,
  iconColor,
  cardBg,
  rotate,
}: {
  cert: Certification;
  iconColor: string;
  cardBg: string;
  rotate: string;
}) {
  const CardContent = (
    <div
      className={`${cardBg} p-3 sm:p-4 md:p-5 lg:p-6 brutal-border brutal-shadow w-[240px] sm:w-[280px] md:w-64 lg:w-80 shrink-0 ${rotate} hover:rotate-0 transition-transform`}
    >
      <div className="border-2 border-pure-black p-3 sm:p-4 h-full flex flex-col justify-between bg-white/90">
        <div>
          <span
            className={`material-symbols-outlined text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 ${iconColor} block`}
          >
            verified
          </span>
          <h4 className="font-headline text-sm sm:text-base md:text-lg lg:text-xl font-black uppercase mb-1">
            {cert.title}
          </h4>
          <p className="font-mono font-bold text-[10px] sm:text-xs md:text-sm text-on-surface-variant">
            {cert.company}
          </p>
        </div>
        <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 pt-2 sm:pt-3 md:pt-4 border-t-2 border-pure-black flex justify-between items-center">
          <span className="font-mono font-bold text-[10px] sm:text-xs">
            {cert.years}
          </span>
          <span className="bg-pure-black text-white px-1.5 sm:px-2 py-0.5 sm:py-1 font-mono font-bold text-[10px] sm:text-xs">
            VERIFIED
          </span>
        </div>
      </div>
    </div>
  );

  if (cert.link) {
    return (
      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:scale-105 transition-transform"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
