import { Complaint, ComplaintFormData } from '../types/complaint';
import EmailService from './emailService';

class ComplaintService {
  private static instance: ComplaintService;
  private emailService: EmailService;

  constructor() {
    this.emailService = EmailService.getInstance();
  }

  public static getInstance(): ComplaintService {
    if (!ComplaintService.instance) {
      ComplaintService.instance = new ComplaintService();
    }
    return ComplaintService.instance;
  }

  public async submitComplaint(formData: ComplaintFormData): Promise<Complaint> {
    const complaint: Complaint = {
      id: `CPL-${Date.now()}`,
      name: formData.name,
      village: formData.village,
      type: formData.type,
      description: formData.description,
      status: 'pending',
      dateSubmitted: new Date(),
      assignedOfficial: 'kumar@gov.in',
    };

    // Save to localStorage (in a real app, this would be sent to a backend)
    const existingComplaints = this.getComplaints();
    existingComplaints.push(complaint);
    localStorage.setItem('complaints', JSON.stringify(existingComplaints));

    // Send email notification
    await this.emailService.sendComplaintNotification(complaint);

    return complaint;
  }

  public getComplaints(): Complaint[] {
    const complaints = localStorage.getItem('complaints');
    if (!complaints) return [];
    
    return JSON.parse(complaints).map((c: any) => ({
      ...c,
      dateSubmitted: new Date(c.dateSubmitted),
      escalationDate: c.escalationDate ? new Date(c.escalationDate) : undefined,
    }));
  }

  public updateComplaintStatus(id: string, status: 'pending' | 'resolved' | 'overdue'): boolean {
    const complaints = this.getComplaints();
    const complaintIndex = complaints.findIndex(c => c.id === id);
    
    if (complaintIndex === -1) return false;
    
    complaints[complaintIndex].status = status;
    localStorage.setItem('complaints', JSON.stringify(complaints));
    
    return true;
  }

  public getComplaintsByStatus(status: 'pending' | 'resolved' | 'overdue'): Complaint[] {
    return this.getComplaints().filter(c => c.status === status);
  }

  public getComplaintStats() {
    const complaints = this.getComplaints();
    return {
      total: complaints.length,
      pending: complaints.filter(c => c.status === 'pending').length,
      resolved: complaints.filter(c => c.status === 'resolved').length,
      overdue: complaints.filter(c => c.status === 'overdue').length,
    };
  }
}

export default ComplaintService;