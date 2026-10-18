import React from 'react';
import { Language, TabType, CustomerUser } from '../types';
import { translations } from '../translations';
import {
  Compass,
  Briefcase,
  Wallet,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  AlertOctagon,
  CheckCircle2,
  Users,
  Award,
  Zap,
  UserCheck,
  UserPlus,
} from 'lucide-react';

interface HomeScreenProps {
  language: Language;
  onNavigateTab: (tab: TabType) => void;
  onSelectCuratedFilter?: (filterName: string) => void;
  customer?: CustomerUser | null;
  onOpenLogin?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onNavigateTab,
  customer,
  onOpenLogin,
}) => {
  const t = translations[language];

  const caseStudies = [
    {
      name: language === 'hi' ? 'सुनीता शर्मा (जयपुर, राजस्थान)' : 'Sunita Sharma (Jaipur, Rajasthan)',
      role: language === 'hi' ? 'गृहणी → होम टिफिन व स्नैक सेवा' : 'Homemaker → Home Tiffin Service',
      investment: '₹2,000',
      monthly: '₹16,500 / माह',
      story: language === 'hi'
        ? 'पास के कोचिंग सेंटर के 6 छात्रों से साप्ताहिक अग्रिम लेकर खाना शुरू किया। आज 14 नियमित ग्राहक हैं।'
        : 'Started with 6 coaching students taking weekly prepayments. Now serves 14 daily subscribers reliably.',
    },
    {
      name: language === 'hi' ? 'राहुल वर्मा (अयोध्या, उत्तर प्रदेश)' : 'Rahul Verma (Ayodhya, UP)',
      role: language === 'hi' ? 'छात्र → स्थानीय दुकानों का Canva डिजाइनर' : 'Student → Local Canva Designer',
      investment: '₹0 (मोबाइल फोन)',
      monthly: '₹9,000 / माह',
      story: language === 'hi'
        ? 'रोज 2 घंटे फोन से मिठाई दुकानों और सैलून के व्हाट्सएप स्टेटस बैनर बनाए। कॉलेज की फीस खुद भरते हैं।'
        : 'Spends 2 hours making WhatsApp promo banners for sweet shops and salons on his mobile. Pays own college fees.',
    },
    {
      name: language === 'hi' ? 'दिनेश कुमार (गया, बिहार)' : 'Dinesh Kumar (Gaya, Bihar)',
      role: language === 'hi' ? 'ग्रामीण युवा → ई-मित्र व फॉर्म सहायक' : 'Rural Youth → Citizen Portal Helper',
      investment: '₹1,500',
      monthly: '₹14,000 / माह',
      story: language === 'hi'
        ? 'गांव वालों के किसान सम्मान निधि और छात्रवृत्ति के फॉर्म भरवाने में मदद की। नाममात्र सुविधा शुल्क लिया।'
        : 'Assists villagers with PM-Kisan and scholarship digital filings charging a fair nominal service fee.',
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white p-5 sm:p-7 shadow-lg">
        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-200 text-xs font-semibold border border-white/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
            {t.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-2xl">
            {t.heroSubtitle}
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigateTab('earning-path')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-amber-900 font-bold text-sm rounded-xl shadow-md hover:bg-amber-50 active:scale-95 transition-all"
            >
              <span>{t.actionFindPathTitle}</span>
              <ArrowRight className="w-4 h-4 text-amber-700" />
            </button>
            <button
              onClick={() => onNavigateTab('business-ideas')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-800/80 hover:bg-amber-800 text-white font-semibold text-sm rounded-xl border border-white/20 active:scale-95 transition-all"
            >
              <Briefcase className="w-4 h-4 text-amber-300" />
              <span>{t.actionBusinessTitle}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Customer Status / Greeting Banner */}
      {customer ? (
        <section className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 sm:p-4.5 shadow-2xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {customer.avatarUrl ? (
              <img
                src={customer.avatarUrl}
                alt={customer.name}
                className="w-10 h-10 rounded-xl object-cover shrink-0 border border-emerald-300"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-xs">
                {customer.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-200 text-emerald-900 uppercase">
                  {customer.loginMethod === 'mobile' ? 'Mobile Verified' : 'Google ID'}
                </span>
                <span className="text-xs text-emerald-700 font-semibold truncate">
                  {customer.identifier}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate mt-0.5">
                {language === 'hi'
                  ? `नमस्ते, ${customer.name} जी! आपका स्वागत है।`
                  : `Welcome back, ${customer.name}!`}
              </h2>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('action-plan')}
            className="shrink-0 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 flex items-center gap-1"
          >
            <span>{language === 'hi' ? 'मेरा प्लान' : 'My Plan'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>
      ) : (
        <section className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'hi'
                  ? 'अपना व्यक्तिगत खाता बनाएं या लॉगिन करें'
                  : 'Log in to sync your earnings and expenses'}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {language === 'hi'
                  ? 'मोबाइल नंबर (OTP) या Google ID से तुरंत 10 सेकंड में जुड़ें।'
                  : 'Fast & secure sign-in with Mobile Number or Google ID.'}
              </p>
            </div>
          </div>

          {onOpenLogin && (
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all active:scale-95 shrink-0 self-end sm:self-auto"
            >
              {t.loginBtn}
            </button>
          )}
        </section>
      )}

      {/* Crucial Golden Rule Anti-Scam Callout */}
      <section className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-rose-500 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-rose-950 flex items-center gap-2">
              <span>{t.goldenRuleTitle}</span>
              <span className="text-[11px] px-2 py-0.5 bg-rose-200/80 text-rose-900 rounded-full font-bold">
                ALERT
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-rose-800 mt-0.5 font-medium">
              {t.goldenRuleText}
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigateTab('scam-alert')}
          className="shrink-0 px-3.5 py-1.5 text-xs font-bold text-rose-700 bg-white border border-rose-300 rounded-lg hover:bg-rose-100 transition-colors self-end sm:self-auto"
        >
          {language === 'hi' ? 'फ्रॉड के लक्षण जानें' : 'Check Warning Signs'}
        </button>
      </section>

      {/* 4 Core Action Cards */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {language === 'hi' ? 'मुख्य सुविधाएं' : 'Core Features'}
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {language === 'hi' ? '100% मुफ्त व व्यावहारिक' : '100% Free & Realistic'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Card 1: Earning Path */}
          <div
            onClick={() => onNavigateTab('earning-path')}
            className="group cursor-pointer bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all active:scale-[0.99] flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Compass className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                {t.actionFindPathTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.actionFindPathDesc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>{language === 'hi' ? 'शुरू करें' : 'Start Assessment'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Small Business Ideas */}
          <div
            onClick={() => onNavigateTab('business-ideas')}
            className="group cursor-pointer bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all active:scale-[0.99] flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Briefcase className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                {t.actionBusinessTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.actionBusinessDesc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>{language === 'hi' ? 'आईडिया देखें' : 'Browse Ideas'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Expense Tracker */}
          <div
            onClick={() => onNavigateTab('expense-tracker')}
            className="group cursor-pointer bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all active:scale-[0.99] flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Wallet className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                {t.actionExpensesTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.actionExpensesDesc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>{language === 'hi' ? 'खर्च दर्ज करें' : 'Open Tracker'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Scam Detector */}
          <div
            onClick={() => onNavigateTab('scam-alert')}
            className="group cursor-pointer bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 hover:border-rose-400 hover:shadow-md transition-all active:scale-[0.99] flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                <ShieldAlert className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-800 transition-colors">
                {t.actionScamTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.actionScamDesc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>{language === 'hi' ? 'संदेश जांचें' : 'Scan Message'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Realistic Real-world Success Stories */}
      <section className="bg-slate-100/90 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3.5">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-600" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            {language === 'hi' ? 'जमीनी सफलता के वास्तविक उदाहरण' : 'Real-World Micro Case Studies'}
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          {language === 'hi'
            ? 'कम बजट और सही कौशल से कैसे लोगों ने अपने घर या गांव से शुरुआत की:'
            : 'How real individuals in India turned basic skills and micro-capital into reliable monthly income:'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {caseStudies.map((cs, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-2xs space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{cs.name}</h4>
                  <p className="text-[11px] text-amber-800 font-semibold">{cs.role}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {cs.monthly}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                "{cs.story}"
              </p>
              <div className="pt-1.5 flex items-center gap-1 text-[11px] text-slate-500 font-medium border-t border-slate-100">
                <Zap className="w-3 h-3 text-amber-500" />
                <span>{language === 'hi' ? `शुरुआती लागत: ${cs.investment}` : `Starting capital: ${cs.investment}`}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Responsible Livelihood Disclaimer */}
      <section className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900/90 leading-relaxed flex items-start gap-2.5">
        <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p>{t.disclaimerBanner}</p>
      </section>
    </div>
  );
};
