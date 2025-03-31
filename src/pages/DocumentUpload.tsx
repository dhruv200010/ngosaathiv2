
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO, Document } from "@/context/NGOContext";
import { File, PlusCircle, Trash2, Image } from "lucide-react";
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";

const DocumentUpload = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formState, updateFormState, addDocumentToTemp, updateDocumentInTemp, removeDocumentFromTemp, updateTempActivity } = useNGO();
  const { tempActivity } = formState;
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const mediaInputRef = useRef<HTMLInputElement | null>(null);

  const documentTypeOptions = [
    { value: "bill", label: t("bill") },
    { value: "receipt", label: t("receipt") },
    { value: "invoice", label: t("invoice") },
    { value: "cashVoucher", label: t("cashVoucher") },
    { value: "other", label: t("other") },
  ];

  const handleAddDocument = () => {
    addDocumentToTemp();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateDocumentInTemp(docId, { 
          file, 
          fileName: file.name 
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newMediaUrls = [...tempActivity.media];
      
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newMediaUrls.push(event.target.result as string);
            updateTempActivity({ media: newMediaUrls });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeMedia = (index: number) => {
    const newMedia = [...tempActivity.media];
    newMedia.splice(index, 1);
    updateTempActivity({ media: newMedia });
  };

  const triggerFileInput = (docId: string) => {
    fileInputRefs.current[docId]?.click();
  };

  const triggerMediaInput = () => {
    mediaInputRef.current?.click();
  };

  const handleNext = () => {
    updateFormState({ currentStep: 3 });
    navigate("/activity/beneficiaries");
  };

  const handleBack = () => {
    updateFormState({ currentStep: 1 });
    navigate("/activity/report");
  };

  return (
    <div className="flex flex-col min-h-screen bg-ngo-light">
      <Header showBack={true} showProfile={true} step={2} totalSteps={3} />
      <main className="flex-1 p-6">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <ProgressBar currentStep={2} totalSteps={3} />
          
          <div className="space-y-6 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-ngo-dark">{t("uploadDocuments")}</h2>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddDocument}
                className="flex items-center"
              >
                <PlusCircle size={16} className="mr-2" />
                {t("add")}
              </Button>
            </div>
            
            {/* Document List */}
            <div className="space-y-4">
              {tempActivity.documents.length === 0 ? (
                <p className="text-center text-gray-500 py-4">{t("noDocuments")}</p>
              ) : (
                tempActivity.documents.map((doc: Document) => (
                  <Card key={doc.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                        {/* Document File */}
                        <div className="sm:col-span-2">
                          <input
                            type="file"
                            ref={(el) => (fileInputRefs.current[doc.id] = el)}
                            className="hidden"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, doc.id)}
                          />
                          <div 
                            className="border border-gray-300 rounded-lg p-3 text-center cursor-pointer hover:border-ngo-green transition-colors flex flex-col items-center justify-center h-full"
                            onClick={() => triggerFileInput(doc.id)}
                          >
                            <File size={24} className="text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500 truncate w-full">
                              {doc.fileName || t("selectFile")}
                            </span>
                          </div>
                        </div>
                        
                        {/* Document Type */}
                        <div className="sm:col-span-2">
                          <Select
                            value={doc.type}
                            onValueChange={(value) => 
                              updateDocumentInTemp(doc.id, { 
                                type: value as "bill" | "receipt" | "invoice" | "cashVoucher" | "other"
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
                        
                        {/* Comment */}
                        <div className="sm:col-span-2">
                          <div className="flex items-center space-x-2 h-full">
                            <Input
                              placeholder={t("comment")}
                              value={doc.comment}
                              onChange={(e) => 
                                updateDocumentInTemp(doc.id, { comment: e.target.value })
                              }
                              className="flex-1"
                            />
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              onClick={() => removeDocumentFromTemp(doc.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Document Preview */}
                      {doc.fileName && (
                        <div className="mt-3 px-2">
                          <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                            <File size={18} className="text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700 truncate">{doc.fileName}</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            
            {/* Media Upload Section */}
            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-ngo-dark">{t("uploadMedia")}</h2>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={triggerMediaInput}
                  className="flex items-center"
                >
                  <Image size={16} className="mr-2" />
                  {t("add")}
                </Button>
                <input
                  type="file"
                  ref={mediaInputRef}
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={handleMediaUpload}
                  multiple
                />
              </div>
              
              {/* Media Preview */}
              {tempActivity.media.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {tempActivity.media.map((media, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                        <img 
                          src={media} 
                          alt={`Media ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeMedia(index)}
                      >
                        <Trash2 size={12} />
                      </Button>
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

export default DocumentUpload;
