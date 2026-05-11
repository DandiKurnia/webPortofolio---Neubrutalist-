"use client";

import React, { useState } from "react";

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit">("edit");

  const openModal = () => {
    setModalMode("edit");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <header className="mb-12">
        <h1 className="font-headline text-[48px] leading-[110%] tracking-[-0.02em] font-black text-on-surface mb-2">
          Dashboard Operations
        </h1>
        <p className="font-body text-[18px] leading-[150%] font-medium text-on-surface-variant">
          Manage your brutalist portfolio content with high energy.
        </p>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        {/* Projects Manager */}
        <section className="flex flex-col gap-6">
          <div className="border-4 border-on-surface bg-surface rounded-xl overflow-hidden brutal-shadow">
            {/* Title Bar */}
            <div className="bg-on-surface p-3 flex items-center gap-2 border-b-4 border-on-surface">
              <div className="w-4 h-4 rounded-full bg-error border-2 border-on-surface"></div>
              <div className="w-4 h-4 rounded-full bg-primary-container border-2 border-on-surface"></div>
              <div className="w-4 h-4 rounded-full bg-secondary border-2 border-on-surface"></div>
              <span className="ml-4 font-mono text-[14px] leading-[120%] font-bold text-surface">
                Projects_Manager.exe
              </span>
            </div>
            {/* Content Body */}
            <div className="p-6 md:p-8 bg-tertiary-fixed space-y-6">
              <h3 className="font-headline text-[32px] leading-[110%] font-black text-on-surface">
                Add New Project
              </h3>
              <form className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold text-on-surface uppercase">
                    Project Title
                  </label>
                  <input
                    className="w-full p-4 border-4 border-on-surface bg-surface text-on-surface font-body text-[18px] leading-[150%] font-medium brutal-shadow-sm focus:outline-none focus:border-tertiary focus:brutal-shadow transition-all"
                    placeholder="e.g. Acid Wave Portfolio"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold text-on-surface uppercase">
                    Description
                  </label>
                  <textarea
                    className="w-full p-4 border-4 border-on-surface bg-surface text-on-surface font-body text-[18px] leading-[150%] font-medium brutal-shadow-sm focus:outline-none focus:border-tertiary focus:brutal-shadow transition-all resize-none"
                    placeholder="Describe the chaos..."
                    rows={3}
                  ></textarea>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold text-on-surface uppercase">
                    Project URL
                  </label>
                  <input
                    className="w-full p-4 border-4 border-on-surface bg-surface text-on-surface font-body text-[18px] leading-[150%] font-medium brutal-shadow-sm focus:outline-none focus:border-tertiary focus:brutal-shadow transition-all"
                    placeholder="https://"
                    type="url"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[14px] leading-[120%] font-bold text-on-surface uppercase">
                    Project Image / File
                  </label>
                  <div className="border-4 border-dashed border-on-surface bg-surface p-8 text-center cursor-pointer hover:bg-surface-variant transition-colors">
                    <span className="material-symbols-outlined text-on-surface text-6xl mb-4">
                      upload_file
                    </span>
                    <p className="font-mono text-[14px] leading-[120%] font-bold text-on-surface uppercase">
                      Drag & Drop Image Here
                    </p>
                    <p className="font-body text-[18px] leading-[150%] font-medium text-on-surface-variant mt-2">
                      or click to browse
                    </p>
                  </div>
                </div>
                <button
                  className="mt-4 px-8 py-4 bg-primary-container text-on-surface border-4 border-on-surface brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:brutal-shadow-sm active:translate-x-2 active:translate-y-2 active:shadow-none transition-all font-mono text-[14px] leading-[120%] font-bold uppercase w-full"
                  type="button"
                >
                  Submit Project
                </button>
              </form>
            </div>
          </div>

        </section>
        {/* Secondary Column */}
        <section className="flex flex-col gap-12">
          {/* Certificates Manager */}
          <div className="border-4 border-on-surface bg-surface rounded-xl overflow-hidden brutal-shadow rotate-1 hover:rotate-0 transition-transform">
            <div className="bg-on-surface p-3 flex items-center gap-2 border-b-4 border-on-surface">
              <div className="w-4 h-4 rounded-full bg-error border-2 border-on-surface"></div>
              <div className="w-4 h-4 rounded-full bg-primary-container border-2 border-on-surface"></div>
              <div className="w-4 h-4 rounded-full bg-secondary border-2 border-on-surface"></div>
              <span className="ml-4 font-mono text-[14px] leading-[120%] font-bold text-surface">
                Certificates.exe
              </span>
            </div>
            <div className="p-6 md:p-8 bg-secondary space-y-6">
              <h3 className="font-headline text-[32px] leading-[110%] font-black text-on-secondary">
                Upload Certificate
              </h3>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[14px] leading-[120%] font-bold text-on-secondary uppercase">
                  Certificate Name
                </label>
                <input
                  className="w-full p-4 border-4 border-on-surface bg-surface text-on-surface font-body text-[18px] leading-[150%] font-medium brutal-shadow-sm focus:outline-none focus:border-tertiary"
                  type="text"
                />
              </div>
              <button
                className="px-8 py-4 bg-tertiary-fixed text-on-surface border-4 border-on-surface brutal-shadow hover:translate-x-1 hover:translate-y-1 hover:brutal-shadow-sm active:translate-x-2 active:translate-y-2 active:shadow-none transition-all font-mono text-[14px] leading-[120%] font-bold uppercase w-full"
                type="button"
              >
                Save Certificate
              </button>
            </div>
          </div>
          {/* Skills Manager */}
          <div className="border-4 border-on-surface bg-surface rounded-xl overflow-hidden brutal-shadow -rotate-1 hover:rotate-0 transition-transform">
            <div className="bg-on-surface p-3 flex items-center gap-2 border-b-4 border-on-surface">
              <div className="w-4 h-4 rounded-full bg-error border-2 border-on-surface"></div>
              <div className="w-4 h-4 rounded-full bg-primary-container border-2 border-on-surface"></div>
              <div className="w-4 h-4 rounded-full bg-secondary border-2 border-on-surface"></div>
              <span className="ml-4 font-mono text-[14px] leading-[120%] font-bold text-surface">
                Skills_DB.exe
              </span>
            </div>
            <div className="p-6 md:p-8 bg-surface-bright space-y-6">
              <h3 className="font-headline text-[32px] leading-[110%] font-black text-on-surface">
                Add Skill Tag
              </h3>
              <div className="flex gap-4">
                <input
                  className="flex-1 p-4 border-4 border-on-surface bg-surface text-on-surface font-body text-[18px] leading-[150%] font-medium brutal-shadow-sm focus:outline-none focus:border-tertiary"
                  placeholder="e.g. React.js"
                  type="text"
                />
                <button
                  className="px-6 py-4 bg-primary-container text-on-surface border-4 border-on-surface brutal-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-2 active:translate-y-2 active:shadow-none transition-all font-mono text-[14px] leading-[120%] font-bold uppercase"
                  type="button"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-4 mt-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary-fixed border-4 border-on-surface rounded-full font-mono text-[14px] leading-[120%] font-bold text-on-surface brutal-shadow-sm">
                  UI/UX Design <button className="hover:text-error material-symbols-outlined text-[18px]">close</button>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border-4 border-on-surface rounded-full font-mono text-[14px] leading-[120%] font-bold text-on-secondary brutal-shadow-sm">
                  Tailwind CSS <button className="hover:text-error material-symbols-outlined text-[18px]">close</button>
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container border-4 border-on-surface rounded-full font-mono text-[14px] leading-[120%] font-bold text-on-surface brutal-shadow-sm">
                  JavaScript <button className="hover:text-error material-symbols-outlined text-[18px]">close</button>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Massive Table */}
      <div className="w-full mt-12 mb-16 overflow-x-auto border-4 border-on-surface brutal-shadow bg-surface-container-lowest">
        <div className="bg-on-surface p-3 flex items-center gap-2 border-b-4 border-on-surface">
          <div className="w-4 h-4 rounded-full bg-error border-2 border-on-surface"></div>
          <div className="w-4 h-4 rounded-full bg-[#FFBD2E] border-2 border-on-surface"></div>
          <div className="w-4 h-4 rounded-full bg-[#27C93F] border-2 border-on-surface"></div>
          <div className="ml-4 flex-1">
            <span className="font-mono text-[14px] leading-[120%] font-bold text-surface uppercase tracking-widest text-xs">
              Admin.OS // Database_Inventory
            </span>
          </div>
        </div>
        
        <div className="p-6 flex flex-col gap-6 overflow-hidden">
          {/* Header Section */}
          <div className="flex justify-between items-start flex-wrap gap-6 mt-4 mb-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-on-surface translate-x-[8px] translate-y-[8px]"></div>
              <h2 className="relative font-headline text-[48px] leading-[110%] font-black text-on-surface bg-primary-container border-4 border-on-surface px-6 py-4 uppercase z-10 -rotate-1">
                Database<br />Inventory
              </h2>
            </div>
            {/* System Status Sticker */}
            <div className="border-4 border-on-surface bg-tertiary-fixed p-4 brutal-shadow-sm rotate-3 max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
                <span className="font-mono text-[14px] leading-[120%] font-bold uppercase text-xs">System Status</span>
              </div>
              <p className="font-body text-[18px] leading-[150%] font-bold text-on-surface">All Nodes Online</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="flex-1 flex border-4 border-on-surface brutal-shadow bg-surface-container-lowest focus-within:bg-surface-container-low transition-colors group">
              <div className="p-4 border-r-4 border-on-surface bg-primary-container flex items-center justify-center group-focus-within:bg-tertiary-fixed transition-colors">
                <span className="material-symbols-outlined text-[28px]">search</span>
              </div>
              <input className="w-full bg-transparent p-4 font-mono text-lg font-bold outline-none border-none placeholder-on-surface-variant uppercase" placeholder="SEARCH ASSETS OR ID..." type="text" />
            </div>
            <div className="relative border-4 border-on-surface brutal-shadow bg-tertiary-fixed min-w-[300px]">
              <select className="w-full h-full bg-transparent p-4 font-mono text-lg font-bold outline-none border-none cursor-pointer appearance-none uppercase pr-16">
                <option value="all">Filter by Category</option>
                <option value="project">Project</option>
                <option value="cert">Certification</option>
              </select>
              <div className="absolute right-0 top-0 bottom-0 border-l-4 border-on-surface bg-surface flex items-center justify-center w-14 pointer-events-none">
                <span className="material-symbols-outlined text-[28px]">arrow_drop_down</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto border-4 border-on-surface shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-surface-container-lowest">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-primary-container border-b-4 border-on-surface">
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-24">ID</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface">Asset Name</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-48">Category</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-48">Last Modified</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-40">Status</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase w-48 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-4 border-on-surface hover:bg-surface-container transition-colors group">
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">#001</td>
                  <td className="p-6 border-r-4 border-on-surface font-body font-bold text-2xl text-on-surface uppercase">Pop Art Campaign</td>
                  <td className="p-6 border-r-4 border-on-surface">
                    <span className="inline-block border-2 border-on-surface bg-secondary-fixed text-on-secondary-fixed px-4 py-1 rounded-full font-mono font-bold text-sm uppercase brutal-shadow-sm">Project</span>
                  </td>
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">2023-10-24</td>
                  <td className="p-6 border-r-4 border-on-surface">
                    <span className="inline-block border-2 border-on-surface bg-[#27C93F] text-on-surface px-4 py-1 font-mono font-bold text-sm uppercase brutal-shadow-sm">Live</span>
                  </td>
                  <td className="p-6 flex gap-3 justify-center">
                    <button 
                      onClick={() => openModal()}
                      className="border-4 border-on-surface bg-primary-container p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="border-4 border-on-surface bg-tertiary text-on-tertiary p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
                <tr className="border-b-4 border-on-surface bg-surface-container-low hover:bg-surface-container transition-colors group">
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">#002</td>
                  <td className="p-6 border-r-4 border-on-surface font-body font-bold text-2xl text-on-surface uppercase">Data Privacy Cert</td>
                  <td className="p-6 border-r-4 border-on-surface">
                    <span className="inline-block border-2 border-on-surface bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1 rounded-full font-mono font-bold text-sm uppercase brutal-shadow-sm">Cert</span>
                  </td>
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">2023-10-22</td>
                  <td className="p-6 border-r-4 border-on-surface">
                    <span className="inline-block border-2 border-on-surface bg-[#FFBD2E] text-on-surface px-4 py-1 font-mono font-bold text-sm uppercase brutal-shadow-sm">Draft</span>
                  </td>
                  <td className="p-6 flex gap-3 justify-center">
                    <button 
                      onClick={() => openModal()}
                      className="border-4 border-on-surface bg-primary-container p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="border-4 border-on-surface bg-tertiary text-on-tertiary p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
                <tr className="border-b-4 border-on-surface hover:bg-surface-container transition-colors group">
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">#003</td>
                  <td className="p-6 border-r-4 border-on-surface font-body font-bold text-2xl text-on-surface uppercase">Neon Web Redesign</td>
                  <td className="p-6 border-r-4 border-on-surface">
                    <span className="inline-block border-2 border-on-surface bg-secondary-fixed text-on-secondary-fixed px-4 py-1 rounded-full font-mono font-bold text-sm uppercase brutal-shadow-sm">Project</span>
                  </td>
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">2023-10-15</td>
                  <td className="p-6 border-r-4 border-on-surface">
                    <span className="inline-block border-2 border-on-surface bg-[#27C93F] text-on-surface px-4 py-1 font-mono font-bold text-sm uppercase brutal-shadow-sm">Live</span>
                  </td>
                  <td className="p-6 flex gap-3 justify-center">
                    <button 
                      onClick={() => openModal()}
                      className="border-4 border-on-surface bg-primary-container p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="border-4 border-on-surface bg-tertiary text-on-tertiary p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t-4 border-on-surface">
            <span className="font-mono font-bold uppercase text-on-surface-variant">Showing 1 to 3 of 24 Entries</span>
            <div className="flex gap-2">
              <button className="border-4 border-on-surface bg-surface p-2 brutal-shadow-sm hover:bg-primary-container active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="border-4 border-on-surface bg-surface p-2 brutal-shadow-sm hover:bg-primary-container active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all">
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
                Edit_Asset.exe
              </div>
              <button 
                onClick={closeModal} 
                className="w-8 h-8 bg-error border-2 border-on-surface flex items-center justify-center hover:bg-error-container hover:text-on-error-container transition-colors brutal-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                <span className="material-symbols-outlined font-black text-[20px] text-on-error hover:text-on-error-container">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">Asset_Name</label>
                <input 
                  type="text" 
                  placeholder="Asset Name" 
                  className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">Category</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all appearance-none cursor-pointer">
                    <option value="project">Project</option>
                    <option value="certificate">Certificate</option>
                    <option value="skill">Skill</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="material-symbols-outlined text-on-surface">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">Status</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all appearance-none cursor-pointer">
                    <option value="live">Live</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="material-symbols-outlined text-on-surface">expand_more</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t-[4px] border-on-surface p-6 flex flex-col sm:flex-row justify-end gap-4 bg-surface-container-low">
              <button 
                onClick={closeModal} 
                className="px-6 py-4 border-[4px] border-on-surface bg-surface text-on-surface font-mono text-[14px] font-bold uppercase brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={closeModal} 
                className="px-6 py-4 border-[4px] border-on-surface bg-secondary text-on-secondary font-mono text-[14px] font-bold uppercase brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined">save</span>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
