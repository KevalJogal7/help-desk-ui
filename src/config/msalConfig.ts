import { PublicClientApplication } from "@azure/msal-browser";
import { env } from "./env";

export const msalInstance = new PublicClientApplication({
    auth: {
        clientId: env.clientId,
        authority:
            "https://login.microsoftonline.com/"+env.tenantId,
        redirectUri: "http://localhost:5173",
    },
});

export const loginRequest = {
    scopes: ["User.Read"],
};