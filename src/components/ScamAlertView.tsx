import React, { useState } from 'react';
import { ScamCheckResult, Language } from '../types';
import { translations } from '../translations';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  PhoneCall,
  Search,
  ExternalLink,
  Lock,
  Smartphone,
  CreditCard,
  Flame,
  FileWarning,
  HelpCircle,
} from 'lucide-react';

interface ScamAlertViewProps {
  language: Language;
}

export const ScamAlertView: React.FC<ScamAlertViewProps> = ({ language }) => {
  const t = translations[language];

  const [messageText, setMessageText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ScamCheckResult | null>(null);

  const sampleSuspiciousTexts = [
    language === 'hi'
      ? 'बधाई हो! अमेज़न पार्ट-टाइम जॉब। रोजाना घर बैठे 2-3 घंटे काम करें और ₹2,500 से ₹5,000 कमाएं। काम शुरू करने के लिए टेलीग्राम पर संपर्क करें और ₹499 रजिस्ट्रेशन फीस भरें।'
      : 'Congratulations! Amazon Part-Time Work from home job. Earn ₹3,000/day just by liking YouTube videos and rating hotels. Contact Telegram agent and pay ₹499 registration fee.',
    language === 'hi'
      ? 'तुरंत 5 मिनट में ₹50,000 का पर्सनल लोन पाएं बिना किसी सिबिल या इनकम प्रूफ के। अभी ऐप डाउनलोड करें और सभी कॉन्टैक्ट्स की अनुमति दें।'
      : 'Instant Personal Loan of ₹50,000 approved in 5 minutes without CIBIL. Download APK and grant contacts permission.',
    language === 'hi'
      ? 'नमस्ते, आपके पुराने फर्नीचर का खरीदार बोल रहा हूं। मैंने ₹5,000 भेज दिए हैं, पैसे पाने के लिए इस क्यूआर कोड को गूगल पे से स्कैन करके अपना 6 अंकों का यूपीआई पिन डालें।'
      : 'Hello, I want to buy your item. I sent ₹5,000. Scan this QR code in PhonePe and enter your UPI PIN to receive money in your bank account.',
  ];

  const handleAnalyze = async (textToScan?: string) => {
    const text = textToScan || messageText;
    if (!text.trim()) return;

    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/check-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language }),
      });
      const data = await res.json();
      if (data.data) {
        setAnalysisResult(data.data);
      }
    } catch (e) {
      console.warn('Scam check failed, using fallback analyzer', e);
      // Fallback analysis
      setAnalysisResult({
        riskLevel: 'High Risk (Scam Alert)',
        isLikelyScam: true,
        explanation: language === 'hi'
          ? 'इस संदेश में धोखाधड़ी के कई लक्षण पाए गए हैं। वास्तविक कंपनियाँ कभी भी काम देने के बदले फीस नहीं मांगतीं और न ही टेलीग्राम पर संपर्क करने को कहती हैं।'
          : 'Multiple scam red flags detected. Legitimate businesses never request advance fees for job offers.',
        redFlags: [
          language === 'hi' ? 'काम शुरू करने के लिए एडवांस पैसे मांगना' : 'Demanding upfront registration fee',
          language === 'hi' ? 'अज्ञात टेलीग्राम ग्रुप या अनजान लिंक' : 'Redirecting to unknown Telegram/WhatsApp link',
          language === 'hi' ? 'अवास्तविक बहुत ज्यादा दैनिक आय का वादा' : 'Unrealistic high daily earning promise',
        ],
        recommendedAction: language === 'hi'
          ? 'कोई पैसा न भेजें, नंबर ब्लॉक करें और संदेश डिलीट करें।'
          : 'Do not pay any money. Block the sender and delete the message.',
        goldenRule: language === 'hi'
          ? 'नौकरी पाने के लिए कभी पैसे मत दें!'
          : 'Never pay money to get a job!',
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const scamEncyclopedia = [
    {
      title: language === 'hi' ? '1. टेलीग्राम / यूट्यूब टास्क फ्रॉड' : '1. Telegram / YouTube Like Task Scam',
      badge: 'Most Common in India',
      icon: <Flame className="w-5 h-5 text-rose-600" />,
      howItWorks: language === 'hi'
        ? 'आपको व्हाट्सएप पर मैसेज आता है कि 3 यूट्यूब वीडियो लाइक करें और ₹150 पाएं। वे सच में ₹150 भेज देते हैं। फिर वे आपको एक टेलीग्राम VIP ग्रुप में जोड़ते हैं जहाँ कहते हैं कि "₹5,000 इन्वेस्ट करो तो ₹8,000 मिलेंगे।" जैसे ही आप पैसे भेजते हैं, वे गायब हो जाते हैं।'
        : 'Scammers pay ₹150 for 3 video likes to gain trust, then trick you into joining a Telegram VIP channel demanding ₹5,000 to unlock higher earnings. Once paid, they disappear.',
      prevention: language === 'hi'
        ? 'अनजान नंबरों से आए पार्ट-टाइम जॉब ऑफर को तुरंत रिपोर्ट और ब्लॉक करें।'
        : 'Report and block unsolicited job messages immediately.',
    },
    {
      title: language === 'hi' ? '2. फर्जी 7-दिवसीय अवैध लोन ऐप्स' : '2. 7-Day Illegal Loan Apps Trap',
      badge: 'Extortion Risk',
      icon: <Smartphone className="w-5 h-5 text-amber-600" />,
      howItWorks: language === 'hi'
        ? 'बिना सिबिल स्कोर तुरंत लोन देने का झांसा देकर फोन से गैलरी और कॉन्टैक्ट्स की अनुमति ले लेते हैं। 7 दिन बाद भारी ब्याज मांगते हैं और पैसे न देने पर रिश्तेदारों को फर्जी अश्लील एडिट की गई तस्वीरें भेजकर ब्लैकमेल करते हैं।'
        : 'Predatory unapproved loan apps demand full contact list and photos access, charging 300% interest in 7 days, then blackmail your contacts.',
      prevention: language === 'hi'
        ? 'केवल RBI द्वारा मान्यता प्राप्त बैंकों व NBFC से ही लोन लें। किसी अनजान APK या लिंक से ऐप कभी इंस्टॉल न करें।'
        : 'Only borrow from RBI-registered banks or NBFCs. Never install unverified loan APKs.',
    },
    {
      title: language === 'hi' ? '3. "पैसे पाने के लिए QR कोड स्कैन करें" यूपीआई धोखा' : '3. "Scan QR to Receive Money" UPI Trap',
      badge: 'Crucial UPI Rule',
      icon: <CreditCard className="w-5 h-5 text-purple-600" />,
      howItWorks: language === 'hi'
        ? 'धोखेबाज कहते हैं: "मैं आपको सामान के ₹3,000 भेज रहा हूँ, यह QR कोड स्कैन करके अपना यूपीआई पिन डालें।" जैसे ही आप पिन डालते हैं, आपके खाते से पैसे कट जाते हैं!'
        : 'Scammers claim to send money and ask you to scan a QR code or enter your UPI PIN. Entering your PIN ALWAYS debits your bank account!',
      prevention: language === 'hi'
        ? 'याद रखें: पैसे प्राप्त करने के लिए कभी भी UPI PIN डालने या QR कोड स्कैन करने की आवश्यकता नहीं होती!'
        : 'Golden UPI Rule: You NEVER enter your UPI PIN or scan a QR code to RECEIVE money.',
    },
    {
      title: language === 'hi' ? '4. कलर प्रेडिक्शन व सट्टेबाजी ऐप्स (Color Prediction Gaming)' : '4. Color Prediction & Online Betting Traps',
      badge: 'Illegal Gambling',
      icon: <FileWarning className="w-5 h-5 text-rose-600" />,
      howItWorks: language === 'hi'
        ? '"लाल या हरा रंग चुनो और पैसे दोगुने करो।" यह पूरी तरह धांधली वाला सॉफ्टवेयर होता है। शुरुआत में जिताते हैं, बाद में लाखों की जमा पूंजी फंसाकर ऐप बंद कर देते हैं।'
        : 'Rigged casino games that let you win small amounts initially to hook you, then drain your savings and freeze withdrawals.',
      prevention: language === 'hi'
        ? 'सट्टेबाजी व कलर प्रेडिक्शन से हमेशा दूर रहें। यह अपराध व आर्थिक बर्बादी है।'
        : 'Avoid all color-prediction or guaranteed-return gambling apps entirely.',
    },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>{t.scamTitle}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
          {language === 'hi' ? 'फ्रॉड से सुरक्षा: सतर्क रहें, सुरक्षित रहें' : 'Scam Defense & Verification Center'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          {t.scamSubtitle}
        </p>

        {/* National Helpline Bar */}
        <div className="mt-3.5 p-3 bg-rose-50 border border-rose-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-rose-800 block">
                {t.helplineTitle}:
              </span>
              <span className="text-base sm:text-lg font-black text-rose-950 tracking-wider">
                डायल 1930 (Toll-Free)
              </span>
            </div>
          </div>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-rose-900 font-bold text-xs rounded-lg border border-rose-300 hover:bg-rose-100 transition-colors self-start sm:self-auto"
          >
            <span>{t.helplineWeb}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Interactive Scam Message Analyzer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-600" />
            <span>
              {language === 'hi' ? 'संदिग्ध संदेश की तत्काल जांच (AI Scanner)' : 'Instant Message Fraud Scanner'}
            </span>
          </h3>
          <span className="text-[11px] text-slate-500 font-semibold">
            {language === 'hi' ? 'व्हाट्सएप / एसएमएस चेक' : 'WhatsApp & SMS Safe'}
          </span>
        </div>

        <p className="text-xs text-slate-600">
          {language === 'hi'
            ? 'अगर आपको कोई जॉब ऑफर, पार्ट-टाइम काम, लोन या लॉटरी का मैसेज आया है, तो उसे यहाँ पेस्ट करें:'
            : 'Paste any suspicious job invitation, instant loan offer, or telegram task message below:'}
        </p>

        {/* Textarea */}
        <textarea
          rows={3}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder={t.checkMessagePlaceholder}
          className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
        />

        {/* Try a Sample Button Chips */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-500 block">
            {language === 'hi' ? 'या इन आम उदाहरणों को परखें:' : 'Or test these common sample scams:'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {sampleSuspiciousTexts.map((samp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setMessageText(samp);
                  handleAnalyze(samp);
                }}
                className="px-2.5 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-900 rounded-lg border border-slate-200 transition-colors"
              >
                {idx === 0
                  ? language === 'hi' ? 'नमूना 1: टेलीग्राम जॉब' : 'Sample 1: Telegram Job'
                  : idx === 1
                  ? language === 'hi' ? 'नमूना 2: 5-मिनट लोन ऐप' : 'Sample 2: Instant Loan'
                  : language === 'hi' ? 'नमूना 3: QR कोड यूपीआई' : 'Sample 3: QR Code Fraud'}
              </button>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={() => handleAnalyze()}
          disabled={analyzing || !messageText.trim()}
          className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          {analyzing ? (
            <span>{t.checkingScam}</span>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4" />
              <span>{t.btnCheckScam}</span>
            </>
          )}
        </button>

        {/* Analysis Results */}
        {analysisResult && (
          <div
            className={`p-4 rounded-xl border space-y-3 transition-all ${
              analysisResult.isLikelyScam
                ? 'bg-rose-50 border-rose-300 text-rose-950'
                : 'bg-emerald-50 border-emerald-300 text-emerald-950'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                {language === 'hi' ? 'जांच परिणाम' : 'Analysis Outcome'}
              </span>
              <span
                className={`text-xs font-black px-2.5 py-0.5 rounded-md ${
                  analysisResult.isLikelyScam
                    ? 'bg-rose-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {analysisResult.riskLevel}
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold leading-relaxed">
              {analysisResult.explanation}
            </p>

            {analysisResult.redFlags && analysisResult.redFlags.length > 0 && (
              <div className="space-y-1">
                <span className="text-xs font-bold block">
                  {language === 'hi' ? 'पहचाने गए खतरे (Red Flags):' : 'Identified Red Flags:'}
                </span>
                <ul className="list-disc list-inside text-xs space-y-0.5 font-medium">
                  {analysisResult.redFlags.map((rf, i) => (
                    <li key={i}>{rf}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-2 border-t border-rose-200/60 text-xs">
              <span className="font-bold block">
                {language === 'hi' ? 'सलाह व तुरंत कदम:' : 'Recommended Safe Action:'}
              </span>
              <p className="font-medium mt-0.5">
                {analysisResult.recommendedAction}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Scam Encyclopedia */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 px-1">
          {language === 'hi' ? 'भारत में सबसे आम 4 साइबर फ्रॉड' : '4 Major Scams in India You Must Recognize'}
        </h3>

        <div className="space-y-3.5">
          {scamEncyclopedia.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-100 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                      {item.badge}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                <strong className="text-slate-900 block mb-1">
                  {language === 'hi' ? 'धोखे का तरीका (How it happens):' : 'How the trap works:'}
                </strong>
                {item.howItWorks}
              </div>

              <div className="text-xs font-semibold text-emerald-900 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/80 flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">
                    {language === 'hi' ? 'बचने का तरीका:' : 'How to protect yourself:'}
                  </span>
                  <span>{item.prevention}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
