import React, { useState, useEffect } from 'react';
import { Transaction, SavingsGoal, Language } from '../types';
import { translations } from '../translations';
import {
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  Plus,
  Trash2,
  PiggyBank,
  AlertCircle,
  Target,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

interface ExpenseTrackerProps {
  language: Language;
}

const STORAGE_KEY_TXS = 'paisahelp_transactions_v1';
const STORAGE_KEY_GOAL = 'paisahelp_savings_goal_v1';

const INITIAL_SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    type: 'income',
    category: 'Freelance / Side Earning',
    amount: 3500,
    date: '2026-10-15',
    note: 'Canva 3 posters for Sharma Bakery',
  },
  {
    id: 'tx-2',
    type: 'expense',
    category: 'Ration & Groceries',
    amount: 1450,
    date: '2026-10-16',
    note: 'Atta, rice, and cooking oil',
  },
  {
    id: 'tx-3',
    type: 'expense',
    category: 'Mobile Recharge',
    amount: 299,
    date: '2026-10-17',
    note: '1.5GB/day 28-day data pack',
  },
  {
    id: 'tx-4',
    type: 'income',
    category: 'Daily Wage / Service',
    amount: 1200,
    date: '2026-10-17',
    note: 'Phone repair & screen guard sales',
  },
];

