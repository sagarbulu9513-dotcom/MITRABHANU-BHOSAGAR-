import React, { useState, useEffect } from 'react';
import { TabType, Language, PersonalTask, ActionPlanItem, CustomerUser } from './types';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeScreen } from './components/HomeScreen';
import { EarningAssistant } from './components/EarningAssistant';
import { BusinessIdeas } from './components/BusinessIdeas';
import { WorkFromHomeGuide } from './components/WorkFromHomeGuide';
import { ExpenseTracker } from './components/ExpenseTracker';
import { ActionPlanView } from './components/ActionPlanView';
import { ScamAlertView } from './components/ScamAlertView';
import { LoginModal } from './components/LoginModal';
import { LoginScreen } from './components/LoginScreen';
import { CheckCircle2 } from 'lucide-react';

const TASKS_STORAGE_KEY = 'paisahelp_tasks_v1';
const LANG_STORAGE_KEY = 'paisahelp_lang_v1';
const CUSTOMER_STORAGE_KEY = 'paisahelp_customer_v1';

const INITIAL_STARTER_TASKS: PersonalTask[] = [
  {
    id: 'task-init-1',
    opportunityTitle: 'कैनवा सोशल मीडिया पोस्टर (Canva Poster Designer)',
    dayNumber: 1,
    title: 'Canva ऐप डाउनलोड करें और 3 मुफ्त ट्यूटोरियल देखें',
    description: 'यूट्यूब पर बुनियादी फॉन्ट्स, कलर्स और बैनर साइज के बारे में सीखें।',
    type: 'learning',
    isCompleted: true,
    dateAdded: '2026-10-17',
  },
  {
    id: 'task-init-2',
    opportunityTitle: 'कैनवा सोशल मीडिया पोस्टर (Canva Poster Designer)',
    dayNumber: 2,
    title: 'मिठाई और सैलून की दुकान के 2 सुंदर सैंपल पोस्टर बनाएं',
    description: 'अपने फोन में सेव करें ताकि दुकानदारों को व्हाट्सएप पर दिखा सकें।',
    type: 'learning',
    isCompleted: false,
    dateAdded: '2026-10-18',
  },
  {
    id: 'task-init-3',
    opportunityTitle: 'कैनवा सोशल मीडिया पोस्टर (Canva Poster Designer)',
    dayNumber: 3,
    title: 'मोहल्ले की 3 दुकानों पर जाकर फ्री सैंपल स्टेटस दिखाएं',
    description: 'उनसे कहें कि आज का ऑफर स्टेटस वे मुफ्त में अपने फोन पर लगा सकते हैं।',
    type: 'earning',
    isCompleted: false,
    dateAdded: '2026-10-18',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const [customer, setCustomer] = useState<CustomerUser | null>(() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Customer load error', e);
    }
    return null;
  });

  const [language, setLanguage] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
      if (savedLang === 'en' || savedLang === 'hi') return savedLang;
    } catch (e) {
      console.warn('Language read error', e);
    }
    return 'hi'; // Default Hindi-first experience as requested
  });

  const [tasks, setTasks] = useState<PersonalTask[]>(() => {
    try {
      const saved = localStorage.getItem(TASKS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Tasks load error', e);
    }
    return INITIAL_STARTER_TASKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.warn('Tasks save error', e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch (e) {
      console.warn('Language save error', e);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddTasksToActionPlan = (
    opportunityTitle: string,
    newItems: ActionPlanItem[]
  ) => {
    const formatted: PersonalTask[] = newItems.map((item, idx) => ({
      id: `task-${Date.now()}-${idx}`,
      opportunityTitle,
      dayNumber: item.day,
      title: item.title,
      description: item.description,
      type: item.type,
      isCompleted: false,
      dateAdded: new Date().toISOString().split('T')[0],
    }));

    setTasks((prev) => [...formatted, ...prev]);
    showToast(
      language === 'hi'
        ? `7-दिवसीय प्लान "${opportunityTitle.slice(0, 24)}..." एक्शन प्लान में जोड़ा गया!`
        : `7-Day plan added to your Action Plan!`
    );
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = (newTask: Omit<PersonalTask, 'id' | 'isCompleted' | 'dateAdded'>) => {
    const created: PersonalTask = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      type: newTask.type,
      isCompleted: false,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setTasks((prev) => [created, ...prev]);
    showToast(
      language === 'hi' ? 'नया कार्य सफलतापूर्वक जोड़ा गया!' : 'Task added successfully!'
    );
  };

  const handleClearCompletedTasks = () => {
    setTasks((prev) => prev.filter((t) => !t.isCompleted));
    showToast(
      language === 'hi' ? 'पूरे हो चुके कार्य हटा दिए गए' : 'Completed tasks cleared'
    );
  };

  const pendingTasksCount = tasks.filter((t) => !t.isCompleted).length;

  // STEP 1: REQUIRE CUSTOMER TO LOG IN FIRST
  if (!customer) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
        <LoginScreen
          language={language}
          onToggleLanguage={toggleLanguage}
          initialUserEmail="sagarbulu9513@gmail.com"
          onLoginSuccess={(user) => {
            setCustomer(user);
            try {
              localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(user));
            } catch (e) {
              console.warn('Error saving customer', e);
            }
            showToast(
              language === 'hi'
                ? `लॉगिन सफल! स्वागत है, ${user.name} जी!`
                : `Login successful! Welcome, ${user.name}!`
            );
          }}
        />

        {/* Notification Toast */}
        {toastMessage && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // STEP 2: ONCE LOGGED IN, ALL FEATURES BECOME ACCESSIBLE AND FUNCTIONAL
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Top Header with Customer Badge and Logout */}
      <Header
        language={language}
        onToggleLanguage={toggleLanguage}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        customer={customer}
        onOpenLogin={() => setShowLoginModal(true)}
        onLogout={() => {
          setCustomer(null);
          try {
            localStorage.removeItem(CUSTOMER_STORAGE_KEY);
          } catch (e) {
            console.warn('Error clearing customer', e);
          }
          showToast(
            language === 'hi'
              ? 'सफलतापूर्वक लॉगआउट हुआ। कृपया पुनः लॉगिन करें।'
              : 'Successfully logged out. Please log in again.'
          );
        }}
      />

      {/* Main Content Area - All Features Accessible */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-4 sm:py-6">
        {activeTab === 'home' && (
          <HomeScreen
            language={language}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            customer={customer}
            onOpenLogin={() => setShowLoginModal(true)}
          />
        )}

        {activeTab === 'earning-path' && (
          <EarningAssistant
            language={language}
            onAddTasksToActionPlan={handleAddTasksToActionPlan}
          />
        )}

        {activeTab === 'business-ideas' && (
          <BusinessIdeas language={language} />
        )}

        {activeTab === 'wfh-guide' && (
          <WorkFromHomeGuide language={language} />
        )}

        {activeTab === 'expense-tracker' && (
          <ExpenseTracker language={language} />
        )}

        {activeTab === 'action-plan' && (
          <ActionPlanView
            language={language}
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onAddTask={handleAddTask}
            onNavigateTab={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClearCompletedTasks={handleClearCompletedTasks}
          />
        )}

        {activeTab === 'scam-alert' && (
          <ScamAlertView language={language} />
        )}
      </main>

      {/* Account Switch Modal if invoked while logged in */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        language={language}
        initialUserEmail="sagarbulu9513@gmail.com"
        onLoginSuccess={(user) => {
          setCustomer(user);
          try {
            localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(user));
          } catch (e) {
            console.warn('Error saving customer', e);
          }
          showToast(
            language === 'hi'
              ? `खाता बदला गया: स्वागत है, ${user.name} जी!`
              : `Account switched: Welcome, ${user.name}!`
          );
        }}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile-first bottom navigation bar */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
        pendingTasksCount={pendingTasksCount}
      />
    </div>
  );
}
