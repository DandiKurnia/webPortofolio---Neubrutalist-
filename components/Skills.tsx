const skills = [
  {
    icon: "code",
    name: "React",
    bg: "bg-white",
    text: "text-pure-black",
    rotate: "",
  },
  {
    icon: "css",
    name: "Tailwind",
    bg: "bg-neon-blue",
    text: "text-white",
    rotate: "rotate-1",
  },
  {
    icon: "terminal",
    name: "Node.js",
    bg: "bg-white",
    text: "text-pure-black",
    rotate: "-rotate-2",
  },
  {
    icon: "design_services",
    name: "Figma",
    bg: "bg-neon-yellow",
    text: "text-pure-black",
    rotate: "",
  },
  {
    icon: "database",
    name: "MongoDB",
    bg: "bg-white",
    text: "text-pure-black",
    rotate: "rotate-2",
  },
  {
    icon: "api",
    name: "GraphQL",
    bg: "bg-pure-black",
    text: "text-white",
    rotate: "",
  },
  {
    icon: "animation",
    name: "Framer",
    bg: "bg-white",
    text: "text-pure-black",
    rotate: "-rotate-1",
  },
  {
    icon: "deployed_code",
    name: "Docker",
    bg: "bg-neon-pink",
    text: "text-white",
    rotate: "rotate-1",
  },
];

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
            <span>TYPESCRIPT</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>JAVASCRIPT</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>NEXT JS</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>REACT</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>TAILWIND</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>NODE.JS</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>NEST JS</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>LARAVEL</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>PHP</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>FLUTTER</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>DOCKER</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            {/* Duplicate for seamless loop */}
            <span>TYPESCRIPT</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>JAVASCRIPT</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>NEXT JS</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>REACT</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>TAILWIND</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>NODE.JS</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>NEST JS</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>LARAVEL</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>PHP</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>FLUTTER</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
            <span>DOCKER</span>{" "}
            <span className="material-symbols-outlined text-[32px] font-black">
              asterisk
            </span>
          </div>
        </div>

        {/* Desktop Cards Marquee */}
        <div className="hidden md:flex w-max animate-marquee">
          {/* Group 1 */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 shrink-0 pr-2 sm:pr-3 md:pr-4 lg:pr-6">
            {skills.map((skill) => (
              <SkillCard key={`g1-${skill.name}`} {...skill} />
            ))}
          </div>
          {/* Group 2 (duplicate for infinite loop) */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 shrink-0 pr-2 sm:pr-3 md:pr-4 lg:pr-6">
            {skills.map((skill) => (
              <SkillCard key={`g2-${skill.name}`} {...skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
