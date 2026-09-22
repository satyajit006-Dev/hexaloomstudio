import React, { useState, useEffect } from 'react';
import { Shield, Check, X, Sliders } from 'lucide-react';
import { CookiePreferences } from '../../types';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always required
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const storedConsent = localStorage.getItem('ds_cookie_consent');
    if (!storedConsent) {
      // Delay prompt slightly for a smooth load
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('ds_cookie_consent', JSON.stringify(prefs));
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true };
    setPreferences(all);
    savePreferences(all);
  };

  const handleRejectAll = () => {
    const minimal = { essential: true, analytics: false, marketing: false };
    setPreferences(minimal);
    savePreferences(minimal);
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookie-consent-banner"
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg z-50 bg-[#FFFDF9] border border-[#24211D] p-6 shadow-xl font-mono text-xs animate-in slide-in-from-bottom-3 duration-300"
    >
      <div className="flex items-start gap-3 mb-4">
        <Shield className="w-5 h-5 text-[#B56A3A] shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-[#24211D] uppercase text-xs">
            Privacy & Telemetry Consent
          </div>
          <p className="text-[#81776C] mt-1 font-serif text-sm leading-relaxed">
            We use minimal cookies to understand how visitors explore our architectural case studies and to optimize system performance.
          </p>
        </div>
      </div>

      {showPreferences && (
        <div className="py-3 my-3 border-y border-[#CFC5B8] space-y-2.5 text-[11px]">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-[#24211D]">Essential System Storage</span>
              <span className="block text-[#81776C]">Required for navigation & form security</span>
            </div>
            <span className="text-[#527A5A] font-bold">REQUIRED</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-[#24211D]">Performance Analytics</span>
              <span className="block text-[#81776C]">Anonymous scroll and latency telemetry</span>
            </div>
            <input
              type="checkbox"
              id="cookie-pref-analytics"
              checked={preferences.analytics}
              onChange={(e) =>
                setPreferences({ ...preferences, analytics: e.target.checked })
              }
              className="accent-[#B56A3A] w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-[#24211D]">Marketing / Attribution</span>
              <span className="block text-[#81776C]">Referral source validation</span>
            </div>
            <input
              type="checkbox"
              id="cookie-pref-marketing"
              checked={preferences.marketing}
              onChange={(e) =>
                setPreferences({ ...preferences, marketing: e.target.checked })
              }
              className="accent-[#B56A3A] w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
        <button
          onClick={() => setShowPreferences(!showPreferences)}
          className="text-[#81776C] hover:text-[#24211D] underline text-[11px] flex items-center gap-1 focus:outline-none"
        >
          <Sliders className="w-3 h-3 text-[#B56A3A]" />
          <span>{showPreferences ? 'Hide Options' : 'Preferences'}</span>
        </button>

        <div className="flex items-center gap-2">
          {showPreferences ? (
            <button
              onClick={handleSaveCustom}
              className="px-3 py-1.5 bg-[#24211D] text-[#FFFDF9] hover:bg-[#B56A3A] transition-colors uppercase text-[11px]"
            >
              Save Preferences
            </button>
          ) : (
            <>
              <button
                id="cookie-reject-btn"
                onClick={handleRejectAll}
                className="px-3 py-1.5 border border-[#CFC5B8] hover:border-[#24211D] text-[#24211D] transition-colors uppercase text-[11px]"
              >
                Reject Non-Essential
              </button>
              <button
                id="cookie-accept-btn"
                onClick={handleAcceptAll}
                className="px-3 py-1.5 bg-[#24211D] hover:bg-[#B56A3A] text-[#FFFDF9] transition-colors uppercase text-[11px] font-bold"
              >
                Accept All
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
