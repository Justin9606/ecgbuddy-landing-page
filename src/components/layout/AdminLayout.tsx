"use client";

import React, { ReactNode, useState, useCallback, useEffect } from "react";
import { AdminEditingProvider } from "@/lib/contexts/AdminEditingContext";
import { EditingSidebar } from "@/components/admin/EditingSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = window.innerWidth - e.clientX;
      const minWidth = 280;
      const maxWidth = 600;
      
      setSidebarWidth(Math.min(Math.max(newWidth, minWidth), maxWidth));
    },
    [isResizing]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <AdminEditingProvider>
      <div className="h-screen flex bg-gray-50 relative">
        {/* Main Content Area */}
        <div 
          className="flex-1 overflow-hidden transition-all duration-200"
          style={{ width: `calc(100% - ${sidebarWidth}px)` }}
        >
          <div className="h-full overflow-y-auto">
            {children}
          </div>
        </div>
        
        {/* Resizer Handle */}
        <div
          className={`w-2 bg-gray-200 hover:bg-blue-400 transition-colors duration-200 cursor-ew-resize flex items-center justify-center group relative ${
            isResizing ? "bg-blue-500" : ""
          }`}
          onMouseDown={handleMouseDown}
        >
          {/* Resize indicator dots */}
          <div className="flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          
          {/* Resize tooltip */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              Drag to resize
            </div>
          </div>
        </div>
        
        {/* Editing Sidebar */}
        <div 
          className="bg-white border-l border-gray-200 flex flex-col h-full transition-all duration-200 shadow-xl"
          style={{ width: `${sidebarWidth}px` }}
        >
          <EditingSidebar />
        </div>

        {/* Resizing overlay */}
        {isResizing && (
          <div className="absolute inset-0 bg-black bg-opacity-10 z-50 pointer-events-none" />
        )}
      </div>
    </AdminEditingProvider>
  );
};