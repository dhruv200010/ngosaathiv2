
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO } from "@/context/NGOContext";
import { toast } from "@/components/ui/sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

const SetupNGO = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { profile, updateProfile } = useNGO();
  const [name, setName] = useState(profile.ngoName || "");
  const [photo, setPhoto] = useState<string | null>(profile.photo);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error(t("ngoNameRequired"));
      return;
    }

    updateProfile({
      ngoName: name,
      photo: photo,
    });

    navigate("/details");
  };

  return (
    <div className="flex flex-col min-h-screen bg-ngo-light">
      <Header showBack={true} showProfile={false} />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-ngo-dark mb-6 text-center">
            {t("setupNGO")}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col items-center">
              <div className="mb-4 relative group">
                <Avatar className="h-32 w-32 border-4 border-ngo-green cursor-pointer">
                  <AvatarImage src={photo || undefined} />
                  <AvatarFallback className="bg-ngo-dark text-white text-4xl">
                    {name.charAt(0) || "N"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black bg-opacity-50 rounded-full h-32 w-32 flex items-center justify-center">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-white" />
                    </label>
                  </div>
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>
              <Label htmlFor="photo-upload" className="text-sm text-gray-600 cursor-pointer">
                {t("uploadPhoto")}
              </Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ngo-name">
                {t("ngoName")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="ngo-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("ngoName")}
                className="input-field"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-ngo-green text-ngo-dark hover:bg-ngo-green/90"
            >
              {t("next")}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SetupNGO;
