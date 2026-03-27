"use client";

import { ReactNode } from "react";

export default function StepWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="animate-fade-slide bg-white rounded-2xl shadow-md p-6">
      {children}
    </div>
  );
}
