import React, { useState } from 'react';
import { PersonalTask, Language, TabType } from '../types';
import { translations } from '../translations';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  Sparkles,
  BookOpen,
  Coins,
  ArrowRight,
  RotateCcw,
  PieChart as PieChartIcon,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

interface ActionPlanViewProps {
  language: Language;
  tasks: PersonalTask[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (task: Omit<PersonalTask, 'id' | 'isCompleted' | 'dateAdded'>) => void;
  onNavigateTab: (tab: TabType) => void;
  onClearCompletedTasks: () => void;
}

export const ActionPlanView: React.FC<ActionPlanViewProps> = ({
  language,
  tasks,
  onToggleTask,
  onDeleteTask,
  onAddTask,
  onNavigateTab,
  onClearCompletedTasks,
}) => {
  const t = translations[language];

  const [showAddModal, setShowAddModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskType, setTaskType] = useState<'learning' | 'earning'>('earning');
  const [chartType, setChartType] = useState<'donut' | 'bar'>('donut');

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const pendingCount = tasks.length - completedCount;
  const progressPercent =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  // Breakdown by learning vs earning
  const learningTasks = tasks.filter((t) => t.type === 'learning');
  const earningTasks = tasks.filter((t) => t.type === 'earning');
  const learningCompleted = learningTasks.filter((t) => t.isCompleted).length;
  const earningCompleted = earningTasks.filter((t) => t.isCompleted).length;

  const pieChartData = [
    {
      name: language === 'hi' ? 'पूर्ण किए गए (Completed)' : 'Completed Tasks',
      value: completedCount,
      color: '#10B981', // Emerald
    },
    {
      name: language === 'hi' ? 'लंबित कार्य (Pending)' : 'Pending Tasks',
      value: pendingCount,
      color: '#F59E0B', // Amber
    },
  ];

  const barChartData = [
    {
      category: language === 'hi' ? 'सीखना (Learning)' : 'Learning',
      completed: learningCompleted,
      pending: learningTasks.length - learningCompleted,
    },
    {
      category: language === 'hi' ? 'कमाई कदम (Earning)' : 'Earning',
      completed: earningCompleted,
      pending: earningTasks.length - earningCompleted,
    },
  ];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    onAddTask({
      title: taskTitle.trim(),
      description: taskDesc.trim(),
      type: taskType,
    });

    setTaskTitle('');
    setTaskDesc('');
    setShowAddModal(false);
  };

