"use client";

import React, { useState, useEffect } from "react";

interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "code",
  });

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills");
      if (response.ok) {
        const data = await response.json();
        setSkills(data);
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSkills();
  }, []);

  const openModal = (mode: "add" | "edit", skill?: Skill) => {
    setModalMode(mode);
    if (mode === "edit" && skill) {
      setCurrentSkill(skill);
      setFormData({
        title: skill.title,
        description: skill.description,
        icon: skill.icon,
      });
    } else {
      setCurrentSkill(null);
      setFormData({
        title: "",
        description: "",
        icon: "code",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSkill(null);
    setFormData({
      title: "",
      description: "",
      icon: "code",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url =
        modalMode === "add" ? "/api/skills" : `/api/skills/${currentSkill?.id}`;

      const method = modalMode === "add" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchSkills();
        closeModal();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save skill");
      }
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("An error occurred while saving");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchSkills();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete skill");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("An error occurred while deleting");
    }
  };

  const filteredSkills = skills.filter(
    (skill) =>
      skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSkills = filteredSkills.slice(startIndex, endIndex);

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
          Skills Management
        </h1>
        <p className="font-body text-[18px] leading-[150%] font-medium text-on-surface-variant">
          Manage your technical skills.
        </p>
      </header>

      <div className="w-full mt-12 mb-16 overflow-x-auto border-4 border-on-surface brutal-shadow bg-surface-container-lowest">
        <div className="bg-on-surface p-3 flex items-center gap-2 border-b-4 border-on-surface">
          <div className="w-4 h-4 rounded-full bg-error border-2 border-on-surface"></div>
          <div className="w-4 h-4 rounded-full bg-[#FFBD2E] border-2 border-on-surface"></div>
          <div className="w-4 h-4 rounded-full bg-[#27C93F] border-2 border-on-surface"></div>
          <div className="ml-4 flex-1">
            <span className="font-mono text-[14px] leading-[120%] font-bold text-surface uppercase tracking-widest text-xs">
              Admin.OS // Skill_Inventory
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6 overflow-hidden">
          {/* Header Section */}
          <div className="flex justify-between items-start flex-wrap gap-6 mt-4 mb-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-on-surface translate-x-[8px] translate-y-[8px]"></div>
              <h2 className="relative font-headline text-[48px] leading-[110%] font-black text-on-surface bg-primary-container border-4 border-on-surface px-6 py-4 uppercase z-10 -rotate-1">
                Skill
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
                Add Skill
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
                placeholder="SEARCH SKILLS..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto border-4 border-on-surface shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-surface-container-lowest">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-primary-container border-b-4 border-on-surface">
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-24">
                    ID
                  </th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface">
                    Skill Name
                  </th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-48">
                    Level
                  </th>
                  <th className="p-6 font-mono text-lg font-bold uppercase w-48 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedSkills.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-6 text-center font-body text-on-surface-variant"
                    >
                      No skills found
                    </td>
                  </tr>
                ) : (
                  paginatedSkills.map((skill, index) => (
                    <tr
                      key={skill.id}
                      className="border-b-4 border-on-surface hover:bg-surface-container transition-colors group"
                    >
                      <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">
                        #{String(startIndex + index + 1).padStart(3, "0")}
                      </td>
                      <td className="p-6 border-r-4 border-on-surface font-body font-bold text-2xl text-on-surface uppercase">
                        {skill.title}
                      </td>
                      <td className="p-6 border-r-4 border-on-surface">
                        <span className="inline-block border-2 border-on-surface bg-[#27C93F] text-on-surface px-4 py-1 font-mono font-bold text-sm uppercase brutal-shadow-sm">
                          {skill.description}
                        </span>
                      </td>
                      <td className="p-6 flex gap-3 justify-center">
                        <button
                          onClick={() => openModal("edit", skill)}
                          className="border-4 border-on-surface bg-primary-container p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(skill.id)}
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
              Showing {startIndex + 1} to {Math.min(endIndex, filteredSkills.length)} of {filteredSkills.length} Entries
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                ))}
              </div>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
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
                {modalMode === "add" ? "Add_New_Skill.exe" : "Edit_Skill.exe"}
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
                    Skill_Name
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. React.js, UI/UX Design"
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
                    Icon
                  </label>
                  <div className="relative">
                    <select
                      className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all appearance-none cursor-pointer"
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData({ ...formData, icon: e.target.value })
                      }
                    >
                      <option value="code">Code</option>
                      <option value="css">CSS</option>
                      <option value="terminal">Terminal</option>
                      <option value="design_services">Design Services</option>
                      <option value="database">Database</option>
                      <option value="api">API</option>
                      <option value="animation">Animation</option>
                      <option value="deployed_code">Deployed Code</option>
                      <option value="language">Language</option>
                      <option value="cloud">Cloud</option>
                      <option value="storage">Storage</option>
                      <option value="security">Security</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <span className="material-symbols-outlined text-on-surface">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">
                    Skill_Level / Description
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Expert, Advanced, Intermediate, Entry "
                    className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="border-t-[4px] border-on-surface p-6 flex flex-col sm:flex-row justify-end gap-4 bg-surface-container-low">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-4 border-[4px] border-on-surface bg-surface text-on-surface font-mono text-[14px] font-bold uppercase brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-4 border-[4px] border-on-surface bg-secondary text-on-secondary font-mono text-[14px] font-bold uppercase brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  <span className="material-symbols-outlined">save</span>
                  {isLoading ? "Saving..." : "Save Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
