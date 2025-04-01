
import React, { useState } from "react";
import Header from "@/components/Header";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/lib/toast";

const Support: React.FC = () => {
  const { t } = useLanguage();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      toast.error(t("fillAllFields"));
      return;
    }
    
    // In a real app, this would submit to a backend
    toast.success(t("messageSent"));
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-ngo-light">
      <Header showBack={true} showProfile={true} />
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-ngo-dark mb-6 text-center">
            {t("support")}
          </h1>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>{t("frequentlyAskedQuestions")}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{t("faqQuestion1")}</AccordionTrigger>
                    <AccordionContent>
                      {t("faqAnswer1")}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>{t("faqQuestion2")}</AccordionTrigger>
                    <AccordionContent>
                      {t("faqAnswer2")}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>{t("faqQuestion3")}</AccordionTrigger>
                    <AccordionContent>
                      {t("faqAnswer3")}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>{t("faqQuestion4")}</AccordionTrigger>
                    <AccordionContent>
                      {t("faqAnswer4")}
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>{t("faqQuestion5")}</AccordionTrigger>
                    <AccordionContent>
                      {t("faqAnswer5")}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("contactUs")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      {t("name")}
                    </label>
                    <Input
                      id="name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder={t("yourName")}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      {t("email")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder={t("yourEmail")}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("message")}
                    </label>
                    <Textarea
                      id="message"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={t("yourMessage")}
                      rows={5}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-ngo-green text-ngo-dark hover:bg-ngo-green/90">
                    {t("sendMessage")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-6">
            <h2 className="text-xl font-semibold text-ngo-dark mb-2">
              {t("otherSupportChannels")}
            </h2>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
              <Card className="w-full md:w-1/3">
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 bg-ngo-green/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-ngo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-medium">{t("email")}</h3>
                  <p className="text-sm text-gray-600 mt-1">support@ngoactivitymanager.org</p>
                </CardContent>
              </Card>
              
              <Card className="w-full md:w-1/3">
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 bg-ngo-green/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-ngo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="font-medium">{t("phone")}</h3>
                  <p className="text-sm text-gray-600 mt-1">+1-800-NGO-HELP</p>
                </CardContent>
              </Card>
              
              <Card className="w-full md:w-1/3">
                <CardContent className="pt-6 text-center">
                  <div className="mb-2 bg-ngo-green/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-ngo-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="font-medium">{t("chat")}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t("liveChatAvailable")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
