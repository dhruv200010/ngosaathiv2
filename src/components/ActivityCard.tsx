import React, { useState } from "react";
import { Edit2, Trash2, Share2, ChevronDown, ChevronUp, FileDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO, Activity } from "@/context/NGOContext";
import { toast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ActivityCardProps {
  activity: Activity;
  onEdit?: (id: string) => void;
  onDownload?: (fileType: string) => void;
  onMoreActions?: () => React.ReactNode;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onEdit, onDownload, onMoreActions }) => {
  const { t } = useLanguage();
  const { deleteActivity, generateShareCodeForActivity, addDownloadedFile } = useNGO();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [shareCode, setShareCode] = useState<string>("");

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(activity.id);
    } else {
      navigate(`/activity/${activity.id}`);
    }
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteActivity(activity.id);
    setShowDeleteDialog(false);
  };

  const handleShare = () => {
    const code = generateShareCodeForActivity(activity.id);
    setShareCode(code);
    setShowShareDialog(true);
  };

  const copyShareCode = () => {
    navigator.clipboard.writeText(shareCode);
    toast.success(t("activityShared"));
  };

  const exportToPDF = async () => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      doc.setFillColor(46, 204, 113);
      doc.rect(0, 0, pageWidth, 20, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text("NGO Activity Manager", pageWidth / 2, 12, { align: 'center' });
      
      doc.setFontSize(20);
      doc.setTextColor(44, 62, 80);
      doc.setFont('helvetica', 'bold');
      const title = activity.name;
      doc.text(title, pageWidth / 2, 35, { align: 'center' });
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(`${t("date")}: ${activity.date}`, 14, 45);
      doc.text(`${t("location")}: ${activity.location}`, 14, 52);
      
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`${t("description")}:`, 14, 62);
      
      const splitDescription = doc.splitTextToSize(activity.description, pageWidth - 28);
      doc.text(splitDescription, 14, 69);
      
      let yPos = 69 + (splitDescription.length * 7);
      doc.text(`${t("personOfContact")}: ${activity.contactPerson.name} (${activity.contactPerson.contactNo})`, 14, yPos);
      
      yPos += 15;
      doc.text(`${t("beneficiaries")} (${activity.beneficiaries.length})`, 14, yPos);
      yPos += 5;
      
      if (activity.beneficiaries.length > 0) {
        const beneficiaryData = activity.beneficiaries.map(b => [
          `${b.firstName} ${b.middleName} ${b.lastName}`.trim(),
          b.gender,
          b.age,
          b.contactNo,
          b.documentType,
          b.documentNo
        ]);
        
        autoTable(doc, {
          startY: yPos,
          head: [[t("name"), t("gender"), t("age"), t("contactNo"), t("docType"), t("docNo")]],
          body: beneficiaryData,
          theme: 'grid',
          headStyles: { fillColor: [46, 204, 113], textColor: [255, 255, 255] }
        });
        
        yPos = (doc as any).lastAutoTable.finalY + 10;
      }
      
      doc.text(`${t("documents")} (${activity.documents.length})`, 14, yPos);
      yPos += 5;
      
      if (activity.documents.length > 0) {
        const documentData = activity.documents.map(d => [
          d.fileName || t("noFileName"),
          d.type,
          d.comment
        ]);
        
        autoTable(doc, {
          startY: yPos,
          head: [[t("fileName"), t("docType"), t("comment")]],
          body: documentData,
          theme: 'grid',
          headStyles: { fillColor: [52, 152, 219], textColor: [255, 255, 255] }
        });
      }
      
      // Handle media files
      if (activity.media.length > 0) {
        doc.addPage();
        
        // Add header
        doc.setFillColor(46, 204, 113);
        doc.rect(0, 0, pageWidth, 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text("Media Files", pageWidth / 2, 12, { align: 'center' });
        
        // Grid layout setup
        const mediaPerRow = 1; // Changed to 1 per row for better quality
        const mediaWidth = pageWidth - 40; // Larger size for better quality
        const mediaHeight = mediaWidth * 0.75;
        let mediaY = 40;
        
        // Process each media item
        for (const mediaUrl of activity.media) {
          try {
            // Check if the mediaUrl is a base64 string
            if (mediaUrl.startsWith('data:image')) {
              // Add the image to the PDF
              doc.addImage(
                mediaUrl,
                'JPEG',
                20,
                mediaY,
                mediaWidth,
                mediaHeight,
                `image-${mediaY}`,
                'MEDIUM' // quality setting
              );
              
              mediaY += mediaHeight + 20;
              
              // Add new page if needed
              if (mediaY + mediaHeight > pageHeight - 20) {
                doc.addPage();
                doc.setFillColor(46, 204, 113);
                doc.rect(0, 0, pageWidth, 20, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(16);
                doc.text("Media Files (Continued)", pageWidth / 2, 12, { align: 'center' });
                mediaY = 40;
              }
            }
          } catch (error) {
            console.error("Error adding image to PDF:", error);
            // Continue with next image if one fails
          }
        }
      }

      // Handle document previews
      const docsWithPreview = activity.documents.filter(d => d.preview);
      if (docsWithPreview.length > 0) {
        doc.addPage();
        
        // Add header
        doc.setFillColor(46, 204, 113);
        doc.rect(0, 0, pageWidth, 20, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(16);
        doc.text("Document Previews", pageWidth / 2, 12, { align: 'center' });
        
        let docY = 40;
        const docWidth = pageWidth - 40;
        const docHeight = docWidth * 0.75;
        
        for (const document of docsWithPreview) {
          try {
            if (document.preview?.startsWith('data:image')) {
              // Add document preview
              doc.addImage(
                document.preview,
                'JPEG',
                20,
                docY,
                docWidth,
                docHeight,
                `doc-${docY}`,
                'MEDIUM'
              );
              
              // Add document info
              docY += docHeight + 10;
              doc.setFontSize(12);
              doc.setTextColor(0, 0, 0);
              doc.text(`${document.fileName} (${document.type})`, 20, docY);
              if (document.comment) {
                docY += 7;
                doc.setFontSize(10);
                doc.text(document.comment, 20, docY);
              }
              
              docY += 20;
              
              // Add new page if needed
              if (docY + docHeight > pageHeight - 20) {
                doc.addPage();
                doc.setFillColor(46, 204, 113);
                doc.rect(0, 0, pageWidth, 20, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(16);
                doc.text("Document Previews (Continued)", pageWidth / 2, 12, { align: 'center' });
                docY = 40;
              }
            }
          } catch (error) {
            console.error("Error adding document preview to PDF:", error);
            // Continue with next document if one fails
          }
        }
      }
      
      const pageCount = doc.internal.pages.length - 1;
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `${t("generatedBy")}: NGO Activity Manager - ${new Date().toLocaleDateString()}`,
          pageWidth / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
        doc.text(`${t("page")} ${i} ${t("of")} ${pageCount}`, pageWidth - 20, doc.internal.pageSize.getHeight() - 10);
      }
      
      // Save the PDF
      const fileName = `${activity.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);

      // Add to downloaded files list - ONCE only
      const downloadItem = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        fileName,
        fileType: "PDF Report",
        activityId: activity.id,
        activityName: activity.name || "Activity Report",
        downloadDate: new Date().toLocaleDateString(),
      };
      
      // Add to downloaded files
      addDownloadedFile(downloadItem);
      toast.success(t("reportDownloaded"));
      
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error(t("errorGeneratingPDF"));
    }
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-ngo-dark">
              {activity.name}
            </CardTitle>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="h-8 w-8 p-0"
              >
                <Edit2 size={16} className="text-ngo-dark" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="h-8 w-8 p-0"
              >
                <Share2 size={16} className="text-ngo-dark" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={exportToPDF}
                className="h-8 w-8 p-0"
                title={t("exportPDF")}
              >
                <FileDown size={16} className="text-ngo-dark" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="h-8 w-8 p-0"
              >
                <Trash2 size={16} className="text-red-500" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-700 mb-2">
            <div className="flex justify-between">
              <span>{activity.date}</span>
              <span>
                {activity.beneficiaries.length} {t("beneficiaries")}
              </span>
            </div>
            <p className="mt-2 text-gray-600 line-clamp-2">{activity.description}</p>
          </div>
        </CardContent>
        <CardFooter className="pt-0 flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDetails}
            className="text-xs flex items-center text-gray-500"
          >
            {showDetails ? (
              <>
                <ChevronUp size={14} className="mr-1" /> {t("showLess")}
              </>
            ) : (
              <>
                <ChevronDown size={14} className="mr-1" /> {t("showMore")}
              </>
            )}
          </Button>
          {onMoreActions && onMoreActions()}
        </CardFooter>
        
        {showDetails && (
          <div className="px-6 pb-4 text-sm space-y-2 border-t pt-2">
            <div>
              <span className="font-medium">{t("location")}: </span>
              {activity.location}
            </div>
            <div>
              <span className="font-medium">{t("personOfContact")}: </span>
              {activity.contactPerson.name} ({activity.contactPerson.contactNo})
            </div>
            <div>
              <span className="font-medium">{t("documents")}: </span>
              {activity.documents.length}
            </div>
            <div>
              <span className="font-medium">{t("beneficiaries")}: </span>
              {activity.beneficiaries.length}
            </div>
          </div>
        )}
      </Card>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("shareActivity")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {t("shareActivityDescription")}
            </p>
            <div className="flex space-x-2">
              <Input value={shareCode} readOnly className="font-mono" />
              <Button onClick={copyShareCode}>{t("copy")}</Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              {t("close")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("deleteConfirm")}</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            {t("deleteActivityDescription")}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {t("cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {t("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActivityCard;
