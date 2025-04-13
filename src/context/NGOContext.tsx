import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/lib/toast";
import { 
  STORAGE_KEYS, 
  saveToLocalStorage, 
  getFromLocalStorage, 
  generateUniqueId, 
  getDefaultNGOProfile,
  getDefaultActivity,
  getDefaultDocument,
  getDefaultBeneficiary
} from "@/utils/localStorage";
import { generateSecureCode, validateSecureCode } from "@/utils/codeGenerator";

// Types
export interface NGOProfile {
  ngoName: string;
  photo: string | null;
  registrationNo: string;
  registrationDate: string;
  workingAreas: string[];
  contactNo: string;
  email: string;
  website: string;
  accountType: "parent" | "child";
}

export interface ContactPerson {
  name: string;
  contactNo: string;
}

export interface Document {
  id: string;
  file: File | null;
  fileName: string;
  type: "bill" | "receipt" | "invoice" | "cashVoucher" | "agenda" | "resolution" | "other";
  comment: string;
  preview?: string; // Added preview field for document preview
}

export interface Beneficiary {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: "female" | "male" | "other";
  caste: "general" | "obc" | "scst" | "ews" | "other";
  age: string;
  comment: string;
  contactNo: string;
  alternateNo: string;
  address: string;
  state: string;
  district: string;
  tehsil: string;
  documentType: "aadhar" | "pan" | "dl" | "election";
  documentNo: string;
  referenceName: string;
  referenceContact: string;
  photo: string | null;
}

export interface Activity {
  id: string;
  name: string;
  location: string;
  date: string;
  contactPerson: ContactPerson;
  description: string;
  media: string[];
  documents: Document[];
  beneficiaries: Beneficiary[];
  shareCode: string;
}

export interface DownloadedFile {
  id: string;
  fileName: string;
  fileType: string;
  activityId: string;
  activityName: string;
  downloadDate: string;
  fileUrl?: string; // In a real app, this would be a URL to the file
}

export interface FormState {
  currentStep: number;
  editingActivityId: string | null;
  tempActivity: Activity;
}

interface NGOContextType {
  profile: NGOProfile;
  activities: Activity[];
  formState: FormState;
  downloadedFiles: DownloadedFile[];
  setProfile: (profile: NGOProfile) => void;
  updateProfile: (updates: Partial<NGOProfile>) => void;
  setActivities: (activities: Activity[]) => void;
  addActivity: (activity: Activity) => void;
  updateActivity: (id: string, updates: Partial<Activity>) => void;
  deleteActivity: (id: string) => void;
  resetFormState: () => void;
  startNewActivity: () => void;
  startEditingActivity: (id: string) => void;
  updateFormState: (updates: Partial<FormState>) => void;
  updateTempActivity: (updates: Partial<Activity>) => void;
  addDocumentToTemp: () => void;
  updateDocumentInTemp: (id: string, updates: Partial<Document>) => void;
  removeDocumentFromTemp: (id: string) => void;
  addBeneficiaryToTemp: () => void;
  updateBeneficiaryInTemp: (id: string, updates: Partial<Beneficiary>) => void;
  removeBeneficiaryFromTemp: (id: string) => void;
  saveActivity: () => void;
  getActivityByCode: (code: string) => Activity | null;
  generateShareCodeForActivity: (id: string) => string;
  addDownloadedFile: (file: Omit<DownloadedFile, 'id'>) => void;
  removeDownloadedFile: (id: string) => void;
  clearAllDownloadedFiles: () => void;
}

const NGOContext = createContext<NGOContextType | undefined>(undefined);

interface NGOProviderProps {
  children: ReactNode;
}