  // Group tasks by active opportunity if any
  const opportunityTitles = Array.from(
    new Set(tasks.map((t) => t.opportunityTitle).filter(Boolean))
  ) as string[];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
            <CheckSquare className="w-4 h-4" />
            <span>{t.planTitle}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            {language === 'hi' ? 'मेरा व्यक्तिगत 7-दिवसीय एक्शन प्लान' : 'My Personal Action Plan'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.planSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="self-start sm:self-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addTask}</span>
        </button>
      </div>

      {/* Progress Metric & Distinction Legend */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span>
            {t.progressLabel}: {completedCount} / {tasks.length}
          </span>
          <span className="text-amber-700 font-black text-sm">{progressPercent}%</span>
        </div>

        {/* Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
          <div
            className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Recharts Visual Section */}
        {tasks.length > 0 && (
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                  {language === 'hi'
                    ? 'कार्य प्रगति चार्ट (Task Status Visualization)'
                    : 'Task Progress Visualization'}
                </h3>
              </div>

              {/* Chart Format Switcher */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setChartType('donut')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    chartType === 'donut'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <PieChartIcon className="w-3 h-3" />
                  <span>{language === 'hi' ? 'डोनट' : 'Donut'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setChartType('bar')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    chartType === 'bar'
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-3 h-3" />
                  <span>{language === 'hi' ? 'बार' : 'Bar'}</span>
                </button>
              </div>
            </div>

            {/* Recharts Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
              {/* Chart Visual (2 cols on desktop) */}
              <div className="md:col-span-2 h-48 w-full bg-slate-50/70 rounded-xl p-2 border border-slate-100 flex items-center justify-center">
                {chartType === 'donut' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        formatter={(val: any) => [
                          `${val} ${language === 'hi' ? 'कार्य' : 'tasks'}`,
                          '',
                        ]}
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                          borderColor: '#e2e8f0',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      />
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => (
                          <span className="text-xs font-semibold text-slate-700">
                            {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={barChartData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <XAxis
                        dataKey="category"
                        tick={{ fontSize: 11, fontWeight: 600, fill: '#475569' }}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 11, fill: '#64748b' }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          borderRadius: '8px',
                          borderColor: '#e2e8f0',
                          fontSize: '12px',
                          fontWeight: 600,
                        }}
                      />
                      <Legend
                        formatter={(value) => (
                          <span className="text-xs font-semibold text-slate-700">
                            {value === 'completed'
                              ? language === 'hi' ? 'पूर्ण (Done)' : 'Completed'
                              : language === 'hi' ? 'लंबित (Pending)' : 'Pending'}
                          </span>
                        )}
                      />
                      <Bar
                        dataKey="completed"
                        name={language === 'hi' ? 'पूर्ण (Completed)' : 'Completed'}
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="pending"
                        name={language === 'hi' ? 'लंबित (Pending)' : 'Pending'}
                        fill="#F59E0B"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Stat Summary Cards */}
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-800 block">
                      {language === 'hi' ? 'पूर्ण कार्य (Completed)' : 'Completed Tasks'}
                    </span>
                    <span className="text-lg font-black text-emerald-700">
                      {completedCount}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-900">
                    {progressPercent}%
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-amber-800 block">
                      {language === 'hi' ? 'लंबित कार्य (Pending)' : 'Pending Tasks'}
                    </span>
                    <span className="text-lg font-black text-amber-700">
                      {pendingCount}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-200/80 text-amber-900">
                    {100 - progressPercent}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legend: Learning vs Earning */}
        <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <span className="font-bold text-slate-500">
            {language === 'hi' ? 'कार्यों का वर्गीकरण:' : 'Task Legend:'}
          </span>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200 text-[11px] font-bold">
            <BookOpen className="w-3 h-3" />
            <span>{t.planLearningTag}</span>
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold">
            <Coins className="w-3 h-3" />
            <span>{t.planEarningTag}</span>
          </div>
        </div>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <CheckSquare className="w-6 h-6" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-900">
            {language === 'hi' ? 'कोई सक्रिय कार्य योजना नहीं है' : 'No Action Plan Active'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {t.emptyPlan}
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={() => onNavigateTab('earning-path')}
              className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs hover:bg-amber-700 flex items-center gap-1.5"
            >
              <span>{t.goToAssistant}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Opportunity Header if linked */}
          {opportunityTitles.length > 0 && (
            <div className="px-1 text-xs font-semibold text-slate-500">
              {language === 'hi' ? 'सक्रिय लक्ष्य: ' : 'Active Goal: '}
              <span className="font-bold text-slate-800">
                {opportunityTitles.join(', ')}
              </span>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-xs">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-3.5 sm:p-4 flex items-start justify-between gap-3 transition-colors ${
                  task.isCompleted ? 'bg-slate-50/70' : 'hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  {/* Checkbox */}
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className="mt-0.5 text-slate-400 hover:text-amber-600 transition-colors shrink-0"
                  >
                    {task.isCompleted ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  {/* Task details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {task.dayNumber && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                          Day {task.dayNumber}
                        </span>
                      )}
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          task.type === 'learning'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {task.type === 'learning'
                          ? language === 'hi' ? 'सीखना' : 'Learning'
                          : language === 'hi' ? 'कमाई कदम' : 'Earning'}
                      </span>
                    </div>

                    <h4
                      className={`text-xs sm:text-sm font-bold text-slate-900 mt-1 ${
                        task.isCompleted ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {task.title}
                    </h4>

                    {task.description && (
                      <p
                        className={`text-xs text-slate-500 mt-0.5 leading-relaxed ${
                          task.isCompleted ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-1 text-slate-300 hover:text-rose-500 rounded shrink-0"
                  title="Delete Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick Actions Footer */}
          {completedCount > 0 && (
            <div className="flex justify-end px-1">
              <button
                onClick={onClearCompletedTasks}
                className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors"
              >
                {language === 'hi' ? 'पूरे हो चुके कार्य हटाएं' : 'Clear Completed Tasks'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {t.addTask}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'hi' ? 'कार्य का शीर्षक:' : 'Task Title:'} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'hi' ? 'उदा. 3 दुकानदारों से संपर्क करना' : 'e.g. Approach 3 local store owners'}
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'hi' ? 'विवरण (Description):' : 'Details:'}
                </label>
                <textarea
                  rows={2}
                  placeholder={language === 'hi' ? 'उदा. सैंपल पोस्टर व्हाट्सएप पर भेजना' : 'e.g. send Canva poster samples over WhatsApp'}
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {language === 'hi' ? 'कार्य का प्रकार:' : 'Task Type:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTaskType('learning')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      taskType === 'learning'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {language === 'hi' ? 'सीखना (Learning)' : 'Skill Learning'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setTaskType('earning')}
                    className={`py-2 rounded-xl font-bold border transition-all ${
                      taskType === 'earning'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {language === 'hi' ? 'कमाई (Earning)' : 'Earning Action'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 text-xs"
              >
                {language === 'hi' ? 'कार्य जोड़ें' : 'Save Task'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
