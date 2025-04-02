
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO } from "@/context/NGOContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileDown, Trash2 } from "lucide-react";
import { toast } from "@/lib/toast";

const Downloads: React.FC = () => {
  const { t } = useLanguage();
  const { downloadedFiles, removeDownloadedFile } = useNGO();
  const navigate = useNavigate();

  console.log("Downloaded files in Downloads page:", downloadedFiles); // Debug log

  const handleDownload = (fileName: string) => {
    // In a real app, this would download the actual file
    toast.success(t("fileDownloaded"));
  };

  const handleRemove = (id: string) => {
    removeDownloadedFile(id);
    toast.success(t("fileRemoved"));
  };

  return (
    <div className="flex flex-col min-h-screen bg-ngo-light">
      <Header showBack={true} showProfile={true} />
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-ngo-dark mb-6 text-center">
            {t("downloads")}
          </h1>

          {!Array.isArray(downloadedFiles) || downloadedFiles.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <FileDown size={48} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  {t("noDownloads")}
                </h2>
                <p className="text-gray-600 mb-6">
                  {t("noDownloadsDescription")}
                </p>
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="bg-ngo-green text-ngo-dark hover:bg-ngo-green/90"
                >
                  {t("goToDashboard")}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {downloadedFiles.map((file) => (
                <Card key={file.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-center">
                      <span className="truncate">{file.fileName}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(file.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-sm text-gray-600">
                      <p>
                        <span className="font-medium">{t("activity")}: </span>
                        {file.activityName}
                      </p>
                      <p>
                        <span className="font-medium">{t("fileType")}: </span>
                        {file.fileType}
                      </p>
                      <p>
                        <span className="font-medium">{t("downloadDate")}: </span>
                        {file.downloadDate}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      onClick={() => handleDownload(file.fileName)}
                      className="w-full text-ngo-dark border-ngo-green hover:bg-ngo-green/10"
                    >
                      <FileDown size={16} className="mr-2" />
                      {t("download")}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Downloads;
