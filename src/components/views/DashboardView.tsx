import React, { useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  FileText,
  TrendingUp,
  Check,
  MoreVertical,
  Flame,
  ArrowUpRight,
  Maximize2,
  Clock,
  Sparkles,
  Target,
  Repeat
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PriorityType } from '../../types';

export const DashboardView: React.FC = () => {
  const {
    tasks,
    habits,
    goals,
    profile,
    toggleTask,
    toggleHabitDay,
    updateScratchpad,
    setCurrentView,
    setIsQuickAddOpen,
    setQuickAddType
  } = useApp();

  const [scratchpadText, setScratchpadText] = useState(profile.scratchpad);
  const [scratchpadStatus, setScratchpadStatus] = useState<'saved' | 'saving'>('saved');

  // Filter today's priority tasks & timeline events
  const priorityTasks = tasks.filter((t) => t.id.startsWith('pt-') || t.priority === 'high').slice(0, 4);
  const remainingCount = tasks.filter((t) => !t.completed).length;

  // Timeline events for dashboard preview
  const dashboardTimeline = [
    { id: 'dt-1', time: '09:00', title: 'Work — Deep focus sprint', category: 'Work', priority: 'High', completed: true },
    { id: 'dt-2', time: '13:00', title: 'Lunch with Sarah', category: 'Personal', priority: 'Low', completed: true },
    { id: 'dt-3', time: '15:30', title: 'Client Review Call', category: 'Work', priority: 'Medium', completed: false, isCurrent: true },
    { id: 'dt-4', time: '17:30', title: 'Gym - Leg day', category: 'Fitness', priority: 'Medium', completed: false },
    { id: 'dt-5', time: '20:00', title: 'Personal Project - Law Note UI', category: 'Project', priority: 'Low', completed: false }
  ];

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6 select-none">
      {/* Header Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-zinc-950 border border-zinc-800/90 p-6 rounded-2xl shadow-xl relative overflow-hidden">
        {/* Subtle executive glow */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-1 z-10">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Good evening, {profile.userName} <span className="inline-block transform hover:rotate-12 transition-transform cursor-default">👋</span>
          </h1>
          <p className="text-xs text-zinc-400 flex items-center gap-2">
            <span>Thursday, September 24, 2026</span>
            <span className="w-1 h-1 rounded-full bg-zinc-700" />
            <span className="text-indigo-400 font-medium">
              You have {remainingCount} tasks remaining for today.
            </span>
          </p>
        </div>

        {/* Quick Action Controls */}
        <div className="flex items-center flex-wrap gap-2 z-10">
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 p-1 rounded-xl shadow-inner">
            <button
              type="button"
              onClick={() => {
                setQuickAddType('task');
                setIsQuickAddOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Task</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setQuickAddType('event');
                setIsQuickAddOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Event</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setQuickAddType('note');
                setIsQuickAddOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-medium transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Note</span>
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 pl-2 text-zinc-500 text-xs">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[10px] font-semibold">
              N
            </kbd>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Today's Tasks */}
        <div className="bg-zinc-950 border border-zinc-800/90 p-5 rounded-2xl shadow-xl flex flex-col justify-between hover:border-zinc-700 transition-all">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Today's Tasks
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-white tracking-tight">7</span>
                <span className="text-xs text-zinc-500">total</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-mono text-[11px]">
                4 completed
              </span>
              <span className="text-zinc-400 font-medium">3 remaining</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 border border-zinc-800/80 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: '57%' }} />
            </div>
          </div>
        </div>

        {/* Card 2: Habits Tracker */}
        <div className="bg-zinc-950 border border-zinc-800/90 p-5 rounded-2xl shadow-xl flex flex-col justify-between hover:border-zinc-700 transition-all">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Habits Tracker
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-white tracking-tight">
                  5 <span className="text-zinc-500 text-lg font-normal">/ 7</span>
                </span>
                <span className="text-xs font-semibold text-emerald-400 font-mono">71%</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>12 days active streak</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-emerald-500" />
              ))}
              <span className="w-2 h-2 rounded-full bg-zinc-800" />
              <span className="w-2 h-2 rounded-full bg-zinc-800" />
            </div>
          </div>
        </div>

        {/* Card 3: Events Today */}
        <div className="bg-zinc-950 border border-zinc-800/90 p-5 rounded-2xl shadow-xl flex flex-col justify-between hover:border-zinc-700 transition-all">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Events Today
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-white tracking-tight">2</span>
                <span className="text-xs text-zinc-500">scheduled</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs text-zinc-200">
              <div className="flex items-center gap-2 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="truncate font-medium">Team Sync</span>
              </div>
              <span className="font-mono text-zinc-400 text-[11px]">14:00</span>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-200">
              <div className="flex items-center gap-2 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="truncate font-medium">Gym Session</span>
              </div>
              <span className="font-mono text-zinc-400 text-[11px]">17:30</span>
            </div>
          </div>
        </div>

        {/* Card 4: Weekly Productivity */}
        <div className="bg-zinc-950 border border-zinc-800/90 p-5 rounded-2xl shadow-xl flex flex-col justify-between hover:border-zinc-700 transition-all">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Weekly Productivity
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-bold text-white tracking-tight">85%</span>
                <span className="inline-flex items-center text-xs font-semibold text-emerald-400 font-mono">
                  ↑ 12%
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          {/* Sparkline Bars */}
          <div className="mt-4 flex items-end gap-2 h-7">
            <div className="flex-1 bg-zinc-800 rounded-sm h-3 hover:bg-indigo-500 transition-colors" title="Mon: 50%" />
            <div className="flex-1 bg-zinc-800 rounded-sm h-4 hover:bg-indigo-500 transition-colors" title="Tue: 65%" />
            <div className="flex-1 bg-zinc-800 rounded-sm h-5 hover:bg-indigo-500 transition-colors" title="Wed: 80%" />
            <div className="flex-1 bg-indigo-600 rounded-sm h-7 shadow-sm shadow-indigo-600/50" title="Thu (Today): 85%" />
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-sm h-2" title="Fri" />
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-sm h-2" title="Sat" />
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-sm h-2" title="Sun" />
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Schedule Timeline & Priority Tasks */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* a) Today's Schedule & Timeline */}
          <section className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" />
                <h2 className="text-base font-bold text-white tracking-tight">Today's Schedule & Timeline</h2>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                5 Events Mapped
              </span>
            </div>

            <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-zinc-800">
              {dashboardTimeline.map((item) => (
                <div
                  key={item.id}
                  className={`relative group flex items-start gap-4 p-3 rounded-xl transition-all border ${
                    item.isCurrent
                      ? 'bg-zinc-900/90 border-indigo-500/60 shadow-lg'
                      : 'bg-zinc-900/40 border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/70'
                  }`}
                >
                  <div
                    className={`absolute -left-6 top-3.5 w-3 h-3 rounded-full ring-4 ring-black ${
                      item.completed
                        ? 'bg-emerald-500'
                        : item.isCurrent
                        ? 'bg-indigo-500 animate-pulse'
                        : 'bg-zinc-700'
                    }`}
                  />
                  <span className="font-mono text-xs text-zinc-400 pt-0.5 w-12 shrink-0">{item.time}</span>
                  <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span
                      className={`text-xs font-medium select-none truncate ${
                        item.completed ? 'line-through text-zinc-500' : 'text-zinc-100 font-semibold'
                      }`}
                    >
                      {item.title}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                        {item.category}
                      </span>
                      {item.priority === 'High' && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-900 uppercase">
                          High
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* b) Priority Tasks */}
          <section className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <h2 className="text-base font-bold text-white tracking-tight">Priority Tasks</h2>
              </div>
              <button
                type="button"
                onClick={() => setCurrentView('tasks')}
                className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col divide-y divide-zinc-900">
              {priorityTasks.map((t) => (
                <div
                  key={t.id}
                  className="py-3 flex items-center justify-between gap-4 group hover:bg-zinc-900/40 px-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleTask(t.id)}
                      className={`w-4 h-4 rounded flex items-center justify-center transition-colors shrink-0 ${
                        t.completed
                          ? 'bg-emerald-600 text-white'
                          : 'border border-zinc-700 hover:border-emerald-500 bg-zinc-900'
                      }`}
                    >
                      {t.completed && <Check className="w-3 h-3 stroke-[3]" />}
                    </button>
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-xs font-medium truncate select-none ${
                          t.completed ? 'line-through text-zinc-500' : 'text-zinc-200'
                        }`}
                      >
                        {t.title}
                      </span>
                      <div className="flex items-center gap-2 text-zinc-500 text-[11px] font-mono mt-0.5">
                        {t.dueDate && (
                          <span className="flex items-center gap-1 text-indigo-400">
                            <Clock className="w-3 h-3" />
                            {t.dueDate}
                          </span>
                        )}
                        {t.completedAt && (
                          <span className="text-emerald-400">{t.completedAt}</span>
                        )}
                        <span>•</span>
                        <span className="capitalize">{t.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${
                        t.completed
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : t.priority === 'high'
                          ? 'bg-rose-950 text-rose-300 border-rose-900'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {t.completed ? 'Done' : t.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Habit Quick-Check, Goals Snapshot, Quick Scratchpad */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* a) Habit Quick-Check */}
          <section className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Repeat className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Habit Quick-Check</h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">5/7 Today</span>
            </div>

            <div className="flex flex-col gap-1.5 pt-1">
              {habits.map((habit) => {
                const isCheckedToday = habit.history['2026-09-24'] === 'completed';
                return (
                  <div
                    key={habit.id}
                    onClick={() => toggleHabitDay(habit.id, '2026-09-24')}
                    className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/60 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{habit.icon}</span>
                      <span
                        className={`text-xs transition-colors ${
                          isCheckedToday ? 'text-zinc-200' : 'text-zinc-400 group-hover:text-white'
                        }`}
                      >
                        {habit.name}
                      </span>
                    </div>
                    {isCheckedToday ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-zinc-700 group-hover:border-zinc-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* b) September Goals (Snapshot) */}
          <section className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">September Goals</h3>
              </div>
              <button
                type="button"
                onClick={() => setCurrentView('goals')}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300"
              >
                Snapshot
              </button>
            </div>

            <div className="flex flex-col gap-4 pt-1">
              {goals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-200 font-medium truncate max-w-[200px]">
                      {goal.title}
                    </span>
                    <span className="font-mono text-zinc-400 text-[11px] font-semibold">
                      {goal.displayProgress}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${goal.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* c) Quick Scratchpad */}
          <section className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-5 shadow-xl flex flex-col gap-3 relative">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-900">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Quick Scratchpad</h3>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{scratchpadStatus === 'saving' ? 'Saving...' : 'Saved'}</span>
              </div>
            </div>

            <textarea
              value={scratchpadText}
              onChange={(e) => {
                setScratchpadText(e.target.value);
                setScratchpadStatus('saving');
                setTimeout(() => {
                  updateScratchpad(e.target.value);
                  setScratchpadStatus('saved');
                }, 500);
              }}
              rows={4}
              placeholder="Jot down an idea, reflection, or note for today..."
              className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
            />

            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                {profile.scratchpadTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-indigo-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setCurrentView('notes')}
                className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-zinc-900 transition-colors"
                title="Open Notes View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
