import { authClient } from "./auth-client";

export const getServerSession = async () => {
  return await authClient.getSession();
};
