// src/components/Loading.tsx
import { Car } from "lucide-react";

interface LoadingProps {
  label?: string;
  fullPage?: boolean;
}

function Loading({ label = "Loading...", fullPage = false }: LoadingProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullPage ? "min-h-screen" : "py-16"
      }`}
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#e2e8f0]" />
        <div className="absolute inset-0 rounded-full border-4 border-[#3b6ef5] border-t-transparent animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Car size={16} className="text-[#0f172a]" />
        </div>
      </div>
      <p className="text-sm text-[#475569]">{label}</p>
    </div>
  );
}

export default Loading;
