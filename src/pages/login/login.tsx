import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Car } from "lucide-react";
import { authService } from "../../services/authService";
import { useToast } from "../../contexts/ToastContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      const message = "Please fill in both fields.";
      setError(message);
      showToast("error", message);
      return;
    }

    setIsSubmitting(true);
    authService
      .login({ email, password })
      .then(() => {
        showToast("success", "Logged in successfully.");
        navigate("/cars");
      })
      .catch(() => {
        const message = "Invalid email or password.";
        setError(message);
        showToast("error", message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B1326] p-6">
      <div className="w-full max-w-6xl bg-[#0d1424] rounded-[2rem] shadow-2xl p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left panel — branding */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-11 h-11 rounded-xl bg-[#3b6ef5] flex items-center justify-center flex-shrink-0">
                <Car size={22} className="text-white" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-white font-semibold text-lg leading-tight">
                  Wheelio
                </p>
                <p className="text-[#7d8598] text-xs">Fleet Platform</p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              Car rental fleet management, made simple.
            </h1>
            <p className="text-[#8b93a7] text-sm max-w-md mb-8">
              Effortlessly orchestrate bookings, vehicle dispatches, and
              maintenance workflows in one seamless workspace.
            </p>

            {/* Image */}
            <div className="rounded-2xl overflow-hidden border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf"
                alt="Fleet vehicle"
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8 flex items-center gap-2 text-xs text-[#5f6779]">
              <span>© 2026 Wheelio Inc.</span>
              <span>•</span>
              <span className="font-medium text-[#8b93a7]">
                Enterprise Edition
              </span>
            </div>
          </div>

          {/* Right panel — form */}
          <div className="flex flex-col justify-center max-w-sm w-full mx-auto">
            <h2 className="text-2xl font-bold text-white mb-1">Sign in</h2>
            <p className="text-sm text-[#8b93a7] mb-8">
              Enter your account credentials to continue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm text-[#c3c8d4] mb-2">
                  Work email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white
                             placeholder:text-[#5f6779] focus:outline-none focus:ring-2 focus:ring-[#3b6ef5] focus:border-transparent"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm text-[#c3c8d4]">Password</label>
                  <a
                    href="#"
                    className="text-xs text-[#5b8bf5] hover:text-[#7ba3ff] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 bg-[#151c30] border border-white/10 rounded-lg text-sm text-white
                               placeholder:text-[#5f6779] focus:outline-none focus:ring-2 focus:ring-[#3b6ef5] focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5f6779] hover:text-[#c3c8d4]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-[#c3c8d4] cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-[#151c30] text-[#3b6ef5] focus:ring-[#3b6ef5]"
                />
                Remember me
              </label>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#3b6ef5] text-white py-3 rounded-lg font-semibold text-sm
                           hover:bg-[#5580f7] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-xs text-[#5f6779]">or continue with</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* SSO buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 bg-[#151c30] text-sm text-[#c3c8d4] hover:bg-[#1c2438] transition-colors"
                >
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 bg-[#151c30] text-sm text-[#c3c8d4] hover:bg-[#1c2438] transition-colors"
                >
                  Microsoft
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom-right note */}
        <p className="absolute bottom-6 right-12 text-xs text-[#5f6779]">
          Encrypted session. Authorized access only.
        </p>
      </div>
    </div>
  );
}

export default Login;