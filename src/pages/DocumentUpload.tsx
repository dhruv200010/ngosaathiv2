
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
import { File, PlusCircle, Trash2 } from "lucide-react";
import { toast } from "@/lib/toast";
import { Card, CardContent } from "@/components/ui/card";

const DocumentUpload = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { formState, updateFormState, addDocumentToTemp, updateDocumentInTemp, removeDocumentFromTemp } = useNGO();
  const { tempActivity } = formState;
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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
          fileName: file.name,
          preview: event.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (docId: string) => {
    fileInputRefs.current[docId]?.click();
  };

  const handleNext = () => {
    updateFormState({ currentStep: 3 });
    navigate("/activity/beneficiaries");
  };

  const handleBack = () => {
    updateFormState({ currentStep: 1 });
    navigate("/activity/report");
  };

  // Function to render appropriate preview based on file type
  const renderFilePreview = (doc: Document) => {
    if (!doc.preview) return null;
    
    const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(doc.fileName);
    
    if (isImage) {
      return (
        <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
          <img src={doc.preview} alt={doc.fileName} className="w-full h-auto max-h-48 object-contain" />
        </div>
      );
    } else {
      return (
        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center">
          <File size={24} className="text-gray-500 mr-2" />
          <span className="text-sm text-gray-700 truncate flex-1">{doc.fileName}</span>
          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
            {doc.fileName.split('.').pop()?.toUpperCase()}
          </span>
        </div>
      );
    }
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
                      {doc.fileName && renderFilePreview(doc)}
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
