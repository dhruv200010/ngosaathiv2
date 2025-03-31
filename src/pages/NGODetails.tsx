
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO, NGOProfile } from "@/context/NGOContext";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const NGODetails = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { profile, updateProfile } = useNGO();
  const [formData, setFormData] = useState<Partial<NGOProfile>>({
    registrationNo: profile.registrationNo || "",
    registrationDate: profile.registrationDate || "",
    workingAreas: profile.workingAreas || [],
    contactNo: profile.contactNo || "",
    email: profile.email || "",
    website: profile.website || "",
    accountType: profile.accountType || "parent",
  });
  const [date, setDate] = useState<Date | undefined>(
    formData.registrationDate ? new Date(formData.registrationDate) : undefined
  );

  const workingAreaOptions = [
    { id: "noPoverty", label: t("noPoverty") },
    { id: "zeroHunger", label: t("zeroHunger") },
    { id: "goodHealth", label: t("goodHealth") },
    { id: "qualityEducation", label: t("qualityEducation") },
    { id: "genderEquality", label: t("genderEquality") },
    { id: "cleanWater", label: t("cleanWater") },
    { id: "cleanEnergy", label: t("cleanEnergy") },
    { id: "decentWork", label: t("decentWork") },
    { id: "innovation", label: t("innovation") },
    { id: "reducedInequality", label: t("reducedInequality") },
    { id: "sustainableCities", label: t("sustainableCities") },
    { id: "responsibleConsumption", label: t("responsibleConsumption") },
    { id: "climateAction", label: t("climateAction") },
    { id: "lifeBelowWater", label: t("lifeBelowWater") },
    { id: "lifeOnLand", label: t("lifeOnLand") },
    { id: "peace", label: t("peace") },
    { id: "partnerships", label: t("partnerships") },
  ];

  const handleWorkingAreaChange = (id: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        workingAreas: [...(prev.workingAreas || []), id],
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        workingAreas: (prev.workingAreas || []).filter(area => area !== id),
      }));
    }
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
    if (date) {
      setFormData(prev => ({
        ...prev,
        registrationDate: date.toISOString(),
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen bg-ngo-light">
      <Header showBack={true} showProfile={false} showSkip={true} skipTo="/dashboard" />
      <main className="flex-1 p-6">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-ngo-dark mb-6">
            {t("setupDetails")}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Registration No */}
              <div className="space-y-2">
                <Label htmlFor="registrationNo">{t("registrationNo")}</Label>
                <Input
                  id="registrationNo"
                  name="registrationNo"
                  value={formData.registrationNo}
                  onChange={handleInputChange}
                  placeholder={t("registrationNo")}
                  className="input-field"
                />
              </div>
              
              {/* Registration Date */}
              <div className="space-y-2">
                <Label htmlFor="registrationDate">{t("registrationDate")}</Label>
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
              </div>
              
              {/* Contact No */}
              <div className="space-y-2">
                <Label htmlFor="contactNo">{t("contactNo")}</Label>
                <Input
                  id="contactNo"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  placeholder={t("contactNo")}
                  className="input-field"
                />
              </div>
              
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("email")}
                  className="input-field"
                />
              </div>
              
              {/* Website */}
              <div className="space-y-2">
                <Label htmlFor="website">{t("website")}</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder={t("website")}
                  className="input-field"
                />
              </div>
              
              {/* Account Type */}
              <div className="space-y-2">
                <Label>{t("accountType")}</Label>
                <RadioGroup
                  value={formData.accountType}
                  onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, accountType: value as "parent" | "child" }))
                  }
                  className="flex space-x-4"
                >
                  <div className="radio-container">
                    <RadioGroupItem value="parent" id="parent" />
                    <Label htmlFor="parent">{t("parent")}</Label>
                  </div>
                  <div className="radio-container">
                    <RadioGroupItem value="child" id="child" />
                    <Label htmlFor="child">{t("child")}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            {/* Working Areas */}
            <div className="space-y-2">
              <Label>{t("workingAreas")}</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {workingAreaOptions.map((option) => (
                  <div key={option.id} className="checkbox-container">
                    <Checkbox
                      id={option.id}
                      checked={(formData.workingAreas || []).includes(option.id)}
                      onCheckedChange={(checked) => 
                        handleWorkingAreaChange(option.id, checked as boolean)
                      }
                      className="checkbox-input"
                    />
                    <Label htmlFor={option.id} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                className="bg-ngo-green text-ngo-dark hover:bg-ngo-green/90"
              >
                {t("save")}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default NGODetails;
