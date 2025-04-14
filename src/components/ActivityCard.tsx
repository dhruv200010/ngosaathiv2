import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Share2, ChevronDown, ChevronUp, Eye, FileText, FileImage, FileVideo, File, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { useNGO, Activity } from "@/context/NGOContext";
import { toast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface ActivityCardProps {
  activity: Activity;
  onEdit?: (id: string) => void;
  onDownload?: (fileType: string) => void;
  onMoreActions?: () => React.ReactNode;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onEdit, onDownload, onMoreActions }) => {
  const { t } = useLanguage();
  const { deleteActivity, generateShareCodeForActivity } = useNGO();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [shareCode, setShareCode] = useState<string>("");
  const [videoSnapshots, setVideoSnapshots] = useState<{ [key: string]: string }>({});

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

  const captureVideoSnapshot = async (videoUrl: string, index: number) => {
    try {
      const video = document.createElement('video');
      video.src = videoUrl;
      
      await new Promise((resolve) => {
        video.onloadeddata = resolve;
        video.load();
      });

      video.currentTime = 1; // Capture at 1 second to avoid black frames
      
      await new Promise((resolve) => {
        video.onseeked = resolve;
      });

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      const snapshot = canvas.toDataURL('image/jpeg', 0.8);
      setVideoSnapshots(prev => ({ ...prev, [index]: snapshot }));
    } catch (error) {
      console.error("Error capturing video snapshot:", error);
    }
  };

  useEffect(() => {
    activity.media.forEach((mediaUrl, index) => {
      if (mediaUrl.startsWith('data:video')) {
        captureVideoSnapshot(mediaUrl, index);
      }
    });
  }, [activity.media]);

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
                onClick={() => setShowViewDialog(true)}
                className="h-8 w-8 p-0"
                title={t("view")}
              >
                <Eye size={16} className="text-ngo-dark" />
              </Button>
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
              <span>{format(new Date(activity.date), "PPP 'at' p")}</span>
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

      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-ngo-dark">
              {activity.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-ngo-dark mb-6">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{t("date")}</p>
                  <p className="text-base">{format(new Date(activity.date), "PPP 'at' p")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{t("location")}</p>
                  <p className="text-base">{activity.location}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium text-gray-600 mb-1">{t("description")}</p>
                  <p className="text-base">{activity.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{t("personOfContact")}</p>
                  <p className="text-base">{activity.contactPerson.name}</p>
                  <p className="text-sm text-gray-600">{activity.contactPerson.contactNo}</p>
                </div>
              </div>
            </div>

            {/* Beneficiaries Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-ngo-dark mb-6">Beneficiaries</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activity.beneficiaries.map((beneficiary, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-start space-x-4">
                      {beneficiary.photo ? (
                        <img
                          src={beneficiary.photo}
                          alt={`${beneficiary.firstName} ${beneficiary.lastName}`}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xl">
                            {beneficiary.firstName[0]}{beneficiary.lastName[0]}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">
                          {beneficiary.firstName} {beneficiary.middleName} {beneficiary.lastName}
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <p>{t("gender")}: {beneficiary.gender}</p>
                          <p>{t("age")}: {beneficiary.age}</p>
                          <p>{t("contactNo")}: {beneficiary.contactNo}</p>
                          <p>{t("alternateNo")}: {beneficiary.alternateNo}</p>
                          <p>Doc Type: Aadhar</p>
                          <p>UID: {beneficiary.documentNo}</p>
                          <p>Address: {beneficiary.address}</p>
                          <p>State: {beneficiary.state}</p>
                          <p>District: {beneficiary.district}</p>
                          <p>Tehsil: {beneficiary.tehsil}</p>
                          <p>Caste: {beneficiary.caste}</p>
                          <p>Ref Person: {beneficiary.referenceName}</p>
                          <p>Ref Contact: {beneficiary.referenceContact}</p>
                        </div>
                        {beneficiary.comment && (
                          <p className="text-sm text-gray-600 mt-2">
                            {t("comments")}: {beneficiary.comment}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents and Media Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-ngo-dark mb-6">Documents & Media</h3>
              
              {/* Documents Subsection */}
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-ngo-dark mb-4">Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.documents.map((doc, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex flex-col space-y-3">
                        {doc.preview ? (
                          doc.type.toLowerCase().includes('pdf') ? (
                            <div className="w-full h-32 border rounded overflow-hidden">
                              <iframe
                                src={doc.preview}
                                className="w-full h-full"
                                title={`Document Preview ${index + 1}`}
                              />
                            </div>
                          ) : doc.type.toLowerCase().includes('image') ? (
                            <div className="w-full h-32 border rounded overflow-hidden">
                              <img
                                src={doc.preview}
                                alt={`Document Preview ${index + 1}`}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-32 flex items-center justify-center bg-gray-100 border rounded">
                              <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                          )
                        ) : (
                          <div className="w-full h-32 flex items-center justify-center bg-gray-100 border rounded">
                            {doc.type.toLowerCase().includes('pdf') ? (
                              <FileText className="w-8 h-8 text-gray-400" />
                            ) : doc.type.toLowerCase().includes('image') ? (
                              <FileImage className="w-8 h-8 text-gray-400" />
                            ) : doc.type.toLowerCase().includes('video') ? (
                              <FileVideo className="w-8 h-8 text-gray-400" />
                            ) : (
                              <File className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                        )}
                        <div className="mt-2">
                          <p className="font-medium mb-1">{doc.fileName || t("noFileName")}</p>
                          <p className="text-sm text-gray-600">{t("docType")}: {doc.type}</p>
                          {doc.comment && (
                            <p className="text-sm text-gray-600 mt-1">{doc.comment}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media Files Subsection */}
              <div className="space-y-2">
                <h4 className="text-lg font-semibold text-ngo-dark mb-4">{t("mediaFiles")}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activity.media.map((mediaUrl, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      {mediaUrl.startsWith('data:image') ? (
                        <img
                          src={mediaUrl}
                          alt={`Media ${index + 1}`}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <div className="relative w-full h-64 bg-gray-100">
                          {videoSnapshots[index] ? (
                            <img
                              src={videoSnapshots[index]}
                              alt={`Video Snapshot ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-gray-500">Loading...</span>
                            </div>
                          )}
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                            Video
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              {t("close")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActivityCard;
