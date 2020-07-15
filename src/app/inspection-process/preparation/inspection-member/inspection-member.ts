export interface InspectionMember {
  id?: number;
  role?: string;
  userId: number;
  userFullName?: string;
  letterAttachmentId?: number;
  letterAttachmentPath?: string;
  declarationAttachmentId?: number;
  declarationAttachmentName?: string;
  inspectionId: number;
}
