import React, { useState, useEffect } from 'react';
import { CustomerUser, Language } from '../types';
import { translations } from '../translations';
import {
  Smartphone,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Lock,
  UserCheck,
  Languages,
  Sparkles,
  Compass,
  Briefcase,
  Laptop,
  Wallet,
  CheckSquare,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';

interface LoginScreenProps {
  language: Language;
  onToggleLanguage: () => void;
  onLoginSuccess: (user: CustomerUser) => void;
  initialUserEmail?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  language,
  onToggleLanguage,
  onLoginSuccess,
  initialUserEmail = 'sagarbulu9513@gmail.com',
}) => {
  const t = translations[language];

  const [method, setMethod] = useState<'mobile' | 'google'>('mobile');

  // Mobile login fields
  const [mobileNumber, setMobileNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [otpStep, setOtpStep] = useState<'input_phone' | 'input_otp'>('input_phone');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Google ID fields
  const [googleEmail, setGoogleEmail] = useState(initialUserEmail || '');
  const [googleName, setGoogleName] = useState(
    initialUserEmail ? initialUserEmail.split('@')[0].replace(/[._]/g, ' ') : ''
  );

  useEffect(() => {
    let interval: any;
    if (otpStep === 'input_otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpStep, resendTimer]);

  const handleSendMobileOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg(
        language === 'hi'
          ? 'कृपया सही 10-अंकों का मोबाइल नंबर दर्ज करें।'
          : 'Please enter a valid 10-digit mobile number.'
      );
      return;
    }

    setIsSendingOtp(true);
    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpStep('input_otp');
      setResendTimer(30);
    }, 600);
  };

  const handleVerifyMobileOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (enteredOtp.trim().length < 4) {
      setErrorMsg(
        language === 'hi'
          ? 'कृपया भेजा गया 6-अंकों का ओटीपी कोड दर्ज करें।'
          : 'Please enter the 6-digit OTP code received.'
      );
      return;
    }

    const cleanPhone = mobileNumber.replace(/\D/g, '').slice(-10);
    const resolvedName =
      userName.trim() ||
      (language === 'hi'
        ? `उपयोगकर्ता (${cleanPhone.slice(-4)})`
        : `User (${cleanPhone.slice(-4)})`);

    const customer: CustomerUser = {
      id: `usr-mob-${Date.now()}`,
      name: resolvedName,
      loginMethod: 'mobile',
      identifier: `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`,
      createdAt: new Date().toISOString(),
    };

    onLoginSuccess(customer);
  };

  const handleGoogleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const email = googleEmail.trim() || 'user@gmail.com';
    const name =
      googleName.trim() ||
      email.split('@')[0].replace(/[._]/g, ' ') ||
      'Google User';

    const customer: CustomerUser = {
      id: `usr-g-${Date.now()}`,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      loginMethod: 'google',
      identifier: email,
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        name
      )}&backgroundColor=059669`,
      createdAt: new Date().toISOString(),
    };

    onLoginSuccess(customer);
  };

  // Preview features locked behind login
  const previewFeatures = [
    {
      icon: Compass,
      title: language === 'hi' ? 'AI अर्निंग असिस्टेंट' : 'AI Earning Assistant',
      desc: language === 'hi' ? 'अपनी उम्र, कौशल और बजट अनुसार 7-दिवसीय एक्शन प्लान पाएं' : 'Personalized 7-day earning pathway based on your skills & budget',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      icon: Briefcase,
      title: language === 'hi' ? 'छोटा व्यापार जनरेटर' : 'Small Business Generator',
      desc: language === 'hi' ? '₹0 से ₹25,000 में शुरू होने वाले जमीनी व्यापार मॉडल' : 'Ground-level micro businesses from ₹0 to ₹25,000 setup capital',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      icon: Laptop,
      title: language === 'hi' ? 'वर्क फ्रॉम होम गाइड' : 'Genuine WFH Guide',
      desc: language === 'hi' ? 'सच्चे रिमोट काम और फर्जी फीस मांगने वाले जॉब्स से सुरक्षा' : 'Verified remote opportunities & warning signs against fake upfront-fee jobs',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      icon: Wallet,
      title: language === 'hi' ? 'खर्च व बचत ट्रैकर' : 'Expense & Savings Tracker',
      desc: language === 'hi' ? 'दैनिक आय-व्यय का हिसाब और सुरक्षित बचत लक्ष्य' : 'Manual Rupee income/expense ledger with emergency fund progress',
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
    {
      icon: CheckSquare,
      title: language === 'hi' ? 'एक्शन प्लान चार्ट्स (Recharts)' : 'Action Plan with Visual Charts',
      desc: language === 'hi' ? 'लर्निंग और कमाई टास्क की प्रगति डोनट व बार ग्राफ में देखें' : 'Visual Donut & Bar charts tracking completed vs pending tasks',
      color: 'text-teal-600 bg-teal-50 border-teal-200',
    },
    {
      icon: ShieldAlert,
      title: language === 'hi' ? 'स्कैम व फ्रॉड मैसेज चेकर' : 'Scam & Fraud Analyzer',
      desc: language === 'hi' ? 'व्हाट्सएप व टेलीग्राम के संदिग्ध जॉब ऑफर्स की तुरंत जांच' : 'Instant AI risk analyzer for suspicious WhatsApp & loan messages',
      color: 'text-rose-600 bg-rose-50 border-rose-200',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans text-slate-900">
      {/* Top Bar with Brand & Language Toggle */}
      <header className="bg-white border-b border-slate-200 shadow-xs sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
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
          </div>

          <div className="flex items-center gap-2">
            {/* National Helpline */}
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-xl">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>हेल्पलाइन: 1930</span>
            </div>

            {/* Language Switch */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95"
            >
              <Languages className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'hi' ? 'English' : 'हिंदी'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Welcome Hero Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-700 text-white rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-amber-100 text-xs font-bold border border-white/25">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.heroBadge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === 'hi' ? 'स्वागत है PaisaHelp AI में' : 'Welcome to PaisaHelp AI'}
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed max-w-xl">
              {language === 'hi'
                ? 'सभी फीचर्स (कमाई के रास्ते, छोटा व्यापार आईडिया, खर्च ट्रैकर, एक्शन प्लान और स्कैम चेकर) का उपयोग करने के लिए कृपया पहले लॉगिन करें।'
                : 'Please log in to unlock personalized earning paths, small business ideas, expense tracker, visual action plans, and scam detection.'}
            </p>
          </div>
        </div>

        {/* The Mandatory Login Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="p-5 sm:p-6 bg-slate-50/80 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider">
                <UserCheck className="w-4 h-4" />
                <span>{language === 'hi' ? 'ग्राहक लॉगिन अनिवार्य है' : 'Customer Login Required'}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                {t.loginTitle}
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                {t.loginSubtitle}
              </p>
            </div>

            {/* Method Pills */}
            <div className="grid grid-cols-2 p-1 bg-slate-200/80 rounded-2xl border border-slate-300/80 text-xs self-start sm:self-auto min-w-[260px]">
              <button
                type="button"
                onClick={() => {
                  setMethod('mobile');
                  setErrorMsg(null);
                }}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                  method === 'mobile'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-4 h-4 text-amber-600" />
                <span>{t.tabMobile}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMethod('google');
                  setErrorMsg(null);
                }}
                className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                  method === 'google'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{t.tabGoogle}</span>
              </button>
            </div>
          </div>

          {/* Form Content Area */}
          <div className="p-5 sm:p-7 space-y-4">
            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 font-semibold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* METHOD 1: MOBILE NUMBER WITH OTP */}
            {method === 'mobile' && (
              <div>
                {otpStep === 'input_phone' ? (
                  <form onSubmit={handleSendMobileOtp} className="space-y-4 max-w-lg">
                    <div>
                      <label className="block font-bold text-slate-700 text-xs mb-1">
                        {t.nameLabel} ({language === 'hi' ? 'वैकल्पिक' : 'Optional'})
                      </label>
                      <input
                        type="text"
                        placeholder={t.namePlaceholder}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 text-xs mb-1">
                        {t.mobileLabel} *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3.5 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm">
                          🇮🇳 +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          required
                          autoFocus
                          placeholder={t.mobilePlaceholder}
                          value={mobileNumber}
                          onChange={(e) =>
                            setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
                          }
                          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-r-xl font-bold text-sm tracking-wider focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 font-medium">
                      {language === 'hi'
                        ? 'लॉगिन करने के लिए आपके मोबाइल नंबर पर 6-अंकों का एसएमएस सुरक्षा कोड (OTP) भेजा जाएगा।'
                        : 'We will send a 6-digit one-time SMS verification code to verify your phone.'}
                    </p>

                    <button
                      type="submit"
                      disabled={isSendingOtp}
                      className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isSendingOtp ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>{language === 'hi' ? 'ओटीपी भेजा जा रहा है...' : 'Sending OTP...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.btnSendOtp}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* OTP Verification Step */
                  <form onSubmit={handleVerifyMobileOtp} className="space-y-4 max-w-lg">
                    <div className="bg-amber-50/90 p-3.5 rounded-2xl border border-amber-200 text-amber-900 flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-xs block">
                          {language === 'hi' ? 'ओटीपी भेजा गया:' : 'OTP Sent to:'}
                        </span>
                        <span className="font-extrabold text-sm text-slate-900">
                          +91 {mobileNumber}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpStep('input_phone');
                          setErrorMsg(null);
                        }}
                        className="text-xs font-bold text-amber-700 underline"
                      >
                        {language === 'hi' ? 'नंबर बदलें' : 'Change Number'}
                      </button>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 text-xs mb-1">
                        {t.otpLabel} *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        autoFocus
                        placeholder={t.otpPlaceholder}
                        value={enteredOtp}
                        onChange={(e) =>
                          setEnteredOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-black text-center text-xl tracking-widest focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                      <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
                        ✓ {t.demoOtpTip}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      {resendTimer > 0 ? (
                        <span>
                          {language === 'hi'
                            ? `दोबारा भेजें (${resendTimer}s)`
                            : `Resend in ${resendTimer}s`}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setResendTimer(30);
                            setErrorMsg(null);
                          }}
                          className="text-amber-700 font-bold hover:underline"
                        >
                          {t.btnResendOtp}
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{t.btnVerifyOtp}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* METHOD 2: GOOGLE ID */}
            {method === 'google' && (
              <form onSubmit={handleGoogleSignIn} className="space-y-4 max-w-lg text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {language === 'hi' ? 'Google ईमेल ID:' : 'Google Account Email:'} *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sagarbulu9513@gmail.com"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.nameLabel}:
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'hi' ? 'आपका नाम (उदा. सागर कुमार)' : 'Your Name (e.g. Sagar Kumar)'}
                    value={googleName}
                    onChange={(e) => setGoogleName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border-2 border-slate-300 shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{t.googleBtnLabel}</span>
                </button>
              </form>
            )}

            {/* Safety Guarantee */}
            <div className="pt-3 border-t border-slate-100">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{t.privacyNote}</span>
              </div>
            </div>
          </div>
        </div>

        {/* What You Unlock Preview Grid */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-slate-500" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wider">
              {language === 'hi'
                ? 'लॉगिन के बाद उपलब्ध होने वाले सभी फीचर्स:'
                : 'Features Unlocked After Login:'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {previewFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-1.5 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg border ${feat.color}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                      {feat.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 px-4">
        <p className="font-semibold text-slate-700">
          PaisaHelp AI — {t.appTagline}
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          {language === 'hi'
            ? 'भारत के युवाओं, छात्रों, गृहणियों और कामगारों के लिए समर्पित मंच।'
            : 'Dedicated platform empowering Indian students, homemakers, and workers.'}
        </p>
      </footer>
    </div>
  );
};