export const ExpenseTracker: React.FC<ExpenseTrackerProps> = ({ language }) => {
  const t = translations[language];

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TXS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load transactions from localStorage', e);
    }
    return INITIAL_SAMPLE_TRANSACTIONS;
  });

  const [savingsGoal, setSavingsGoal] = useState<SavingsGoal>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_GOAL);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load goal from localStorage', e);
    }
    return {
      title: language === 'hi' ? 'आपातकालीन सुरक्षा कोष (Emergency Fund)' : 'Emergency Safety Fund',
      targetAmount: 10000,
      currentAmount: 3500,
    };
  });

  // Modal / Form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [txType, setTxType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Ration & Groceries');
  const [note, setNote] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Goal edit state
  const [editingGoal, setEditingGoal] = useState(false);
  const [newGoalTarget, setNewGoalTarget] = useState(savingsGoal.targetAmount.toString());
  const [newGoalSaved, setNewGoalSaved] = useState(savingsGoal.currentAmount.toString());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TXS, JSON.stringify(transactions));
    } catch (e) {
      console.warn('Failed to save transactions', e);
    }
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GOAL, JSON.stringify(savingsGoal));
    } catch (e) {
      console.warn('Failed to save savings goal', e);
    }
  }, [savingsGoal]);

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: txType,
      category,
      amount: numAmount,
      date,
      note: note.trim() || (txType === 'income' ? 'Income' : 'Expense'),
    };

    setTransactions([newTx, ...transactions]);
    setAmount('');
    setNote('');
    setShowAddModal(false);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(newGoalTarget) || 5000;
    const saved = parseFloat(newGoalSaved) || 0;
    setSavingsGoal({
      ...savingsGoal,
      targetAmount: target,
      currentAmount: saved,
    });
    setEditingGoal(false);
  };

  const resetToSampleData = () => {
    setTransactions(INITIAL_SAMPLE_TRANSACTIONS);
    setSavingsGoal({
      title: language === 'hi' ? 'आपातकालीन सुरक्षा कोष (Emergency Fund)' : 'Emergency Safety Fund',
      targetAmount: 10000,
      currentAmount: 3500,
    });
  };

  const expenseCategories = [
    'Ration & Groceries (राशन)',
    'Rent & Room (किराया)',
    'Electricity / Gas / Water',
    'Mobile & Recharge',
    'Kids School & Education',
    'Health & Medicine (दवा)',
    'Travel & Petrol',
    'Business Raw Material',
    'Snacks & Misc',
  ];

  const incomeCategories = [
    'Freelance / Side Earning',
    'Daily Wage / मजदूरी',
    'Small Business Sales',
    'Regular Salary (वेतन)',
    'Milk / Agri Produce',
    'Other Income',
  ];

  const goalPercentage = Math.min(
    100,
    Math.round((savingsGoal.currentAmount / Math.max(1, savingsGoal.targetAmount)) * 100)
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
            <Wallet className="w-4 h-4" />
            <span>{t.expTitle}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            {language === 'hi' ? 'कमाई, खर्च और बचत का सरल हिसाब' : 'Simple Income & Expense Book'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.expSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={resetToSampleData}
            className="px-3 py-1.5 border border-slate-300 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 flex items-center gap-1"
            title="Reset to sample"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'सैंपल डेटा' : 'Sample Data'}</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t.addTransaction}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards: Income, Expense, Balance */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {/* Income Card */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 sm:p-4 text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] font-bold text-emerald-800">
            <ArrowUpCircle className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{t.totalIncome}</span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-emerald-700">
            ₹{totalIncome.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Expense Card */}
        <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-3 sm:p-4 text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] font-bold text-rose-800">
            <ArrowDownCircle className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{t.totalExpense}</span>
          </div>
          <div className="text-lg sm:text-2xl font-black text-rose-700">
            ₹{totalExpense.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Balance Card */}
        <div
          className={`border rounded-2xl p-3 sm:p-4 text-center sm:text-left space-y-1 ${
            netBalance >= 0
              ? 'bg-blue-50/80 border-blue-200 text-blue-900'
              : 'bg-amber-50/80 border-amber-200 text-amber-900'
          }`}
        >
          <div className="flex items-center justify-center sm:justify-start gap-1 text-[11px] font-bold">
            <Wallet className="w-3.5 h-3.5" />
            <span className="line-clamp-1">{t.balance}</span>
          </div>
          <div
            className={`text-lg sm:text-2xl font-black ${
              netBalance >= 0 ? 'text-blue-700' : 'text-amber-700'
            }`}
          >
            ₹{netBalance.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Emergency Fund / Savings Goal Tracker */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <PiggyBank className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {savingsGoal.title}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {language === 'hi'
                  ? 'अचानक खर्चे या बीमारी से बचने के लिए कम से कम 1 महीने का खर्च अलग रखें।'
                  : 'Maintain a 1-month buffer to protect from high-interest loan traps.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setEditingGoal(!editingGoal)}
            className="text-xs font-bold text-blue-700 hover:underline px-2 py-1"
          >
            {editingGoal
              ? language === 'hi' ? 'रद्द करें' : 'Cancel'
              : language === 'hi' ? 'लक्ष्य बदलें' : 'Edit Goal'}
          </button>
        </div>

        {/* Goal Edit Form */}
        {editingGoal ? (
          <form onSubmit={handleSaveGoal} className="p-3 bg-slate-50 rounded-xl space-y-2.5 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {t.goalTarget} (₹):
                </label>
                <input
                  type="number"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg font-semibold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {t.goalSaved} (₹):
                </label>
                <input
                  type="number"
                  value={newGoalSaved}
                  onChange={(e) => setNewGoalSaved(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg font-semibold"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg text-xs"
            >
              {language === 'hi' ? 'नया लक्ष्य सेव करें' : 'Update Goal'}
            </button>
          </form>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>
                ₹{savingsGoal.currentAmount.toLocaleString('en-IN')} / ₹{savingsGoal.targetAmount.toLocaleString('en-IN')}
              </span>
              <span className="text-amber-700">{goalPercentage}% पूरा</span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-200">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${goalPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 space-y-3">
        <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center justify-between">
          <span>{t.recentHistory}</span>
          <span className="text-xs text-slate-500 font-normal">
            ({transactions.length} entries)
          </span>
        </h3>

        {transactions.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 space-y-1">
            <p>{t.noTransactions}</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="py-2.5 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      tx.type === 'income'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {tx.type === 'income' ? (
                      <ArrowUpCircle className="w-4 h-4" />
                    ) : (
                      <ArrowDownCircle className="w-4 h-4" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 line-clamp-1">{tx.note}</p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {tx.category} • {tx.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`font-black text-xs sm:text-sm ${
                      tx.type === 'income' ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => handleDeleteTransaction(tx.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {t.addTransaction}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-3.5 text-xs">
              {/* Type toggle */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTxType('expense');
                    setCategory(expenseCategories[0]);
                  }}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    txType === 'expense'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {t.expenseTab}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTxType('income');
                    setCategory(incomeCategories[0]);
                  }}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    txType === 'income'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {t.incomeTab}
                </button>
              </div>

              {/* Amount */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.amountLabel} *
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.categoryLabel}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(txType === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {t.noteLabel}
                </label>
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'उदा. किराना सामान, टिफिन ऑर्डर' : 'e.g. ration groceries, tiffin order'}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  तारीख (Date)
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95"
              >
                {t.btnSave}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
