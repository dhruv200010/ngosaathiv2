
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO } from "@/context/NGOContext";
import { toast } from "@/lib/toast";
import { PlusCircle, Edit, Import } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { profile, startNewActivity, getActivityByCode, addActivity } = useNGO();
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [importCode, setImportCode] = useState("");

  const handleAddActivity = () => {
    startNewActivity();
    navigate("/activity/report");
  };

  const handleEditActivities = () => {
    navigate("/activity/edit");
  };

  const handleImportActivity = () => {
    setImportDialogOpen(true);
  };

  const processImport = () => {
    if (!importCode.trim()) {
      toast.error(t("enterValidCode"));
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
      <Header showBack={false} showProfile={true} />
      <main className="flex-1 p-6">
        <div className="w-full max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-ngo-dark mb-2">
              {t("dashboard")}
            </h1>
            <p className="text-gray-600">
              {t("welcome")}, {profile.ngoName}!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={handleAddActivity}
            >
              <div className="h-16 w-16 rounded-full bg-ngo-green/10 flex items-center justify-center mb-4">
                <PlusCircle size={32} className="text-ngo-green" />
              </div>
              <h2 className="text-xl font-semibold text-ngo-dark">{t("addActivity")}</h2>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {t("createNewActivity")}
              </p>
            </div>
            
            <div 
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={handleEditActivities}
            >
              <div className="h-16 w-16 rounded-full bg-ngo-dark/10 flex items-center justify-center mb-4">
                <Edit size={32} className="text-ngo-dark" />
              </div>
              <h2 className="text-xl font-semibold text-ngo-dark">{t("editActivity")}</h2>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {t("manageActivities")}
              </p>
            </div>
            
            <div 
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={handleImportActivity}
            >
              <div className="h-16 w-16 rounded-full bg-ngo-dark/10 flex items-center justify-center mb-4">
                <Import size={32} className="text-ngo-dark" />
              </div>
              <h2 className="text-xl font-semibold text-ngo-dark">{t("importActivity")}</h2>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {t("importFromOtherUser")}
              </p>
            </div>
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

export default Dashboard;
