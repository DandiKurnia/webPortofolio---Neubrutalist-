"use client";

import React, { useState, useEffect } from "react";

interface Certification {
  id: string;
  title: string;
  company: string;
  link: string | null;
  years: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCertificatesPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentCertification, setCurrentCertification] = useState<Certification | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    link: "",
    years: "",
  });

  // Fetch certifications
  const fetchCertifications = async () => {
    try {
      const response = await fetch("/api/certifications");
      if (response.ok) {
        const data = await response.json();
        setCertifications(data);
      }
    } catch (error) {
      console.error("Error fetching certifications:", error);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const openModal = (mode: "add" | "edit", certification?: Certification) => {
    setModalMode(mode);
    if (mode === "edit" && certification) {
      setCurrentCertification(certification);
      setFormData({
        title: certification.title,
        company: certification.company,
        link: certification.link || "",
        years: certification.years,
      });
    } else {
      setCurrentCertification(null);
      setFormData({
        title: "",
        company: "",
        link: "",
        years: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCertification(null);
    setFormData({
      title: "",
      company: "",
      link: "",
      years: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = modalMode === "add"
        ? "/api/certifications"
        : `/api/certifications/${currentCertification?.id}`;

      const method = modalMode === "add" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchCertifications();
        closeModal();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save certification");
      }
    } catch (error) {
      console.error("Error saving certification:", error);
      alert("An error occurred while saving");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) {
      return;
    }

    try {
      const response = await fetch(`/api/certifications/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchCertifications();
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete certification");
      }
    } catch (error) {
      console.error("Error deleting certification:", error);
      alert("An error occurred while deleting");
    }
  };

  const filteredCertifications = certifications.filter((cert) =>
    cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="mb-12">
        <h1 className="font-headline text-[48px] leading-[110%] tracking-[-0.02em] font-black text-on-surface mb-2">
          Certificates Management
        </h1>
        <p className="font-body text-[18px] leading-[150%] font-medium text-on-surface-variant">
          Manage your earned certifications.
        </p>
      </header>

      <div className="w-full mt-12 mb-16 overflow-x-auto border-4 border-on-surface brutal-shadow bg-surface-container-lowest">
        <div className="bg-on-surface p-3 flex items-center gap-2 border-b-4 border-on-surface">
          <div className="w-4 h-4 rounded-full bg-error border-2 border-on-surface"></div>
          <div className="w-4 h-4 rounded-full bg-[#FFBD2E] border-2 border-on-surface"></div>
          <div className="w-4 h-4 rounded-full bg-[#27C93F] border-2 border-on-surface"></div>
          <div className="ml-4 flex-1">
            <span className="font-mono text-[14px] leading-[120%] font-bold text-surface uppercase tracking-widest text-xs">
              Admin.OS // Certificate_Inventory
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6 overflow-hidden">
          {/* Header Section */}
          <div className="flex justify-between items-start flex-wrap gap-6 mt-4 mb-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-on-surface translate-x-[8px] translate-y-[8px]"></div>
              <h2 className="relative font-headline text-[48px] leading-[110%] font-black text-on-surface bg-primary-container border-4 border-on-surface px-6 py-4 uppercase z-10 -rotate-1">
                Certificate<br />Inventory
              </h2>
            </div>
            <button
              onClick={() => openModal("add")}
              className="border-4 border-on-surface bg-secondary text-on-secondary p-4 brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              <span className="font-mono text-[14px] leading-[120%] font-bold uppercase">Add Certificate</span>
            </button>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="flex-1 flex border-4 border-on-surface brutal-shadow bg-surface-container-lowest focus-within:bg-surface-container-low transition-colors group">
              <div className="p-4 border-r-4 border-on-surface bg-primary-container flex items-center justify-center group-focus-within:bg-tertiary-fixed transition-colors">
                <span className="material-symbols-outlined text-[28px]">search</span>
              </div>
              <input
                className="w-full bg-transparent p-4 font-mono text-lg font-bold outline-none border-none placeholder-on-surface-variant uppercase"
                placeholder="SEARCH CERTIFICATES..."
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
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-24">ID</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface">Certificate Name</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface">Company</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-32">Year</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase w-48 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertifications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center font-body text-on-surface-variant">
                      No certifications found
                    </td>
                  </tr>
                ) : (
                  filteredCertifications.map((cert, index) => (
                    <tr key={cert.id} className="border-b-4 border-on-surface hover:bg-surface-container transition-colors group">
                      <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">
                        #{String(index + 1).padStart(3, "0")}
                      </td>
                      <td className="p-6 border-r-4 border-on-surface font-body font-bold text-2xl text-on-surface uppercase">
                        {cert.title}
                      </td>
                      <td className="p-6 border-r-4 border-on-surface font-body font-medium text-on-surface">
                        {cert.company}
                      </td>
                      <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">
                        {cert.years}
                      </td>
                      <td className="p-6 flex gap-3 justify-center">
                        <button
                          onClick={() => openModal("edit", cert)}
                          className="border-4 border-on-surface bg-primary-container p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(cert.id)}
                          className="border-4 border-on-surface bg-tertiary text-on-tertiary p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined">delete</span>
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
              Showing {filteredCertifications.length} of {certifications.length} Entries
            </span>
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
                {modalMode === "add" ? "Add_New_Certificate.exe" : "Edit_Certificate.exe"}
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 bg-error border-2 border-on-surface flex items-center justify-center hover:bg-error-container hover:text-on-error-container transition-colors brutal-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <span className="material-symbols-outlined font-black text-[20px] text-on-error hover:text-on-error-container">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit}>
              <div className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">Certificate_Name</label>
                  <input
                    type="text"
                    placeholder="E.g. Data Privacy Cert"
                    className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">Issuing_Organization</label>
                  <input
                    type="text"
                    placeholder="E.g. Google, Coursera"
                    className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">Certificate_Link (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://example.com/certificate"
                    className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">Year</label>
                  <input
                    type="text"
                    placeholder="E.g. 2023"
                    className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all"
                    value={formData.years}
                    onChange={(e) => setFormData({ ...formData, years: e.target.value })}
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
                  {isLoading ? "Saving..." : "Save Certificate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
