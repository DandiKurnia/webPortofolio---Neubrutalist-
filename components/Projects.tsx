"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  image: string | null;
  technologies: string[];
}

const windowTitles = ["cyber_dash.zip", "neo-poster.png", "grid_ops.exe", "pulse_wave.tar"];
const imageBgs = ["bg-neon-yellow", "bg-neon-pink", "bg-neon-blue", "bg-white"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!activeProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeProject]);

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

      {isLoading ? (
        <p className="font-mono font-bold text-on-surface-variant text-center py-12">
          Loading...
        </p>
      ) : projects.length === 0 ? (
        <p className="font-mono font-bold text-on-surface-variant text-center py-12">
          No projects yet.
        </p>
      ) : (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 max-w-sm md:max-w-none mx-auto md:mx-0">
          {projects.slice(0, 2).map((project, index) => {
            const offset = index % 2 === 1;
            const windowTitle = windowTitles[index % windowTitles.length];
            const imageBg = imageBgs[index % imageBgs.length];

            return (
              <div
                key={project.id}
                className={`bg-white brutal-border brutal-shadow flex flex-col group ${
                  offset ? "md:mt-12 lg:mt-16" : ""
                }`}
              >
                <div className="computer-window-header">
                  <div className="window-dot dot-red"></div>
                  <div className="window-dot dot-yellow"></div>
                  <div className="window-dot dot-green"></div>
                  <span className="font-mono font-bold text-white text-[10px] sm:text-xs ml-3 sm:ml-4">
                    {windowTitle}
                  </span>
                </div>
                <div
                  className={`p-2 sm:p-3 md:p-4 border-b-4 border-pure-black ${imageBg}`}
                >
                  {project.image ? (
                    <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-64 brutal-border overflow-hidden bg-white">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-32 sm:h-40 md:h-48 lg:h-64 brutal-border bg-white/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-4xl sm:text-5xl md:text-6xl text-on-surface-variant">
                        image
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4 md:p-6 lg:p-8 flex flex-col gap-2 sm:gap-3 md:gap-4 bg-white">
                  <div className="flex gap-1.5 sm:gap-2 flex-wrap mb-1">
                    {project.technologies.slice(0, 5).map((tag) => (
                      <span
                        key={tag}
                        className="font-mono font-bold text-[10px] sm:text-xs uppercase bg-surface-container-highest px-1.5 sm:px-2 py-0.5 sm:py-1 brutal-border"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="font-mono font-bold text-[10px] sm:text-xs uppercase bg-pure-black text-white px-1.5 sm:px-2 py-0.5 sm:py-1 brutal-border">
                        +{project.technologies.length - 5}
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline text-lg sm:text-xl md:text-2xl lg:text-[32px] font-black leading-[110%] uppercase group-hover:text-neon-blue transition-colors">
                    {project.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="mt-1 sm:mt-2 font-mono font-bold text-xs sm:text-sm md:text-base uppercase flex items-center gap-1.5 sm:gap-2 w-max bg-neon-yellow brutal-border px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-neon-pink hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm sm:text-base md:text-xl">
                      description
                    </span>
                    View Description
                  </button>
                  {project.link && (
                    <a
                      className="mt-1 sm:mt-2 md:mt-4 font-mono font-bold text-xs sm:text-sm md:text-base uppercase flex items-center gap-1.5 sm:gap-2 w-max border-b-4 border-pure-black pb-0.5 sm:pb-1 hover:text-neon-pink hover:border-neon-pink transition-colors"
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Case Study{" "}
                      <span className="material-symbols-outlined text-sm sm:text-base md:text-xl">
                        arrow_forward
                      </span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!isLoading && projects.length > 0 && (
        <div className="mt-10 sm:mt-12 md:mt-16 flex justify-center">
          <Link
            href="/projects"
            className="font-mono font-bold text-sm sm:text-base md:text-lg uppercase flex items-center gap-2 sm:gap-3 bg-neon-blue brutal-border brutal-shadow px-5 py-3 sm:px-6 sm:py-4 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
          >
            View All Projects
            <span className="material-symbols-outlined text-base sm:text-lg md:text-xl">
              arrow_forward
            </span>
          </Link>
        </div>
      )}

      {activeProject && (
        <div
          className="fixed inset-0 bg-pure-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-white brutal-border brutal-shadow w-full max-w-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="computer-window-header flex items-center">
              <div className="window-dot dot-red"></div>
              <div className="window-dot dot-yellow"></div>
              <div className="window-dot dot-green"></div>
              <span className="font-mono font-bold text-white text-[10px] sm:text-xs ml-3 sm:ml-4 flex-1 truncate">
                {activeProject.title}.txt
              </span>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close"
                className="ml-2 mr-2 w-7 h-7 bg-neon-pink border-2 border-white flex items-center justify-center hover:bg-white hover:text-pure-black transition-colors"
              >
                <span className="material-symbols-outlined text-white text-[18px] leading-none">
                  close
                </span>
              </button>
            </div>
            <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4">
              <h3 className="font-headline text-xl sm:text-2xl md:text-3xl font-black uppercase leading-[110%]">
                {activeProject.title}
              </h3>
              {activeProject.technologies.length > 0 && (
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                  {activeProject.technologies.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono font-bold text-[10px] sm:text-xs uppercase bg-surface-container-highest px-1.5 sm:px-2 py-0.5 sm:py-1 brutal-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="font-body text-sm sm:text-base text-on-surface-variant whitespace-pre-line">
                {activeProject.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
