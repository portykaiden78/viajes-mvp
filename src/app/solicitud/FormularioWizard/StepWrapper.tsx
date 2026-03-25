"use client";

import { ReactNode } from "react";

export default function StepWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="animate-fade-slide">
      {children}
    </div>
  );
}
