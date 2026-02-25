import "./login.css";

import { dayjs } from "@/lib/dayjs";
import toast from "react-hot-toast";
import { ChevronRight } from "lucide-react";
import { useMsal } from "@azure/msal-react";
import { scopes } from "@/constants/auth-secrets";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      await instance.loginPopup({ scopes });
    } catch (error) {
      toast.error("Une erreur est survenue lors de la connexion.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* BG */}
      <div className="glow-canvas">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="blob blob-5"></div>
      </div>

      <div className="flex flex-col justify-between bg-white w-lg p-6 shadow-lg rounded-lg z-50">
        <div>
          <p className="text-2xl text-gray-800 font-medium">
            Bienvenue sur IVGO
          </p>
          <p className="text-gray-500">
            Connectez-vous pour accéder à votre compte
          </p>
        </div>

        {/* Button */}
        <div className="my-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-full border-t border-gray-100" />
            <p className="uppercase text-xs text-gray-400 whitespace-nowrap">
              Accès sécurisé
            </p>
            <span className="w-full border-t border-gray-100" />
          </div>

          <div className="bg-white shadow-md hover:shadow-lg hover:-translate-y-1 rounded-md ease-out duration-200">
            <button
              onClick={handleLogin}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-gray-800 focus:outline-none cursor-pointer"
            >
              <div className="grid grid-cols-2 gap-0.5 w-8 h-8 rounded-md overflow-hidden">
                <div className="bg-[#f25022] rounded-sm"></div>
                <div className="bg-[#7fba00] rounded-sm"></div>
                <div className="bg-[#00a4ef] rounded-sm"></div>
                <div className="bg-[#ffb900] rounded-sm"></div>
              </div>

              <div className="flex-1 text-left">
                <div className="font-medium">Continuer avec Microsoft</div>
                <div className="text-gray-500 text-xs">
                  Connexion sécurisée avec votre compte Microsoft
                </div>
              </div>

              <ChevronRight className="text-gray-800" />
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          © {dayjs().format("YYYY")} IVGO · v0.0.1
        </div>
      </div>
    </div>
  );
};

export default Login;
