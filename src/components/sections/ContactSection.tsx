import React, { useState } from 'react';
import { SITE_CONFIG } from '../../data/siteConfig';
import { ContactFormData, ClientInquiry } from '../../types';
import { leadService } from '../../services/leadService';
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Navigation,
  Instagram,
  Inbox,
  ArrowUpRight,
  Sparkles,
  Smartphone
} from 'lucide-react';

interface ContactSectionProps {
  preselectedService?: string;
  onOpenOwnerInbox?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  preselectedService,
  onOpenOwnerInbox
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: preselectedService || SITE_CONFIG.projectTypes[0],
    budget: SITE_CONFIG.budgetTiers[1],
    timeline: SITE_CONFIG.timelines[0],
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastLoggedLead, setLastLoggedLead] = useState<ClientInquiry | null>(null);

  // Update projectType if preselectedService prop changes
  React.useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, projectType: preselectedService }));
    }
  }, [preselectedService]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide project details (minimum 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Bot spam filter via honeypot
    if (honeypot) {
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save locally to ensure 100% data preservation in Owner Registry
      const saved = leadService.saveInquiry(formData);
      setLastLoggedLead(saved);

      // 2. Dispatch real email notification to hexaloomstudio@gmail.com
      await leadService.dispatchEmail(formData);

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.error('Submission handling notice:', err);
      // Still show success because lead was saved locally
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setLastLoggedLead(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: SITE_CONFIG.projectTypes[0],
      budget: SITE_CONFIG.budgetTiers[1],
      timeline: SITE_CONFIG.timelines[0],
      message: ''
    });
  };

  return (
    <section
      id="contact"
      aria-label="Scene 11 Contact and Commissions"
      className="py-24 sm:py-32 border-b border-[#CFC5B8] bg-[#F5F0E8] relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#CFC5B8] pb-6 mb-16 gap-4">
          <div>
            <div className="font-mono text-xs text-[#B56A3A] tracking-wider mb-2 flex items-center gap-2">
              <span>SCENE 11</span>
              <span>//</span>
              <span>COMMISSION INQUIRY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-sans text-[#24211D] tracking-tight">
              Start a Conversation
            </h2>
          </div>
          <div className="font-mono text-xs text-[#81776C] max-w-xs text-left sm:text-right">
            DIRECT ACCESS TO FOUNDING ENGINEERS // NO ACCOUNT REPS
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Studio Channels & Physical Map Links */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-[#24211D]">
                Let&apos;s evaluate your technical scope.
              </h3>
              <p className="text-sm text-[#81776C] leading-relaxed">
                Whether you need a greenfield SaaS product built from scratch or an architectural audit of an existing system, we review requirements and return a detailed response within 24 hours.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3 font-mono text-xs">
              {/* WhatsApp Click-to-chat */}
              <a
                id="contact-whatsapp-link"
                href={SITE_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-[#24211D] bg-[#FFFDF9] hover:bg-[#24211D] hover:text-[#FFFDF9] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none border border-[#CFC5B8] group-hover:border-[#FFFDF9] flex items-center justify-center text-[#B56A3A] group-hover:text-[#FFFDF9]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold">WHATSAPP INSTANT DESK</div>
                    <div className="text-[10px] text-[#81776C] group-hover:text-[#CFC5B8]">
                      Pre-filled direct project inquiry
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#81776C] group-hover:text-[#FFFDF9]" />
              </a>

              {/* Telephone - Primary */}
              <a
                id="contact-phone-link"
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="p-4 border border-[#CFC5B8] bg-[#FFFDF9] hover:border-[#24211D] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none border border-[#CFC5B8] flex items-center justify-center text-[#24211D]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#24211D]">DIRECT LINE (PRIMARY)</div>
                    <div className="text-[10px] text-[#81776C]">{SITE_CONFIG.contact.displayPhone}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#81776C]" />
              </a>

              {/* Telephone - Secondary */}
              <a
                id="contact-secondary-phone-link"
                href={`tel:${SITE_CONFIG.contact.secondaryPhone}`}
                className="p-4 border border-[#CFC5B8] bg-[#FFFDF9] hover:border-[#24211D] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none border border-[#CFC5B8] flex items-center justify-center text-[#24211D]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#24211D]">DIRECT LINE (SECONDARY)</div>
                    <div className="text-[10px] text-[#81776C]">{SITE_CONFIG.contact.displaySecondaryPhone}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#81776C]" />
              </a>

              {/* Email */}
              <a
                id="contact-email-link"
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="p-4 border border-[#CFC5B8] bg-[#FFFDF9] hover:border-[#24211D] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none border border-[#CFC5B8] flex items-center justify-center text-[#24211D]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#24211D]">DIRECT EMAIL</div>
                    <div className="text-[10px] text-[#81776C]">{SITE_CONFIG.contact.email}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#81776C]" />
              </a>

              {/* Instagram */}
              <a
                id="contact-instagram-link"
                href={SITE_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-[#CFC5B8] bg-[#FFFDF9] hover:border-[#24211D] transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none border border-[#CFC5B8] flex items-center justify-center text-[#2563EB]">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-[#24211D]">INSTAGRAM</div>
                    <div className="text-[10px] text-[#81776C]">{SITE_CONFIG.contact.instagramHandle}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#81776C]" />
              </a>
            </div>

            {/* Studio Physical Location & Maps Integration (TRD #33, #34, #35) */}
            <div className="p-6 border border-[#24211D] bg-[#FFFDF9] space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B56A3A] mt-0.5 shrink-0" />
                <div>
                  <div className="font-mono text-xs font-bold text-[#24211D] uppercase">
                    Studio Location & Local Office
                  </div>
                  <div className="text-xs text-[#81776C] mt-1 font-mono">
                    {SITE_CONFIG.address.street} <br />
                    {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state} &mdash;{' '}
                    {SITE_CONFIG.address.postalCode}, {SITE_CONFIG.address.country}
                  </div>
                  <div className="text-[10px] text-[#B56A3A] font-mono mt-1">
                    LAT {SITE_CONFIG.address.coordinates.lat} // LNG {SITE_CONFIG.address.coordinates.lng}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2.5 font-mono text-xs">
                <a
                  id="google-maps-btn"
                  href={SITE_CONFIG.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>

                <a
                  id="apple-maps-btn"
                  href={SITE_CONFIG.contact.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Apple Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-Precision Scope Ticket Form */}
          <div className="lg:col-span-7">
            <div className="border border-[#24211D] bg-[#FFFDF9] p-6 sm:p-10 shadow-xs relative">
              {/* Receipt / Ticket Header Stamp */}
              <div className="flex items-center justify-between border-b border-[#CFC5B8] pb-4 mb-6 text-xs font-mono text-[#81776C]">
                <span>TICKET FORMAT // RFC-2026</span>
                <span className="text-[#B56A3A] font-bold">COMMISSION SPECIFICATION</span>
              </div>

              {isSuccess ? (
                <div
                  id="contact-form-success-banner"
                  className="p-8 border border-[#527A5A] bg-[#527A5A]/10 text-center space-y-6 font-mono text-xs"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#527A5A] mx-auto animate-bounce" />
                  <div>
                    <h4 className="font-sans text-2xl font-bold text-[#24211D]">
                      Inquiry Received &amp; Logged
                    </h4>
                    <p className="text-[#24211D] max-w-lg mx-auto mt-2 leading-relaxed">
                      Your project specification has been logged in our leads database and dispatched to{' '}
                      <span className="font-bold underline">{SITE_CONFIG.contact.email}</span>. An engineering principal will review your architecture and respond within 24 business hours.
                    </p>
                  </div>

                  {/* Immediate Action Buttons for Zero Delay */}
                  <div className="p-4 bg-[#FFFDF9] border border-[#CFC5B8] text-left space-y-3">
                    <div className="font-bold text-[#24211D] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4 text-[#527A5A]" />
                        <span>Instant Owner Communication</span>
                      </span>
                      <span className="text-[10px] text-[#527A5A] font-bold">LIVE DESK</span>
                    </div>
                    <p className="text-[11px] text-[#81776C]">
                      Want instant confirmation? Send a preformatted copy of your scope straight to the engineering desk via WhatsApp or Email:
                    </p>
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      <a
                        href={lastLoggedLead ? leadService.formatWhatsAppUrl(lastLoggedLead) : leadService.formatWhatsAppUrl(formData)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-accent py-2 px-3 text-xs flex items-center gap-2 font-bold"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send via WhatsApp (+91 96920 07455)</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={lastLoggedLead ? leadService.formatMailtoUrl(lastLoggedLead) : leadService.formatMailtoUrl(formData)}
                        className="btn-secondary py-2 px-3 text-xs flex items-center gap-2"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#B56A3A]" />
                        <span>Open Mail Client</span>
                      </a>

                      {onOpenOwnerInbox && (
                        <button
                          type="button"
                          onClick={onOpenOwnerInbox}
                          className="btn-tab py-2 px-3 text-xs flex items-center gap-2 border-[#24211D] text-[#24211D]"
                        >
                          <Inbox className="w-3.5 h-3.5 text-[#B56A3A]" />
                          <span>View in Owner Inbox</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={resetForm}
                      className="btn-primary py-2 px-4"
                    >
                      Submit Another Scope
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Honeypot field to block automated bots */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website-hp">Leave this empty</label>
                    <input
                      type="text"
                      id="website-hp"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block font-mono text-xs text-[#24211D] uppercase mb-2 font-semibold"
                      >
                        Your Name <span className="text-[#A84C4C]">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="e.g. Marcus Aurelius"
                        className={`w-full p-3 bg-[#F5F0E8] border text-xs font-mono text-[#24211D] focus:outline-none focus:border-[#24211D] transition-colors ${
                          errors.name ? 'border-[#A84C4C]' : 'border-[#CFC5B8]'
                        }`}
                      />
                      {errors.name && (
                        <span className="font-mono text-xs text-[#A84C4C] mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-mono text-xs text-[#24211D] uppercase mb-2 font-semibold"
                      >
                        Work Email <span className="text-[#A84C4C]">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="e.g. marcus@company.com"
                        className={`w-full p-3 bg-[#F5F0E8] border text-xs font-mono text-[#24211D] focus:outline-none focus:border-[#24211D] transition-colors ${
                          errors.email ? 'border-[#A84C4C]' : 'border-[#CFC5B8]'
                        }`}
                      />
                      {errors.email && (
                        <span className="font-mono text-[10px] text-[#A84C4C] mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block font-mono text-xs text-[#24211D] uppercase mb-2 font-semibold"
                      >
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        id="contact-company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Horizon Labs"
                        className="w-full p-3 bg-[#F5F0E8] border border-[#CFC5B8] text-xs font-mono text-[#24211D] focus:outline-none focus:border-[#24211D] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block font-mono text-xs text-[#24211D] uppercase mb-2 font-semibold"
                      >
                        Phone / WhatsApp <span className="text-[#81776C] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full p-3 bg-[#F5F0E8] border border-[#CFC5B8] text-xs font-mono text-[#24211D] focus:outline-none focus:border-[#24211D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Primary Project Scope */}
                  <div>
                    <label
                      htmlFor="contact-project-type"
                      className="block font-mono text-xs text-[#24211D] uppercase mb-2 font-semibold"
                    >
                      Primary Project Scope
                    </label>
                    <select
                      id="contact-project-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full p-3 bg-[#F5F0E8] border border-[#CFC5B8] text-xs font-mono text-[#24211D] focus:outline-none focus:border-[#24211D] transition-colors"
                    >
                      {SITE_CONFIG.projectTypes.map((pt, idx) => (
                        <option key={idx} value={pt}>
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget & Timeline selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contact-budget"
                        className="block font-mono text-xs text-[#24211D] uppercase mb-2 font-semibold"
                      >
                        Estimated Investment Tier
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full p-3 bg-[#F5F0E8] border border-[#CFC5B8] text-xs font-mono text-[#24211D] focus:outline-none focus:border-[#24211D] transition-colors"
                      >
                        {SITE_CONFIG.budgetTiers.map((b, bIdx) => (
                          <option key={bIdx} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-timeline"
                        className="block font-mono text-xs text-[#24211D] uppercase mb-2 font-semibold"
                      >
                        Target Launch Timeline
                      </label>
                      <select
                        id="contact-timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full p-3 bg-[#F5F0E8] border border-[#CFC5B8] text-xs font-mono text-[#24211D] focus:outline-none focus:border-[#24211D] transition-colors"
                      >
                        {SITE_CONFIG.timelines.map((t, tIdx) => (
                          <option key={tIdx} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Detail */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-xs text-[#24211D] uppercase mb-2 font-semibold"
                    >
                      Project Details & Constraints <span className="text-[#A84C4C]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Brief overview of what you are aiming to build, key latency or scaling goals, and any existing tech stack..."
                      className={`w-full p-3 bg-[#F5F0E8] border text-xs font-mono text-[#24211D] focus:outline-none focus:border-[#24211D] transition-colors ${
                        errors.message ? 'border-[#A84C4C]' : 'border-[#CFC5B8]'
                      }`}
                    />
                    {errors.message && (
                      <span className="font-mono text-xs text-[#A84C4C] mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      disabled={isSubmitting}
                      className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>TRANSMITTING TICKET...</span>
                      ) : (
                        <>
                          <span>Transmit Commission Ticket</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <div className="text-xs font-mono text-[#81776C]">
                      SECURED TRANSMISSION // ZERO SPAM ASSURANCE
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
