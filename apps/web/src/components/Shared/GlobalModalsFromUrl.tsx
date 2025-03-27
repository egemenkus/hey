import { useAuthModalStore } from "@/store/non-persisted/modal/useAuthModalStore";
import { useAccountStore } from "@/store/persisted/useAccountStore";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSignupStore } from "./Auth/Signup";

const GlobalModalsFromUrl = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const signup = searchParams.get("signup");

  const { currentAccount } = useAccountStore();
  const { setShowAuthModal } = useAuthModalStore();
  const { setScreen } = useSignupStore();

  useEffect(() => {
    if (signup && !currentAccount?.address) {
      setScreen("choose");
      setShowAuthModal(true, "signup");

      // Remove query param
      navigate({ pathname: "/" });
    }
  }, [signup, currentAccount, setScreen, setShowAuthModal, navigate]);

  return null;
};

export default GlobalModalsFromUrl;
