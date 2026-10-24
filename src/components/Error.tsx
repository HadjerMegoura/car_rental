// src/components/ErrorMessage.tsx
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  message?: string;
  onRetry?: () => void;
  fullPage?: boolean;
}

function Error({
  message = "Something went wrong. Please try again.",
  onRetry,
  fullPage = false,
}: ErrorProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullPage ? "min-h-screen" : "py-16"
      }`}
    >
      <div className="w-12 h-12 rounded-full bg-[#fee2e2] flex items-center justify-center">
        <AlertTriangle size={20} className="text-[#b91c1c]" />
      </div>

      <p className="text-sm text-[#475569] max-w-xs text-center">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-[#3b6ef5] text-white hover:bg-[#5580f7] transition-colors"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}

export default Error;
