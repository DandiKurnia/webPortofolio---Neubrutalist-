import AdminSidebar from "@/components/admin/AdminSidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface text-on-surface h-screen w-full flex overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 ml-0 xl:ml-64 h-screen overflow-y-auto bg-surface-container-high p-4 md:p-8 xl:p-16">
        {children}
      </div>
    </div>
  );
}
