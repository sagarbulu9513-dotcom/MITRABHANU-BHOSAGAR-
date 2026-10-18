import React, { useState } from 'react';
import {
  UserProfile,
  EarningOpportunity,
  Language,
  ActionPlanItem,
} from '../types';
import { translations } from '../translations';
import { fallbackOpportunitiesHi, fallbackOpportunitiesEn } from '../data/fallbackData';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Layers,
  Clock,
  Coins,
  RefreshCw,
  PlusCircle,
  HelpCircle,
} from 'lucide-react';

interface EarningAssistantProps {
  language: Language;
  onAddTasksToActionPlan: (
    opportunityTitle: string,
    tasks: ActionPlanItem[]
  ) => void;
}

const INDIAN_STATES = [
  'Uttar Pradesh',
  'Bihar',
  'Maharashtra',
  'Madhya Pradesh',
  'Rajasthan',
  'West Bengal',
  'Gujarat',
  'Karnataka',
  'Tamil Nadu',
  'Andhra Pradesh',
  'Telangana',
  'Odisha',
  'Kerala',
  'Jharkhand',
  'Assam',
  'Punjab',
  'Haryana',
  'Chhattisgarh',
  'Uttarakhand',
  'Himachal Pradesh',
  'Delhi NCR',
  'Jammu & Kashmir',
  'Goa',
  'Tripura',
  'Other State / UT',
];

