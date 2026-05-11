const certifications = [
  {
    title: "Advanced Frontend Architecture",
    issuer: "Meta",
    year: "2023",
    iconColor: "text-neon-blue",
    cardBg: "bg-white",
    rotate: "rotate-[-5deg] md:-rotate-2",
  },
  {
    title: "UX Psychology Masterclass",
    issuer: "Don Norman",
    year: "2022",
    iconColor: "text-neon-pink",
    cardBg: "bg-neon-yellow",
    rotate: "rotate-[3deg] md:rotate-3 translate-x-2 md:translate-x-0",
  },
  {
    title: "CSS Mastery",
    issuer: "Frontend Masters",
    year: "2024",
    iconColor: "text-pure-black",
    cardBg: "bg-white",
    rotate: "rotate-[-2deg] md:-rotate-1 -translate-x-1 md:translate-x-0",
  },
  {
    title: "WebGL Fundamentals",
    issuer: "ThreeJS Journey",
    year: "2023",
    iconColor: "text-neon-blue",
    cardBg: "bg-neon-pink",
    rotate: "rotate-[2deg] md:rotate-2",
  },
];

export default function Certifications() {
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
        {/* Decorative dashed line (hidden on mobile) */}
        <div
          className="absolute top-1/2 left-0 w-[200%] h-1 border-t-4 border-dashed border-pure-black -translate-y-1/2 z-0 hidden md:block"
          aria-hidden="true"
        />

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-4 sm:gap-5 md:hidden relative z-10 max-w-sm mx-auto mt-4">
          {certifications.map((cert) => (
            <CertCard key={cert.title} cert={cert} />
          ))}
        </div>

        {/* md+: horizontal scroll */}
        <div className="hidden md:block overflow-x-auto pb-4 lg:pb-8 hide-scrollbar">
          <div className="flex gap-6 lg:gap-12 w-max relative z-10 py-4">
            {certifications.map((cert) => (
              <CertCard key={cert.title} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CertCard({
  cert,
}: {
  cert: {
    title: string;
    issuer: string;
    year: string;
    iconColor: string;
    cardBg: string;
    rotate: string;
  };
}) {
  return (
    <div
      className={`${cert.cardBg} p-3 sm:p-4 md:p-5 lg:p-6 brutal-border brutal-shadow w-full md:w-64 lg:w-80 shrink-0 ${cert.rotate} hover:rotate-0 transition-transform`}
    >
      <div className="border-2 border-pure-black p-3 sm:p-4 h-full flex flex-col justify-between bg-white/90">
        <div>
          <span
            className={`material-symbols-outlined text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 ${cert.iconColor} block`}
          >
            verified
          </span>
          <h4 className="font-headline text-sm sm:text-base md:text-lg lg:text-xl font-black uppercase mb-1">
            {cert.title}
          </h4>
          <p className="font-mono font-bold text-[10px] sm:text-xs md:text-sm text-on-surface-variant">
            {cert.issuer}
          </p>
        </div>
        <div className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 pt-2 sm:pt-3 md:pt-4 border-t-2 border-pure-black flex justify-between items-center">
          <span className="font-mono font-bold text-[10px] sm:text-xs">
            {cert.year}
          </span>
          <span className="bg-pure-black text-white px-1.5 sm:px-2 py-0.5 sm:py-1 font-mono font-bold text-[10px] sm:text-xs">
            VERIFIED
          </span>
        </div>
      </div>
    </div>
  );
}
