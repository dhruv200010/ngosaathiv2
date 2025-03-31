import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO } from "@/context/NGOContext";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, MapPin, Image } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";

const ActivityReport = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formState, updateTempActivity, updateFormState } = useNGO();
  const { tempActivity } = formState;
  
  const [date, setDate] = useState<Date | undefined>(
    tempActivity.date ? new Date(tempActivity.date) : undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mediaPreview, setMediaPreview] = useState<string[]>(tempActivity.media || []);

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      updateTempActivity({ date: date.toISOString() });
    }
  };

  const handleSetCurrentDate = () => {
    const currentDate = new Date();
    setDate(currentDate);
    updateTempActivity({ date: currentDate.toISOString() });
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      toast.info(t("fetchingLocation"));
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Convert coordinates to address (simplified for demo)
          const mockAddress = `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
          updateTempActivity({ location: mockAddress });
          toast.success(t("locationFetched"));
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error(t("locationError"));
        }
      );
    } else {
      toast.error(t("geolocationNotSupported"));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newMediaPreviews: string[] = [];
      const newMedia: string[] = [...tempActivity.media];

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            const result = event.target.result as string;
            newMediaPreviews.push(result);
            newMedia.push(result);
            setMediaPreview(prev => [...prev, result]);
          }
        };
        reader.readAsDataURL(file);
      });

      updateTempActivity({ media: newMedia });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeMedia = (index: number) => {
    const updatedMedia = [...tempActivity.media];
    updatedMedia.splice(index, 1);
    setMediaPreview(updatedMedia);
    updateTempActivity({ media: updatedMedia });
  };

  const handleNext = () => {
    if (!tempActivity.name) {
      toast.error(t("activityNameRequired"));
      return;
    }

    if (!tempActivity.date) {
      toast.error(t("dateRequired"));
      return;
    }

    updateFormState({ currentStep: 2 });
    navigate("/activity/documents");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-ngo-light">
      <Header showBack={true} showProfile={true} step={1} totalSteps={3} />
      <main className="flex-1 p-6">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <ProgressBar currentStep={1} totalSteps={3} />
          
          <div className="space-y-6 mt-6">
            {/* Activity Name */}
            <div className="space-y-2">
              <Label htmlFor="activity-name">
                {t("activityName")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="activity-name"
                value={tempActivity.name}
                onChange={(e) => updateTempActivity({ name: e.target.value })}
                placeholder={t("activityName")}
                className="input-field"
                required
              />
            </div>
            
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">{t("location")}</Label>
              <div className="flex space-x-2">
                <Input
                  id="location"
                  value={tempActivity.location}
                  onChange={(e) => updateTempActivity({ location: e.target.value })}
                  placeholder={t("location")}
                  className="input-field flex-1"
                />
                <Button 
                  type="button" 
                  onClick={handleGetCurrentLocation}
                  variant="outline"
                  className="flex items-center"
                >
                  <MapPin size={16} className="mr-2" />
                  {t("getCurrentLocation")}
                </Button>
              </div>
            </div>
            
            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date">
                {t("date")} <span className="text-red-500">*</span>
              </Label>
              <div className="flex space-x-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>{t("selectDate")}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button 
                  type="button" 
                  onClick={handleSetCurrentDate}
                  variant="outline"
                >
                  {t("setCurrentDate")}
                </Button>
              </div>
            </div>
            
            {/* Person of Contact */}
            <div className="space-y-2">
              <Label>{t("personOfContact")}</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder={t("name")}
                  value={tempActivity.contactPerson.name}
                  onChange={(e) => 
                    updateTempActivity({ 
                      contactPerson: { 
                        ...tempActivity.contactPerson, 
                        name: e.target.value 
                      } 
                    })
                  }
                  className="input-field"
                />
                <Input
                  placeholder={t("contactNumber")}
                  value={tempActivity.contactPerson.contactNo}
                  onChange={(e) => 
                    updateTempActivity({ 
                      contactPerson: { 
                        ...tempActivity.contactPerson, 
                        contactNo: e.target.value 
                      } 
                    })
                  }
                  className="input-field"
                />
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">{t("description")}</Label>
              <Textarea
                id="description"
                value={tempActivity.description}
                onChange={(e) => updateTempActivity({ description: e.target.value })}
                placeholder={t("description")}
                className="min-h-[100px] input-field"
              />
            </div>
            
            {/* Upload Media */}
            <div className="space-y-2">
              <Label>{t("uploadMedia")}</Label>
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-ngo-green transition-colors"
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                />
                <Image size={40} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">{t("dragAndDropMedia")}</p>
              </div>
              
              {/* Media Previews */}
              {mediaPreview.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  {mediaPreview.map((media, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={media}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMedia(index);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleBack}
              >
                {t("back")}
              </Button>
              <Button 
                type="button" 
                className="bg-ngo-green text-ngo-dark hover:bg-ngo-green/90"
                onClick={handleNext}
              >
                {t("next")}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActivityReport;
