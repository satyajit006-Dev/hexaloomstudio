import { ClientInquiry, ContactFormData } from '../types';
import { SITE_CONFIG } from '../data/siteConfig';

const STORAGE_KEY = 'hexaloom_client_inquiries_v1';
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/hexaloomstudio@gmail.com';

// Initial seed data if storage is completely empty so the owner can immediately see how it works
const SEED_INQUIRIES: ClientInquiry[] = [
  {
    id: 'inq_sample_01',
    name: 'Aarav Sharma',
    email: 'aarav@orientsystems.io',
    phone: '+91 98765 43210',
    company: 'Orient Systems Corp',
    projectType: 'Web Applications (Next.js / React)',
    budget: '$30k – $60k (Full-scale Production Build)',
    timeline: 'Immediate (Next 2-4 weeks)',
    message: 'We require a mission-critical logistics analytics dashboard with sub-second performance and live telemetry synchronization.',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    status: 'new',
    source: 'Website Scope Form'
  }
];

export const leadService = {
  getInquiries(): ClientInquiry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_INQUIRIES));
        return SEED_INQUIRIES;
      }
      return JSON.parse(stored) as ClientInquiry[];
    } catch {
      return SEED_INQUIRIES;
    }
  },

  saveInquiry(formData: ContactFormData): ClientInquiry {
    const newInquiry: ClientInquiry = {
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'new',
      source: 'Website Scope Form'
    };

    try {
      const existing = leadService.getInquiries();
      const updated = [newInquiry, ...existing];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('hexaloom_new_inquiry', { detail: newInquiry }));
    } catch (e) {
      console.error('Failed to save inquiry to storage', e);
    }

    return newInquiry;
  },

  async dispatchEmail(formData: ContactFormData): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Client Commission Inquiry: ${formData.name} - ${formData.projectType}`,
          Client_Name: formData.name,
          Client_Email: formData.email,
          Client_Phone: formData.phone || 'Not provided',
          Client_Company: formData.company || 'Not provided',
          Requested_Service: formData.projectType,
          Budget_Tier: formData.budget,
          Target_Timeline: formData.timeline,
          Scope_Specifications: formData.message,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false'
        })
      });

      if (!response.ok) {
        return { success: false, message: `Server status: ${response.status}` };
      }

      return { success: true };
    } catch (err: any) {
      console.warn('Network email dispatch notice (using local + WhatsApp redundancy):', err);
      // Even if network blocks, local storage + whatsapp ensures zero data loss
      return { success: false, message: err?.message || 'Network dispatch deferred' };
    }
  },

  updateStatus(id: string, status: ClientInquiry['status']) {
    try {
      const inquiries = leadService.getInquiries();
      const updated = inquiries.map((item) =>
        item.id === id ? { ...item, status } : item
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('hexaloom_inquiry_updated'));
    } catch (e) {
      console.error('Failed to update status', e);
    }
  },

  deleteInquiry(id: string) {
    try {
      const inquiries = leadService.getInquiries();
      const updated = inquiries.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('hexaloom_inquiry_updated'));
    } catch (e) {
      console.error('Failed to delete inquiry', e);
    }
  },

  formatWhatsAppUrl(data: ContactFormData): string {
    const text = [
      `*NEW CLIENT INQUIRY - HEXALOOM STUDIO*`,
      ``,
      `*Client:* ${data.name}`,
      `*Email:* ${data.email}`,
      data.phone ? `*Phone:* ${data.phone}` : null,
      data.company ? `*Company:* ${data.company}` : null,
      `*Project:* ${data.projectType}`,
      `*Budget:* ${data.budget}`,
      `*Timeline:* ${data.timeline}`,
      ``,
      `*Specifications:*`,
      `${data.message}`
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  },

  formatMailtoUrl(data: ContactFormData): string {
    const subject = `New Project Commission Inquiry: ${data.name} // ${data.projectType}`;
    const body = [
      `Client Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      data.company ? `Company: ${data.company}` : null,
      `Project Type: ${data.projectType}`,
      `Budget: ${data.budget}`,
      `Timeline: ${data.timeline}`,
      ``,
      `Project Scope & Specifications:`,
      `${data.message}`
    ]
      .filter(Boolean)
      .join('\n');

    return `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  },

  exportToCsv(inquiries: ClientInquiry[]) {
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Timeline', 'Status', 'Message'];
    const rows = inquiries.map((inq) => [
      `"${inq.id}"`,
      `"${new Date(inq.createdAt).toLocaleString()}"`,
      `"${inq.name.replace(/"/g, '""')}"`,
      `"${inq.email.replace(/"/g, '""')}"`,
      `"${(inq.phone || '').replace(/"/g, '""')}"`,
      `"${(inq.company || '').replace(/"/g, '""')}"`,
      `"${inq.projectType.replace(/"/g, '""')}"`,
      `"${inq.budget.replace(/"/g, '""')}"`,
      `"${inq.timeline.replace(/"/g, '""')}"`,
      `"${inq.status}"`,
      `"${inq.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hexaloom_client_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
