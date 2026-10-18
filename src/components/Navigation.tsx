import React from 'react';
import { TabType, Language } from '../types';
import { translations } from '../translations';
import {
  Home,
  Compass,
  Briefcase,
  Laptop,
  Wallet,
  CheckSquare,
  ShieldCheck,
} from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  language: Language;
  pendingTasksCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  language,
  pendingTasksCount = 0,
}) => {
  const t = translations[language];

  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'home',
      label: t.navHome,
      icon: <Home className="w-5 h-5" />,
    },
    {
      id: 'earning-path',
      label: t.navEarning,
      icon: <Compass className="w-5 h-5" />,
    },
    {
      id: 'business-ideas',
      label: t.navBusiness,
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      id: 'wfh-guide',
      label: t.navWFH,
      icon: <Laptop className="w-5 h-5" />,
    },
    {
      id: 'expense-tracker',
      label: t.navExpenses,
      icon: <Wallet className="w-5 h-5" />,
    },
    {
      id: 'action-plan',
      label: t.navActionPlan,
      icon: <CheckSquare className="w-5 h-5" />,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined,
    },
    {
      id: 'scam-alert',
      label: t.navScamAlert,
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg pb-safe">
      <div className="max-w-4xl mx-auto px-1 sm:px-4">
        <div className="flex items-center justify-around py-1.5 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative flex flex-col items-center justify-center min-w-[50px] sm:min-w-[64px] py-1 px-1 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'text-amber-700 font-bold scale-105'
                    : 'text-slate-500 hover:text-slate-800 font-medium'
                }`}
              >
                <div className="relative">
                  <span
                    className={`p-1 rounded-lg inline-block transition-colors ${
                      isActive ? 'bg-amber-100 text-amber-700' : ''
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.badge !== undefined && (
                    <span className="absolute -top-1 -right-1.5 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs tracking-tight text-center leading-tight mt-0.5 line-clamp-1 max-w-[62px]">
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-6 h-0.5 bg-amber-600 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
