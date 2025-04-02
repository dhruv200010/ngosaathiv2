
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, User, BarChart, Download, HelpCircle, Info, LogOut } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationLanguage } from "@/utils/languageData";
import { useNGO } from "@/context/NGOContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ProfileMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const { profile, downloadedFiles } = useNGO();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // In a real app, you would clear auth state
    navigate("/");
  };

  const handleLanguageChange = (lang: TranslationLanguage) => {
    setLanguage(lang);
    setMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <Avatar onClick={() => handleNavigation("/profile")} className="cursor-pointer">
          <AvatarImage src={profile.photo || undefined} alt={profile.ngoName} />
          <AvatarFallback className="bg-ngo-green text-ngo-dark">
            {profile.ngoName.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <button
          onClick={toggleMenu}
          className="text-white hover:text-ngo-green transition-colors"
          aria-label="Menu"
        >
          <Menu size={20} />
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 animate-fade-in">
          <div className="py-1">
            <button
              onClick={() => handleNavigation("/profile")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User size={16} className="mr-2" />
              {t("profile")}
            </button>
            <button
              onClick={() => handleNavigation("/analytics")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <BarChart size={16} className="mr-2" />
              {t("analytics")}
            </button>
            <button
              onClick={() => handleNavigation("/downloads")}
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <Download size={16} className="mr-2" />
                {t("downloads")}
              </div>
              {downloadedFiles && downloadedFiles.length > 0 && (
                <Badge variant="outline" className="bg-ngo-green text-white text-xs">
                  {downloadedFiles.length}
                </Badge>
              )}
            </button>
            <button
              onClick={() => handleNavigation("/support")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <HelpCircle size={16} className="mr-2" />
              {t("support")}
            </button>
            <button
              onClick={() => handleNavigation("/about")}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Info size={16} className="mr-2" />
              {t("aboutUs")}
            </button>
            <div className="border-t border-gray-200 my-1"></div>
            <div className="px-4 py-2 text-sm text-gray-700">
              <div className="font-medium mb-1">{t("changeLanguage")}</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-2 py-1 text-xs rounded ${
                    language === "en" ? "bg-ngo-green text-white" : "bg-gray-200"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => handleLanguageChange("hi")}
                  className={`px-2 py-1 text-xs rounded ${
                    language === "hi" ? "bg-ngo-green text-white" : "bg-gray-200"
                  }`}
                >
                  हिंदी
                </button>
                <button
                  onClick={() => handleLanguageChange("gu")}
                  className={`px-2 py-1 text-xs rounded ${
                    language === "gu" ? "bg-ngo-green text-white" : "bg-gray-200"
                  }`}
                >
                  ગુજરાતી
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 my-1"></div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut size={16} className="mr-2" />
              {t("logout")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
