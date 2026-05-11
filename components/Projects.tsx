const projects = [
  {
    windowTitle: "cyber_dash.zip",
    imageBg: "bg-neon-yellow",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6PA1Tb54bm-pmCGq3MVcP011j5jBAFIvguCJD-_edXTCR4RVj2-vA6LVmTSkDa5s0tVCzv7uDjqfWYpwmr7zm0J8q1SCC30tU_-mEBIx_-8BBaKEzFunPtRDRerjhtvw2oOQkTY8pH9SEvjvF7iYjbeF6Z7W65wM1FA01HfyKBdLT_gCnIfyThAN3e-ekmuU4_nPjDPBK67SjxkJnPsaVrxGD0W_smpAjIhmsvfCi_snizEgY49whabN9EiWSGmNSr3FI0gm81NE",
    imageAlt: "Code on screen",
    tags: ["React", "Three.js"],
    title: "Cyber-Dash",
    description:
      "A high-octane analytics dashboard built for speed and visual impact.",
    offset: false,
  },
  {
    windowTitle: "neo-poster.png",
    imageBg: "bg-neon-pink",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCUqrvQz5-XAA6LbX27llrCzljn3MbmWwpwYIhl_9KtQYH7uOXTiOxj4p1tP0KxOMCBxEXFzq9MBv-vQgsPSL6cmPbIzE-p_Ht7zrPZxodjLsIOC13XG8pKhpFmeUJ9qnH4b_3pUMAiYb1bfrAqac2-tZKlT9KcYz69CQeG37v2w1asyhpAVO7Vxk-EQcxPM6HfIHXwZdfyte8J71WA-TqVsUbvB_33qu3JrF1xYk21z5ZDmobT31ANA5zWr1ImowYwnsU2WLK9AbI",
    imageAlt: "Mobile app design",
    tags: ["React Native", "Stripe"],
    title: "Neo-Poster",
    description:
      "Generative typography posters, exported from a challenging traditional art and layouts.",
    offset: true,
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-10 sm:py-14 md:py-18 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-16 bg-surface-container-highest relative"
    >
      <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 flex flex-col sm:flex-row items-center sm:items-center justify-center md:justify-start gap-3 sm:gap-4 md:gap-6">
        <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter bg-white brutal-border inline-block px-4 sm:px-4 md:px-4 pt-2 md:pt-2 -rotate-1 md:-rotate-2 text-center md:text-left">
          Selected Work
        </h2>
        <svg
          className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 text-neon-pink hidden sm:block"
          fill="currentColor"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <polygon points="50,15 61,35 85,35 66,50 73,75 50,60 27,75 34,50 15,35 39,35" />
        </svg>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 max-w-sm md:max-w-none mx-auto md:mx-0">
        {projects.map((project) => (
          <div
            key={project.title}
            className={`bg-white brutal-border brutal-shadow flex flex-col group ${
              project.offset ? "md:mt-12 lg:mt-16" : ""
            }`}
          >
            <div className="computer-window-header">
              <div className="window-dot dot-red"></div>
              <div className="window-dot dot-yellow"></div>
              <div className="window-dot dot-green"></div>
              <span className="font-mono font-bold text-white text-[10px] sm:text-xs ml-3 sm:ml-4">
                {project.windowTitle}
              </span>
            </div>
            <div
              className={`p-2 sm:p-3 md:p-4 border-b-4 border-pure-black ${project.imageBg}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={project.imageAlt}
                className="w-full h-32 sm:h-40 md:h-48 lg:h-64 object-cover brutal-border"
                src={project.imageSrc}
              />
            </div>
            <div className="p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3 md:gap-4 bg-white">
              <div className="flex gap-1.5 sm:gap-2 flex-wrap mb-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono font-bold text-[10px] sm:text-xs uppercase bg-surface-container-highest px-1.5 sm:px-2 py-0.5 sm:py-1 brutal-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-headline text-lg sm:text-xl md:text-2xl lg:text-[32px] font-black leading-[110%] uppercase group-hover:text-neon-blue transition-colors">
                {project.title}
              </h3>
              <p className="font-body text-xs sm:text-sm md:text-base text-on-surface-variant">
                {project.description}
              </p>
              <a
                className="mt-1 sm:mt-2 md:mt-4 font-mono font-bold text-xs sm:text-sm md:text-base uppercase flex items-center gap-1.5 sm:gap-2 w-max border-b-4 border-pure-black pb-0.5 sm:pb-1 hover:text-neon-pink hover:border-neon-pink transition-colors"
                href="#"
              >
                View Case Study{" "}
                <span className="material-symbols-outlined text-sm sm:text-base md:text-xl">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