export const EarningAssistant: React.FC<EarningAssistantProps> = ({
  language,
  onAddTasksToActionPlan,
}) => {
  const t = translations[language];

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<EarningOpportunity[] | null>(null);
  const [addedOppIds, setAddedOppIds] = useState<Set<string>>(new Set());

  // Form Profile State
  const [profile, setProfile] = useState<UserProfile>({
    age: '18-24 (Student / Fresher)',
    state: 'Uttar Pradesh',
    areaType: 'semi-urban',
    education: '12th Pass / Graduate',
    skills: ['Canva & Phone Graphics', 'Social Media'],
    customSkills: '',
    budget: '₹0 (Zero Investment)',
    hoursPerDay: '2-4 hours',
    equipment: ['Smartphone with 4G/5G'],
    preferredMode: 'Online / From Home',
  });

  const toggleSkill = (skill: string) => {
    setProfile((prev) => {
      const exists = prev.skills.includes(skill);
      if (exists) {
        return { ...prev, skills: prev.skills.filter((s) => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  const toggleEquipment = (eq: string) => {
    setProfile((prev) => {
      const exists = prev.equipment.includes(eq);
      if (exists) {
        return { ...prev, equipment: prev.equipment.filter((e) => e !== eq) };
      } else {
        return { ...prev, equipment: [...prev.equipment, eq] };
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMsg(null);

    const skillsCombined = [
      ...profile.skills,
      profile.customSkills ? profile.customSkills.trim() : '',
    ]
      .filter(Boolean)
      .join(', ');

    try {
      const response = await fetch('/api/earning-recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: profile.age,
          state: profile.state,
          areaType: profile.areaType,
          education: profile.education,
          skills: skillsCombined,
          budget: profile.budget,
          hoursPerDay: profile.hoursPerDay,
          equipment: profile.equipment.join(', '),
          preferredMode: profile.preferredMode,
          language,
        }),
      });

      const resData = await response.json();

      if (resData.data && resData.data.recommendations && resData.data.recommendations.length > 0) {
        setRecommendations(resData.data.recommendations);
      } else {
        // Fallback to high quality pre-curated data
        const fallback = language === 'hi' ? fallbackOpportunitiesHi : fallbackOpportunitiesEn;
        setRecommendations(fallback);
      }
    } catch (err: any) {
      console.warn('Backend request failed, using offline fallback', err);
      const fallback = language === 'hi' ? fallbackOpportunitiesHi : fallbackOpportunitiesEn;
      setRecommendations(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPlan = (opp: EarningOpportunity) => {
    onAddTasksToActionPlan(opp.title, opp.sevenDayActionPlan);
    setAddedOppIds((prev) => new Set(prev).add(opp.id));
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2.5 text-amber-700 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>{t.qTitle}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
          {language === 'hi' ? 'अपनी परिस्थिति बताएं, सही रास्ता पाएं' : 'Tailor Earning Opportunities to Your Reality'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          {t.qSubtitle}
        </p>

        {/* Realistic Disclaimer badge */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200 rounded-lg text-xs font-medium">
          <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>
            {language === 'hi'
              ? 'बिना फर्जी वादों के: कोई गारंटीड जॉब या रातों-रात अमीर बनने की स्कीम नहीं।'
              : 'Grounded Advice: No guaranteed jobs or instant riches schemes.'}
          </span>
        </div>
      </div>

      {/* Main Questionnaire / Results Container */}
      {!recommendations ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 space-y-6">
          {/* Progress Steps Indicator */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-semibold text-slate-500">
            <span>
              {language === 'hi' ? `चरण ${step} / 4` : `Step ${step} of 4`}
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all ${
                    s === step
                      ? 'w-7 bg-amber-600'
                      : s < step
                      ? 'w-4 bg-emerald-500'
                      : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Step 1: Age & Location */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                {language === 'hi' ? '1. आपकी उम्र और स्थान' : '1. Age Group & Location'}
              </h3>

              {/* Age selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'hi' ? 'आयु वर्ग (Age Group):' : 'Age Bracket:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { val: '18-24 (Student / Fresher)', labelHi: '18-24 वर्ष (छात्र / नया)', labelEn: '18-24 (Student / Fresher)' },
                    { val: '25-35 (Job Seeker / Youth)', labelHi: '25-35 वर्ष (युवा / नौकरी तलाश)', labelEn: '25-35 (Job Seeker / Youth)' },
                    { val: '30-50 (Homemaker / Part-Time)', labelHi: '30-50 वर्ष (गृहणी / पार्ट-टाइम)', labelEn: '30-50 (Homemaker / Women)' },
                    { val: '45+ (Self-Employed / Experienced)', labelHi: '45+ वर्ष (अनुभवी / वरिष्ठ)', labelEn: '45+ (Experienced / Senior)' },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.val}
                      onClick={() => setProfile({ ...profile, age: item.val })}
                      className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                        profile.age === item.val
                          ? 'border-amber-600 bg-amber-50/80 text-amber-950 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {language === 'hi' ? item.labelHi : item.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'hi' ? 'राज्य (State):' : 'State / Region:'}
                </label>
                <select
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'hi' ? 'इलाके का प्रकार (Location Type):' : 'Area Type:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'rural', labelHi: 'गांव (Rural)', labelEn: 'Village (Rural)' },
                    { id: 'semi-urban', labelHi: 'कस्बा / छोटा शहर', labelEn: 'Semi-Urban / Town' },
                    { id: 'urban', labelHi: 'बड़ा शहर (City)', labelEn: 'Urban / Metro' },
                  ].map((area) => (
                    <button
                      type="button"
                      key={area.id}
                      onClick={() => setProfile({ ...profile, areaType: area.id as any })}
                      className={`p-2.5 text-center rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                        profile.areaType === area.id
                          ? 'border-amber-600 bg-amber-50 text-amber-900 font-bold'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {language === 'hi' ? area.labelHi : area.labelEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education & Skills */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                {language === 'hi' ? '2. शिक्षा और आपके हुनर (Skills)' : '2. Education & Existing Skills'}
              </h3>

              {/* Education */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'hi' ? 'उच्चतम शिक्षा:' : 'Highest Education:'}
                </label>
                <select
                  value={profile.education}
                  onChange={(e) => setProfile({ ...profile, education: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="10th or Below">10वीं या कम (10th or Below)</option>
                  <option value="12th Pass">12वीं पास (12th Pass)</option>
                  <option value="ITI / Diploma / Technical">आईटीआई / डिप्लोमा (ITI / Technical)</option>
                  <option value="Graduate / BA / B.Com / B.Sc">स्नातक (Graduate / BA / B.Sc / B.Com)</option>
                  <option value="B.Tech / Professional">बी.टेक / पोस्ट ग्रेजुएट (Professional / PG)</option>
                </select>
              </div>

              {/* Skills Multi-select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'hi'
                    ? 'आपके पास कौन-से हुनर हैं? (कोई भी 1 या अधिक चुनें):'
                    : 'Select your existing skills or interests:'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Canva & Phone Graphics',
                    'Cooking & Baking',
                    'Tailoring & Sewing',
                    'Teaching & Tutoring',
                    'Driving & Two Wheeler',
                    'Mobile & Hardware Repair',
                    'Sales & Speaking with People',
                    'Typing & Form Filling',
                    'Farming & Agri Knowledge',
                    'Handicrafts & Art',
                    'Social Media & WhatsApp',
                  ].map((skill) => {
                    const selected = profile.skills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                          selected
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Skill Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'hi' ? 'कोई अन्य विशेष हुनर या रुचि (वैकल्पिक):' : 'Other skill or interest (Optional):'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'उदा. पेंटिंग, इलेक्ट्रिकल रिपेयर, हिसाब-किताब' : 'e.g. electrical work, embroidery, bookkeeping'}
                  value={profile.customSkills}
                  onChange={(e) => setProfile({ ...profile, customSkills: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Budget & Time Available */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                {language === 'hi' ? '3. बजट और उपलब्ध समय' : '3. Starting Budget & Available Time'}
              </h3>

              {/* Starting Budget */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'hi' ? 'आप शुरुआत में कितना खर्च कर सकते हैं?' : 'Available Starting Capital:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: '₹0 (Zero Investment)', labelHi: '₹0 (शून्य निवेश)', labelEn: '₹0 (Zero Investment)' },
                    { id: '₹500 - ₹2,000', labelHi: '₹500 - ₹2,000 (माइक्रो)', labelEn: '₹500 - ₹2,000 (Micro)' },
                    { id: '₹2,000 - ₹10,000', labelHi: '₹2,000 - ₹10,000', labelEn: '₹2,000 - ₹10,000' },
                    { id: '₹10,000 - ₹50,000+', labelHi: '₹10,000 से अधिक', labelEn: '₹10,000+ (Small Capital)' },
                  ].map((b) => (
                    <button
                      type="button"
                      key={b.id}
                      onClick={() => setProfile({ ...profile, budget: b.id })}
                      className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                        profile.budget === b.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {language === 'hi' ? b.labelHi : b.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hours per Day */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'hi' ? 'रोजाना कितना समय दे सकते हैं?' : 'Daily Time Available:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: '1-2 hours', labelHi: '1-2 घंटे (पार्ट-टाइम)', labelEn: '1-2 hours (Micro)' },
                    { id: '2-4 hours', labelHi: '2-4 घंटे (छात्र/गृहणी)', labelEn: '2-4 hours (Standard)' },
                    { id: '4-6 hours', labelHi: '4-6 घंटे (गंभीर पार्ट-टाइम)', labelEn: '4-6 hours (Part-time)' },
                    { id: 'Full time (8+ hours)', labelHi: 'फुल टाइम (8+ घंटे)', labelEn: 'Full time (8+ hours)' },
                  ].map((h) => (
                    <button
                      type="button"
                      key={h.id}
                      onClick={() => setProfile({ ...profile, hoursPerDay: h.id })}
                      className={`p-3 text-left rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                        profile.hoursPerDay === h.id
                          ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {language === 'hi' ? h.labelHi : h.labelEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Equipment & Preference */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                {language === 'hi' ? '4. उपकरण और प्राथमिकता' : '4. Equipment & Working Mode'}
              </h3>

              {/* Equipment Multi-select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'hi' ? 'आपके पास क्या उपलब्ध है?' : 'Devices & Connectivity you have:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Smartphone with 4G/5G',
                    'Computer / Laptop',
                    'Home Wi-Fi',
                    'Two-Wheeler (Bike/Scooter)',
                    'Sewing Machine (सिलाई मशीन)',
                    'Basic Kitchen & Gas',
                  ].map((eq) => {
                    const isSelected = profile.equipment.includes(eq);
                    return (
                      <button
                        type="button"
                        key={eq}
                        onClick={() => toggleEquipment(eq)}
                        className={`p-2.5 text-left rounded-xl border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {eq}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preferred Mode */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {language === 'hi' ? 'पसंदीदा काम का प्रकार:' : 'Preferred Working Mode:'}
                </label>
                <select
                  value={profile.preferredMode}
                  onChange={(e) => setProfile({ ...profile, preferredMode: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Online / From Home">घर बैठे ऑनलाइन / फोन पर (Online / WFH)</option>
                  <option value="Home-based Craft / Cooking">घर से सिलाई, क्राफ्ट या खाना बनाना</option>
                  <option value="Teaching / Tuition">ट्यूशन / कोचिंग पढ़ाना (Teaching)</option>
                  <option value="Local Field / Service">आस-पास के बाजार में सेवा या दुकान सहायता</option>
                  <option value="Agri & Rural Produce">खेती-किसानी या जैविक उत्पाद</option>
                  <option value="Any Viable Method">कोई भी व्यावहारिक विकल्प (Any realistic method)</option>
                </select>
              </div>
            </div>
          )}

          {/* Action Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.btnBack}</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <span>{t.btnNext}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t.btnGenerating}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t.btnGenerate}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {t.recResultsTitle}
              </h3>
              <p className="text-xs text-slate-600">
                {t.recResultsSubtitle}
              </p>
            </div>
            <button
              onClick={() => {
                setRecommendations(null);
                setStep(1);
              }}
              className="px-3.5 py-1.5 border border-slate-300 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सवाल दोबारा बदलें' : 'Change Answers'}</span>
            </button>
          </div>

          {/* Cards for each recommendation */}
          <div className="space-y-5">
            {recommendations.map((opp) => {
              const isAdded = addedOppIds.has(opp.id);
              return (
                <div
                  key={opp.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4 hover:border-amber-400 transition-all"
                >
                  {/* Top Bar with Category Badge and Income */}
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-amber-900 text-xs font-bold rounded-md">
                        {opp.category}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                        {opp.title}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 font-semibold block">
                        {t.estimatedRange}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200 inline-block">
                        {opp.realisticMonthlyRange}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {opp.summary}
                  </p>

                  {/* Meta stats: Startup Cost & Skills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="font-bold text-slate-500 block">
                        {t.startingBudget}:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {opp.startupCost}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block">
                        {t.skillsNeeded}:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {opp.requiredSkills.join(' • ')}
                      </span>
                    </div>
                  </div>

                  {/* Step by step */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.stepsTitle}</span>
                    </h5>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {opp.stepByStep.map((st, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="leading-snug">{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Challenges & Verification */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1">
                      <div className="font-bold text-amber-950 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                        <span>{t.challengesTitle}</span>
                      </div>
                      <ul className="list-disc list-inside text-amber-900 space-y-0.5 leading-relaxed">
                        {opp.potentialChallenges.map((ch, idx) => (
                          <li key={idx}>{ch}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1">
                      <div className="font-bold text-emerald-950 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{t.verificationTitle}</span>
                      </div>
                      <p className="text-emerald-900 leading-relaxed font-medium">
                        {opp.verificationTips}
                      </p>
                    </div>
                  </div>

                  {/* 7-Day Action Plan Preview */}
                  <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span>
                          {language === 'hi' ? 'व्यावहारिक 7-दिवसीय कार्ययोजना' : '7-Day Practical Action Plan'}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {language === 'hi' ? 'सीखना बनाम कमाई' : 'Learning vs Earning'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {opp.sevenDayActionPlan.map((item) => (
                        <div
                          key={item.day}
                          className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200/70 text-xs"
                        >
                          <span className="font-bold text-slate-500 shrink-0">
                            D{item.day}:
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-semibold text-slate-800 line-clamp-1">
                                {item.title}
                              </span>
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 uppercase ${
                                  item.type === 'learning'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {item.type === 'learning' ? 'Learn' : 'Earn'}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add to Plan button */}
                    <div className="pt-2">
                      <button
                        onClick={() => handleAddToPlan(opp)}
                        disabled={isAdded}
                        className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                          isAdded
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-default'
                            : 'bg-amber-600 hover:bg-amber-700 text-white shadow-sm active:scale-95'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-emerald-700" />
                            <span>{t.addedToPlan}</span>
                          </>
                        ) : (
                          <>
                            <PlusCircle className="w-4 h-4" />
                            <span>{t.btnAddToPlan}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
