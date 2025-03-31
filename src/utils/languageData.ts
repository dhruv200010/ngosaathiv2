
type TranslationKey = string;
type Language = "en" | "hi" | "gu";

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

export const translations: Translations = {
  en: {
    // Common
    appName: "NGOSaathi",
    save: "Save",
    cancel: "Cancel",
    back: "Back",
    next: "Next",
    skip: "Skip",
    submit: "Submit",
    required: "Required",
    optional: "Optional",
    delete: "Delete",
    edit: "Edit",
    share: "Share",
    import: "Import",
    welcome: "Welcome",
    logout: "Logout",
    profile: "Profile",
    dashboard: "Dashboard",
    add: "Add",
    
    // Login Screen
    loginWithGoogle: "Login with Google",
    signUpText: "Sign up to start managing your NGO activities",
    
    // Setup NGO Screen
    setupNGO: "Set up your NGO",
    ngoName: "NGO Name",
    uploadPhoto: "Upload Photo",
    
    // NGO Details Screen
    setupDetails: "Setup",
    registrationNo: "Registration No.",
    registrationDate: "Registration Date",
    workingAreas: "Working Areas",
    contactNo: "Contact No.",
    email: "Email",
    website: "Website",
    accountType: "Type of Account",
    parent: "Parent",
    child: "Child",
    
    // Working Areas
    noPoverty: "No Poverty",
    zeroHunger: "Zero Hunger",
    goodHealth: "Good Health & Well-being",
    qualityEducation: "Quality Education",
    genderEquality: "Gender Equality",
    cleanWater: "Clean Water & Sanitation",
    cleanEnergy: "Affordable & Clean Energy",
    decentWork: "Decent Work & Economic Growth",
    innovation: "Industry, Innovation & Infrastructure",
    reducedInequality: "Reduced Inequality",
    sustainableCities: "Sustainable Cities & Communities",
    responsibleConsumption: "Responsible Consumption & Production",
    climateAction: "Climate Action",
    lifeBelowWater: "Life Below Water",
    lifeOnLand: "Life on Land",
    peace: "Peace, Justice & Strong Institutions",
    partnerships: "Partnerships for the Goals",
    
    // Dashboard
    addActivity: "Add Activity",
    editActivity: "Edit Activity",
    
    // Menu Items
    analytics: "Analytics",
    downloads: "Downloads",
    support: "Support",
    aboutUs: "About Us",
    changeLanguage: "Change Language",
    
    // Activity Report
    activityName: "Activity Name",
    location: "Location",
    getCurrentLocation: "Get Current Location",
    date: "Date",
    setCurrentDate: "Set Current Date",
    personOfContact: "Person of Contact",
    description: "Description",
    uploadMedia: "Upload Media",
    
    // Document Upload
    uploadDocuments: "Upload Documents",
    documentType: "Document Type",
    comment: "Comment",
    bill: "Bill",
    receipt: "Receipt",
    invoice: "Invoice",
    cashVoucher: "Cash Voucher",
    other: "Other",
    
    // Beneficiary Details
    beneficiaryDetails: "Beneficiary Details",
    addBeneficiary: "Add Beneficiary",
    firstName: "First Name",
    middleName: "Middle Name",
    lastName: "Last Name",
    gender: "Gender",
    female: "Female",
    male: "Male",
    caste: "Caste",
    general: "General",
    obc: "OBC",
    scst: "SC/ST",
    ews: "EWS",
    age: "Age",
    contactNumber: "Contact Number",
    address: "Address",
    documentType: "Document Type",
    documentNumber: "Document Number",
    aadhar: "Aadhar",
    pan: "PAN",
    dl: "Driving License",
    election: "Voter ID",
    referencePerson: "Reference Person",
    referenceContact: "Reference Contact",
    uploadPhoto: "Upload Photo",
    
    // Edit Activities
    activities: "Activities",
    noActivities: "No activities found",
    beneficiaries: "Beneficiaries",
    importActivity: "Import Activity",
    enterCode: "Enter Code",
    activityShared: "Activity shared successfully",
    activityImported: "Activity imported successfully",
    deleteConfirm: "Are you sure you want to delete this activity?",
    shareActivity: "Share Activity",
    activityCode: "Activity Code",
    
    // Progress
    step1: "Activity Details",
    step2: "Documents",
    step3: "Beneficiaries",
  },
  hi: {
    // Common
    appName: "एनजीओसाथी",
    save: "सहेजें",
    cancel: "रद्द करें",
    back: "वापस",
    next: "अगला",
    skip: "छोड़ें",
    submit: "जमा करें",
    required: "आवश्यक",
    optional: "वैकल्पिक",
    delete: "हटाएं",
    edit: "संपादित करें",
    share: "साझा करें",
    import: "आयात करें",
    welcome: "स्वागत है",
    logout: "लॉगआउट",
    profile: "प्रोफ़ाइल",
    dashboard: "डैशबोर्ड",
    add: "जोड़ें",
    
    // Login Screen
    loginWithGoogle: "Google से लॉगिन करें",
    signUpText: "अपनी एनजीओ गतिविधियों को प्रबंधित करने के लिए साइन अप करें",
    
    // Setup NGO Screen
    setupNGO: "अपना NGO सेट करें",
    ngoName: "NGO नाम",
    uploadPhoto: "फोटो अपलोड करें",
    
    // NGO Details Screen
    setupDetails: "सेटअप",
    registrationNo: "पंजीकरण संख्या",
    registrationDate: "पंजीकरण तिथि",
    workingAreas: "कार्य क्षेत्र",
    contactNo: "संपर्क नंबर",
    email: "ईमेल",
    website: "वेबसाइट",
    accountType: "खाते का प्रकार",
    parent: "पैरेंट",
    child: "चाइल्ड",
    
    // Working Areas
    noPoverty: "कोई गरीबी नहीं",
    zeroHunger: "शून्य भूख",
    goodHealth: "अच्छा स्वास्थ्य और कल्याण",
    qualityEducation: "गुणवत्तापूर्ण शिक्षा",
    genderEquality: "लैंगिक समानता",
    cleanWater: "स्वच्छ जल और स्वच्छता",
    cleanEnergy: "किफायती और स्वच्छ ऊर्जा",
    decentWork: "अच्छा काम और आर्थिक विकास",
    innovation: "उद्योग, नवाचार और बुनियादी ढांचा",
    reducedInequality: "कम असमानता",
    sustainableCities: "सतत शहर और समुदाय",
    responsibleConsumption: "जिम्मेदार खपत और उत्पादन",
    climateAction: "जलवायु कार्रवाई",
    lifeBelowWater: "पानी के नीचे जीवन",
    lifeOnLand: "भूमि पर जीवन",
    peace: "शांति, न्याय और मजबूत संस्थान",
    partnerships: "लक्ष्यों के लिए साझेदारी",
    
    // Dashboard
    addActivity: "गतिविधि जोड़ें",
    editActivity: "गतिविधि संपादित करें",
    
    // Menu Items
    analytics: "विश्लेषिकी",
    downloads: "डाउनलोड",
    support: "समर्थन",
    aboutUs: "हमारे बारे में",
    changeLanguage: "भाषा बदलें",
    
    // Activity Report
    activityName: "गतिविधि का नाम",
    location: "स्थान",
    getCurrentLocation: "वर्तमान स्थान प्राप्त करें",
    date: "तारीख",
    setCurrentDate: "वर्तमान तिथि सेट करें",
    personOfContact: "संपर्क व्यक्ति",
    description: "विवरण",
    uploadMedia: "मीडिया अपलोड करें",
    
    // Document Upload
    uploadDocuments: "दस्तावेज़ अपलोड करें",
    documentType: "दस्तावेज़ प्रकार",
    comment: "टिप्पणी",
    bill: "बिल",
    receipt: "रसीद",
    invoice: "चालान",
    cashVoucher: "नकद वाउचर",
    other: "अन्य",
    
    // Beneficiary Details
    beneficiaryDetails: "लाभार्थी विवरण",
    addBeneficiary: "लाभार्थी जोड़ें",
    firstName: "पहला नाम",
    middleName: "मध्य नाम",
    lastName: "अंतिम नाम",
    gender: "लिंग",
    female: "महिला",
    male: "पुरुष",
    caste: "जाति",
    general: "सामान्य",
    obc: "ओबीसी",
    scst: "एससी/एसटी",
    ews: "ईडब्ल्यूएस",
    age: "उम्र",
    contactNumber: "संपर्क नंबर",
    address: "पता",
    documentType: "दस्तावेज़ प्रकार",
    documentNumber: "दस्तावेज़ संख्या",
    aadhar: "आधार",
    pan: "पैन",
    dl: "ड्राइविंग लाइसेंस",
    election: "वोटर आईडी",
    referencePerson: "संदर्भ व्यक्ति",
    referenceContact: "संदर्भ संपर्क",
    uploadPhoto: "फोटो अपलोड करें",
    
    // Edit Activities
    activities: "गतिविधियां",
    noActivities: "कोई गतिविधि नहीं मिली",
    beneficiaries: "लाभार्थी",
    importActivity: "गतिविधि आयात करें",
    enterCode: "कोड दर्ज करें",
    activityShared: "गतिविधि सफलतापूर्वक साझा की गई",
    activityImported: "गतिविधि सफलतापूर्वक आयात की गई",
    deleteConfirm: "क्या आप वाकई इस गतिविधि को हटाना चाहते हैं?",
    shareActivity: "गतिविधि साझा करें",
    activityCode: "गतिविधि कोड",
    
    // Progress
    step1: "गतिविधि विवरण",
    step2: "दस्तावेज़",
    step3: "लाभार्थी",
  },
  gu: {
    // Common
    appName: "એનજીઓસાથી",
    save: "સાચવો",
    cancel: "રદ કરો",
    back: "પાછા",
    next: "આગળ",
    skip: "છોડો",
    submit: "સબમિટ કરો",
    required: "જરૂરી",
    optional: "વૈકલ્પિક",
    delete: "કાઢી નાખો",
    edit: "સંપાદિત કરો",
    share: "શેર કરો",
    import: "આયાત કરો",
    welcome: "સ્વાગત છે",
    logout: "લોગઆઉટ",
    profile: "પ્રોફાઇલ",
    dashboard: "ડેશબોર્ડ",
    add: "ઉમેરો",
    
    // Login Screen
    loginWithGoogle: "Google સાથે લોગિન કરો",
    signUpText: "તમારી NGO પ્રવૃત્તિઓનું સંચાલન કરવા માટે સાઇન અપ કરો",
    
    // Setup NGO Screen
    setupNGO: "તમારા NGO સેટ કરો",
    ngoName: "NGO નામ",
    uploadPhoto: "ફોટો અપલોડ કરો",
    
    // NGO Details Screen
    setupDetails: "સેટઅપ",
    registrationNo: "નોંધણી નંબર",
    registrationDate: "નોંધણી તારીખ",
    workingAreas: "કાર્યક્ષેત્ર",
    contactNo: "સંપર્ક નંબર",
    email: "ઈમેલ",
    website: "વેબસાઇટ",
    accountType: "ખાતાનો પ્રકાર",
    parent: "પેરેન્ટ",
    child: "ચાઈલ્ડ",
    
    // Working Areas
    noPoverty: "કોઈ ગરીબી નહીં",
    zeroHunger: "શૂન્ય ભૂખ",
    goodHealth: "સારું સ્વાસ્થ્ય અને સુખાકારી",
    qualityEducation: "ગુણવત્તાયુક્ત શિક્ષણ",
    genderEquality: "લિંગ સમાનતા",
    cleanWater: "સ્વચ્છ પાણી અને સ્વચ્છતા",
    cleanEnergy: "કિફાયતી અને સ્વચ્છ ઊર્જા",
    decentWork: "સારું કામ અને આર્થિક વૃદ્ધિ",
    innovation: "ઉદ્યોગ, નવીનતા અને માળખાગત સુવિધાઓ",
    reducedInequality: "ઘટાડેલી અસમાનતા",
    sustainableCities: "ટકાઉ શહેરો અને સમુદાયો",
    responsibleConsumption: "જવાબદાર વપરાશ અને ઉત્પાદન",
    climateAction: "આબોહવા પરિવર્તન",
    lifeBelowWater: "પાણી નીચેનું જીવન",
    lifeOnLand: "જમીન પર જીવન",
    peace: "શાંતિ, ન્યાય અને મજબૂત સંસ્થાઓ",
    partnerships: "લક્ષ્યો માટે ભાગીદારી",
    
    // Dashboard
    addActivity: "પ્રવૃત્તિ ઉમેરો",
    editActivity: "પ્રવૃત્તિ સંપાદિત કરો",
    
    // Menu Items
    analytics: "એનાલિટિક્સ",
    downloads: "ડાઉનલોડ્સ",
    support: "સપોર્ટ",
    aboutUs: "અમારા વિશે",
    changeLanguage: "ભાષા બદલો",
    
    // Activity Report
    activityName: "પ્રવૃત્તિનું નામ",
    location: "સ્થળ",
    getCurrentLocation: "વર્તમાન સ્થાન મેળવો",
    date: "તારીખ",
    setCurrentDate: "વર્તમાન તારીખ સેટ કરો",
    personOfContact: "સંપર્ક વ્યક્તિ",
    description: "વર્ણન",
    uploadMedia: "મીડિયા અપલોડ કરો",
    
    // Document Upload
    uploadDocuments: "દસ્તાવેજો અપલોડ કરો",
    documentType: "દસ્તાવેજનો પ્રકાર",
    comment: "ટિપ્પણી",
    bill: "બિલ",
    receipt: "રસીદ",
    invoice: "ઇનવોઇસ",
    cashVoucher: "રોકડ વાઉચર",
    other: "અન્ય",
    
    // Beneficiary Details
    beneficiaryDetails: "લાભાર્થી વિગતો",
    addBeneficiary: "લાભાર્થી ઉમેરો",
    firstName: "પ્રથમ નામ",
    middleName: "મધ્ય નામ",
    lastName: "અંતિમ નામ",
    gender: "લિંગ",
    female: "સ્ત્રી",
    male: "પુરુષ",
    caste: "જાતિ",
    general: "સામાન્ય",
    obc: "ઓબીસી",
    scst: "એસસી/એસટી",
    ews: "ઇડબલ્યુએસ",
    age: "ઉંમર",
    contactNumber: "સંપર્ક નંબર",
    address: "સરનામું",
    documentType: "દસ્તાવેજનો પ્રકાર",
    documentNumber: "દસ્તાવેજ નંબર",
    aadhar: "આધાર",
    pan: "પાન",
    dl: "ડ્રાઇવિંગ લાઇસન્સ",
    election: "મતદાર ID",
    referencePerson: "સંદર્ભ વ્યક્તિ",
    referenceContact: "સંદર્ભ સંપર્ક",
    uploadPhoto: "ફોટો અપલોડ કરો",
    
    // Edit Activities
    activities: "પ્રવૃત્તિઓ",
    noActivities: "કોઈ પ્રવૃત્તિઓ મળી નથી",
    beneficiaries: "લાભાર્થીઓ",
    importActivity: "પ્રવૃત્તિ આયાત કરો",
    enterCode: "કોડ દાખલ કરો",
    activityShared: "પ્રવૃત્તિ સફળતાપૂર્વક શેર કરી",
    activityImported: "પ્રવૃત્તિ સફળતાપૂર્વક આયાત કરી",
    deleteConfirm: "શું તમે ખરેખર આ પ્રવૃત્તિ કાઢી નાખવા માંગો છો?",
    shareActivity: "પ્રવૃત્તિ શેર કરો",
    activityCode: "પ્રવૃત્તિ કોડ",
    
    // Progress
    step1: "પ્રવૃત્તિ વિગતો",
    step2: "દસ્તાવેજો",
    step3: "લાભાર્થીઓ",
  }
};

export type TranslationLanguage = keyof typeof translations;
