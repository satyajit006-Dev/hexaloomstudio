import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../../data/siteConfig';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      id="legal-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#24211D]/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        id="legal-modal-content"
        className="bg-[#F5F0E8] border border-[#24211D] max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-[#CFC5B8] pb-4 mb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#B56A3A]">
              {type === 'privacy' ? <Shield className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              <span className="uppercase font-bold">
                {type === 'privacy' ? 'Privacy Policy & Data Notice' : 'Terms of Service & Engagement'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 border border-[#CFC5B8] hover:border-[#24211D] text-[#24211D] bg-[#FFFDF9] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Legal Text Body */}
          <div className="font-serif text-sm text-[#24211D] leading-relaxed space-y-6">
            {type === 'privacy' ? (
              <>
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    1. Identity & Data Controller
                  </h3>
                  <p>
                    {SITE_CONFIG.name} (&quot;Studio&quot;, &quot;we&quot;, &quot;our&quot;) operates as an architectural software engineering studio located at Infocity, Bhubaneswar, Odisha, India. This Privacy Policy informs users of our data practices regarding project inquiries, communications, and digital interactions.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    2. Information We Collect
                  </h3>
                  <p>
                    We collect personal information solely when voluntarily provided by prospective clients via our commission ticket form, WhatsApp click-to-chat links, or direct telephone/email inquiries. Such data includes:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 font-mono text-xs">
                    <li>Full Name and Professional Title</li>
                    <li>Corporate / Work Email Address</li>
                    <li>Company / Entity Name and Project Specifications</li>
                    <li>Budgetary brackets and target delivery schedules</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    3. Analytics & Cookie Tracking
                  </h3>
                  <p>
                    We prioritize user privacy and performance. We do not use third-party behavioral ad trackers or cross-site fingerprinting. Non-essential performance telemetry is strictly gated behind explicit cookie consent preferences.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    4. Third-Party Integrations & External Links
                  </h3>
                  <p>
                    Our site includes direct URL integrations with WhatsApp (Meta Platforms), Google Maps, Apple Maps, and code repositories (GitHub). When clicking external links, you interact with respective third-party privacy terms.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    5. Data Security & Retention
                  </h3>
                  <p>
                    Inquiry information is encrypted in transit using industry-standard TLS. We retain project inquiries solely for the duration required to evaluate, formulate proposals, or complete contract negotiations, after which data is securely purged upon written request.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    6. Contacting the Studio
                  </h3>
                  <p>
                    For privacy questions or data deletion requests, contact our privacy desk directly at{' '}
                    <span className="font-mono text-xs font-bold text-[#B56A3A]">
                      {SITE_CONFIG.contact.email}
                    </span>
                    .
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    1. Acceptance of Terms
                  </h3>
                  <p>
                    By browsing, accessing, or transmitting inquiries to {SITE_CONFIG.name}, you agree to abide by these Terms of Service. These terms govern website usage, project estimation inquiries, and intellectual property provisions.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    2. Intellectual Property Rights
                  </h3>
                  <p>
                    All editorial copy, design layouts, visual systems, architectural diagrams, and code snippets showcased on this website are the proprietary property of {SITE_CONFIG.name} or licensed by respective client partners. Unauthorized duplication, scraping, or automated harvesting is strictly prohibited.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    3. Case Studies & Client Attribution
                  </h3>
                  <p>
                    Case study metrics and architectural summaries represent actual production deployments executed under client authorization. Client logos and brand marks belong to their respective corporate entities.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    4. Scope Estimates & Non-Binding Inquiries
                  </h3>
                  <p>
                    Estimates, budget ranges, and timelines submitted via the website commission form constitute preliminary discussions and do not form a binding contract until formal Master Service Agreements (MSA) and Statements of Work (SOW) are signed by authorized officers.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    5. Limitation of Liability
                  </h3>
                  <p>
                    This website is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of uninterrupted uptime. Under no circumstances will {SITE_CONFIG.name} be liable for indirect or consequential damages arising from site access.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-lg text-[#24211D] uppercase mb-2">
                    6. Governing Jurisdiction
                  </h3>
                  <p>
                    These terms are governed and construed under the laws of the State of Odisha and the Republic of India, with exclusive jurisdiction in the courts of Bhubaneswar.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-6 border-t border-[#CFC5B8] mt-8 flex items-center justify-between font-mono text-xs">
          <span className="text-[#81776C]">LAST REVISED: SEPTEMBER 2026</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#24211D] text-[#FFFDF9] hover:bg-[#B56A3A] transition-colors uppercase font-mono text-xs"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
