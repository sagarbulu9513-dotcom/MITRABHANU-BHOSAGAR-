import React, { useState, useEffect } from 'react';
import { CustomerUser, Language } from '../types';
import { translations } from '../translations';
import {
  Smartphone,
  ShieldCheck,
  X,
  CheckCircle,
  ArrowRight,
  RefreshCw,
  Lock,
  UserCheck,
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLoginSuccess: (user: CustomerUser) => void;
  initialUserEmail?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  language,
  onLoginSuccess,
  initialUserEmail = '',
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
    initialUserEmail ? initialUserEmail.split('@')[0] : ''
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

  if (!isOpen) return null;

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
          ? 'कृपया भेजा गया ओटीपी कोड दर्ज करें।'
          : 'Please enter the received OTP code.'
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
    onClose();
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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 overflow-hidden relative my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-700 text-white p-5 sm:p-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-amber-100 text-[11px] font-bold">
            <UserCheck className="w-3.5 h-3.5" />
            <span>PaisaHelp ID</span>
          </div>
          <h3 className="text-xl font-extrabold tracking-tight mt-1.5">
            {t.loginTitle}
          </h3>
          <p className="text-xs text-amber-100/90 leading-relaxed mt-1">
            {t.loginSubtitle}
          </p>
        </div>

        {/* Method Switcher Tabs */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => {
                setMethod('mobile');
                setErrorMsg(null);
              }}
              className={`py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                method === 'mobile'
                  ? 'bg-white text-slate-900 shadow-xs'
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
              className={`py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                method === 'google'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {/* Multicolored Google G Icon */}
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

          {errorMsg && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* METHOD 1: MOBILE OTP FLOW */}
          {method === 'mobile' && (
            <div>
              {otpStep === 'input_phone' ? (
                <form onSubmit={handleSendMobileOtp} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {t.nameLabel} ({language === 'hi' ? 'वैकल्पिक' : 'Optional'})
                    </label>
                    <input
                      type="text"
                      placeholder={t.namePlaceholder}
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {t.mobileLabel} *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-100 text-slate-700 font-bold text-xs">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        placeholder={t.mobilePlaceholder}
                        value={mobileNumber}
                        onChange={(e) =>
                          setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))
                        }
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-r-xl font-bold text-sm tracking-wider focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium">
                    {language === 'hi'
                      ? 'लॉगिन करने के लिए आपके मोबाइल नंबर पर एक बार का सुरक्षा कोड (OTP) भेजा जाएगा।'
                      : 'We will send a one-time verification code to this phone number.'}
                  </p>

                  <button
                    type="submit"
                    disabled={isSendingOtp}
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
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
                <form onSubmit={handleVerifyMobileOtp} className="space-y-3.5 text-xs">
                  <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 text-amber-900">
                    <span className="font-bold block">
                      {language === 'hi' ? 'ओटीपी भेजा गया:' : 'OTP Sent to:'}
                    </span>
                    <span className="font-bold text-sm text-slate-900">
                      +91 {mobileNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => setOtpStep('input_phone')}
                      className="text-[11px] font-bold text-amber-700 underline block mt-0.5"
                    >
                      {language === 'hi' ? 'नंबर बदलें' : 'Change Number'}
                    </button>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
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
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-black text-center text-lg tracking-widest focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                    <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
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
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{t.btnVerifyOtp}</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* METHOD 2: GOOGLE ID FLOW */}
          {method === 'google' && (
            <form onSubmit={handleGoogleSignIn} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'hi' ? 'Google ईमेल ID:' : 'Google Account Email:'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="sagarbulu9513@gmail.com"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.nameLabel}:
                </label>
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'आपका नाम' : 'Your name'}
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-xs sm:text-sm border-2 border-slate-300 shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2.5"
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
                <span>{t.googleBtnLabel}</span>
              </button>
            </form>
          )}

          {/* Privacy Note */}
          <div className="pt-2 border-t border-slate-100">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{t.privacyNote}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
