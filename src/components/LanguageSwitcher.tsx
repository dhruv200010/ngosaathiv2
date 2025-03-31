
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationLanguage } from "@/utils/languageData";
import { Button } from "@/components/ui/button";

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: TranslationLanguage) => {
    setLanguage(lang);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-2 font-medium">{t("changeLanguage")}</h3>
      <div className="flex space-x-2">
        <Button
          variant={language === "en" ? "default" : "outline"}
          size="sm"
          onClick={() => handleLanguageChange("en")}
          className={language === "en" ? "bg-ngo-green text-white hover:bg-ngo-green/90" : ""}
        >
          English
        </Button>
        <Button
          variant={language === "hi" ? "default" : "outline"}
          size="sm"
          onClick={() => handleLanguageChange("hi")}
          className={language === "hi" ? "bg-ngo-green text-white hover:bg-ngo-green/90" : ""}
        >
          हिंदी
        </Button>
        <Button
          variant={language === "gu" ? "default" : "outline"}
          size="sm"
          onClick={() => handleLanguageChange("gu")}
          className={language === "gu" ? "bg-ngo-green text-white hover:bg-ngo-green/90" : ""}
        >
          ગુજરાતી
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
