export default function AdminSkillsPage() {
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
                Skill<br />Inventory
              </h2>
            </div>
            <button className="border-4 border-on-surface bg-secondary text-on-secondary p-4 brutal-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2">
              <span className="material-symbols-outlined">add</span>
              <span className="font-mono text-[14px] leading-[120%] font-bold uppercase">Add Skill</span>
            </button>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-6 mb-4">
            <div className="flex-1 flex border-4 border-on-surface brutal-shadow bg-surface-container-lowest focus-within:bg-surface-container-low transition-colors group">
              <div className="p-4 border-r-4 border-on-surface bg-primary-container flex items-center justify-center group-focus-within:bg-tertiary-fixed transition-colors">
                <span className="material-symbols-outlined text-[28px]">search</span>
              </div>
              <input className="w-full bg-transparent p-4 font-mono text-lg font-bold outline-none border-none placeholder-on-surface-variant uppercase" placeholder="SEARCH SKILLS..." type="text" />
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto border-4 border-on-surface shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-surface-container-lowest">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-primary-container border-b-4 border-on-surface">
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-24">ID</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface">Skill Name</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase border-r-4 border-on-surface w-48">Level</th>
                  <th className="p-6 font-mono text-lg font-bold uppercase w-48 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b-4 border-on-surface hover:bg-surface-container transition-colors group">
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">#001</td>
                  <td className="p-6 border-r-4 border-on-surface font-body font-bold text-2xl text-on-surface uppercase">React.js</td>
                  <td className="p-6 border-r-4 border-on-surface">
                    <span className="inline-block border-2 border-on-surface bg-[#27C93F] text-on-surface px-4 py-1 font-mono font-bold text-sm uppercase brutal-shadow-sm">Expert</span>
                  </td>
                  <td className="p-6 flex gap-3 justify-center">
                    <button className="border-4 border-on-surface bg-primary-container p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="border-4 border-on-surface bg-tertiary text-on-tertiary p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
                <tr className="border-b-4 border-on-surface bg-surface-container-low hover:bg-surface-container transition-colors group">
                  <td className="p-6 border-r-4 border-on-surface font-mono font-bold text-on-surface-variant">#002</td>
                  <td className="p-6 border-r-4 border-on-surface font-body font-bold text-2xl text-on-surface uppercase">Tailwind CSS</td>
                  <td className="p-6 border-r-4 border-on-surface">
                    <span className="inline-block border-2 border-on-surface bg-[#27C93F] text-on-surface px-4 py-1 font-mono font-bold text-sm uppercase brutal-shadow-sm">Expert</span>
                  </td>
                  <td className="p-6 flex gap-3 justify-center">
                    <button className="border-4 border-on-surface bg-primary-container p-2 brutal-shadow-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center">
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
    </>
  );
}
