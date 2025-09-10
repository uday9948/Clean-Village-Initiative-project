export interface Complaint {
  id: string;
  name: string;
  village: string;
  type: ComplaintType;
  description: string;
  image?: string;
  status: 'pending' | 'resolved' | 'overdue';
  dateSubmitted: Date;
  assignedOfficial?: string;
  escalationDate?: Date;
  escalated?: boolean;
}

export type ComplaintType = 
  | 'overflowingDrains'
  | 'lackOfToilets'
  | 'wasteDisposal'
  | 'waterContamination'
  | 'brokenSewage'
  | 'other';

export interface ComplaintFormData {
  name: string;
  village: string;
  type: ComplaintType;
  description: string;
  image?: File;
}