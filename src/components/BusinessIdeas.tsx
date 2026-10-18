import React, { useState } from 'react';
import { BusinessIdea, Language } from '../types';
import { translations } from '../translations';
import { fallbackBusinessIdeas } from '../data/fallbackData';
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  FileCheck,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from 'lucide-react';

interface BusinessIdeasProps {
  language: Language;
}

export const BusinessIdeas: React.FC<BusinessIdeasProps> = ({ language }) => {
  const t = translations[language];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [budgetFilter, setBudgetFilter] = useState<string>('all');
  const [expandedIdeaId, setExpandedIdeaId] = useState<string | null>(null);

  // Custom AI Business Planner State
  const [customBudget, setCustomBudget] = useState('₹5,000');
  const [customLocation, setCustomLocation] = useState('Semi-Urban Town / Kasba');
  const [customSkill, setCustomSkill] = useState('Cooking & Home Service');
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false);
  const [customGeneratedIdeas, setCustomGeneratedIdeas] = useState<BusinessIdea[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedIdeaId((prev) => (prev === id ? null : id));
  };

  const handleGenerateCustom = async () => {
    setIsGeneratingCustom(true);
    try {
      const res = await fetch('/api/business-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget: customBudget,
          skills: customSkill,
          location: customLocation,
          timeAvailable: 'Full-time / 6-8 hrs',
          language,
        }),
      });
      const data = await res.json();
      if (data.data?.ideas && data.data.ideas.length > 0) {
        setCustomGeneratedIdeas(data.data.ideas);
      }
    } catch (err) {
      console.warn('Custom ideas generation fallback:', err);
    } finally {
      setIsGeneratingCustom(false);
    }
  };

  const allDisplayIdeas = [...customGeneratedIdeas, ...fallbackBusinessIdeas];

  const filteredIdeas = allDisplayIdeas.filter((idea) => {
    if (activeCategory !== 'all' && idea.category !== activeCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
          <Briefcase className="w-4 h-4" />
          <span>{t.bizTitle}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
          {language === 'hi' ? 'कम पूंजी, सुरक्षित शुरुआत: छोटा व्यापार आईडिया' : 'Low-Capital Micro Businesses with Realistic Margins'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          {t.bizSubtitle}
        </p>
      </div>

      {/* Interactive Custom Idea Planner Card */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-md space-y-3.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <h3 className="text-sm sm:text-base font-bold">
            {language === 'hi' ? 'कस्टम बिजनेस प्लान जनरेटर' : 'Custom AI Business Blueprint'}
          </h3>
        </div>
        <p className="text-xs text-emerald-100/90">
          {language === 'hi'
            ? 'अपना उपलब्ध बजट और हुनर बताएं, AI आपके इलाके के अनुसार लागत, औजार और जोखिम का खाका बनाएगा।'
            : 'Enter your capital and local skill to generate a tailored micro-business roadmap.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-slate-900 text-xs">
          <div>
            <label className="text-[11px] font-semibold text-emerald-200 block mb-1">
              {language === 'hi' ? 'उपलब्ध बजट (Capital):' : 'Starting Budget:'}
            </label>
            <select
              value={customBudget}
              onChange={(e) => setCustomBudget(e.target.value)}
              className="w-full p-2 bg-white rounded-lg font-medium text-xs focus:outline-none"
            >
              <option value="Under ₹2,000">₹2,000 से कम (Micro)</option>
              <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000</option>
              <option value="₹5,000 - ₹15,000">₹5,000 - ₹15,000</option>
              <option value="₹15,000 - ₹50,000">₹15,000 - ₹50,000</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-emerald-200 block mb-1">
              {language === 'hi' ? 'स्थान (Location):' : 'Location:'}
            </label>
            <select
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              className="w-full p-2 bg-white rounded-lg font-medium text-xs focus:outline-none"
            >
              <option value="Village / Panchayat">गांव / पंचायत (Rural)</option>
              <option value="Semi-Urban Town / Kasba">कस्बा / छोटा शहर (Town)</option>
              <option value="City / Metro">बड़ा शहर (Urban / Metro)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-emerald-200 block mb-1">
              {language === 'hi' ? 'हुनर / रुचि:' : 'Skill / Preference:'}
            </label>
            <select
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              className="w-full p-2 bg-white rounded-lg font-medium text-xs focus:outline-none"
            >
              <option value="Food & Snacks">खान-पान व नाश्ता (Food)</option>
              <option value="Repair & Technical">रिपेयर व हार्डवेयर (Repair)</option>
              <option value="Tailoring & Crafts">सिलाई व हस्तशिल्प (Crafts)</option>
              <option value="Digital & Printing">डिजिटल व प्रिंटिंग सेवा</option>
              <option value="Agri & Allied">कृषि व पशुपालन (Agri)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerateCustom}
          disabled={isGeneratingCustom}
          className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isGeneratingCustom ? (
            <span>{language === 'hi' ? 'ब्लूप्रिंट तैयार हो रहा है...' : 'Crafting Blueprint...'}</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>{language === 'hi' ? 'नया बिजनेस प्लान बनाएं' : 'Generate Business Blueprint'}</span>
            </>
          )}
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: t.filterAll },
          { id: 'service', label: t.filterService },
          { id: 'food', label: t.filterFood },
          { id: 'craft', label: t.filterCraft },
          { id: 'agri', label: t.filterAgri },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeCategory === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Business Ideas List */}
      <div className="space-y-4">
        {filteredIdeas.map((idea) => {
          const isExpanded = expandedIdeaId === idea.id;
          return (
            <div
              key={idea.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              {/* Card Header summary */}
              <div
                onClick={() => toggleExpand(idea.id)}
                className="p-4 sm:p-5 cursor-pointer hover:bg-slate-50/60 transition-colors flex items-start justify-between gap-3"
              >
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                      {idea.tag}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {language === 'hi' ? `निवेश: ${idea.investmentRange}` : `Capital: ${idea.investmentRange}`}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {idea.name}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium pt-0.5">
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? `मार्जिन: ${idea.profitMargin}` : `Margin: ${idea.profitMargin}`}</span>
                    </span>
                    <span>•</span>
                    <span>
                      {language === 'hi'
                        ? `${idea.breakdownOfCosts.length} मुख्य लागत घटक`
                        : `${idea.breakdownOfCosts.length} Cost components`}
                    </span>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 shrink-0 mt-1">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Expanded Business Details */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                  {/* Cost breakdown */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.costBreakdown}</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                      {idea.breakdownOfCosts.map((c, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-1 border-b border-slate-200/50 last:border-b-0 text-xs"
                        >
                          <span className="text-slate-700 font-medium">{c.item}</span>
                          <span className="font-bold text-slate-900">{c.cost}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Demand Validation */}
                  <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1">
                    <h4 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-blue-700" />
                      <span>{t.howToValidate}</span>
                    </h4>
                    <p className="text-xs text-blue-900 leading-relaxed font-medium">
                      {idea.demandValidation}
                    </p>
                  </div>

                  {/* Risks & Mitigations */}
                  <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1">
                    <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                      <span>{t.risksTitle}</span>
                    </h4>
                    <ul className="list-disc list-inside text-xs text-amber-900 space-y-0.5 leading-relaxed">
                      {idea.businessRisks.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>

                  {/* License & Registrations */}
                  <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <FileCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block">
                        {t.licenseTitle}:
                      </span>
                      <p className="text-slate-600 mt-0.5">{idea.licenseNeeded}</p>
                    </div>
                  </div>

                  {/* 30 Day Roadmap */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.roadmapTitle}</span>
                    </h4>
                    <div className="space-y-1.5 text-xs text-slate-700">
                      {idea.firstMonthRoadmap.map((week, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{week}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
