
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleGoogleLogin = () => {
    // In a real app, this would trigger Google OAuth
    // For this demo, we'll just navigate to the setup page
    navigate("/setup");
  };

  return (
    <div className="flex flex-col min-h-screen bg-ngo-light">
      <Header showBack={false} showProfile={false} />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ngo-dark mb-2">{t("appName")}</h1>
            <p className="text-gray-600">{t("signUpText")}</p>
          </div>
          
          <div className="space-y-6">
            <Button 
              className="w-full py-6 bg-ngo-green text-ngo-dark hover:bg-ngo-green/90 flex items-center justify-center space-x-2 text-lg"
              onClick={handleGoogleLogin}
            >
              <svg 
                className="w-5 h-5" 
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>{t("loginWithGoogle")}</span>
            </Button>
            
            <div className="pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
