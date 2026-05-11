"use client";

import React, { useState } from "react";

export default function AdminProjectPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const openModal = (mode: "add" | "edit") => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
                Project<br />Inventory
              </h2>
            </div>
            <button 
              onClick={() => openModal("add")}
              className="border-4 border-on-surface bg-secondary text-on-secondary p-4 brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              <span className="font-mono text-[14px] leading-[120%] font-bold uppercase">Add Project</span>
            </button>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="flex-1 flex border-4 border-on-surface brutal-shadow bg-surface-container-lowest focus-within:bg-surface-container-low transition-colors group">
              <div className="p-4 border-r-4 border-on-surface bg-primary-container flex items-center justify-center group-focus-within:bg-tertiary-fixed transition-colors">
                <span className="material-symbols-outlined text-[28px]">search</span>
              </div>
              <input className="w-full bg-transparent p-4 font-mono text-lg font-bold outline-none border-none placeholder-on-surface-variant uppercase" placeholder="SEARCH PROJECTS..." type="text" />
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto border-4 border-on-surface shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-surface-container-lowest">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-primary-container border-b-4 border-on-surface">
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-24">ID</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface">Project Name</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-48">Last Modified</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-40">Status</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase w-48 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-4 border-on-surface hover:bg-surface-container transition-colors group">
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">#001</td>
                  <td className="p-6 border-r-4 border-on-surface font-body font-bold text-2xl text-on-surface uppercase">Pop Art Campaign</td>
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">2023-10-24</td>
                  <td className="p-6 border-r-4 border-on-surface">
                    <span className="inline-block border-2 border-on-surface bg-[#27C93F] text-on-surface px-4 py-1 font-mono font-bold text-sm uppercase brutal-shadow-sm">Live</span>
                  </td>
                  <td className="p-6 flex gap-3 justify-center">
                    <button 
                      onClick={() => openModal("edit")}
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
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">#002</td>
                  <td className="p-6 border-r-4 border-on-surface font-body font-bold text-2xl text-on-surface uppercase">Neon Web Redesign</td>
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">2023-10-15</td>
                  <td className="p-6 border-r-4 border-on-surface">
                    <span className="inline-block border-2 border-on-surface bg-[#27C93F] text-on-surface px-4 py-1 font-mono font-bold text-sm uppercase brutal-shadow-sm">Live</span>
                  </td>
                  <td className="p-6 flex gap-3 justify-center">
                    <button 
                      onClick={() => openModal("edit")}
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
            <span className="font-mono font-bold uppercase text-on-surface-variant">Showing 1 to 2 of 2 Entries</span>
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
                {modalMode === "add" ? "Add_New_Project.exe" : "Edit_Project.exe"}
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
                <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">Project_Name</label>
                <input 
                  type="text" 
                  placeholder="E.g. Pop Art Campaign" 
                  className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all" 
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">Description</label>
                <textarea 
                  rows={4} 
                  placeholder="Describe the project..." 
                  className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all resize-none"
                ></textarea>
              </div>

              {/* Drag and Drop File Upload Zone */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">Thumbnail_Image</label>
                <div className="w-full bg-surface-container-low border-[4px] border-dashed border-on-surface p-8 flex flex-col items-center justify-center gap-4 hover:bg-primary-container/20 hover:border-solid transition-all cursor-pointer brutal-shadow-sm group">
                  <span className="material-symbols-outlined text-[48px] text-on-surface-variant group-hover:text-primary transition-colors">cloud_upload</span>
                  <p className="font-body text-[18px] font-medium text-center text-on-surface">Drag and drop image here or click to browse</p>
                  <span className="font-mono text-[14px] font-bold text-on-surface-variant">MAX 5MB (JPG, PNG, WEBP)</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-mono text-[14px] leading-[120%] font-bold uppercase text-on-surface">Status</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-lowest border-[4px] border-on-surface p-4 font-mono text-[14px] font-bold text-on-surface focus:outline-none focus:ring-0 focus:shadow-[4px_4px_0px_0px_var(--color-tertiary)] transition-all appearance-none cursor-pointer">
                    <option value="draft">Draft</option>
                    <option value="live">Live</option>
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
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
