
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NGOProvider } from "@/context/NGOContext";
import { LanguageProvider } from "@/context/LanguageContext";

// Pages
import Index from "./pages/Index";
import SetupNGO from "./pages/SetupNGO";
import NGODetails from "./pages/NGODetails";
import Dashboard from "./pages/Dashboard";
import ActivityReport from "./pages/ActivityReport";
import DocumentUpload from "./pages/DocumentUpload";
import BeneficiaryDetails from "./pages/BeneficiaryDetails";
import EditActivities from "./pages/EditActivities";
import Analytics from "./pages/Analytics";
import Downloads from "./pages/Downloads";
import Support from "./pages/Support";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <NGOProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/setup" element={<SetupNGO />} />
              <Route path="/details" element={<NGODetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/activity/report" element={<ActivityReport />} />
              <Route path="/activity/documents" element={<DocumentUpload />} />
              <Route path="/activity/beneficiaries" element={<BeneficiaryDetails />} />
              <Route path="/activity/edit" element={<EditActivities />} />
              <Route path="/profile" element={<SetupNGO />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/support" element={<Support />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NGOProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
