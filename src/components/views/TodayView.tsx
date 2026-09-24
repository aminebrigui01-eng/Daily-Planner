import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Check,
  CheckCircle2,
  Bell,
  Video,
  GripVertical,
  CalendarPlus,
  Plus,
  Repeat,
  Cloud,
  Smile,
  SlidersHorizontal,
  Flame,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CategoryType, PriorityType, Task } from '../../types';

export const TodayView: React.FC = () => {
  const {
    tasks,
    toggleTask,
    addTask,
    scheduleBacklogTask,
    profile,
    updateReflection,
    setIsQuickAddOpen,
    setQuickAddType
  } = useApp();

  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('Sep 24, 2026');

  // Quick Create Form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<PriorityType>('medium');
  const [newTaskCategory, setNewTaskCategory] = useState<CategoryType>('work');
  const [newTaskTime, setNewTaskTime] = useState('18:30 - 19:15');
  const [newTaskRepeat, setNewTaskRepeat] = useState<'none' | 'daily' | 'weekly'>('none');

  // Reflection saving indicator
  const [reflectionStatus, setReflectionStatus] = useState<'saved' | 'saving'>('saved');
  const [reflectionText, setReflectionText] = useState(profile.todayReflection);
  const [reflectionMood, setReflectionMood] = useState(profile.todayMood || 'Focus & Calm');
  const [showMoodMenu, setShowMoodMenu] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);
  const nowMarkerRef = useRef<HTMLDivElement>(null);

  // Jump to Now smooth scroll
  const handleJumpToNow = () => {
    nowMarkerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Add task from quick form
  const handleQuickCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle.trim(),
      category: newTaskCategory,
      priority: newTaskPriority,
      completed: false,
      scheduledTime: newTaskTime.trim(),
      duration: '45 mins',
      repeat: newTaskRepeat,
      date: '2026-09-24',
      isBacklog: false
    });

    setNewTaskTitle('');
  };

  // Filter tasks
  const scheduledTasks = tasks.filter((t) => !t.isBacklog);
  const filteredTasks = scheduledTasks.filter((t) => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  const backlogTasks = tasks.filter((t) => t.isBacklog);

  // Completion calculation
  const completedCount = scheduledTasks.filter((t) => t.completed).length;
  const totalCount = scheduledTasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Category badge styling helper
  const getCategoryBadge = (cat: CategoryType) => {
    switch (cat) {
      case 'work':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-800/80';
      case 'fitness':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80';
      case 'projects':
        return 'bg-amber-950/80 text-amber-300 border-amber-800/80';
      case 'routine':
        return 'bg-zinc-900 text-zinc-300 border-zinc-800';
      case 'finance':
        return 'bg-rose-950/80 text-rose-300 border-rose-800/80';
      case 'personal':
      default:
        return 'bg-zinc-900 text-zinc-300 border-zinc-800';
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6 select-none">
      {/* Top Banner Control Card */}
      <div className="flex flex-col gap-4 bg-zinc-950 border border-zinc-800/90 p-5 rounded-2xl shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Day Navigation & Title */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 shadow-inner">
              <button
                type="button"
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                title="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1 text-white text-xs font-semibold hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>{selectedDate}</span>
              </button>
              <button
                type="button"
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                title="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white tracking-tight">Today</span>
              <span className="text-zinc-400 text-sm">— Thursday, September 24, 2026</span>
            </div>

            {/* Jump to Now Button */}
            <button
              type="button"
              onClick={handleJumpToNow}
              className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/80 text-indigo-300 text-xs font-medium flex items-center gap-1.5 hover:bg-indigo-900 hover:text-white transition-all shadow-sm active:scale-95"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span>Jump to Now</span>
            </button>
          </div>

          {/* Granularity, Categories & CTAs */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* View Mode Switcher */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'timeline'
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/60'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Timeline
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/60'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                List
              </button>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-3 py-2 pr-7 rounded-xl focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="work">Work & Client</option>
                <option value="personal">Personal</option>
                <option value="fitness">Fitness</option>
                <option value="projects">Projects</option>
                <option value="routine">Routine</option>
              </select>
              <Filter className="w-3.5 h-3.5 text-zinc-500 absolute right-2.5 top-3 pointer-events-none" />
            </div>

            {/* + Event (E) */}
            <button
              type="button"
              onClick={() => {
                setQuickAddType('event');
                setIsQuickAddOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white text-xs font-medium transition-colors"
            >
              <CalendarPlus className="w-3.5 h-3.5 text-indigo-400" />
              <span>+ Event</span>
              <kbd className="text-[10px] bg-black/60 px-1 rounded font-mono text-zinc-400 border border-zinc-800">
                E
              </kbd>
            </button>

            {/* + Task (N) */}
            <button
              type="button"
              onClick={() => {
                setQuickAddType('task');
                setIsQuickAddOpen(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+ Task</span>
              <kbd className="text-[10px] bg-black/40 px-1 rounded font-mono text-indigo-200 border border-indigo-400/30">
                N
              </kbd>
            </button>
          </div>
        </div>

        {/* Progress Metric Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-3 border-t border-zinc-900">
          <div className="flex items-center gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Day 68% elapsed
            </span>
            <span className="text-zinc-700">•</span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {completedCount} of {totalCount} completed
            </span>
          </div>

          <div className="w-full md:w-80 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/80">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500 shadow-sm shadow-emerald-500/50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Split Grid (8 cols Left / 4 cols Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Hourly Timeline */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          <div
            ref={timelineRef}
            className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col relative overflow-hidden"
          >
            {/* Timeline Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-900 mb-2">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
                <h2 className="text-base font-bold text-white tracking-tight">Hourly Timeline</h2>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                  07:00 – 23:00
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-rose-400 font-medium">Current: 14:20 GMT+1</span>
              </div>
            </div>

            {/* Timeline Content */}
            <div className="relative flex flex-col pt-2" id="schedule-viewport">
              {/* CURRENT TIME LIVE MARKER at ~14:20 */}
              <div
                ref={nowMarkerRef}
                className="my-3 py-1 flex items-center z-30 group"
                id="current-time-marker"
              >
                <div className="w-16 text-right pr-3 font-mono text-[11px] font-bold text-rose-500">
                  14:20
                </div>
                <div className="flex-1 flex items-center">
                  <span className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-500/20 -ml-1.5 shadow-md" />
                  <div className="flex-1 h-0.5 bg-rose-500 shadow-sm shadow-rose-500/50" />
                  <span className="bg-rose-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-md shadow-lg ml-2">
                    14:20 NOW
                  </span>
                </div>
              </div>

              {/* Tasks Mapped By Time */}
              {filteredTasks.map((task) => {
                const isClientCall = task.id === 't-06';
                return (
                  <div key={task.id} className="flex gap-4 py-2 group transition-all">
                    {/* Time Label on Left */}
                    <div
                      className={`w-16 text-right font-mono text-xs pt-2.5 shrink-0 ${
                        isClientCall ? 'text-indigo-400 font-bold' : 'text-zinc-500'
                      }`}
                    >
                      {task.scheduledTime || '—'}
                    </div>

                    {/* Task Box */}
                    {isClientCall ? (
                      /* ACTIVE NOW BLOCK: Special glowing Indigo treatment */
                      <div className="flex-1 bg-gradient-to-r from-indigo-950/90 to-zinc-900 border border-indigo-500/60 text-white rounded-xl p-4 shadow-xl shadow-indigo-950/50 flex flex-col gap-3 transform hover:-translate-y-0.5 transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0">
                            <button
                              type="button"
                              onClick={() => toggleTask(task.id)}
                              className="mt-1 w-5 h-5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors shadow-sm"
                            >
                              {task.completed ? (
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                              )}
                            </button>
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`text-sm font-bold text-white ${
                                    task.completed ? 'line-through opacity-70' : ''
                                  }`}
                                >
                                  {task.title}
                                </span>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase">
                                  High
                                </span>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 uppercase">
                                  Active Now
                                </span>
                              </div>
                              {task.description && (
                                <span className="text-xs text-zinc-300 mt-1">
                                  {task.description}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-indigo-900/60 border border-indigo-700/60 text-indigo-300 shrink-0">
                            Work
                          </span>
                        </div>

                        {/* Interactive Action Bar inside Call Block */}
                        <div className="flex items-center justify-between text-zinc-300 text-xs pt-1 border-t border-indigo-900/50">
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <Clock className="w-3.5 h-3.5 text-indigo-400" />
                            14:30 – 16:00 (1h 30m)
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                alert('Launching secure consultation video bridge for TechCorp matter...')
                              }
                              className="px-3 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 text-xs font-medium border border-indigo-400/30 transition-colors flex items-center gap-1.5"
                            >
                              <Video className="w-3.5 h-3.5" />
                              Join Call
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleTask(task.id)}
                              className="px-3 py-1 rounded-lg bg-white text-zinc-950 font-semibold text-xs transition-all hover:bg-zinc-200 shadow-md active:scale-95"
                            >
                              {task.completed ? 'Reopen' : 'Mark Done'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Standard Time Block */
                      <div
                        className={`flex-1 rounded-xl p-3 flex flex-col justify-between gap-1.5 transition-all border ${
                          task.completed
                            ? 'bg-zinc-950/60 border-zinc-900 hover:border-zinc-800'
                            : 'bg-zinc-900/80 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-3 min-w-0">
                            <button
                              type="button"
                              onClick={() => toggleTask(task.id)}
                              className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center transition-colors ${
                                task.completed
                                  ? 'bg-emerald-600 text-white'
                                  : 'border border-zinc-700 hover:border-emerald-500 bg-zinc-800'
                              }`}
                            >
                              {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
                            </button>
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span
                                  className={`text-xs font-medium truncate ${
                                    task.completed
                                      ? 'text-zinc-500 line-through'
                                      : 'text-zinc-200 group-hover:text-white font-semibold'
                                  }`}
                                >
                                  {task.title}
                                </span>
                                {task.priority === 'high' && !task.completed && (
                                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-900">
                                    High
                                  </span>
                                )}
                              </div>
                              {task.description && (
                                <span className="text-[11px] text-zinc-500 truncate">
                                  {task.description}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {task.priority === 'medium' && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                                Medium
                              </span>
                            )}
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded border capitalize ${getCategoryBadge(
                                task.category
                              )}`}
                            >
                              {task.category}
                            </span>
                          </div>
                        </div>

                        {/* Extra metadata tags if available */}
                        {(task.reminder || task.duration || task.repeatSchedule) && (
                          <div className="flex items-center gap-3 text-zinc-500 text-[11px] font-mono pt-1">
                            {task.reminder && (
                              <span className="flex items-center gap-1 text-amber-400">
                                <Bell className="w-3 h-3" />
                                {task.reminder}
                              </span>
                            )}
                            {task.repeatSchedule && (
                              <span className="flex items-center gap-1 text-indigo-400">
                                <Repeat className="w-3 h-3" />
                                {task.repeatSchedule}
                              </span>
                            )}
                            {task.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.duration}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Create + Unscheduled Backlog + Daily Reflection */}
        <div className="xl:col-span-4 flex flex-col gap-5">
          {/* Card 1: Quick Create Task */}
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Quick Create Task</h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-500 uppercase">Instant Add</span>
            </div>

            <form onSubmit={handleQuickCreateSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-zinc-400">Task Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g., Update compliance memo"
                  className="w-full h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-zinc-400">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as PriorityType)}
                    className="h-9 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-zinc-400">Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value as CategoryType)}
                    className="h-9 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="fitness">Fitness</option>
                    <option value="projects">Projects</option>
                    <option value="routine">Routine</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-zinc-400">Time Range</label>
                  <input
                    type="text"
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                    placeholder="18:30 - 19:15"
                    className="h-9 px-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-medium text-zinc-400">Repeat</label>
                  <select
                    value={newTaskRepeat}
                    onChange={(e) => setNewTaskRepeat(e.target.value as any)}
                    className="h-9 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="none">No Repeat</option>
                    <option value="daily">Every day</option>
                    <option value="weekly">Every week</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                Add to Schedule
              </button>
            </form>
          </div>

          {/* Card 2: Unscheduled Backlog */}
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Unscheduled Backlog</h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                {backlogTasks.length} Tasks
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Drag or tap clock to assign time to today's schedule.
            </p>

            <div className="flex flex-col gap-2 pt-1">
              {backlogTasks.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex items-center justify-between gap-2 group cursor-grab"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <GripVertical className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-medium text-white truncate">{item.title}</span>
                      <span className="text-[11px] text-zinc-500 truncate">
                        {item.description || `${item.category} • ${item.duration || '30m'}`}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const promptTime = prompt(
                        `Assign time slot for "${item.title}":`,
                        '16:00 - 16:30'
                      );
                      if (promptTime) {
                        scheduleBacklogTask(item.id, promptTime);
                      }
                    }}
                    title="Assign Time"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-400 hover:bg-zinc-800 transition-colors"
                  >
                    <Clock className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {backlogTasks.length === 0 && (
                <div className="p-4 text-center text-xs text-zinc-500 font-mono">
                  No backlog items. All clear!
                </div>
              )}
            </div>
          </div>

          {/* Card 3: Daily Reflection & Notes */}
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-5 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smile className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Daily Reflection & Notes</h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5" />
                {reflectionStatus === 'saving' ? 'Saving...' : 'Saved'}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-zinc-400 italic">
                "What went well today? What can improve tomorrow?"
              </span>
              <textarea
                value={reflectionText}
                onChange={(e) => {
                  setReflectionText(e.target.value);
                  setReflectionStatus('saving');
                  setTimeout(() => {
                    updateReflection(e.target.value);
                    setReflectionStatus('saved');
                  }, 600);
                }}
                rows={4}
                placeholder="Captured clear action items during the client call..."
                className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder:text-zinc-600 text-xs focus:outline-none focus:border-emerald-500 transition-colors resize-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {/* Mood selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowMoodMenu(!showMoodMenu)}
                  className="flex items-center gap-1.5 text-zinc-300 text-xs hover:text-white bg-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-800"
                >
                  <Smile className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mood: {reflectionMood}</span>
                </button>
                {showMoodMenu && (
                  <div className="absolute left-0 bottom-8 w-44 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl p-1 z-30 flex flex-col gap-0.5">
                    {['Focus & Calm', 'Energized', 'Reflective', 'Determined', 'Exhausted'].map(
                      (mood) => (
                        <button
                          key={mood}
                          type="button"
                          onClick={() => {
                            setReflectionMood(mood);
                            setShowMoodMenu(false);
                          }}
                          className="text-left text-xs px-2.5 py-1.5 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800"
                        >
                          {mood}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => alert('Opening Full Law Note Journal & Retainer Archive...')}
                className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs transition-colors"
              >
                Expand Journal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
