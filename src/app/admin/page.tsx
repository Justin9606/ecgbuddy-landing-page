"use client";

import React from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminHomePage } from "./AdminHomePage";

export default function AdminPage() {
  return (
    <AdminLayout>
      <AdminHomePage />
    </AdminLayout>
  );
}