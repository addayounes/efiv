import "./login.css";

import { dayjs } from "@/lib/dayjs";
import toast from "react-hot-toast";
import { ChevronRight } from "lucide-react";
import { useMsal } from "@azure/msal-react";
import { scopes } from "@/constants/auth-secrets";
import trainLoginImage from "/train-login-image.png";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const { instance } = useMsal();

  const handleLogin = async () => {
    try {
      await instance.loginPopup({ scopes });
    } catch (error) {
      console.log(error);
      toast.error("Une erreur est survenue lors de la connexion.");
    }
  };
  return (
    <div className="flex min-h-screen">
      <div
        style={{ backgroundImage: `url(${trainLoginImage})` }}
        className="relative flex-1 h-screen bg-primary bg-no-repeat bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-tl from-primary to-primary/30" />
      </div>

      <div className="flex flex-col justify-between bg-white min-w-lg p-10">
        <div />

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
