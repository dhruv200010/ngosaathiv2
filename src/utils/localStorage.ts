
import { Activity, Beneficiary, Document, NGOProfile } from "@/context/NGOContext";

const STORAGE_PREFIX = "ngo_saathi_";

export const STORAGE_KEYS = {
  PROFILE: "ngo_profile",
  ACTIVITIES: "ngo_activities",
  LANGUAGE: "ngo_language",
  TEMP_ACTIVITY: "ngo_temp_activity",
  DOWNLOADED_FILES: "ngo_downloaded_files",
};

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    console.log(`Saving to localStorage: ${key}`, data); // Debug log
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

export const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    const parsedItem = item ? JSON.parse(item) : defaultValue;
    console.log(`Getting from localStorage: ${key}`, parsedItem); // Debug log
    return parsedItem;
  } catch (error) {
    console.error("Error getting from localStorage:", error);
    return defaultValue;
  }
};

export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const generateShareCode = (): string => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export const getDefaultNGOProfile = (): NGOProfile => {
  return {
    ngoName: "",
    photo: null,
    registrationNo: "",
    registrationDate: "",
    workingAreas: [],
    contactNo: "",
    email: "",
    website: "",
    accountType: "parent",
  };
};

export const getDefaultActivity = (): Activity => {
  return {
    id: generateUniqueId(),
    name: "",
    location: "",
    date: "",
    contactPerson: {
      name: "",
      contactNo: "",
    },
    description: "",
    media: [],
    documents: [],
    beneficiaries: [],
    shareCode: "",
  };
};

export const getDefaultDocument = (): Document => {
  return {
    id: generateUniqueId(),
    file: null,
    fileName: "",
    type: "other",
    comment: "",
  };
};

export const getDefaultBeneficiary = (): Beneficiary => {
  return {
    id: generateUniqueId(),
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "female",
    caste: "general",
    age: "",
    comment: "",
    contactNo: "",
    address: "",
    documentType: "aadhar",
    documentNo: "",
    referenceName: "",
    referenceContact: "",
    photo: null,
  };
};
