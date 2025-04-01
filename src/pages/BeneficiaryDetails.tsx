
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO, Beneficiary } from "@/context/NGOContext";
import { Trash2, PlusCircle, User } from "lucide-react";
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";

const BeneficiaryDetails = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formState, updateFormState, addBeneficiaryToTemp, updateBeneficiaryInTemp, removeBeneficiaryFromTemp, saveActivity } = useNGO();
  const { tempActivity } = formState;
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const genderOptions = [
    { value: "female", label: t("female") },
    { value: "male", label: t("male") },
    { value: "other", label: t("other") },
  ];

  const casteOptions = [
    { value: "general", label: t("general") },
    { value: "obc", label: t("obc") },
    { value: "scst", label: t("scst") },
    { value: "ews", label: t("ews") },
    { value: "other", label: t("other") },
  ];

  const documentTypeOptions = [
    { value: "aadhar", label: t("aadhar") },
    { value: "pan", label: t("pan") },
    { value: "dl", label: t("drivingLicense") },
    { value: "election", label: t("electionCard") },
  ];

  const handleAddBeneficiary = () => {
    addBeneficiaryToTemp();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, beneficiaryId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateBeneficiaryInTemp(beneficiaryId, { 
          photo: event.target?.result as string 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (beneficiaryId: string) => {
    fileInputRefs.current[beneficiaryId]?.click();
  };

  const handleSubmit = () => {
    // Validate that at least name and gender are filled for each beneficiary
    const isValid = tempActivity.beneficiaries.every(b => 
      b.firstName.trim() !== '' && b.gender
    );
    
    if (!isValid) {
      toast.error(t("fillRequiredFields"));
      return;
    }
    
    saveActivity();
    toast.success(t("activitySaved"));
    navigate("/dashboard");
  };

  const handleBack = () => {
    updateFormState({ currentStep: 2 });
    navigate("/activity/documents");
  };

  return (
    <div className="flex flex-col min-h-screen bg-ngo-light">
      <Header showBack={true} showProfile={true} step={3} totalSteps={3} />
      <main className="flex-1 p-6">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <ProgressBar currentStep={3} totalSteps={3} />
          
          <div className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-ngo-dark">{t("beneficiaryDetails")}</h2>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddBeneficiary}
                className="flex items-center"
              >
                <PlusCircle size={16} className="mr-2" />
                {t("add")}
              </Button>
            </div>
            
            {/* Beneficiary List */}
            <div className="space-y-4">
              {tempActivity.beneficiaries.length === 0 ? (
                <p className="text-center text-gray-500 py-4">{t("noBeneficiaries")}</p>
              ) : (
                tempActivity.beneficiaries.map((beneficiary: Beneficiary) => (
                  <Card key={beneficiary.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        {/* Photo Upload */}
                        <div className="sm:col-span-1">
                          <input
                            type="file"
                            ref={(el) => (fileInputRefs.current[beneficiary.id] = el)}
                            className="hidden"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, beneficiary.id)}
                          />
                          <div 
                            className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-ngo-green transition-colors flex flex-col items-center justify-center h-32"
                            onClick={() => triggerFileInput(beneficiary.id)}
                          >
                            {beneficiary.photo ? (
                              <img 
                                src={beneficiary.photo} 
                                alt="Beneficiary" 
                                className="h-full w-full object-cover rounded"
                              />
                            ) : (
                              <>
                                <User size={24} className="text-gray-400 mb-2" />
                                <span className="text-xs text-gray-500">
                                  {t("uploadPhoto")}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Basic Info */}
                        <div className="sm:col-span-3 space-y-4">
                          <div className="flex justify-end">
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeBeneficiaryFromTemp(beneficiary.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <Label htmlFor={`firstName-${beneficiary.id}`}>{t("firstName")} *</Label>
                              <Input
                                id={`firstName-${beneficiary.id}`}
                                value={beneficiary.firstName}
                                onChange={(e) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { firstName: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor={`middleName-${beneficiary.id}`}>{t("middleName")}</Label>
                              <Input
                                id={`middleName-${beneficiary.id}`}
                                value={beneficiary.middleName}
                                onChange={(e) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { middleName: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor={`lastName-${beneficiary.id}`}>{t("lastName")}</Label>
                              <Input
                                id={`lastName-${beneficiary.id}`}
                                value={beneficiary.lastName}
                                onChange={(e) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { lastName: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <Label htmlFor={`gender-${beneficiary.id}`}>{t("gender")} *</Label>
                              <Select
                                value={beneficiary.gender}
                                onValueChange={(value) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { 
                                    gender: value as "female" | "male" | "other" 
                                  })
                                }
                              >
                                <SelectTrigger id={`gender-${beneficiary.id}`}>
                                  <SelectValue placeholder={t("selectGender")} />
                                </SelectTrigger>
                                <SelectContent>
                                  {genderOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor={`caste-${beneficiary.id}`}>{t("caste")}</Label>
                              <Select
                                value={beneficiary.caste}
                                onValueChange={(value) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { 
                                    caste: value as "general" | "obc" | "scst" | "ews" | "other" 
                                  })
                                }
                              >
                                <SelectTrigger id={`caste-${beneficiary.id}`}>
                                  <SelectValue placeholder={t("selectCaste")} />
                                </SelectTrigger>
                                <SelectContent>
                                  {casteOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor={`age-${beneficiary.id}`}>{t("age")}</Label>
                              <Input
                                id={`age-${beneficiary.id}`}
                                type="number"
                                value={beneficiary.age}
                                onChange={(e) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { age: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor={`contactNo-${beneficiary.id}`}>{t("contactNo")}</Label>
                              <Input
                                id={`contactNo-${beneficiary.id}`}
                                value={beneficiary.contactNo}
                                onChange={(e) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { contactNo: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor={`address-${beneficiary.id}`}>{t("address")}</Label>
                              <Input
                                id={`address-${beneficiary.id}`}
                                value={beneficiary.address}
                                onChange={(e) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { address: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor={`documentType-${beneficiary.id}`}>{t("documentType")}</Label>
                              <Select
                                value={beneficiary.documentType}
                                onValueChange={(value) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { 
                                    documentType: value as "aadhar" | "pan" | "dl" | "election" 
                                  })
                                }
                              >
                                <SelectTrigger id={`documentType-${beneficiary.id}`}>
                                  <SelectValue placeholder={t("selectDocumentType")} />
                                </SelectTrigger>
                                <SelectContent>
                                  {documentTypeOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor={`documentNo-${beneficiary.id}`}>{t("documentNo")}</Label>
                              <Input
                                id={`documentNo-${beneficiary.id}`}
                                value={beneficiary.documentNo}
                                onChange={(e) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { documentNo: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor={`referenceName-${beneficiary.id}`}>{t("referenceName")}</Label>
                              <Input
                                id={`referenceName-${beneficiary.id}`}
                                value={beneficiary.referenceName}
                                onChange={(e) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { referenceName: e.target.value })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor={`referenceContact-${beneficiary.id}`}>{t("referenceContact")}</Label>
                              <Input
                                id={`referenceContact-${beneficiary.id}`}
                                value={beneficiary.referenceContact}
                                onChange={(e) => 
                                  updateBeneficiaryInTemp(beneficiary.id, { referenceContact: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor={`comment-${beneficiary.id}`}>{t("comment")}</Label>
                            <Textarea
                              id={`comment-${beneficiary.id}`}
                              value={beneficiary.comment}
                              onChange={(e) => 
                                updateBeneficiaryInTemp(beneficiary.id, { comment: e.target.value })
                              }
                              className="resize-none"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
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
                onClick={handleSubmit}
              >
                {t("saveActivity")}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BeneficiaryDetails;
