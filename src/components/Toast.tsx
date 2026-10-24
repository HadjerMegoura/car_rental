import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import type { ToastType } from "../contexts/ToastContext";

interface ToastProps {
  type: ToastType;
  message: string;
  onDismiss: () => void;
}

const config: Record<
  ToastType,
  { icon: typeof CheckCircle; bg: string; iconColor: string }
> = {
  success: {
    icon: CheckCircle,
    bg: "bg-[#e0f0e5]",
    iconColor: "text-[#2f7a4f]",
  },
  error: { icon: XCircle, bg: "bg-[#f5e5e5]", iconColor: "text-[#a84343]" },
  warning: {
    icon: AlertTriangle,
    bg: "bg-[#faf0dc]",
    iconColor: "text-[#b8823a]",
  },
  info: { icon: Info, bg: "bg-[#e6edf5]", iconColor: "text-[#3a6ba8]" },
};

const Toast = ({ type, message, onDismiss }: ToastProps) => {
  const { icon: Icon, bg, iconColor } = config[type];

  return (
    <div className="flex items-center gap-3 bg-white rounded-xl border border-[#eee9df] shadow-lg px-4 py-3 min-w-[280px] max-w-sm animate-in slide-in-from-bottom-2">
      <div
        className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}
      >
        <Icon size={16} className={iconColor} />
      </div>
      <p className="text-sm text-[#12181f] flex-1">{message}</p>
      <button
        onClick={onDismiss}
        className="text-[#a8a196] hover:text-[#12181f] transition-colors flex-shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
