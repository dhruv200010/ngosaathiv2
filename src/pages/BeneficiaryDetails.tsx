
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO, Beneficiary } from "@/context/NGOContext";
import { PlusCircle, Trash2, UserPlus, Upload, Plus, Image } from "lucide-react";
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";

type Document = {
  id: string;
  type: string;
  number: string;
  photo: string | null;
};

// Update Beneficiary interface to include documents array
const BeneficiaryDetails = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formState, saveActivity, addBeneficiaryToTemp, updateBeneficiaryInTemp, removeBeneficiaryFromTemp } = useNGO();
  const { tempActivity } = formState;
  const [beneficiaryDocs, setBeneficiaryDocs] = useState<Record<string, Document[]>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const docInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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
    { value: "dl", label: t("dl") },
    { value: "election", label: t("election") },
  ];

  const handleAddBeneficiary = () => {
    addBeneficiaryToTemp();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>, benId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateBeneficiaryInTemp(benId, { 
            photo: event.target.result as string 
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (benId: string) => {
    fileInputRefs.current[benId]?.click();
  };

  const triggerDocInput = (docId: string) => {
    docInputRefs.current[docId]?.click();
  };

  const handleSave = () => {
    // Validation
    const isValid = tempActivity.beneficiaries.every(ben => ben.firstName.trim() !== "");
    
    if (!isValid) {
      toast.error(t("firstNameRequired"));
      return;
    }
    
    saveActivity();
    navigate("/dashboard");
    toast.success(t("activitySaved"));
  };

  const handleBack = () => {
    navigate("/activity/documents");
  };

  const getBeneficiaryDisplayName = (ben: Beneficiary) => {
    if (!ben.firstName) return t("newBeneficiary");
    let name = ben.firstName;
    if (ben.middleName) name += " " + ben.middleName;
    if (ben.lastName) name += " " + ben.lastName;
    return name;
  };

  const addDocumentToBeneficiary = (benId: string) => {
    const currentDocs = beneficiaryDocs[benId] || [];
    const newDoc = {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      type: "aadhar",
      number: "",
      photo: null
    };
    
    setBeneficiaryDocs({
      ...beneficiaryDocs,
      [benId]: [...currentDocs, newDoc]
    });
  };

  const updateDocument = (benId: string, docId: string, updates: Partial<Document>) => {
    const currentDocs = beneficiaryDocs[benId] || [];
    const updatedDocs = currentDocs.map(doc => 
      doc.id === docId ? { ...doc, ...updates } : doc
    );
    
    setBeneficiaryDocs({
      ...beneficiaryDocs,
      [benId]: updatedDocs
    });
  };

  const handleDocPhotoChange = (e: React.ChangeEvent<HTMLInputElement>, benId: string, docId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateDocument(benId, docId, { 
            photo: event.target.result as string 
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeDocument = (benId: string, docId: string) => {
    const currentDocs = beneficiaryDocs[benId] || [];
    const filteredDocs = currentDocs.filter(doc => doc.id !== docId);
    
    setBeneficiaryDocs({
      ...beneficiaryDocs,
      [benId]: filteredDocs
    });
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
                <UserPlus size={16} className="mr-2" />
                {t("addBeneficiary")}
              </Button>
            </div>
            
            {/* Beneficiary List */}
            <div className="space-y-4">
              {tempActivity.beneficiaries.length === 0 ? (
                <p className="text-center text-gray-500 py-4">{t("noBeneficiaries")}</p>
              ) : (
                <Accordion type="multiple" className="w-full">
                  {tempActivity.beneficiaries.map((ben: Beneficiary, index: number) => (
                    <AccordionItem key={ben.id} value={ben.id} className="border rounded-lg mb-4 border-gray-200">
                      <AccordionTrigger className="px-4 py-2 hover:no-underline">
                        <div className="flex items-center space-x-3 text-left">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={ben.photo || undefined} />
                            <AvatarFallback className="bg-ngo-dark text-white text-xs">
                              {ben.firstName ? ben.firstName[0] : "B"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className="font-medium">
                              {getBeneficiaryDisplayName(ben)}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-4">
                          {/* Photo Upload */}
                          <div className="flex justify-center mb-4">
                            <div className="relative group">
                              <Avatar className="h-24 w-24 border-2 border-ngo-green">
                                <AvatarImage src={ben.photo || undefined} />
                                <AvatarFallback className="bg-ngo-dark text-white text-lg">
                                  {ben.firstName ? ben.firstName[0] : "B"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-black bg-opacity-50 rounded-full h-24 w-24 flex items-center justify-center">
                                  <input
                                    type="file"
                                    ref={(el) => (fileInputRefs.current[ben.id] = el)}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handlePhotoChange(e, ben.id)}
                                  />
                                  <Upload 
                                    className="h-6 w-6 text-white cursor-pointer" 
                                    onClick={() => triggerFileInput(ben.id)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Name Fields */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <Label>
                                {t("firstName")} <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                value={ben.firstName}
                                onChange={(e) => updateBeneficiaryInTemp(ben.id, { firstName: e.target.value })}
                                placeholder={t("firstName")}
                                required
                              />
                            </div>
                            <div>
                              <Label>{t("middleName")}</Label>
                              <Input
                                value={ben.middleName}
                                onChange={(e) => updateBeneficiaryInTemp(ben.id, { middleName: e.target.value })}
                                placeholder={t("middleName")}
                              />
                            </div>
                            <div>
                              <Label>{t("lastName")}</Label>
                              <Input
                                value={ben.lastName}
                                onChange={(e) => updateBeneficiaryInTemp(ben.id, { lastName: e.target.value })}
                                placeholder={t("lastName")}
                              />
                            </div>
                          </div>
                          
                          {/* Gender, Caste, Age */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <Label>{t("gender")}</Label>
                              <Select
                                value={ben.gender}
                                onValueChange={(value) => 
                                  updateBeneficiaryInTemp(ben.id, { 
                                    gender: value as "female" | "male" | "other" 
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={t("gender")} />
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
                              <Label>{t("caste")}</Label>
                              <Select
                                value={ben.caste}
                                onValueChange={(value) => 
                                  updateBeneficiaryInTemp(ben.id, { 
                                    caste: value as "general" | "obc" | "scst" | "ews" | "other" 
                                  })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder={t("caste")} />
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
                              <Label>{t("age")}</Label>
                              <Input
                                type="number"
                                value={ben.age}
                                onChange={(e) => updateBeneficiaryInTemp(ben.id, { age: e.target.value })}
                                placeholder={t("age")}
                              />
                            </div>
                          </div>
                          
                          {/* Contact and Address */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label>{t("contactNumber")}</Label>
                              <Input
                                value={ben.contactNo}
                                onChange={(e) => updateBeneficiaryInTemp(ben.id, { contactNo: e.target.value })}
                                placeholder={t("contactNumber")}
                              />
                            </div>
                            <div>
                              <Label>{t("comment")}</Label>
                              <Input
                                value={ben.comment}
                                onChange={(e) => updateBeneficiaryInTemp(ben.id, { comment: e.target.value })}
                                placeholder={t("comment")}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label>{t("address")}</Label>
                            <Textarea
                              value={ben.address}
                              onChange={(e) => updateBeneficiaryInTemp(ben.id, { address: e.target.value })}
                              placeholder={t("address")}
                            />
                          </div>
                          
                          {/* Documents Section */}
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <Label className="text-base font-medium">{t("documents")}</Label>
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => addDocumentToBeneficiary(ben.id)}
                                className="flex items-center"
                              >
                                <Plus size={14} className="mr-1" />
                                {t("addDocument")}
                              </Button>
                            </div>
                            
                            {/* Default Document */}
                            <Card className="border border-gray-200">
                              <CardContent className="p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div>
                                    <Label>{t("documentType")}</Label>
                                    <Select
                                      value={ben.documentType}
                                      onValueChange={(value) => 
                                        updateBeneficiaryInTemp(ben.id, { 
                                          documentType: value as "aadhar" | "pan" | "dl" | "election" 
                                        })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder={t("documentType")} />
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
                                    <Label>{t("documentNumber")}</Label>
                                    <Input
                                      value={ben.documentNo}
                                      onChange={(e) => updateBeneficiaryInTemp(ben.id, { documentNo: e.target.value })}
                                      placeholder={t("documentNumber")}
                                    />
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            {/* Additional Documents */}
                            {(beneficiaryDocs[ben.id] || []).map((doc) => (
                              <Card key={doc.id} className="border border-gray-200">
                                <CardContent className="p-4">
                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                      <Label>{t("documentType")}</Label>
                                      <Select
                                        value={doc.type}
                                        onValueChange={(value) => updateDocument(ben.id, doc.id, { type: value })}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder={t("documentType")} />
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
                                      <Label>{t("documentNumber")}</Label>
                                      <Input
                                        value={doc.number}
                                        onChange={(e) => updateDocument(ben.id, doc.id, { number: e.target.value })}
                                        placeholder={t("documentNumber")}
                                      />
                                    </div>
                                    <div className="relative">
                                      <Label>{t("documentPhoto")}</Label>
                                      <div 
                                        className="border border-dashed border-gray-300 rounded-lg p-2 h-10 flex items-center justify-center cursor-pointer hover:border-ngo-green"
                                        onClick={() => triggerDocInput(doc.id)}
                                      >
                                        {doc.photo ? (
                                          <div className="flex items-center">
                                            <div className="w-6 h-6 mr-2 overflow-hidden rounded">
                                              <img src={doc.photo} alt="Doc" className="w-full h-full object-cover"/>
                                            </div>
                                            <span className="text-xs truncate">{t("photoUploaded")}</span>
                                          </div>
                                        ) : (
                                          <div className="flex items-center">
                                            <Image size={14} className="mr-1 text-gray-400" />
                                            <span className="text-xs text-gray-500">{t("uploadPhoto")}</span>
                                          </div>
                                        )}
                                      </div>
                                      <input
                                        type="file"
                                        ref={(el) => (docInputRefs.current[doc.id] = el)}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => handleDocPhotoChange(e, ben.id, doc.id)}
                                      />
                                      <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="icon"
                                        className="absolute top-0 right-0 text-red-500 h-6 w-6"
                                        onClick={() => removeDocument(ben.id, doc.id)}
                                      >
                                        <Trash2 size={14} />
                                      </Button>
                                    </div>
                                  </div>
                                  
                                  {/* Document Photo Preview */}
                                  {doc.photo && (
                                    <div className="mt-2">
                                      <div className="relative w-24 h-24 mx-auto">
                                        <img 
                                          src={doc.photo} 
                                          alt="Document" 
                                          className="w-full h-full object-cover rounded-md border border-gray-200" 
                                        />
                                      </div>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                          
                          {/* Reference */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label>{t("referencePerson")}</Label>
                              <Input
                                value={ben.referenceName}
                                onChange={(e) => updateBeneficiaryInTemp(ben.id, { referenceName: e.target.value })}
                                placeholder={t("referencePerson")}
                              />
                            </div>
                            <div>
                              <Label>{t("referenceContact")}</Label>
                              <Input
                                value={ben.referenceContact}
                                onChange={(e) => updateBeneficiaryInTemp(ben.id, { referenceContact: e.target.value })}
                                placeholder={t("referenceContact")}
                              />
                            </div>
                          </div>
                          
                          {/* Remove Button */}
                          <div className="flex justify-end">
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                              onClick={() => removeBeneficiaryFromTemp(ben.id)}
                            >
                              <Trash2 size={14} className="mr-1" />
                              {t("remove")}
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
                onClick={handleSave}
              >
                {t("save")}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BeneficiaryDetails;
