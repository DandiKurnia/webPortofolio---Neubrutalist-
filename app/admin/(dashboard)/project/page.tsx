"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  link: string | null;
  image: string | null;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    image: "",
    technologies: "",
  });

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = (mode: "add" | "edit", project?: Project) => {
    setModalMode(mode);
    if (mode === "edit" && project) {
      setCurrentProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        link: project.link || "",
        image: project.image || "",
        technologies: project.technologies.join(", "),
      });
    } else {
      setCurrentProject(null);
      setFormData({
        title: "",
        description: "",
        link: "",
        image: "",
        technologies: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
    setFormData({
      title: "",
      description: "",
      link: "",
      image: "",
      technologies: "",
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5MB.");
      return;
    }

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({ ...prev, image: data.url }));
      } else {
        const err = await response.json();
        alert(err.error || "Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url =
        modalMode === "add"
          ? "/api/projects"
          : `/api/projects/${currentProject?.id}`;

      const method = modalMode === "add" ? "POST" : "PUT";

      const technologiesArray = formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          link: formData.link,
          image: formData.image,
          technologies: technologiesArray,
        }),
      });

      if (response.ok) {
        await fetchProjects();
        closeModal();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save project");
      }
    } catch (error) {
      console.error("Error saving project:", error);
      alert("An error occurred while saving");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProjects();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting");
    }
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <header className="mb-12">
        <h1 className="font-headline text-[48px] leading-[110%] tracking-[-0.02em] font-black text-on-surface mb-2">
          Projects Management
        </h1>
        <p className="font-body text-[18px] leading-[150%] font-medium text-on-surface-variant">
          Manage your portfolio projects.
        </p>
      </header>

      <div className="w-full mt-12 mb-16 overflow-x-auto border-4 border-on-surface brutal-shadow bg-surface-container-lowest">
        <div className="bg-on-surface p-3 flex items-center gap-2 border-b-4 border-on-surface">
          <div className="w-4 h-4 rounded-full bg-error border-2 border-on-surface"></div>
          <div className="w-4 h-4 rounded-full bg-[#FFBD2E] border-2 border-on-surface"></div>
          <div className="w-4 h-4 rounded-full bg-[#27C93F] border-2 border-on-surface"></div>
          <div className="ml-4 flex-1">
            <span className="font-mono text-[14px] leading-[120%] font-bold text-surface uppercase tracking-widest text-xs">
              Admin.OS // Project_Inventory
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6 overflow-hidden">
          {/* Header Section */}
          <div className="flex justify-between items-start flex-wrap gap-6 mt-4 mb-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-on-surface translate-x-[8px] translate-y-[8px]"></div>
              <h2 className="relative font-headline text-[48px] leading-[110%] font-black text-on-surface bg-primary-container border-4 border-on-surface px-6 py-4 uppercase z-10 -rotate-1">
                Project
                <br />
                Inventory
              </h2>
            </div>
            <button
              onClick={() => openModal("add")}
              className="border-4 border-on-surface bg-secondary text-on-secondary p-4 brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              <span className="font-mono text-[14px] leading-[120%] font-bold uppercase">
                Add Project
              </span>
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="flex-1 flex border-4 border-on-surface brutal-shadow bg-surface-container-lowest focus-within:bg-surface-container-low transition-colors group">
              <div className="p-4 border-r-4 border-on-surface bg-primary-container flex items-center justify-center group-focus-within:bg-tertiary-fixed transition-colors">
                <span className="material-symbols-outlined text-[28px]">
                  search
                </span>
              </div>
              <input
                className="w-full bg-transparent p-4 font-mono text-lg font-bold outline-none border-none placeholder-on-surface-variant uppercase"
                placeholder="SEARCH PROJECTS..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto border-4 border-on-surface shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-surface-container-lowest">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-primary-container border-b-4 border-on-surface">
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-20">
                    ID
                  </th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-32">
                    Image
                  </th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface">
                    Project Name
                  </th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-64">
                    Technologies
                  </th>
                  <th className="p-6 font-mono text-lg font-bold uppercase w-48 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedProjects.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-6 text-center font-body text-on-surface-variant"
                    >
                      No projects found
                    </td>
                  </tr>
                ) : (
                  paginatedProjects.map((project, index) => (
                    <tr
                      key={project.id}
                      className="border-b-4 border-on-surface hover:bg-surface-container transition-colors group"
                    >
                      <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">
                        #{String(startIndex + index + 1).padStart(3, "0")}
                      </td>
                      <td className="p-4 border-r-4 border-on-surface">
                        {project.image ? (
                          <div className="relative w-20 h-20 border-2 border-on-surface brutal-shadow-sm bg-surface-container overflow-hidden">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 border-2 border-on-surface bg-surface-container flex items-center justify-center text-on-surface-variant">
                            <span className="material-symbols-outlined">
                              image_not_supported
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="p-6 border-r-4 border-on-surface font-body font-bold text-2xl text-on-surface uppercase">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {project.title}
                          </a>
                        ) : (
                          project.title
                        )}
                      </td>
                      <td className="p-6 border-r-4 border-on-surface">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.length === 0 ? (
                            <span className="font-mono text-sm text-on-surface-variant">
                              —
                            </span>
                          ) : (
                            <>
                              {project.technologies.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="inline-block border-2 border-on-surface bg-primary-container text-on-surface px-2 py-1 font-mono font-bold text-xs uppercase brutal-shadow-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 4 && (
                                <span
                                  title={project.technologies.slice(4).join(", ")}
                                  className="inline-block border-2 border-on-surface bg-surface text-on-surface-variant px-2 py-1 font-mono font-bold text-xs uppercase brutal-shadow-sm"
                                >
                                  +{project.technologies.length - 4}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                      <td className="p-6 flex gap-3 justify-center">
                        <button
                          onClick={() => openModal("edit", project)}
                          className="border-4 border-on-surface bg-primary-container p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="border-4 border-on-surface bg-tertiary text-on-tertiary p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t-4 border-on-surface">
            <span className="font-mono font-bold uppercase text-on-surface-variant">
              Showing {filteredProjects.length === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(endIndex, filteredProjects.length)} of{" "}
              {filteredProjects.length} Entries
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="border-4 border-on-surface bg-surface p-2 brutal-shadow-sm hover:bg-primary-container active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`border-4 border-on-surface px-4 py-2 brutal-shadow-sm font-mono font-bold transition-all ${
                        currentPage === page
                          ? "bg-secondary text-on-secondary"
                          : "bg-surface hover:bg-primary-container"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="border-4 border-on-surface bg-surface p-2 brutal-shadow-sm hover:bg-primary-container active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface-container-lowest border-[4px] border-on-surface brutal-shadow flex flex-col w-full max-w-2xl my-auto">
            {/* Window Title Bar */}
            <div className="bg-primary-container border-b-[4px] border-on-surface px-2 py-4 flex justify-between items-center sticky top-0 z-10">
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-on-surface bg-[#FF5F56]"></div>
                <div className="w-4 h-4 rounded-full border-2 border-on-surface bg-[#FFBD2E]"></div>
                <div className="w-4 h-4 rounded-full border-2 border-on-surface bg-[#27C93F]"></div>
              </div>
              <div className="font-mono text-[14px] leading-[120%] font-bold text-on-surface uppercase tracking-widest">
                {modalMode === "add"
                  ? "Add_New_Project.exe"
                  : "Edit_Project.exe"}
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 bg-error border-2 border-on-surface flex items-center justify-center hover:bg-error-container hover:text-on-error-container transition-colors brutal-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <span className="material-symbols-outlined font-black text-[20px] text-on-error hover:text-on-error-container">
                  close
                </span>
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">
                    Project_Name
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Pop Art Campaign"
                    className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe the project..."
                    className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all resize-none"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">
                    Project_Link (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/project"
                    className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                  />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">
                    Thumbnail_Image
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.image ? (
                    <div className="relative w-full border-[4px] border-on-surface brutal-shadow-sm bg-surface-container-low p-4 flex flex-col gap-4">
                      <div className="relative w-full h-64 border-2 border-on-surface bg-surface-container overflow-hidden">
                        <Image
                          src={formData.image}
                          alt="Project thumbnail preview"
                          fill
                          sizes="(max-width: 768px) 100vw, 640px"
                          className="object-contain"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="flex-1 border-[4px] border-on-surface bg-primary-container text-on-surface p-3 font-mono text-[14px] font-bold uppercase brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined">
                            sync
                          </span>
                          {isUploading ? "Uploading..." : "Replace"}
                        </button>
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          disabled={isUploading}
                          className="border-[4px] border-on-surface bg-tertiary text-on-tertiary p-3 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full bg-surface-container-low border-[4px] border-dashed border-on-surface p-8 flex flex-col items-center justify-center gap-4 hover:bg-primary-container/20 hover:border-solid transition-all cursor-pointer brutal-shadow-sm group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-[48px] text-on-surface-variant group-hover:text-primary transition-colors">
                        {isUploading ? "progress_activity" : "cloud_upload"}
                      </span>
                      <p className="font-body text-[18px] font-medium text-center text-on-surface">
                        {isUploading ? "Uploading..." : "Click to upload image"}
                      </p>
                      <span className="font-mono text-[14px] font-bold text-on-surface-variant">
                        MAX 5MB (JPG, PNG, WEBP, GIF)
                      </span>
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. React, Next.js, TailwindCSS"
                    className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all"
                    value={formData.technologies}
                    onChange={(e) =>
                      setFormData({ ...formData, technologies: e.target.value })
                    }
                  />
                  <span className="font-mono text-xs text-on-surface-variant">
                    Separate each technology with a comma.
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t-[4px] border-on-surface p-6 flex flex-col sm:flex-row justify-end gap-4 bg-surface-container-low">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-4 border-[4px] border-on-surface bg-surface text-on-surface font-mono text-[14px] font-bold uppercase brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                  disabled={isLoading || isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-4 border-[4px] border-on-surface bg-secondary text-on-secondary font-mono text-[14px] font-bold uppercase brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || isUploading}
                >
                  <span className="material-symbols-outlined">save</span>
                  {isLoading ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
