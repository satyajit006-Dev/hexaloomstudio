import React, { useState, useEffect } from 'react';
import {
  X,
  Inbox,
  Mail,
  Phone,
  MessageSquare,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  Building,
  DollarSign,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  RefreshCw,
  Search
} from 'lucide-react';
import { ClientInquiry } from '../../types';
import { leadService } from '../../services/leadService';
import { SITE_CONFIG } from '../../data/siteConfig';

interface OwnerInboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerInboxModal: React.FC<OwnerInboxModalProps> = ({ isOpen, onClose }) => {
  const [inquiries, setInquiries] = useState<ClientInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<ClientInquiry | null>(null);

  const loadInquiries = () => {
    const list = leadService.getInquiries();
    setInquiries(list);
    if (list.length > 0 && !selectedInquiry) {
      setSelectedInquiry(list[0]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadInquiries();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleUpdate = () => loadInquiries();
    window.addEventListener('hexaloom_new_inquiry', handleUpdate);
    window.addEventListener('hexaloom_inquiry_updated', handleUpdate);
    return () => {
      window.removeEventListener('hexaloom_new_inquiry', handleUpdate);
      window.removeEventListener('hexaloom_inquiry_updated', handleUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.projectType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = filterStatus === 'all' || inq.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleCopyLead = (inq: ClientInquiry) => {
    const summary = `Client: ${inq.name}\nEmail: ${inq.email}\nPhone: ${inq.phone || 'N/A'}\nCompany: ${inq.company || 'N/A'}\nService: ${inq.projectType}\nBudget: ${inq.budget}\nTimeline: ${inq.timeline}\nDate: ${new Date(inq.createdAt).toLocaleString()}\n\nScope:\n${inq.message}`;
    navigator.clipboard.writeText(summary);
    setCopiedId(inq.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusChange = (id: string, newStatus: ClientInquiry['status']) => {
    leadService.updateStatus(id, newStatus);
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedInquiry?.id === id) {
      setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this client inquiry permanently?')) {
      leadService.deleteInquiry(id);
      const remaining = inquiries.filter((i) => i.id !== id);
      setInquiries(remaining);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(remaining[0] || null);
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inbox-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-[#1C1A17] text-[#FFFDF9] border border-[#3A352F] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[#3A352F] bg-[#141210] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-[#B56A3A] bg-[#B56A3A]/10 flex items-center justify-center text-[#B56A3A]">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="inbox-modal-title" className="font-mono text-sm font-bold uppercase tracking-wider text-[#FFFDF9]">
                  Owner Leads & Inquiry Inbox
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-[#B56A3A] text-[#FFFDF9] font-bold">
                  {inquiries.length} {inquiries.length === 1 ? 'LEAD' : 'LEADS'}
                </span>
              </div>
              <div className="text-xs text-[#81776C] font-mono">
                Direct Client Commission Inquiries // Hexaloom Studio Production
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => leadService.exportToCsv(inquiries)}
              disabled={inquiries.length === 0}
              className="btn-tab text-xs flex items-center gap-1.5 border-[#3A352F] hover:border-[#FFFDF9] text-[#CFC5B8] hover:text-[#FFFDF9] py-1.5 px-3"
              title="Export all leads to CSV"
            >
              <Download className="w-3.5 h-3.5 text-[#B56A3A]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={loadInquiries}
              className="btn-tab text-xs flex items-center gap-1.5 border-[#3A352F] hover:border-[#FFFDF9] text-[#CFC5B8] hover:text-[#FFFDF9] py-1.5 px-3"
              title="Refresh leads list"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 border border-[#3A352F] hover:border-[#FFFDF9] text-[#81776C] hover:text-[#FFFDF9] transition-colors"
              aria-label="Close Leads Inbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="p-3 sm:px-6 border-b border-[#3A352F] bg-[#181613] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 flex-1 min-w-[200px] max-w-md">
            <Search className="w-4 h-4 text-[#81776C]" />
            <input
              type="text"
              placeholder="Search by client name, email, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141210] border border-[#3A352F] px-3 py-1.5 text-xs text-[#FFFDF9] placeholder-[#81776C] focus:outline-none focus:border-[#B56A3A]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#81776C] text-[11px] mr-1 hidden sm:inline">STATUS:</span>
            {['all', 'new', 'reviewed', 'contacted'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-2.5 py-1 uppercase text-[10px] tracking-wider font-semibold border transition-colors ${
                  filterStatus === status
                    ? 'border-[#B56A3A] bg-[#B56A3A] text-[#FFFDF9]'
                    : 'border-[#3A352F] bg-[#141210] text-[#81776C] hover:text-[#FFFDF9]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body: Split view (List on left, Detail on right) */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Left: Inquiries List */}
          <div className="md:col-span-5 border-r border-[#3A352F] overflow-y-auto max-h-[60vh] divide-y divide-[#3A352F]/60">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-[#81776C] font-mono text-xs space-y-2">
                <Inbox className="w-8 h-8 text-[#81776C]/40 mx-auto" />
                <p>No client inquiries found matching your filters.</p>
              </div>
            ) : (
              filtered.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-4 text-left cursor-pointer transition-colors font-mono relative ${
                      isSelected
                        ? 'bg-[#24211D] border-l-4 border-l-[#B56A3A]'
                        : 'hover:bg-[#201D1A]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="font-bold text-sm text-[#FFFDF9] truncate">
                        {inq.name}
                      </div>
                      <span
                        className={`text-[9px] uppercase px-1.5 py-0.5 font-bold ${
                          inq.status === 'new'
                            ? 'bg-[#B56A3A] text-[#FFFDF9]'
                            : inq.status === 'contacted'
                            ? 'bg-[#527A5A] text-[#FFFDF9]'
                            : 'bg-[#3A352F] text-[#CFC5B8]'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#38BDF8] truncate mb-1">
                      {inq.email}
                    </div>

                    <div className="text-[11px] text-[#CFC5B8] truncate mb-2">
                      {inq.projectType}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#81776C]">
                      <span>{inq.budget.split(' ')[0]}</span>
                      <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right: Selected Inquiry Detail Dossier */}
          <div className="md:col-span-7 p-6 overflow-y-auto max-h-[60vh] bg-[#141210] font-mono text-xs space-y-6">
            {selectedInquiry ? (
              <>
                {/* Dossier Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#3A352F]">
                  <div>
                    <div className="text-[10px] text-[#B56A3A] font-bold uppercase tracking-wider mb-1">
                      INQUIRY ID: {selectedInquiry.id}
                    </div>
                    <h4 className="text-xl font-sans font-bold text-[#FFFDF9]">
                      {selectedInquiry.name}
                    </h4>
                    <div className="text-xs text-[#81776C] mt-0.5">
                      Submitted on {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#81776C]">STATUS:</span>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) =>
                        handleStatusChange(selectedInquiry.id, e.target.value as ClientInquiry['status'])
                      }
                      className="bg-[#1C1A17] border border-[#3A352F] text-xs px-2.5 py-1 text-[#FFFDF9] focus:outline-none focus:border-[#B56A3A]"
                    >
                      <option value="new">NEW</option>
                      <option value="reviewed">REVIEWED</option>
                      <option value="contacted">CONTACTED</option>
                      <option value="archived">ARCHIVED</option>
                    </select>
                  </div>
                </div>

                {/* Direct Action Hub */}
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                      `Hexaloom Studio // Architecture Discussion: ${selectedInquiry.projectType}`
                    )}&body=${encodeURIComponent(
                      `Hi ${selectedInquiry.name},\n\nThank you for reaching out to Hexaloom Studio regarding your project (${selectedInquiry.projectType}). We reviewed your specifications and would love to discuss the next steps.\n\nBest regards,\nHexaloom Studio Leadership\n${SITE_CONFIG.contact.phone}`
                    )}`}
                    className="btn-accent py-1.5 px-3 text-xs flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply to {selectedInquiry.email}</span>
                  </a>

                  {selectedInquiry.phone ? (
                    <a
                      href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hi ${selectedInquiry.name}, this is Hexaloom Studio following up on your website commission request.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#527A5A]" />
                      <span>WhatsApp Client</span>
                    </a>
                  ) : null}

                  <button
                    onClick={() => handleCopyLead(selectedInquiry)}
                    className="btn-secondary py-1.5 px-3 text-xs flex items-center gap-1.5"
                  >
                    {copiedId === selectedInquiry.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#527A5A]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#81776C]" />
                        <span>Copy Lead Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="p-1.5 border border-[#A84C4C]/40 text-[#A84C4C] hover:bg-[#A84C4C]/10 transition-colors ml-auto"
                    title="Delete inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Scope Specs Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-[#1C1A17] border border-[#3A352F]">
                  <div className="space-y-1">
                    <span className="text-[#81776C] text-[10px] block uppercase">EMAIL</span>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-[#38BDF8] hover:underline flex items-center gap-1"
                    >
                      <span>{selectedInquiry.email}</span>
                    </a>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#81776C] text-[10px] block uppercase">PHONE / WHATSAPP</span>
                    <span className="text-[#FFFDF9]">
                      {selectedInquiry.phone || 'Not provided'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#81776C] text-[10px] block uppercase">COMPANY / ORG</span>
                    <span className="text-[#FFFDF9]">
                      {selectedInquiry.company || 'Individual / Founder'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#81776C] text-[10px] block uppercase">REQUESTED SERVICE</span>
                    <span className="text-[#B56A3A] font-bold">
                      {selectedInquiry.projectType}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#81776C] text-[10px] block uppercase">ESTIMATED BUDGET</span>
                    <span className="text-[#FFFDF9]">
                      {selectedInquiry.budget}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[#81776C] text-[10px] block uppercase">TARGET TIMELINE</span>
                    <span className="text-[#FFFDF9]">
                      {selectedInquiry.timeline}
                    </span>
                  </div>
                </div>

                {/* Scope Specification Message */}
                <div className="space-y-2">
                  <div className="text-[10px] text-[#B56A3A] font-bold uppercase tracking-wider">
                    CLIENT SCOPE SPECIFICATIONS:
                  </div>
                  <div className="p-4 bg-[#1C1A17] border border-[#3A352F] text-[#CFC5B8] leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-[#81776C]">
                Select an inquiry from the left to inspect details.
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-3 sm:px-6 border-t border-[#3A352F] bg-[#141210] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#81776C] gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#527A5A] animate-pulse" />
            <span>Transmitted live to {SITE_CONFIG.contact.email} &amp; Local Storage</span>
          </div>
          <div>
            WhatsApp Alert Hotline: {SITE_CONFIG.contact.displayPhone}
          </div>
        </div>
      </div>
    </div>
  );
};
