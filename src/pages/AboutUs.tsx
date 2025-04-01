
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { useNGO } from "@/context/NGOContext";

const AboutUs: React.FC = () => {
  const { t } = useLanguage();
  const { profile } = useNGO();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-ngo-light">
      <Header showBack={true} showProfile={true} />
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-ngo-dark mb-6 text-center">
            {t("aboutUs")}
          </h1>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-ngo-dark mb-3">
                  {t("aboutNGOManager")}
                </h2>
                <p className="text-gray-700 mb-3">
                  {t("aboutNGOManagerDescription")}
                </p>
                <p className="text-gray-700">
                  {t("aboutNGOManagerPurpose")}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-ngo-dark mb-3">
                  {t("keyFeatures")}
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>{t("featureActivityManagement")}</li>
                  <li>{t("featureBeneficiaryTracking")}</li>
                  <li>{t("featureDocumentation")}</li>
                  <li>{t("featureReporting")}</li>
                  <li>{t("featureDataSharing")}</li>
                  <li>{t("featureOfflineAccess")}</li>
                </ul>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-ngo-dark mb-3">
                  {t("ourVision")}
                </h2>
                <p className="text-gray-700">
                  {t("visionDescription")}
                </p>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-ngo-dark mb-3">
                  {t("privacyCommitment")}
                </h2>
                <p className="text-gray-700">
                  {t("privacyDescription")}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-ngo-dark mb-3">
                  {t("contactInformation")}
                </h2>
                <p className="text-gray-700">
                  {t("contactDescription")}
                </p>
                <div className="mt-3 font-medium">
                  <p>Email: support@ngoactivitymanager.org</p>
                  <p>Phone: +1-800-NGO-HELP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-gray-600 text-sm mt-6">
            <p>NGO Activity Manager © {new Date().getFullYear()}</p>
            <p className="mt-1">{t("allRightsReserved")}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
