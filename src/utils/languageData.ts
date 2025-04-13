type TranslationKey = string;
export type TranslationLanguage = "en" | "hi" | "gu";

type Translations = {
  [key in TranslationLanguage]: {
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
    activitiesLabel: "Activities",

    // Gender
    Female: "Female",
    Male: "Male",
    OtherGender: "Other",

    // Document Types
    Bill: "Bill",
    Receipt: "Receipt",
    Invoice: "Invoice",
    CashVoucher: "Cash Voucher",
    OtherDocument: "Other",
    
    // Login Screen
    loginWithGoogle: "Login with Google",
    signUpText: "Sign up to start managing your NGO activities",
    
    // Setup NGO Screen
    setupNGO: "Set Up Your NGO",
    ngoName: "NGO Name",
    uploadPhoto: "Upload Photo",
    
    // NGO Details Screen
    setupDetails: "Setup Details",
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
    createNewActivity: "Create a new activity",
    manageActivities: "Manage your activities",
    importActivity: "Import Activity",
    importFromOtherUser: "Import from other user",
    recentActivities: "Recent Activities",
    noRecentActivities: "No recent activities",
    addYourFirstActivity: "Add your first activity",
    viewAllActivities: "View All Activities",
    
    // Menu Items
    analytics: "Analytics",
    downloads: "Downloads",
    support: "Support",
    aboutUs: "About Us",
    changeLanguage: "Change Language",
    noDataAvailable: "No data available",
    
    // Analytics Dashboard
    totalActivities: "Total Activities",
    totalBeneficiaries: "Total Beneficiaries",
    totalDocuments: "Total Documents",
    uniqueLocations: "Unique Locations",
    activitiesByMonth: "Activities by Month",
    beneficiariesByGender: "Beneficiaries by Gender",
    beneficiariesByAge: "Beneficiaries by Age",
    documentsByType: "Documents by Type",
    
    // Activity Report
    activityName: "Activity Name",
    location: "Location",
    getCurrentLocation: "Get Current Location",
    date: "Date",
    selectDate: "Select date",
    setCurrentDate: "Set Current Date",
    personOfContact: "Person of Contact",
    description: "Description",
    uploadMedia: "Upload Media",
    dragAndDropMedia: "Click or drag & drop to upload photos/videos",
    name: "Name",
    
    // Document Upload
    uploadDocuments: "Upload Documents",
    documentType: "Document Type",
    comment: "Comment",
    bill: "Bill",
    receipt: "Receipt",
    invoice: "Invoice",
    cashVoucher: "Cash Voucher",
    other: "Other",
    noDocuments: "No documents added yet",
    selectFile: "Select file",
    
    // Beneficiary Details
    beneficiaryDetails: "Beneficiary Details",
    addBeneficiary: "Add Beneficiary",
    newBeneficiary: "New Beneficiary",
    firstNameRequired: "First name is required for all beneficiaries",
    noBeneficiaries: "No beneficiaries added yet",
    remove: "Remove",
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
    alternateNo: "Alternate No.",
    address: "Address",
    documentNumber: "Document Number",
    aadhar: "Aadhar",
    pan: "PAN",
    dl: "Driving License",
    election: "Voter ID",
    referencePerson: "Reference Person",
    referenceContact: "Reference Contact",
    
    // Edit Activities
    noActivities: "No Activities Found",
    activities: "Activities",
    enterCode: "Enter Code",
    activityShared: "Activity shared successfully",
    activityImported: "Activity imported successfully",
    deleteConfirm: "Are you sure you want to delete this activity?",
    deleteActivityDescription: "This action cannot be undone. All data associated with this activity will be permanently deleted.",
    shareActivity: "Share Activity",
    shareActivityDescription: "Share this activity with other users using the code below:",
    activityCode: "Activity Code",
    enterCodeDescription: "Enter the code shared with you to import an activity:",
    copy: "Copy",
    close: "Close",
    activitySaved: "Activity Saved Successfully",
    reportDownloaded: "Report Downloaded Successfully",
    fileDownloaded: "File Downloaded Successfully",
    fileRemoved: "File Removed Successfully",
    fileAddedToDownloads: "File Added to Downloads Successfully",
    enterValidCode: "Please Enter a Valid Code",
    invalidCode: "Invalid Code. Please Check and Try Again",
    invalidCodeFormat: "Invalid Code Format. Please Check and Try Again",
    codeNotFound: "Code Not Found. Please Check and Try Again",
    codeExpired: "Code Has Expired. Please Contact Support",
    codeAlreadyUsed: "Code Has Already Been Used",
    codeLimitReached: "Code Usage Limit Reached",
    codeActivated: "Code Activated Successfully",
    codeDeactivated: "Code Deactivated Successfully",
    codeDeleted: "Code Deleted Successfully",
    codeUpdated: "Code Updated Successfully",
    codeCreated: "Code Created Successfully",
    codeCopied: "Code Copied to Clipboard",
    codePasted: "Code Pasted Successfully",
    codeValidated: "Code Validated Successfully",
    codeInvalidated: "Code Invalidated Successfully",
    codeReset: "Code Reset Successfully",
    codeRefreshed: "Code Refreshed Successfully",
    codeRevoked: "Code Revoked Successfully",
    codeSuspended: "Code Suspended Successfully",
    codeUnsuspended: "Code Unsuspended Successfully",
    codeBlocked: "Code Blocked Successfully",
    codeUnblocked: "Code Unblocked Successfully",
    codeLocked: "Code Locked Successfully",
    codeUnlocked: "Code Unlocked Successfully",
    codeEnabled: "Code Enabled Successfully",
    codeDisabled: "Code Disabled Successfully",
    codeArchived: "Code Archived Successfully",
    codeUnarchived: "Code Unarchived Successfully",
    codeRestored: "Code Restored Successfully",
    codeBackedUp: "Code Backed Up Successfully",
    codeRestoredFromBackup: "Code Restored from Backup Successfully",
    codeMigrated: "Code Migrated Successfully",
    codeUpgraded: "Code Upgraded Successfully",
    codeDowngraded: "Code Downgraded Successfully",
    codeOptimized: "Code Optimized Successfully",
    codeCompressed: "Code Compressed Successfully",
    codeDecompressed: "Code Decompressed Successfully",
    codeEncrypted: "Code Encrypted Successfully",
    codeDecrypted: "Code Decrypted Successfully",
    codeSigned: "Code Signed Successfully",
    codeVerified: "Code Verified Successfully",
    codeAuthenticated: "Code Authenticated Successfully",
    codeAuthorized: "Code Authorized Successfully",
    codeUnauthorized: "Code Unauthorized Successfully",
    codeForbidden: "Code Forbidden Successfully",
    codeAllowed: "Code Allowed Successfully",
    codeDenied: "Code Denied Successfully",
    codeApproved: "Code Approved Successfully",
    codeRejected: "Code Rejected Successfully",
    codePending: "Code Pending Successfully",
    codeProcessing: "Code Processing Successfully",
    codeQueued: "Code Queued Successfully",
    codeScheduled: "Code Scheduled Successfully",
    codeTriggered: "Code Triggered Successfully",
    codeExecuted: "Code Executed Successfully",
    codeCompleted: "Code Completed Successfully",
    codeFailed: "Code Failed Successfully",
    codeError: "Code Error Successfully",
    codeWarning: "Code Warning Successfully",
    codeInfo: "Code Info Successfully",
    codeDebug: "Code Debug Successfully",
    codeTrace: "Code Trace Successfully",
    codeLog: "Code Log Successfully",
    codeMonitor: "Code Monitor Successfully",
    codeAlert: "Code Alert Successfully",
    codeNotify: "Code Notify Successfully",
    codeMessage: "Code Message Successfully",
    codeSignal: "Code Signal Successfully",
    codeEvent: "Code Event Successfully",
    codeCallback: "Code Callback Successfully",
    codePromise: "Code Promise Successfully",
    codeAsync: "Code Async Successfully",
    codeSync: "Code Sync Successfully",
    codeStream: "Code Stream Successfully",
    codeBuffer: "Code Buffer Successfully",
    codeCache: "Code Cache Successfully",
    codeMemory: "Code Memory Successfully",
    codeStorage: "Code Storage Successfully",
    codeDatabase: "Code Database Successfully",
    codeTable: "Code Table Successfully",
    codeRecord: "Code Record Successfully",
    codeField: "Code Field Successfully",
    codeValue: "Code Value Successfully",
    codeKey: "Code Key Successfully",
    codeIndex: "Code Index Successfully",
    codeQuery: "Code Query Successfully",
    codeFilter: "Code Filter Successfully",
    codeSort: "Code Sort Successfully",
    codeGroup: "Code Group Successfully",
    codeJoin: "Code Join Successfully",
    codeUnion: "Code Union Successfully",
    codeIntersect: "Code Intersect Successfully",
    codeExcept: "Code Except Successfully",
    codeDistinct: "Code Distinct Successfully",
    codeUnique: "Code Unique Successfully",
    codeNull: "Code Null Successfully",
    codeNotNull: "Code Not Null Successfully",
    codeEmpty: "Code Empty Successfully",
    codeNotEmpty: "Code Not Empty Successfully",
    codeZero: "Code Zero Successfully",
    codeNonZero: "Code Non Zero Successfully",
    codePositive: "Code Positive Successfully",
    codeNegative: "Code Negative Successfully",
    codeEven: "Code Even Successfully",
    codeOdd: "Code Odd Successfully",
    codePrime: "Code Prime Successfully",
    codeComposite: "Code Composite Successfully",
    codePerfect: "Code Perfect Successfully",
    codeAbundant: "Code Abundant Successfully",
    codeDeficient: "Code Deficient Successfully",
    codeAmicable: "Code Amicable Successfully",
    codeSociable: "Code Sociable Successfully",
    codeFriendly: "Code Friendly Successfully",
    codeUnfriendly: "Code Unfriendly Successfully",
    codeHappy: "Code Happy Successfully",
    codeUnhappy: "Code Unhappy Successfully",
    codeLucky: "Code Lucky Successfully",
    codeUnlucky: "Code Unlucky Successfully",
    codeFortunate: "Code Fortunate Successfully",
    codeUnfortunate: "Code Unfortunate Successfully",
    codeBlessed: "Code Blessed Successfully",
    codeCursed: "Code Cursed Successfully",
    codeHoly: "Code Holy Successfully",
    codeUnholy: "Code Unholy Successfully",
    codeSacred: "Code Sacred Successfully",
    codeProfane: "Code Profane Successfully",
    codeDivine: "Code Divine Successfully",
    codeMortal: "Code Mortal Successfully",
    codeImmortal: "Code Immortal Successfully",
    codeEternal: "Code Eternal Successfully",
    codeTemporary: "Code Temporary Successfully",
    codePermanent: "Code Permanent Successfully",
    codeFixed: "Code Fixed Successfully",
    codeVariable: "Code Variable Successfully",
    codeConstant: "Code Constant Successfully",
    codeStatic: "Code Static Successfully",
    codeDynamic: "Code Dynamic Successfully",
    codeMutable: "Code Mutable Successfully",
    codeImmutable: "Code Immutable Successfully",
    codeVolatile: "Code Volatile Successfully",
    codeAtomic: "Code Atomic Successfully",
    codeThread: "Code Thread Successfully",
    codeProcess: "Code Process Successfully",
    codeTask: "Code Task Successfully",
    codeJob: "Code Job Successfully",
    codeWork: "Code Work Successfully",
    codeLabor: "Code Labor Successfully",
    codeEffort: "Code Effort Successfully",
    codeEnergy: "Code Energy Successfully",
    codePower: "Code Power Successfully",
    codeForce: "Code Force Successfully",
    codeStrength: "Code Strength Successfully",
    codeWeakness: "Code Weakness Successfully",
    codeHealth: "Code Health Successfully",
    codeSickness: "Code Sickness Successfully",
    codeLife: "Code Life Successfully",
    codeDeath: "Code Death Successfully",
    codeBirth: "Code Birth Successfully",
    codeGrowth: "Code Growth Successfully",
    codeDecay: "Code Decay Successfully",
    codeCreation: "Code Creation Successfully",
    codeDestruction: "Code Destruction Successfully",
    codeOrder: "Code Order Successfully",
    codeChaos: "Code Chaos Successfully",
    codeLight: "Code Light Successfully",
    codeDark: "Code Dark Successfully",
    codeDay: "Code Day Successfully",
    codeNight: "Code Night Successfully",
    codeSun: "Code Sun Successfully",
    codeMoon: "Code Moon Successfully",
    codeStar: "Code Star Successfully",
    codePlanet: "Code Planet Successfully",
    codeGalaxy: "Code Galaxy Successfully",
    codeUniverse: "Code Universe Successfully",
    codeSpace: "Code Space Successfully",
    codeTime: "Code Time Successfully",
    codeEternity: "Code Eternity Successfully",
    codeInfinity: "Code Infinity Successfully",
    codeOne: "Code One Successfully",
    codeTwo: "Code Two Successfully",
    codeThree: "Code Three Successfully",
    codeFour: "Code Four Successfully",
    codeFive: "Code Five Successfully",
    codeSix: "Code Six Successfully",
    codeSeven: "Code Seven Successfully",
    codeEight: "Code Eight Successfully",
    codeNine: "Code Nine Successfully",
    codeTen: "Code Ten Successfully",
    codeHundred: "Code Hundred Successfully",
    codeThousand: "Code Thousand Successfully",
    codeMillion: "Code Million Successfully",
    codeBillion: "Code Billion Successfully",
    codeTrillion: "Code Trillion Successfully",
    codeQuadrillion: "Code Quadrillion Successfully",
    codeQuintillion: "Code Quintillion Successfully",
    codeSextillion: "Code Sextillion Successfully",
    codeSeptillion: "Code Septillion Successfully",
    codeOctillion: "Code Octillion Successfully",
    codeNonillion: "Code Nonillion Successfully",
    codeDecillion: "Code Decillion Successfully",
    codeUndecillion: "Code Undecillion Successfully",
    codeDuodecillion: "Code Duodecillion Successfully",
    codeTredecillion: "Code Tredecillion Successfully",
    codeQuattuordecillion: "Code Quattuordecillion Successfully",
    codeQuindecillion: "Code Quindecillion Successfully",
    codeSexdecillion: "Code Sexdecillion Successfully",
    codeSeptendecillion: "Code Septendecillion Successfully",
    codeOctodecillion: "Code Octodecillion Successfully",
    codeNovemdecillion: "Code Novemdecillion Successfully",
    codeVigintillion: "Code Vigintillion Successfully",
    codeUnvigintillion: "Code Unvigintillion Successfully",
    codeDuovigintillion: "Code Duovigintillion Successfully",
    codeTrevigintillion: "Code Trevigintillion Successfully",
    codeQuattuorvigintillion: "Code Quattuorvigintillion Successfully",
    codeQuinvigintillion: "Code Quinvigintillion Successfully",
    codeSexvigintillion: "Code Sexvigintillion Successfully",
    codeSeptenvigintillion: "Code Septenvigintillion Successfully",
    codeOctovigintillion: "Code Octovigintillion Successfully",
    codeNovemvigintillion: "Code Novemvigintillion Successfully",
    codeTrigintillion: "Code Trigintillion Successfully",
    codeUntrigintillion: "Code Untrigintillion Successfully",
    codeDuotrigintillion: "Code Duotrigintillion Successfully",
    codeTretrigintillion: "Code Tretrigintillion Successfully",
    codeQuattuortrigintillion: "Code Quattuortrigintillion Successfully",
    codeQuintrigintillion: "Code Quintrigintillion Successfully",
    codeSextrigintillion: "Code Sextrigintillion Successfully",
    codeSeptentrigintillion: "Code Septentrigintillion Successfully",
    codeOctotrigintillion: "Code Octotrigintillion Successfully",
    codeNovemtrigintillion: "Code Novemtrigintillion Successfully",
    codeQuadragintillion: "Code Quadragintillion Successfully",
    codeUnquadragintillion: "Code Unquadragintillion Successfully",
    codeDuoquadragintillion: "Code Duoquadragintillion Successfully",
    codeTrequadragintillion: "Code Trequadragintillion Successfully",
    codeQuattuorquadragintillion: "Code Quattuorquadragintillion Successfully",
    codeQuinquadragintillion: "Code Quinquadragintillion Successfully",
    codeSexquadragintillion: "Code Sexquadragintillion Successfully",
    codeSeptenquadragintillion: "Code Septenquadragintillion Successfully",
    codeOctoquadragintillion: "Code Octoquadragintillion Successfully",
    codeNovemquadragintillion: "Code Novemquadragintillion Successfully",
    codeQuinquagintillion: "Code Quinquagintillion Successfully",
    codeUnquinquagintillion: "Code Unquinquagintillion Successfully",
    codeDuoquinquagintillion: "Code Duoquinquagintillion Successfully",
    codeTrequinquagintillion: "Code Trequinquagintillion Successfully",
    codeQuattuorquinquagintillion: "Code Quattuorquinquagintillion Successfully",
    codeQuinquinquagintillion: "Code Quinquinquagintillion Successfully",
    codeSexquinquagintillion: "Code Sexquinquagintillion Successfully",
    codeSeptenquinquagintillion: "Code Septenquinquagintillion Successfully",
    codeOctoquinquagintillion: "Code Octoquinquagintillion Successfully",
    codeNovemquinquagintillion: "Code Novemquinquagintillion Successfully",
    codeSexagintillion: "Code Sexagintillion Successfully",
    codeUnsexagintillion: "Code Unsexagintillion Successfully",
    codeDuosexagintillion: "Code Duosexagintillion Successfully",
    codeTresexagintillion: "Code Tresexagintillion Successfully",
    codeQuattuorsexagintillion: "Code Quattuorsexagintillion Successfully",
    codeQuinsexagintillion: "Code Quinsexagintillion Successfully",
    codeSexsexagintillion: "Code Sexsexagintillion Successfully",
    codeSeptensexagintillion: "Code Septensexagintillion Successfully",
    codeOctosexagintillion: "Code Octosexagintillion Successfully",
    codeNovemsexagintillion: "Code Novemsexagintillion Successfully",
    codeSeptuagintillion: "Code Septuagintillion Successfully",
    codeUnseptuagintillion: "Code Unseptuagintillion Successfully",
    codeDuoseptuagintillion: "Code Duoseptuagintillion Successfully",
    codeTreseptuagintillion: "Code Treseptuagintillion Successfully",
    codeQuattuorseptuagintillion: "Code Quattuorseptuagintillion Successfully",
    codeQuinseptuagintillion: "Code Quinseptuagintillion Successfully",
    codeSexseptuagintillion: "Code Sexseptuagintillion Successfully",
    codeSeptenseptuagintillion: "Code Septenseptuagintillion Successfully",
    codeOctoseptuagintillion: "Code Octoseptuagintillion Successfully",
    codeNovemseptuagintillion: "Code Novemseptuagintillion Successfully",
    codeOctogintillion: "Code Octogintillion Successfully",
    codeUnoctogintillion: "Code Unoctogintillion Successfully",
    codeDuooctogintillion: "Code Duooctogintillion Successfully",
    codeTrectogintillion: "Code Trectogintillion Successfully",
    codeQuattuoroctogintillion: "Code Quattuoroctogintillion Successfully",
    codeQuinoctogintillion: "Code Quinoctogintillion Successfully",
    codeSexoctogintillion: "Code Sexoctogintillion Successfully",
    codeSeptenoctogintillion: "Code Septenoctogintillion Successfully",
    codeOctooctogintillion: "Code Octooctogintillion Successfully",
    codeNovemoctogintillion: "Code Novemoctogintillion Successfully",
    codeNonagintillion: "Code Nonagintillion Successfully",
    codeUnnonagintillion: "Code Unnonagintillion Successfully",
    codeDuononagintillion: "Code Duononagintillion Successfully",
    codeTrenonagintillion: "Code Trenonagintillion Successfully",
    codeQuattuornonagintillion: "Code Quattuornonagintillion Successfully",
    codeQuinnonagintillion: "Code Quinnonagintillion Successfully",
    codeSexnonagintillion: "Code Sexnonagintillion Successfully",
    codeSeptennonagintillion: "Code Septennonagintillion Successfully",
    codeOctononagintillion: "Code Octonononagintillion Successfully",
    codeNovemnonagintillion: "Code Novemnonagintillion Successfully",
    codeCentillion: "Code Centillion Successfully",
    ngoNameRequired: "NGO name is required",
    activityNameRequired: "Activity name is required",
    dateRequired: "Date is required",
    fetchingLocation: "Fetching your current location...",
    locationFetched: "Current location fetched",
    locationError: "Error getting your location",
    geolocationNotSupported: "Geolocation is not supported in your browser",
    showMore: "Show more",
    showLess: "Show less",
    addFirstActivity: "Add your first activity",
    
    // Progress
    step1: "Activity Details",
    step2: "Documents",
    step3: "Beneficiaries",
  },
  hi: {
    // Common
    appName: "NGOSaathi",
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
    logout: "लॉग आउट",
    profile: "प्रोफ़ाइल",
    dashboard: "डैशबोर्ड",
    add: "जोड़ें",
    activitiesLabel: "गतिविधियां",

    // Gender
    Female: "महिला",
    Male: "पुरुष",
    OtherGender: "अन्य",

    // Document Types
    Bill: "बिल",
    Receipt: "रसीद",
    Invoice: "चालान",
    CashVoucher: "नकद वाउचर",
    OtherDocument: "अन्य",
    
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
    noPoverty: "कोई गरीबી नहीं",
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
    createNewActivity: "नई गतिविधि बनाएं",
    manageActivities: "अपनी गतिविधियों का प्रबंधन करें",
    importActivity: "गतिविधि आयात करें",
    importFromOtherUser: "अन्य उपयोगकर्ता से आयात करें",
    recentActivities: "हाल की गतिविधियां",
    noRecentActivities: "कोई हाल की गतिविधि नहीं",
    addYourFirstActivity: "अपनी पहली गतिविधि जोड़ें",
    viewAllActivities: "सभी गतिविधियां देखें",
    
    // Menu Items
    analytics: "विश्लेषिकी",
    downloads: "डाउनलोड",
    support: "समर्थन",
    aboutUs: "हमारे बारे में",
    changeLanguage: "भाषा बदलें",
    noDataAvailable: "कोई डेटा उपलब्ध नहीं है",
    
    // Analytics Dashboard
    totalActivities: "कुल गतिविधियां",
    totalBeneficiaries: "कुल लाभार्थी",
    totalDocuments: "कुल दस्तावेज़",
    uniqueLocations: "विशिष्ट स्थान",
    activitiesByMonth: "महीने के अनुसार गतिविधियां",
    beneficiariesByGender: "लिंग के अनुसार लाभार्थी",
    beneficiariesByAge: "उम्र के अनुसार लाभार्थी",
    documentsByType: "प्रकार के अनुसार दस्तावेज़",
    
    // Activity Report
    activityName: "गतिविधि का नाम",
    location: "स्थान",
    getCurrentLocation: "वर्तमान स्थान प्राप्त करें",
    date: "तारीख",
    selectDate: "तारीख चुनें",
    setCurrentDate: "वर्तमान तिथि सेट करें",
    personOfContact: "संपर्क व्यक्ति",
    description: "विवरण",
    uploadMedia: "मीडिया अपलोड करें",
    dragAndDropMedia: "फोटो/वीडियो अपलोड करने के लिए क्लिक करें या खींचें और छोड़ें",
    name: "नाम",
    
    // Document Upload
    uploadDocuments: "दस्तावेज़ अपलोड करें",
    documentType: "दस्तावेज़ प्रकार",
    comment: "टिप्पणी",
    bill: "बिल",
    receipt: "रसीद",
    invoice: "चालान",
    cashVoucher: "नकद वाउचर",
    other: "अन्य",
    noDocuments: "अभी तक कोई दस्तावेज़ नहीं जोड़ा गया",
    selectFile: "फ़ाइल चुनें",
    
    // Beneficiary Details
    beneficiaryDetails: "लाभार्थी विवरण",
    addBeneficiary: "लाभार्थी जोड़ें",
    newBeneficiary: "नया लाभार्थी",
    firstNameRequired: "सभी लाभार्थियों के लिए पहला नाम आवश्यक है",
    noBeneficiaries: "अभी तक कोई लाभार्थी नहीं जोड़ा गया",
    remove: "हटाएं",
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
    alternateNo: "वैकल्पिक नंबर",
    address: "पता",
    documentNumber: "दस्तावेज़ संख्या",
    aadhar: "आधार",
    pan: "पैन",
    dl: "ड्राइविंग लाइसेंस",
    election: "वोटर आईडी",
    referencePerson: "संदर्भ व्यक्ति",
    referenceContact: "संदर्भ संपर्क",
    
    // Edit Activities
    noActivities: "कोई गतिविधि नहीं मिली",
    activities: "गतिविधियां",
    enterCode: "कोड दर्ज करें",
    activityShared: "गतिविधि सफलतापूर्वक साझा की गई",
    activityImported: "गतिविधि सफलतापूर्वक आयात की गई",
    deleteConfirm: "क्या आप वाकई इस गतिविधि को हटाना चाहते हैं?",
    deleteActivityDescription: "यह क्रिया वापस नहीं की जा सकती। इस गतिविधि से जुड़े सभी डेटा स्थायी रूप से हटा दिए जाएंगे।",
    shareActivity: "गतिविधि साझा करें",
    shareActivityDescription: "नीचे दिए गए कोड का उपयोग करके यह गतिविधि अन्य उपयोगकर्ताओं के साथ साझा करें:",
    activityCode: "गतिविधि कोड",
    enterCodeDescription: "गतिविधि आयात करने के लिए आपके साथ साझा किया गया कोड दर्ज करें:",
    copy: "कॉपी करें",
    close: "बंद करें",
    activitySaved: "गतिविधि सफलतापूर्वक सहेजी गई",
    reportDownloaded: "रिपोर्ट सफलतापूर्वक डाउनलोड की गई",
    fileDownloaded: "फ़ाइल सफलतापूर्वक डाउनलोड की गई",
    fileRemoved: "फ़ाइल सफलतापूर्वक हटा दी गई",
    fileAddedToDownloads: "फ़ाइल सफलतापूर्वक डाउनलोड में जोड़ी गई",
    enterValidCode: "कृपया एक वैध कोड दर्ज करें",
    invalidCode: "अमान्य कोड। कृपया जांचें और पुनः प्रयास करें",
    ngoNameRequired: "NGO नाम आवश्यक है",
    activityNameRequired: "गतिविधि का नाम आवश्यक है",
    dateRequired: "तारीख आवश्यक है",
    fetchingLocation: "आपका वर्तमान स्थान प्राप्त करना...",
    locationFetched: "वर्तमान स्थान प्राप्त किया गया",
    locationError: "आपका स्थान प्राप्त करने में त्रुटि",
    geolocationNotSupported: "आपके ब्राउज़र में भू-स्थानांकन समर्थित नहीं है",
    showMore: "अधिक दिखाएं",
    showLess: "कम दिखाएं",
    addFirstActivity: "अपनी पहली गतिविधि जोड़ें",
    
    // Progress
    step1: "गतिविधि विवरण",
    step2: "दस्तावेज़",
    step3: "लाभार्थी",
  },
  gu: {
    // Common
    appName: "NGOSaathi",
    save: "સાચવો",
    cancel: "રદ કરો",
    back: "પાછળ",
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
    logout: "લૉગ આઉટ",
    profile: "પ્રોફાઇલ",
    dashboard: "ડેશબોર્ડ",
    add: "ઉમેરો",
    activitiesLabel: "ગતિવિધિઓ",

    // Gender
    Female: "સ્ત્રી",
    Male: "પુરુષ",
    OtherGender: "અન્ય",

    // Document Types
    Bill: "બિલ",
    Receipt: "રસીદ",
    Invoice: "ઇનવોઇસ",
    CashVoucher: "રોકડ વાઉચર",
    OtherDocument: "અન્ય",
    
    // Login Screen
    loginWithGoogle: "Google સાથે લૉગિન કરો",
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
    createNewActivity: "નવી પ્રવૃત્તિ બનાવો",
    manageActivities: "તમારી પ્રવૃત્તિઓનું સંચાલન કરો",
    importActivity: "પ્રવૃત્તિ આયાત કરો",
    importFromOtherUser: "અન્ય વપરાશકર્તા પાસેથી આયાત કરો",
    recentActivities: "તાજેતરની પ્રવૃત્તિઓ",
    noRecentActivities: "કોઈ તાજેતરની પ્રવૃત્તિ નથી",
    addYourFirstActivity: "તમારી પ્રથમ પ્રવૃત્તિ ઉમેરો",
    viewAllActivities: "બધી પ્રવૃત્તિઓ જુઓ",
    
    // Menu Items
    analytics: "વિશ્લેષણ",
    downloads: "ડાઉનલોડ",
    support: "સહાય",
    aboutUs: "અમારા વિશે",
    changeLanguage: "ભાષા બદલો",
    noDataAvailable: "કોઈ ડેટા ઉપલબ્ધ નથી",
    
    // Analytics Dashboard
    totalActivities: "કુલ ગતિવિધિઓ",
    totalBeneficiaries: "કુલ લાભાર્થીઓ",
    totalDocuments: "કુલ દસ્તાવેજો",
    uniqueLocations: "વિશિષ્ટ સ્થાનો",
    activitiesByMonth: "મહેવારોની આધારે ગતિવિધિઓ",
    beneficiariesByGender: "લિંગની આધારે લાભાર્થીઓ",
    beneficiariesByAge: "ઉમરની આધારે લાભાર્થીઓ",
    documentsByType: "પ્રકારની આધારે દસ્તાવેજો",
    
    // Activity Report
    activityName: "પ્રવૃત્તિનું નામ",
    location: "સ્થળ",
    getCurrentLocation: "વર્તમાન સ્થાન મેળવો",
    date: "તારીખ",
    selectDate: "તારીખ પસંદ કરો",
    setCurrentDate: "વર્તમાન તારીખ સેટ કરો",
    personOfContact: "સંપર્ક વ્યક્તિ",
    description: "વર્ણન",
    uploadMedia: "મીડિયા અપલોડ કરો",
    dragAndDropMedia: "ફોટા/વિડિઓ અપલોડ કરવા માટે ક્લિક કરો અથવા ખેંચો અને છોડો",
    name: "નામ",
    
    // Document Upload
    uploadDocuments: "દસ્તાવેજો અપલોડ કરો",
    documentType: "દસ્તાવેજનો પ્રકાર",
    comment: "ટિપ્પણી",
    bill: "બિલ",
    receipt: "રસીદ",
    invoice: "ઇનવોઇસ",
    cashVoucher: "રોકડ વાઉચર",
    other: "અન્ય",
    noDocuments: "હજુ સુધી કોઈ દસ્તાવેજો ઉમેરાયા નથી",
    selectFile: "ફાઈલ પસંદ કરો",
    
    // Beneficiary Details
    beneficiaryDetails: "લાભાર્થી વિગતો",
    addBeneficiary: "લાભાર્થી ઉમેરો",
    newBeneficiary: "નવો લાભાર્થી",
    firstNameRequired: "બધા લાભાર્થીઓ માટે પ્રથમ નામ જરૂરી છે",
    noBeneficiaries: "હજુ સુધી કોઈ લાભાર્થી ઉમેરાયા નથી",
    remove: "દૂર કરો",
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
    alternateNo: "વૈકલ્પિક નંબર",
    address: "સરનામું",
    documentNumber: "દસ્તાવેજ નંબર",
    aadhar: "આધાર",
    pan: "પાન",
    dl: "ડ્રાઇવિંગ લાઇસન્સ",
    election: "મતદાર ID",
    referencePerson: "સંદર્ભ વ્યક્તિ",
    referenceContact: "સંદર્ભ સંપર્ક",
    
    // Edit Activities
    noActivities: "કોઈ પ્રવૃત્તિઓ મળી નથી",
    activities: "ગતિવિધિઓ",
    enterCode: "કોડ દાખલ કરો",
    activityShared: "પ્રવૃત્તિ સફળતાપૂર્વક શેર કરી",
    activityImported: "પ્રવૃત્તિ સફળતાપૂર્વક આયાત કરી",
    deleteConfirm: "શું તમે ખરેખર આ પ્રવૃત્તિ કાઢી નાખવા માંગો છો?",
    deleteActivityDescription: "આ ક્રિયા પાછી લઈ શકાતી નથી. આ પ્રવૃત્તિ સાથે સંકળાયેલ તમામ ડેટા કાયમી ધોરણે કાઢી નાખવામાં આવશે.",
    shareActivity: "પ્રવૃત્તિ શેર કરો",
    shareActivityDescription: "નીચેના કોડનો ઉપયોગ કરીને આ પ્રવૃત્તિ અન્ય વપરાશકર્તાઓ સાથે શેર કરો:",
    activityCode: "પ્રવૃત્તિ કોડ",
    enterCodeDescription: "પ્રવૃત્તિ આયાત કરવા માટે તમારી સાથે શેર કરેલો કોડ દાખલ કરો:",
    copy: "કોપી કરો",
    close: "બંધ કરો",
    activitySaved: "પ્રવૃત્તિ સફળતાપૂર્વક સાચવી",
    reportDownloaded: "રિપોર્ટ સફળતાપૂર્વક ડાઉનલોડ થઈ",
    fileDownloaded: "ફાઈલ સફળતાપૂર્વક ડાઉનલોડ થઈ",
    fileRemoved: "ફાઈલ સફળતાપૂર્વક દૂર કરવામાં આવી",
    fileAddedToDownloads: "ફાઈલ સફળતાપૂર્વક ડાઉનલોડ્સમાં ઉમેરાઈ",
    enterValidCode: "કૃપા કરી માન્ય કોડ દાખલ કરો",
    invalidCode: "અમાન્ય કોડ. કૃપા કરીને તપાસો અને ફરી પ્રયાસ કરો",
    ngoNameRequired: "NGO નામ જરૂરી છે",
    activityNameRequired: "પ્રવૃત્તિનું નામ જરૂરી છે",
    dateRequired: "તારીખ જરૂરી છે",
    fetchingLocation: "તમારું વર્તમાન સ્થાન મેળવી રહ્યા છીએ...",
    locationFetched: "વર્તમાન સ્થાન મેળવ્યું",
    locationError: "તમારું સ્થાન મેળવવામાં ભૂલ",
    geolocationNotSupported: "તમારા બ્રાઉઝરમાં જિઓલોકેશન સપોર્ટેડ નથી",
    showMore: "વધુ બતાવો",
    showLess: "ઓછું બતાવો",
    addFirstActivity: "તમારી પ્રથમ પ્રવૃત્તિ ઉમેરો",
    
    // Progress
    step1: "પ્રવૃત્તિ વિગતો",
    step2: "દસ્તાવેજો",
    step3: "લાભાર્થીઓ",
  }
};
