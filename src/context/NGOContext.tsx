
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";
import { 
  STORAGE_KEYS, 
  saveToLocalStorage, 
  getFromLocalStorage, 
  generateUniqueId, 
  generateShareCode,
  getDefaultNGOProfile,
  getDefaultActivity,
  getDefaultDocument,
  getDefaultBeneficiary
} from "@/utils/localStorage";

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
  type: "bill" | "receipt" | "invoice" | "cashVoucher" | "other";
  comment: string;
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
  address: string;
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

export interface FormState {
  currentStep: number;
  editingActivityId: string | null;
  tempActivity: Activity;
}

interface NGOContextType {
  profile: NGOProfile;
  activities: Activity[];
  formState: FormState;
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

  // Save profile to localStorage when it changes
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  // Save activities to localStorage when they change
  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.ACTIVITIES, activities);
  }, [activities]);

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
    
    // Generate share code if it doesn't exist
    if (!tempActivity.shareCode) {
      tempActivity.shareCode = generateShareCode();
    }

    if (editingActivityId) {
      // Update existing activity
      updateActivity(editingActivityId, tempActivity);
      toast.success("Activity updated successfully");
    } else {
      // Add new activity
      addActivity(tempActivity);
      toast.success("Activity added successfully");
    }
    
    // Reset form state
    resetFormState();
  };

  const getActivityByCode = (code: string): Activity | null => {
    return activities.find(activity => activity.shareCode === code) || null;
  };

  const generateShareCodeForActivity = (id: string): string => {
    const activity = activities.find(a => a.id === id);
    if (!activity) return "";
    
    if (!activity.shareCode) {
      const newCode = generateShareCode();
      updateActivity(id, { shareCode: newCode });
      return newCode;
    }
    
    return activity.shareCode;
  };

  return (
    <NGOContext.Provider
      value={{
        profile,
        activities,
        formState,
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
