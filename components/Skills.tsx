"use client";

import { useEffect, useState } from "react";

interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const bgOptions = [
  "bg-white",
  "bg-neon-blue",
  "bg-neon-yellow",
  "bg-pure-black",
  "bg-neon-pink",
];

const textOptions = ["text-pure-black", "text-white"];

const rotateOptions = ["", "rotate-1", "-rotate-2", "rotate-2", "-rotate-1"];

function SkillCard({
  icon,
  name,
  bg,
  text,
  rotate,
}: {
  icon: string;
  name: string;
  bg: string;
  text: string;
  rotate: string;
}) {
  return (
    <div
      className={`${bg} ${text} brutal-border p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 brutal-shadow-sm hover:-translate-y-2 transition-transform ${rotate} w-28 sm:w-36 md:w-48 lg:w-64 shrink-0`}
    >
      <span className="material-symbols-outlined text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
        {icon}
      </span>
      <span className="font-mono font-bold text-[10px] sm:text-xs md:text-sm lg:text-lg uppercase">
        {name}
      </span>
    </div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/skills");
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const skillsWithStyles = skills.map((skill, index) => ({
    ...skill,
    bg: bgOptions[index % bgOptions.length],
    text:
      bgOptions[index % bgOptions.length] === "bg-pure-black" ||
      bgOptions[index % bgOptions.length] === "bg-neon-blue" ||
      bgOptions[index % bgOptions.length] === "bg-neon-pink"
        ? "text-white"
        : "text-pure-black",
    rotate: rotateOptions[index % rotateOptions.length],
  }));

  if (isLoading) {
    return (
      <section
        id="skills"
        className="py-10 sm:py-14 md:py-18 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-surface border-y-4 border-pure-black relative overflow-hidden"
      >
        <div className="flex items-center justify-center">
          <p className="font-mono font-bold text-on-surface-variant">Loading skills...</p>
        </div>
      </section>
    );
  }
  return (
    <section
      id="skills"
      className="py-10 sm:py-14 md:py-18 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-surface border-y-4 border-pure-black relative overflow-hidden"
    >
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 2px, transparent 2px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-between items-start sm:items-end mb-6 sm:mb-10 md:mb-12 lg:mb-16 relative z-10">
        <h2 className="font-headline text-xl sm:text-2xl md:text-3xl lg:text-[48px] font-black leading-[110%] tracking-tight uppercase bg-neon-pink text-white inline-block px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 brutal-border -rotate-2">
          Tech Arsenal
        </h2>
        <p className="font-body text-sm sm:text-base md:text-lg lg:text-xl max-w-md bg-white p-2.5 sm:p-3 md:p-4 brutal-border brutal-shadow-sm sm:rotate-1">
          Tools I use to create chaos and order on the web.
        </p>
      </div>

      <div className="w-full overflow-hidden relative z-10 py-2 md:py-4">
        {/* Mobile Text Marquee */}
        <div className="md:hidden bg-neon-yellow border-y-4 border-pure-black sm:-mx-6 px-4 sm:px-6 py-4 flex items-center relative overflow-hidden whitespace-nowrap mb-6 w-full">
          <div className="font-headline text-[32px] font-black uppercase flex items-center gap-6 animate-marquee pr-6 text-pure-black w-max flex-1">
            {skillsWithStyles.map((skill, index) => (
              <span key={`mobile-${skill.id}-${index}`} className="flex items-center gap-6">
                <span>{skill.title}</span>
                <span className="material-symbols-outlined text-[32px] font-black">
                  asterisk
                </span>
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {skillsWithStyles.map((skill, index) => (
              <span key={`mobile-dup-${skill.id}-${index}`} className="flex items-center gap-6">
                <span>{skill.title}</span>
                <span className="material-symbols-outlined text-[32px] font-black">
                  asterisk
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Desktop Cards Marquee */}
        <div className="hidden md:flex w-max animate-marquee">
          {/* Group 1 */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 shrink-0 pr-2 sm:pr-3 md:pr-4 lg:pr-6">
            {skillsWithStyles.map((skill) => (
              <SkillCard
                key={`g1-${skill.id}`}
                icon={skill.icon}
                name={skill.title}
                bg={skill.bg}
                text={skill.text}
                rotate={skill.rotate}
              />
            ))}
          </div>
          {/* Group 2 (duplicate for infinite loop) */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 shrink-0 pr-2 sm:pr-3 md:pr-4 lg:pr-6">
            {skillsWithStyles.map((skill) => (
              <SkillCard
                key={`g2-${skill.id}`}
                icon={skill.icon}
                name={skill.title}
                bg={skill.bg}
                text={skill.text}
                rotate={skill.rotate}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
