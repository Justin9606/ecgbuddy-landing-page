"use client";

import React, { ReactNode } from "react";
import { AdminEditingProvider } from "@/lib/contexts/AdminEditingContext";
import { EditingSidebar } from "@/components/admin/EditingSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <AdminEditingProvider>
      <div className="h-screen flex bg-gray-50">
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            {children}
          </div>
        </div>
        
        {/* Editing Sidebar */}
        <EditingSidebar />
      </div>
    </AdminEditingProvider>
  );
};