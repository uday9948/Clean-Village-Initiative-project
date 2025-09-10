import { Complaint } from '../types/complaint';

interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  type: 'complaint_submission' | 'escalation' | 'resolution';
}

class EmailService {
  private static instance: EmailService;
  private notifications: EmailNotification[] = [];

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  public async sendComplaintNotification(complaint: Complaint): Promise<void> {
    const notification: EmailNotification = {
      to: 'kumar@gov.in', // Mock official email
      subject: `New Complaint Submitted - ${complaint.id}`,
      body: `
        A new complaint has been submitted:
        
        Complaint ID: ${complaint.id}
        Name: ${complaint.name}
        Location: ${complaint.village}
        Type: ${complaint.type}
        Description: ${complaint.description}
        Date: ${complaint.dateSubmitted.toLocaleDateString()}
        
        Please review and take appropriate action.
      `,
      type: 'complaint_submission',
    };

    this.notifications.push(notification);
    console.log('Email sent:', notification);
    
    // Schedule escalation check after 7 days
    this.scheduleEscalation(complaint);
  }

  private scheduleEscalation(complaint: Complaint): void {
    // In a real application, this would be handled by a backend job scheduler
    // For demonstration, we'll use setTimeout (not recommended for production)
    setTimeout(() => {
      // Check if complaint is still pending
      const storedComplaints = JSON.parse(localStorage.getItem('complaints') || '[]');
      const currentComplaint = storedComplaints.find((c: Complaint) => c.id === complaint.id);
      
      if (currentComplaint && currentComplaint.status === 'pending') {
        // Mark as overdue
        currentComplaint.status = 'overdue';
        currentComplaint.escalated = true;
        currentComplaint.escalationDate = new Date();
        
        // Update localStorage
        const updatedComplaints = storedComplaints.map((c: Complaint) => 
          c.id === complaint.id ? currentComplaint : c
        );
        localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
        
        console.log('Complaint marked as overdue:', currentComplaint);
      }
    }, 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
  }

  public getNotifications(): EmailNotification[] {
    return this.notifications;
  }
}

export default EmailService;