"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id], footer[id]");
      let currentSectionId = "";

      // Get current scroll position with an offset
      const scrollY = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute("id") || "";
        }
      });

      setActiveSection(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkClass = (href: string) => {
    const id = href.replace("#", "");
    if (activeSection === id) {
      return "text-secondary underline decoration-4 underline-offset-8 transition-all";
    }
    return "text-on-surface hover:translate-x-1 hover:translate-y-1 hover:shadow-neubrutalism-hover transition-all";
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-8 lg:px-16 py-3 w-full sticky top-0 z-50 bg-surface border-b-4 border-on-surface shadow-neubrutalism">
      <div className="font-headline text-lg sm:text-xl md:text-2xl lg:text-[32px] font-black leading-[110%] text-on-surface">
        DanBilDad
      </div>

      <div className="hidden md:flex items-center gap-4 lg:gap-8 font-mono text-xs lg:text-sm font-bold">
        <a className={getLinkClass("#hero")} href="#hero">
          Home
        </a>

        <a className={getLinkClass("#skills")} href="#skills">
          Skills
        </a>
        <a className={getLinkClass("#projects")} href="#projects">
          Projects
        </a>
        <a className={getLinkClass("#certifications")} href="#certifications">
          Certifications
        </a>
      </div>

      <button className="bg-primary-container text-pure-black font-mono font-bold px-4 py-2 lg:px-6 lg:py-3 brutal-border brutal-shadow flex items-center gap-2 text-xs lg:text-sm uppercase whitespace-nowrap">
        Download CV
        <span className="material-symbols-outlined text-sm lg:text-base hidden md:block">
          download
        </span>
      </button>
    </nav>
  );
}
