import React, { useState } from 'react';
import { Language, TabType, CustomerUser } from '../types';
import { translations } from '../translations';
import {
  ShieldAlert,
  Sparkles,
  Languages,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  onNavigateTab: (tab: TabType) => void;
  customer: CustomerUser | null;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  onNavigateTab,
  customer,
  onOpenLogin,
  onLogout,
}) => {
  const t = translations[language];
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand identity */}
        <button
          onClick={() => onNavigateTab('home')}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95 shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-amber-500/20">
            ₹
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 tracking-tight text-lg sm:text-xl">
                {language === 'hi' ? 'पैसाहेल्प' : 'PaisaHelp'}
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-md uppercase tracking-wider flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> AI
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-none line-clamp-1">
              {t.appTagline}
            </p>
          </div>
        </button>

        {/* Right actions: Login Badge/Button + Language switch button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Customer Login State */}
          {customer ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors text-xs font-bold text-slate-800"
              >
                {customer.avatarUrl ? (
                  <img
                    src={customer.avatarUrl}
                    alt={customer.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="hidden sm:block text-left leading-tight">
                  <span className="block text-slate-900 line-clamp-1 max-w-[100px]">
                    {customer.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal">
                    {customer.loginMethod === 'mobile' ? 'Mobile' : 'Google'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 text-xs space-y-1.5 animate-in fade-in zoom-in-95 duration-100">
                  <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="font-bold text-slate-900 line-clamp-1">{customer.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium line-clamp-1">
                      {customer.identifier}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      onLogout();
                    }}
                    className="w-full p-2 text-rose-700 hover:bg-rose-50 rounded-xl font-bold flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>{t.logoutBtn}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-95"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.loginBtn}</span>
            </button>
          )}

          {/* Cyber Helpline badge (desktop) */}
          <button
            onClick={() => onNavigateTab('scam-alert')}
            className="hidden md:flex items-center gap-1 px-2 py-1 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors"
            title="Cyber Crime Helpline 1930"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>1930</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95 shrink-0"
            aria-label="Change Language"
          >
            <Languages className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
