
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import ActivityCard from "@/components/ActivityCard";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO } from "@/context/NGOContext";
import { PlusCircle, Import, Download } from "lucide-react";
import { toast } from "@/lib/toast";
import { validateSecureCode } from "@/utils/codeGenerator";

const EditActivities = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { 
    activities, 
    startNewActivity, 
    getActivityByCode, 
    addActivity, 
    startEditingActivity,
    addDownloadedFile
  } = useNGO();
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importCode, setImportCode] = useState("");

  // Add a sample download for testing, only once
  useEffect(() => {
    // This is just for testing the downloads functionality
    const addTestDownload = () => {
      if (activities && activities.length > 0) {
        const activity = activities[0];
        const downloadItem = {
          fileName: "Sample Report.pdf",
          fileType: "PDF Report",
          activityId: activity.id,
          activityName: activity.name || "Activity Report",
          downloadDate: new Date().toLocaleDateString(),
        };
        
        console.log("Adding test download:", downloadItem);
        addDownloadedFile(downloadItem);
      }
    };
    
    // Uncomment this line to add a test download
    // addTestDownload();
  }, [activities, addDownloadedFile]);

  const handleAddActivity = () => {
    startNewActivity();
    navigate("/activity/report");
  };

  const handleEditActivity = (id: string) => {
    startEditingActivity(id);
    navigate("/activity/report");
  };

  const handleImportActivity = () => {
    setImportDialogOpen(true);
  };

  const handleDownloadReport = (activityId: string, activityName: string) => {
    const downloadItem = {
      fileName: `${activityName || "Activity"} Report.pdf`,
      fileType: "PDF Report",
      activityId: activityId,
      activityName: activityName || "Activity Report",
      downloadDate: new Date().toLocaleDateString(),
    };
    
    console.log("Adding download:", downloadItem);
    addDownloadedFile(downloadItem);
    toast.success(t("reportDownloaded"));
  };

  const processImport = () => {
    if (!importCode.trim()) {
      toast.error(t("enterValidCode"));
      return;
    }

    // Validate code format first
    if (!validateSecureCode(importCode)) {
      toast.error(t("invalidCodeFormat"));
      return;
    }

    const activity = getActivityByCode(importCode);
    if (activity) {
      const importedActivity = {
        ...activity,
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      };
      addActivity(importedActivity);
      toast.success(t("activityImported"));
      setImportDialogOpen(false);
      setImportCode("");
    } else {
      toast.error(t("invalidCode"));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-ngo-light">
      <Header showBack={true} showProfile={true} />
      <main className="flex-1 p-6">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-ngo-dark">
              {t("activities")}
            </h1>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                onClick={handleImportActivity}
                className="flex items-center"
              >
                <Import size={16} className="mr-2" />
                {t("import")}
              </Button>
              <Button 
                className="bg-ngo-green text-ngo-dark hover:bg-ngo-green/90 flex items-center"
                onClick={handleAddActivity}
              >
                <PlusCircle size={16} className="mr-2" />
                {t("add")}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow">
                <p className="text-gray-500 mb-4">{t("noActivities")}</p>
                <Button 
                  className="bg-ngo-green text-ngo-dark hover:bg-ngo-green/90"
                  onClick={handleAddActivity}
                >
                  {t("addFirstActivity")}
                </Button>
              </div>
            ) : (
              activities.map((activity) => (
                <ActivityCard 
                  key={activity.id} 
                  activity={activity} 
                  onEdit={() => handleEditActivity(activity.id)}
                  onMoreActions={() => (
                    <div className="px-1 py-1">
                      <Button
                        className="w-full justify-start text-left text-sm px-2 py-1.5 hover:bg-gray-100"
                        variant="ghost"
                        onClick={() => handleDownloadReport(activity.id, activity.name)}
                      >
                        <Download size={16} className="mr-2" />
                        {t("downloadReport")}
                      </Button>
                    </div>
                  )}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* Import Activity Dialog */}
      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("importActivity")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {t("enterCodeDescription")}
            </p>
            <Input
              value={importCode}
              onChange={(e) => setImportCode(e.target.value)}
              placeholder={t("enterCode")}
              className="font-mono uppercase"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button className="bg-ngo-green text-ngo-dark hover:bg-ngo-green/90" onClick={processImport}>
              {t("import")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditActivities;
