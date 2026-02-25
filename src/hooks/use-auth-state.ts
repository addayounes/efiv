import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { setAuth } from "@/redux/slices/auth";
import { useAppDispatch } from "@/redux/utils";

const mapUser = (account: any) => ({
  id: account?.localAccountId,
  email: account?.idTokenClaims?.email,
  name: account?.idTokenClaims?.name,
});

export const useAuthState = () => {
  const { accounts } = useMsal();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accounts || accounts.length === 0) {
      dispatch(
        setAuth({
          isLoading: false,
          isAuth: false,
          user: undefined,
        }),
      );
      return;
    } else {
      dispatch(
        setAuth({
          isAuth: true,
          isLoading: false,
          user: mapUser(accounts[0]),
        }),
      );
    }
  }, [accounts]);
};
