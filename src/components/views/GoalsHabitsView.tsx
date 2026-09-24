import React, { useState } from 'react';
import {
  Flag,
  Repeat,
  Check,
  X,
  Flame,
  Zap,
  Target,
  Plus,
  Calendar,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HorizonType, PriorityType } from '../../types';

export const GoalsHabitsView: React.FC = () => {
  const {
    goals,
    habits,
    toggleHabitDay,
    addGoal,
    addHabit,
    setIsQuickAddOpen,
    setQuickAddType
  } = useApp();

  const [activeHorizon, setActiveHorizon] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'goal' | 'habit'>('goal');

  // New Goal / Habit Modal form state
  const [entryTitle, setEntryTitle] = useState('');
  const [entryCategory, setEntryCategory] = useState('Study / Personal');
  const [entryHorizon, setEntryHorizon] = useState<HorizonType>('monthly');
  const [entryPriority, setEntryPriority] = useState<PriorityType>('medium');
  const [entryTarget, setEntryTarget] = useState('10');
  const [entryUnit, setEntryUnit] = useState('Milestones');
  const [entryDeadline, setEntryDeadline] = useState('Oct 31, 2026');
  const [entryIcon, setEntryIcon] = useState('⚡');

  // Days for the 7-day precision matrix (Mon Sep 18 to Sun Sep 24)
  const matrixDays = [
    { dateStr: '2026-09-18', dayName: 'Mon', dayNum: '18' },
    { dateStr: '2026-09-19', dayName: 'Tue', dayNum: '19' },
    { dateStr: '2026-09-20', dayName: 'Wed', dayNum: '20' },
    { dateStr: '2026-09-21', dayName: 'Thu', dayNum: '21', isToday: true },
    { dateStr: '2026-09-22', dayName: 'Fri', dayNum: '22' },
    { dateStr: '2026-09-23', dayName: 'Sat', dayNum: '23' },
    { dateStr: '2026-09-24', dayName: 'Sun', dayNum: '24' }
  ];

  // Filter goals by horizon
  const filteredGoals = goals.filter((g) => {
    if (activeHorizon === 'all') return true;
    return g.horizon === activeHorizon;
  });

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entryTitle.trim()) return;

    if (modalMode === 'goal') {
      const targetVal = parseFloat(entryTarget) || 10;
      addGoal({
        title: entryTitle.trim(),
        category: entryCategory,
        horizon: entryHorizon,
        priority: entryPriority,
        currentValue: 1,
        targetValue: targetVal,
        unit: entryUnit,
        displayProgress: `1 / ${targetVal} ${entryUnit}`,
        deadline: entryDeadline,
        statusNote: 'In Progress',
        percentage: Math.round((1 / targetVal) * 100),
        description: 'Active continuous execution milestone'
      });
    } else {
      addHabit(entryTitle.trim(), `${entryCategory} system`, entryIcon);
    }

    setEntryTitle('');
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6 pb-12 select-none">
      {/* View Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-950/80 border border-indigo-800/80 px-2 py-0.5 rounded">
              Continuous Execution
            </span>
            <span className="text-zinc-500 text-xs font-mono">• Q3 2026</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Goals & Habit Tracker</h1>
          <p className="text-xs text-zinc-400">
            Define your long-term ambitions and build consistent daily systems.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setModalMode('habit');
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-semibold transition-all active:scale-95"
          >
            <Repeat className="w-3.5 h-3.5 text-emerald-400" />
            <span>+ New Habit</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setModalMode('goal');
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>+ New Goal</span>
          </button>
        </div>
      </div>

      {/* Horizon Filter Tabs */}
      <div className="flex items-center justify-between gap-4 py-1">
        <div className="inline-flex p-1 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-xl">
          {[
            { id: 'all', label: 'All Horizons' },
            { id: 'daily', label: 'Daily' },
            { id: 'weekly', label: 'Weekly' },
            { id: 'monthly', label: 'Monthly' },
            { id: 'yearly', label: 'Yearly' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveHorizon(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeHorizon === tab.id
                  ? 'bg-zinc-800 text-white font-semibold shadow-sm border border-zinc-700/60'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-3 text-zinc-500 text-xs font-mono">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> {goals.length} Active Goals
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-indigo-400" /> {habits.length} Live Habits
          </span>
        </div>
      </div>

      {/* Active Goals by Horizon (4 Cards Grid) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white tracking-tight">Active Goals by Horizon</h2>
          </div>
          <span className="text-[11px] font-mono text-zinc-500 uppercase">
            {filteredGoals.length} IN PROGRESS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filteredGoals.map((goal) => (
            <div
              key={goal.id}
              className="flex flex-col justify-between p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-xl hover:border-zinc-700 transition-all group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold">
                    {goal.horizon} Horizon
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${
                      goal.priority === 'high'
                        ? 'bg-rose-950 text-rose-300 border-rose-900'
                        : 'bg-amber-950 text-amber-300 border-amber-900'
                    }`}
                  >
                    {goal.priority} Priority
                  </span>
                </div>

                <div>
                  <span className="text-[11px] text-zinc-500 font-mono">{goal.category}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5 line-clamp-2 leading-snug group-hover:text-indigo-300 transition-colors">
                    {goal.title}
                  </h3>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">{goal.displayProgress}</span>
                  <span className="font-bold text-white">{goal.percentage}%</span>
                </div>

                <div className="w-full h-1.5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      goal.percentage >= 80 ? 'bg-emerald-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${goal.percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {goal.deadline}
                  </span>
                  <span className="text-emerald-400 font-medium">{goal.statusNote}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Split: Monthly Habit Tracker Matrix + Consistency Hub */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start mt-2">
        {/* LEFT: 7-Day Precision Grid */}
        <section className="xl:col-span-8 flex flex-col p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <Repeat className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white tracking-tight">Monthly Habit Tracker Matrix</h2>
              </div>
              <p className="text-xs text-zinc-500 font-mono mt-0.5">
                Section 14 • Current 7-Day Precision Grid (Sep 18 – Sep 24, 2026)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span>Today: <strong className="text-white">Thu, Sep 24</strong></span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-zinc-900">
                  <th className="py-2.5 px-3 font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
                    Habit & Frequency
                  </th>
                  {matrixDays.map((d) => (
                    <th
                      key={d.dateStr}
                      className={`py-2 px-1 text-center font-mono text-xs ${
                        d.isToday ? 'text-indigo-400 font-bold' : 'text-zinc-400'
                      }`}
                    >
                      {d.dayName}
                      <br />
                      <span
                        className={`text-[10px] px-1 rounded ${
                          d.isToday ? 'bg-indigo-600 text-white font-bold' : 'text-zinc-600'
                        }`}
                      >
                        {d.dayNum}
                      </span>
                    </th>
                  ))}
                  <th className="py-2.5 px-3 text-right font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
                    Streak
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {habits.map((habit) => (
                  <tr key={habit.id} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{habit.icon}</span>
                        <div>
                          <div className="text-xs font-bold text-white">{habit.name}</div>
                          <div className="text-[11px] font-mono text-zinc-500">{habit.frequency}</div>
                        </div>
                      </div>
                    </td>

                    {/* 7 Check Cells */}
                    {matrixDays.map((d) => {
                      const status = habit.history[d.dateStr] || 'pending';
                      return (
                        <td key={d.dateStr} className="py-3 px-1 text-center">
                          <button
                            type="button"
                            onClick={() => toggleHabitDay(habit.id, d.dateStr)}
                            className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all active:scale-90 border ${
                              status === 'completed'
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-sm shadow-emerald-600/30'
                                : status === 'missed'
                                ? 'bg-zinc-900 border-zinc-800 text-zinc-600 hover:text-zinc-400'
                                : 'bg-zinc-900/40 border-dashed border-zinc-800 text-zinc-600 hover:border-emerald-500'
                            }`}
                            title={`Status: ${status}. Click to cycle`}
                          >
                            {status === 'completed' ? (
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            ) : status === 'missed' ? (
                              <X className="w-3.5 h-3.5" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-zinc-800" />
                            )}
                          </button>
                        </td>
                      );
                    })}

                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 font-mono text-xs font-semibold">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        {habit.streak} days
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 pt-4 border-t border-zinc-900 flex items-center justify-between text-zinc-500 text-xs font-mono">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-600 flex items-center justify-center text-[9px]">
                  ✕
                </span>{' '}
                Missed / Rest
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded border border-dashed border-zinc-700" /> Pending
              </span>
            </div>
            <span>Tip: Click any cell to cycle completion</span>
          </div>
        </section>

        {/* RIGHT: Consistency Hub */}
        <section className="xl:col-span-4 flex flex-col gap-5">
          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Consistency Hub</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-semibold">September</span>
            </div>

            {/* Circular Adherence Metric */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900 border border-zinc-800/80">
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle
                    className="text-zinc-800 stroke-current"
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    strokeWidth="3.5"
                  />
                  <circle
                    className="text-emerald-500 stroke-current"
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    strokeWidth="3.5"
                    strokeDasharray="100"
                    strokeDashoffset="16"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute font-mono font-bold text-white text-xs">84%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Overall Habit Score
                </span>
                <span className="text-sm font-bold text-white">High Adherence</span>
                <span className="text-xs font-mono text-emerald-400 font-medium">+6% vs last week</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex flex-col p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> Longest Streak
                </span>
                <span className="text-lg font-bold text-white font-mono mt-1">24 Days</span>
                <span className="text-[11px] text-zinc-500 truncate">Study English</span>
              </div>
              <div className="flex flex-col p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-indigo-400" /> Best Day
                </span>
                <span className="text-lg font-bold text-white font-mono mt-1">Tuesday</span>
                <span className="text-[11px] text-zinc-500">96% success rate</span>
              </div>
            </div>
          </div>

          {/* Quote Card (Systems vs Goals) with hotlinked background from mock */}
          <div className="relative overflow-hidden p-6 rounded-2xl bg-zinc-950 border border-zinc-800/90 shadow-xl flex flex-col justify-between min-h-[175px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFi5juNXjghng01EGxY5lyDXQPladERQtmH--elcRj0Y_YQaB3KIK_Ct63Ho95JM0R-LRsgWK6G7hHq7ZDh_WlqnpMQiblNDQGBNfyNmYy2CSdZoT5-d73M8fYlfgcPiri5q0G-xd8p0TOmH_frF38AQhkPvhUN-m8TFmTdPH25Nc_7ZTv1saZXy6yfUMuQWJ9VszLco4fdKVy5uZkXW_mgUMCqLoSax5wwaeYPK5PcIkjWsLln70p"
              alt="Systems architecture desk"
              className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none filter grayscale contrast-125"
            />
            <div className="relative z-10 flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
                Systems vs Goals
              </span>
              <p className="text-sm font-medium text-white leading-relaxed">
                "You do not rise to the level of your goals. You fall to the level of your systems."
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between text-zinc-500 text-xs font-mono pt-4 border-t border-zinc-900">
              <span>Section 21 • Law Note Core</span>
              <span className="text-indigo-400 font-medium flex items-center gap-1 hover:underline cursor-pointer">
                Protocol V1 <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Interactive Modal for adding Goal or Habit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <h3 className="text-base font-bold text-white">
                {modalMode === 'goal' ? '+ Add Long-Term Goal' : '+ Create Daily System / Habit'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-500 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">
                  {modalMode === 'goal' ? 'Goal Title' : 'Habit Name'}
                </label>
                <input
                  type="text"
                  value={entryTitle}
                  onChange={(e) => setEntryTitle(e.target.value)}
                  placeholder={
                    modalMode === 'goal'
                      ? 'e.g. Pass Constitutional Bar Exam'
                      : 'e.g. Read Contract Briefs 30 mins'
                  }
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
              </div>

              {modalMode === 'goal' ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-zinc-400">Horizon</label>
                      <select
                        value={entryHorizon}
                        onChange={(e) => setEntryHorizon(e.target.value as HorizonType)}
                        className="h-9 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-zinc-400">Priority</label>
                      <select
                        value={entryPriority}
                        onChange={(e) => setEntryPriority(e.target.value as PriorityType)}
                        className="h-9 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                      >
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-zinc-400">Target Value</label>
                      <input
                        type="number"
                        value={entryTarget}
                        onChange={(e) => setEntryTarget(e.target.value)}
                        className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-medium text-zinc-400">Unit</label>
                      <input
                        type="text"
                        value={entryUnit}
                        onChange={(e) => setEntryUnit(e.target.value)}
                        className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-zinc-400">Deadline</label>
                    <input
                      type="text"
                      value={entryDeadline}
                      onChange={(e) => setEntryDeadline(e.target.value)}
                      placeholder="e.g. Dec 31, 2026"
                      className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-zinc-400">Frequency Cadence</label>
                    <input
                      type="text"
                      value={entryCategory}
                      onChange={(e) => setEntryCategory(e.target.value)}
                      placeholder="Daily system or 4x/week"
                      className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-medium text-zinc-400">Emoji Icon</label>
                    <input
                      type="text"
                      value={entryIcon}
                      onChange={(e) => setEntryIcon(e.target.value)}
                      className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none text-center"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-900 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