export const NGOProvider: React.FC<NGOProviderProps> = ({ children }) => {
  const [profile, setProfileState] = useState<NGOProfile>(
    () => getFromLocalStorage<NGOProfile>(STORAGE_KEYS.PROFILE, getDefaultNGOProfile())
  );
  
  const [activities, setActivitiesState] = useState<Activity[]>(
    () => getFromLocalStorage<Activity[]>(STORAGE_KEYS.ACTIVITIES, [])
  );
  
  const [formState, setFormState] = useState<FormState>({
    currentStep: 1,
    editingActivityId: null,
    tempActivity: getDefaultActivity(),
  });

  const [downloadedFiles, setDownloadedFiles] = useState<DownloadedFile[]>(
    () => {
      const files = getFromLocalStorage<DownloadedFile[]>(STORAGE_KEYS.DOWNLOADED_FILES, []);
      console.log("Initializing downloadedFiles state:", files);
      return Array.isArray(files) ? files : [];
    }
  );

  useEffect(() => {
    console.log("downloadedFiles updated:", downloadedFiles);
  }, [downloadedFiles]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.ACTIVITIES, activities);
  }, [activities]);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.DOWNLOADED_FILES, downloadedFiles);
  }, [downloadedFiles]);

  const setProfile = (newProfile: NGOProfile) => {
    setProfileState(newProfile);
  };

  const updateProfile = (updates: Partial<NGOProfile>) => {
    setProfileState(prev => ({ ...prev, ...updates }));
  };

  const setActivities = (newActivities: Activity[]) => {
    setActivitiesState(newActivities);
  };

  const addActivity = (activity: Activity) => {
    setActivitiesState(prev => [...prev, activity]);
  };

  const updateActivity = (id: string, updates: Partial<Activity>) => {
    setActivitiesState(prev => 
      prev.map(activity => 
        activity.id === id ? { ...activity, ...updates } : activity
      )
    );
  };

  const deleteActivity = (id: string) => {
    setActivitiesState(prev => prev.filter(activity => activity.id !== id));
    toast.success("Activity deleted successfully");
  };

  const resetFormState = () => {
    setFormState({
      currentStep: 1,
      editingActivityId: null,
      tempActivity: getDefaultActivity(),
    });
  };

  const startNewActivity = () => {
    resetFormState();
  };

  const startEditingActivity = (id: string) => {
    const activity = activities.find(a => a.id === id);
    if (activity) {
      setFormState({
        currentStep: 1,
        editingActivityId: id,
        tempActivity: { ...activity },
      });
    }
  };

  const updateFormState = (updates: Partial<FormState>) => {
    setFormState(prev => ({ ...prev, ...updates }));
  };

  const updateTempActivity = (updates: Partial<Activity>) => {
    setFormState(prev => ({
      ...prev,
      tempActivity: { ...prev.tempActivity, ...updates },
    }));
  };

  const addDocumentToTemp = () => {
    const newDocument = getDefaultDocument();
    setFormState(prev => ({
      ...prev,
      tempActivity: {
        ...prev.tempActivity,
        documents: [...prev.tempActivity.documents, newDocument],
      },
    }));
  };

  const updateDocumentInTemp = (id: string, updates: Partial<Document>) => {
    setFormState(prev => ({
      ...prev,
      tempActivity: {
        ...prev.tempActivity,
        documents: prev.tempActivity.documents.map(doc => 
          doc.id === id ? { ...doc, ...updates } : doc
        ),
      },
    }));
  };

  const removeDocumentFromTemp = (id: string) => {
    setFormState(prev => ({
      ...prev,
      tempActivity: {
        ...prev.tempActivity,
        documents: prev.tempActivity.documents.filter(doc => doc.id !== id),
      },
    }));
  };

  const addBeneficiaryToTemp = () => {
    const newBeneficiary = getDefaultBeneficiary();
    setFormState(prev => ({
      ...prev,
      tempActivity: {
        ...prev.tempActivity,
        beneficiaries: [...prev.tempActivity.beneficiaries, newBeneficiary],
      },
    }));
  };

  const updateBeneficiaryInTemp = (id: string, updates: Partial<Beneficiary>) => {
    setFormState(prev => ({
      ...prev,
      tempActivity: {
        ...prev.tempActivity,
        beneficiaries: prev.tempActivity.beneficiaries.map(ben => 
          ben.id === id ? { ...ben, ...updates } : ben
        ),
      },
    }));
  };

  const removeBeneficiaryFromTemp = (id: string) => {
    setFormState(prev => ({
      ...prev,
      tempActivity: {
        ...prev.tempActivity,
        beneficiaries: prev.tempActivity.beneficiaries.filter(ben => ben.id !== id),
      },
    }));
  };

  const saveActivity = () => {
    const { tempActivity, editingActivityId } = formState;
    
    if (!tempActivity.shareCode) {
      tempActivity.shareCode = generateSecureCode();
    }

    if (editingActivityId) {
      updateActivity(editingActivityId, tempActivity);
      toast.success("Activity updated successfully");
    } else {
      addActivity(tempActivity);
      toast.success("Activity added successfully");
    }
    
    resetFormState();
  };

  const getActivityByCode = (code: string): Activity | null => {
    if (!validateSecureCode(code)) {
      return null;
    }
    
    return activities.find(activity => activity.shareCode === code) || null;
  };

  const generateShareCodeForActivity = (id: string): string => {
    const activity = activities.find(a => a.id === id);
    if (!activity) return "";
    
    if (!activity.shareCode) {
      const newCode = generateSecureCode();
      updateActivity(id, { shareCode: newCode });
      return newCode;
    }
    
    return activity.shareCode;
  };

  const addDownloadedFile = (file: Omit<DownloadedFile, 'id'>) => {
    const newFile: DownloadedFile = {
      ...file,
      id: generateUniqueId(),
    };
    console.log("Adding downloaded file:", newFile);
    setDownloadedFiles(prev => {
      const updatedFiles = [newFile, ...prev];
      console.log("Updated downloadedFiles:", updatedFiles);
      saveToLocalStorage(STORAGE_KEYS.DOWNLOADED_FILES, updatedFiles);
      return updatedFiles;
    });
  };

  const removeDownloadedFile = (id: string) => {
    console.log("Removing downloaded file with id:", id);
    setDownloadedFiles(prev => {
      const updatedFiles = prev.filter(file => file.id !== id);
      console.log("Updated downloadedFiles after removal:", updatedFiles);
      return updatedFiles;
    });
  };

  const clearAllDownloadedFiles = () => {
    setDownloadedFiles([]);
    saveToLocalStorage(STORAGE_KEYS.DOWNLOADED_FILES, []);
    console.log("All downloaded files cleared");
  };

  return (
    <NGOContext.Provider
      value={{
        profile,
        activities,
        formState,
        downloadedFiles,
        setProfile,
        updateProfile,
        setActivities,
        addActivity,
        updateActivity,
        deleteActivity,
        resetFormState,
        startNewActivity,
        startEditingActivity,
        updateFormState,
        updateTempActivity,
        addDocumentToTemp,
        updateDocumentInTemp,
        removeDocumentFromTemp,
        addBeneficiaryToTemp,
        updateBeneficiaryInTemp,
        removeBeneficiaryFromTemp,
        saveActivity,
        getActivityByCode,
        generateShareCodeForActivity,
        addDownloadedFile,
        removeDownloadedFile,
        clearAllDownloadedFiles,
      }}
    >
      {children}
    </NGOContext.Provider>
  );
};

export const useNGO = () => {
  const context = useContext(NGOContext);
  if (context === undefined) {
    throw new Error("useNGO must be used within an NGOProvider");
  }
  return context;
};
