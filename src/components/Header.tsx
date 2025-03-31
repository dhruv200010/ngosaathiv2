
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import ProfileMenu from "./ProfileMenu";
import { useNGO } from "@/context/NGOContext";

interface HeaderProps {
  showBack?: boolean;
  showProfile?: boolean;
  showSkip?: boolean;
  skipTo?: string;
  step?: number;
  totalSteps?: number;
}

const Header: React.FC<HeaderProps> = ({
  showBack = true,
  showProfile = false,
  showSkip = false,
  skipTo = "/dashboard",
  step,
  totalSteps,
}) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { profile } = useNGO();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSkip = () => {
    navigate(skipTo);
  };

  return (
    <header className="bg-ngo-dark text-white py-4 px-6 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBack && (
            <button
              onClick={handleBack}
              className="text-white hover:text-ngo-green transition-colors"
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-xl font-bold">{t("appName")}</h1>
          {step && totalSteps && (
            <div className="ml-4 text-sm font-medium text-ngo-green">
              {step}/{totalSteps}
            </div>
          )}
        </div>
        <div className="flex items-center">
          {showSkip && (
            <button
              onClick={handleSkip}
              className="mr-4 text-sm font-medium text-ngo-green hover:text-white transition-colors"
            >
              {t("skip")}
            </button>
          )}
          {showProfile && <ProfileMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
