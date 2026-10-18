import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import {
  Laptop,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ExternalLink,
  Shield,
  Lightbulb,
} from 'lucide-react';

interface WorkFromHomeGuideProps {
  language: Language;
}

export const WorkFromHomeGuide: React.FC<WorkFromHomeGuideProps> = ({
  language,
}) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'legit' | 'traps'>('all');

  const legitOptions = [
    {
      title: language === 'hi' ? 'कैनवा से सोशल मीडिया व पोस्टर डिजाइन' : 'Social Media & Graphic Design (Canva)',
      skills: language === 'hi' ? 'रंगों की समझ, सोशल मीडिया ट्रेंड्स' : 'Aesthetic sense, social media trends',
      earning: '₹5,000 - ₹20,000 / month',
      howItWorks: language === 'hi'
        ? 'स्थानीय कोचिंग, मिठाई दुकानों और छोटे व्यापारियों के लिए व्हाट्सएप स्टेटस और इंस्टाग्राम पोस्ट बनाना। किसी डिग्री की जरूरत नहीं।'
        : 'Designing WhatsApp status creatives, food menus, and promotional banners for local businesses using Canva on mobile.',
      freePlatform: 'Direct Outreach, WhatsApp Business, Internshala',
    },
    {
      title: language === 'hi' ? 'कंटेंट राइटिंग व हिंदी अनुवाद (Translation)' : 'Content Writing & Regional Translation',
      skills: language === 'hi' ? 'शुद्ध हिंदी/अंग्रेजी व्याकरण, लिखने में रुचि' : 'Good grammar, curiosity to research',
      earning: '₹0.30 - ₹1.00 प्रति शब्द (₹6,000 - ₹18,000 / month)',
      howItWorks: language === 'hi'
        ? 'वेबसाइट ब्लॉग्स, यूट्यूब स्क्रिप्ट्स और ई-कॉमर्स उत्पादों के लिए विवरण लिखना। सैंपल लिखकर क्लाइंट से संपर्क करें।'
        : 'Writing Hindi or English blog posts, YouTube explainer scripts, and product descriptions for small content agencies.',
      freePlatform: 'Internshala, LinkedIn, Freelance Groups',
    },
    {
      title: language === 'hi' ? 'स्कूली बच्चों को ऑनलाइन ट्यूशन (1st - 8th Grade)' : 'Online / Hybrid School Tutoring',
      skills: language === 'hi' ? 'गणित, विज्ञान, अंग्रेजी में पकड़, धैर्य' : 'Patience, clear communication, Math/Science',
      earning: '₹200 - ₹500 प्रति घंटा (₹8,000 - ₹25,000 / month)',
      howItWorks: language === 'hi'
        ? 'Google Meet या Zoom पर 3-4 बच्चों का छोटा बैच पढ़ाना। मोहल्ले या रिश्तेदारों के बच्चों से शुरुआत करें।'
        : 'Teaching small batches of 3-4 children over Google Meet or WhatsApp video. Start with neighbors and word-of-mouth.',
      freePlatform: 'Personal Network, UrbanPro, Local WhatsApp groups',
    },
    {
      title: language === 'hi' ? 'ऑडियो ट्रांसक्रिप्शन (बोलकर लिखे गए शब्द)' : 'Audio Transcription & Proofreading',
      skills: language === 'hi' ? 'तेज टाइपिंग, ध्यान से सुनने की क्षमता' : 'Careful listening, accurate typing',
      earning: '₹4,000 - ₹12,000 / month',
      howItWorks: language === 'hi'
        ? 'रिकॉर्ड किए गए पॉडकास्ट, इंटरव्यू या ऑडियो क्लिप्स को सुनकर टेक्स्ट में टाइप करना।'
        : 'Listening to recorded audio interviews, podcasts, or legal calls and typing them into clean text.',
      freePlatform: 'TranscribeMe, Rev (Official free qualification tests only)',
    },
  ];

  const commonTraps = [
    {
      title: language === 'hi' ? '1. कैप्चा टाइपिंग और डेटा एंट्री बॉन्ड स्कैम' : '1. Captcha Typing & Bond Fee Trap',
      dangerLevel: 'Extreme',
      warningSign: language === 'hi' ? '₹1,000 - ₹2,500 रजिस्ट्रेशन फीस या सर्वर चार्ज मांगना' : 'Demanding ₹1,000 - ₹2,500 registration or software deposit',
      reality: language === 'hi'
        ? 'वे आपको 1,000 कैप्चा देते हैं। सॉफ्टवेयर जानबूझकर 90% में गलती दिखाता है, फिर फर्जी वकील के नाम से कानूनी नोटिस भेजकर ₹5,000 की पेनल्टी मांगते हैं। कभी न फंसें!'
        : 'The software intentionally fails your entries, denies payment, and scammers threaten you with fake legal notices to extort money. 100% fraudulent.',
    },
    {
      title: language === 'hi' ? '2. टेलीग्राम "यूट्यूब लाइक करो और ₹50 कमाओ" टास्क स्कैम' : '2. Telegram "Like Videos & Earn ₹50" Task Scam',
      dangerLevel: 'Extreme',
      warningSign: language === 'hi' ? 'शुरुआत में ₹150 भेजकर भरोसा जीतना, फिर वीआईपी टास्क के नाम पर ₹5,000 मांगना' : 'Paying ₹150 initially, then requiring ₹5,000 prepaid investment for VIP tasks',
      reality: language === 'hi'
        ? 'शुरुआत में ₹100-₹200 देकर आपको फंसाते हैं। इसके बाद कहते हैं कि बड़ा पैसा कमाने के लिए ₹5,000 या ₹20,000 क्रिप्टो/खाते में डालें। जैसे ही आप पैसे डालते हैं, ग्रुप से ब्लॉक कर देते हैं।'
        : 'A classic bait-and-switch Ponzi trap. As soon as you deposit your own money for high returns, they lock your account and vanish.',
    },
    {
      title: language === 'hi' ? '3. फर्जी ई-कॉमर्स रिव्यू व ऑर्डर ब्रशिंग' : '3. Fake E-Commerce Review Rating Fraud',
      dangerLevel: 'High',
      warningSign: language === 'hi' ? 'अमेज़न / फ्लिपकार्ट का नाम लेकर अज्ञात व्हाट्सएप लिंक भेजना' : 'Claiming to be Amazon HR sending untrusted links on WhatsApp',
      reality: language === 'hi'
        ? 'ई-कॉमर्स कंपनियां कभी भी व्हाट्सएप पर अज्ञात नंबरों से बिना इंटरव्यू किसी को रिव्यू करने के पैसे नहीं देतीं।'
        : 'Real platforms never recruit remote review workers via random WhatsApp messages.',
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
          <Laptop className="w-4 h-4" />
          <span>{t.wfhTitle}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
          {language === 'hi' ? 'घर बैठे काम की जमीनी सच्चाई' : 'The Truth About Work-From-Home in India'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          {t.wfhSubtitle}
        </p>

        {/* The 3 Golden Rules Box */}
        <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1.5 text-xs text-rose-950 font-semibold">
          <div className="flex items-center gap-1.5 text-rose-900 font-bold uppercase text-[11px]">
            <AlertOctagon className="w-4 h-4 text-rose-700" />
            <span>{language === 'hi' ? '3 बातें हमेशा याद रखें:' : '3 Golden Rules to Protect Yourself:'}</span>
          </div>
          <p>• {t.rule1}</p>
          <p>• {t.rule2}</p>
          <p>• {t.rule3}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-700 border border-slate-200'
          }`}
        >
          {language === 'hi' ? 'सब कुछ देखें' : 'View All'}
        </button>
        <button
          onClick={() => setSelectedCategory('legit')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            selectedCategory === 'legit'
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-emerald-800 border border-emerald-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{t.legitJobsTitle}</span>
        </button>
        <button
          onClick={() => setSelectedCategory('traps')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            selectedCategory === 'traps'
              ? 'bg-rose-600 text-white'
              : 'bg-white text-rose-800 border border-rose-200'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>{t.scamsToAvoidTitle}</span>
        </button>
      </div>

      {/* Genuine WFH Options Section */}
      {(selectedCategory === 'all' || selectedCategory === 'legit') && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-slate-900">
              {t.legitJobsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {legitOptions.map((opt, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{opt.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      Legitimate
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {opt.howItWorks}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>{language === 'hi' ? 'कमाई की सीमा:' : 'Estimated range:'}</span>
                    <span className="font-bold text-emerald-700">{opt.earning}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>{language === 'hi' ? 'कौशल:' : 'Skills:'}</span>
                    <span className="font-semibold text-slate-700">{opt.skills}</span>
                  </div>
                  <div className="pt-1 text-[11px] text-blue-700 font-semibold">
                    {language === 'hi' ? `कहाँ खोजें: ${opt.freePlatform}` : `Platforms: ${opt.freePlatform}`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Traps to Avoid Section */}
      {(selectedCategory === 'all' || selectedCategory === 'traps') && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-rose-600" />
            <h3 className="text-base font-bold text-slate-900">
              {t.scamsToAvoidTitle}
            </h3>
          </div>

          <div className="space-y-3">
            {commonTraps.map((trap, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-rose-200 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-rose-950">{trap.title}</h4>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
                    {trap.dangerLevel} Risk
                  </span>
                </div>

                <div className="text-xs bg-rose-50/70 p-2.5 rounded-xl border border-rose-200/60 text-rose-900 font-medium">
                  <span className="font-bold text-rose-950 block">
                    {language === 'hi' ? 'धोखे का पहला संकेत:' : 'First Red Flag:'}
                  </span>
                  {trap.warningSign}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">
                    {language === 'hi' ? 'सच्चाई: ' : 'Reality: '}
                  </strong>
                  {trap.reality}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Legitimate freelancing safety checklist */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
        <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'hi'
              ? 'काम शुरू करने से पहले 4 सुरक्षित कदम'
              : '4 Safety Steps Before Starting Any Client Work'}
          </span>
        </h4>
        <ol className="list-decimal list-inside text-slate-700 space-y-1 leading-relaxed">
          <li>{language === 'hi' ? 'किसी नए क्लाइंट के लिए शुरुआत में 25% से 50% एडवांस भुगतान लें।' : 'Always ask for 25% to 50% milestone advance from unfamiliar clients.'}</li>
          <li>{language === 'hi' ? 'कभी भी किसी कंपनी को आईडी कार्ड या "जॉब पोर्टल चार्ज" न दें।' : 'Never pay any company for an ID card or "job portal verification charge".'}</li>
          <li>{language === 'hi' ? 'व्हाट्सएप चैट या ईमेल पर काम का विवरण और भुगतान की तारीख लिखकर सुरक्षित रखें।' : 'Keep written agreements on email or WhatsApp stating deadline and payment.'}</li>
          <li>{language === 'hi' ? 'पैसे मंगाने के लिए केवल अपना यूपीआई आईडी (UPI ID) या क्यूआर कोड दें, कभी कोई पिन या ओटीपी न डालें।' : 'Only provide your UPI ID/QR to receive money. NEVER enter your UPI PIN to receive money.'}</li>
        </ol>
      </div>
    </div>
  );
};
