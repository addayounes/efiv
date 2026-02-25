import {
  type Configuration,
  PublicClientApplication,
} from "@azure/msal-browser";
import { authority, clientId } from "@/constants/auth-secrets";

export const msalConfig: Configuration = {
  auth: {
    clientId,
    authority,
    redirectUri: "http://localhost:5173",
    postLogoutRedirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "localStorage",
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
