import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  RefreshCw,
  Clock,
  CheckCircle2,
  Flag,
  CalendarDays,
  Target
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CalendarEvent } from '../../types';

export const CalendarView: React.FC = () => {
  const {
    calendarEvents,
    goals,
    setIsQuickAddOpen,
    setQuickAddType,
    setCurrentView
  } = useApp();

  const [activeSector, setActiveSector] = useState<string>('all');
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent | null>(null);
  const [activeGranularity, setActiveGranularity] = useState<'day' | 'week' | 'month' | 'year'>('month');

  // Sector chips
  const sectors = [
    { id: 'all', label: 'All Sectors', dotColor: 'bg-emerald-400' },
    { id: 'work', label: 'Work', dotColor: 'bg-indigo-500' },
    { id: 'personal', label: 'Personal', dotColor: 'bg-amber-500' },
    { id: 'fitness', label: 'Fitness', dotColor: 'bg-emerald-500' },
    { id: 'finance', label: 'Finance', dotColor: 'bg-rose-500' }
  ];

  // Calendar days grid data structure
  // Sep 2026: Aug 31 is Mon, Sep 1 is Tue ... Sep 30 is Wed, Oct 1-4
  const daysGrid = [
    { dayNumber: 31, monthName: 'Aug', isGhost: true },
    { dayNumber: 1, monthName: 'Sep', dateStr: '2026-09-01', ratio: '2/2', eventTitle: 'Morning Run 5k', dotColor: 'bg-emerald-500', barPct: 100 },
    { dayNumber: 2, monthName: 'Sep', dateStr: '2026-09-02', ratio: '1/1', eventTitle: 'Contracts sync', dotColor: 'bg-indigo-500', barPct: 100 },
    { dayNumber: 3, monthName: 'Sep', dateStr: '2026-09-03', ratio: '3/3', eventTitle: 'Read Chapter 3', dotColor: 'bg-amber-500', barPct: 100 },
    { dayNumber: 4, monthName: 'Sep', dateStr: '2026-09-04', ratio: '0/1', eventTitle: 'Audit Prep', dotColor: 'bg-zinc-600', barPct: 0 },
    { dayNumber: 5, monthName: 'Sep', dateStr: '2026-09-05', tag: 'Auto', badgeEmoji: '💳', eventTitle: 'Pay Subscription', badgeClass: 'bg-rose-950 text-rose-300 border-rose-900', statusFooter: 'Finance • Done' },
    { dayNumber: 6, monthName: 'Sep', dateStr: '2026-09-06', tag: 'Sun Rest', eventTitle: 'No alarms', isRest: true },
    { dayNumber: 7, monthName: 'Sep', dateStr: '2026-09-07', ratio: '2/2', eventTitle: 'Sprint Standup', dotColor: 'bg-indigo-500', barPct: 100 },
    { dayNumber: 8, monthName: 'Sep', dateStr: '2026-09-08', ratio: '3/4', eventTitle: 'Leg Day', dotColor: 'bg-emerald-500', barPct: 75 },
    { dayNumber: 9, monthName: 'Sep', dateStr: '2026-09-09', ratio: '1/1', eventTitle: 'Dentist 11:00', dotColor: 'bg-amber-500', barPct: 100 },
    { dayNumber: 10, monthName: 'Sep', dateStr: '2026-09-10', ratio: '2/3', eventTitle: 'PR Reviews', dotColor: 'bg-indigo-500', barPct: 66 },
    { dayNumber: 11, monthName: 'Sep', dateStr: '2026-09-11', ratio: '4/4', eventTitle: 'Cardio Interval', dotColor: 'bg-emerald-500', barPct: 100 },
    { dayNumber: 12, monthName: 'Sep', dateStr: '2026-09-12', tag: 'Work', badgeEmoji: '👥', eventTitle: 'Team Sprint Planning', badgeClass: 'bg-indigo-950 text-indigo-300 border-indigo-800', statusFooter: '5/5 done' },
    { dayNumber: 13, monthName: 'Sep', dateStr: '2026-09-13', tag: 'Weekend', eventTitle: 'Farmers Market', isRest: true },
    { dayNumber: 14, monthName: 'Sep', dateStr: '2026-09-14', ratio: '3/3', eventTitle: 'Case Analysis', dotColor: 'bg-indigo-500', barPct: 100 },
    { dayNumber: 15, monthName: 'Sep', dateStr: '2026-09-15', tag: 'Special', badgeEmoji: '🎂', eventTitle: "Mom's Birthday", badgeClass: 'bg-amber-950 text-amber-300 border-amber-900', statusFooter: 'Personal • Celebrated' },
    { dayNumber: 16, monthName: 'Sep', dateStr: '2026-09-16', ratio: '2/2', eventTitle: 'Swimming', dotColor: 'bg-emerald-500', barPct: 100 },
    { dayNumber: 17, monthName: 'Sep', dateStr: '2026-09-17', ratio: '3/3', eventTitle: 'Draft QA review', dotColor: 'bg-indigo-500', barPct: 100 },
    { dayNumber: 18, monthName: 'Sep', dateStr: '2026-09-18', ratio: '1/2', eventTitle: 'Dev freeze 18:00', dotColor: 'bg-indigo-500', barPct: 50 },
    { dayNumber: 19, monthName: 'Sep', dateStr: '2026-09-19', tag: 'Staging', eventTitle: 'Dry run release', isRest: true },
    { dayNumber: 20, monthName: 'Sep', dateStr: '2026-09-20', tag: 'Milestone', badgeEmoji: '🚀', eventTitle: 'Law Note Beta Launch', badgeClass: 'bg-indigo-600 text-white font-bold', statusFooter: 'Project • Shipped' },
    { dayNumber: 21, monthName: 'Sep', dateStr: '2026-09-21', ratio: '3/3', eventTitle: 'User telemetry', dotColor: 'bg-indigo-500', barPct: 100 },
    { dayNumber: 22, monthName: 'Sep', dateStr: '2026-09-22', ratio: '4/4', eventTitle: 'Upper Body Workout', dotColor: 'bg-emerald-500', barPct: 100 },
    { dayNumber: 23, monthName: 'Sep', dateStr: '2026-09-23', ratio: '2/2', eventTitle: 'Book Club 20:00', dotColor: 'bg-amber-500', barPct: 100 },
    // DAY 24 - TODAY
    {
      dayNumber: 24,
      monthName: 'Sep',
      dateStr: '2026-09-24',
      isToday: true,
      tag: 'Today',
      ratio: '4/5 done',
      todayItems: [
        { emoji: '💼', title: 'Client Review (14:30)' },
        { emoji: '🏋️', title: 'Gym (17:30)' }
      ],
      barPct: 80
    },
    { dayNumber: 25, monthName: 'Sep', dateStr: '2026-09-25', ratio: '0/3', eventTitle: 'Investor Briefing', dotColor: 'bg-indigo-500', barPct: 0 },
    { dayNumber: 26, monthName: 'Sep', dateStr: '2026-09-26', ratio: '0/1', eventTitle: 'Trail Hike 10k', dotColor: 'bg-emerald-500', barPct: 0 },
    { dayNumber: 27, monthName: 'Sep', dateStr: '2026-09-27', tag: 'Relax', eventTitle: 'Meal prep', isRest: true },
    { dayNumber: 28, monthName: 'Sep', dateStr: '2026-09-28', tag: 'Executive', badgeEmoji: '📊', eventTitle: 'Q3 Review', badgeClass: 'bg-zinc-800 text-indigo-300 border-zinc-700', statusFooter: 'Work • 0/2 done' },
    { dayNumber: 29, monthName: 'Sep', dateStr: '2026-09-29', ratio: '0/2', eventTitle: 'Gym Session 15', dotColor: 'bg-emerald-500', barPct: 0 },
    { dayNumber: 30, monthName: 'Sep', dateStr: '2026-09-30', tag: 'Closure', badgeEmoji: '🎯', eventTitle: 'Month-end Goal Check', badgeClass: 'bg-amber-950 text-amber-300 border-amber-900', statusFooter: 'Audit • Upcoming' },
    { dayNumber: 1, monthName: 'Oct', isGhost: true },
    { dayNumber: 2, monthName: 'Oct', isGhost: true },
    { dayNumber: 3, monthName: 'Oct', isGhost: true },
    { dayNumber: 4, monthName: 'Oct', isGhost: true }
  ];

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6 pb-12 select-none">
      {/* Calendar Navigation & Controls Header */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Title & Month Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800/90 p-1 rounded-2xl shadow-xl">
              <button
                type="button"
                className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="px-3 flex items-center gap-2">
                <span className="text-base font-bold text-white tracking-tight">September 2026</span>
                <span className="text-xs font-mono text-indigo-400 bg-indigo-950/80 border border-indigo-800/80 px-2 py-0.5 rounded-full font-semibold">
                  Q3 Cycle
                </span>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setCurrentView('today')}
              className="text-indigo-400 text-xs font-medium px-3 py-1.5 rounded-xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
            >
              Jump to Today
            </button>
          </div>

          {/* Granularity Switcher & CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-zinc-950 border border-zinc-800/90 p-1 rounded-2xl">
              {(['day', 'week', 'month', 'year'] as const).map((view) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => setActiveGranularity(view)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                    activeGranularity === view
                      ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/60 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setQuickAddType('event');
                setIsQuickAddOpen(true);
              }}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-2xl shadow-lg shadow-indigo-600/30 text-xs font-semibold transition-all active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Event / Task</span>
            </button>
          </div>
        </div>

        {/* Category Filters and Sync Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mr-1">
              Triage:
            </span>
            {sectors.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSector(sec.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                  activeSector === sec.id
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
                    : 'bg-zinc-950 border border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${sec.dotColor}`} />
                <span>{sec.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
              3 Sync Feeds active
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              UTC+01:00 London
            </span>
          </div>
        </div>
      </section>

      {/* 70/30 Main Grid Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Calendar Section (col-span-8) */}
        <div className="xl:col-span-8 flex flex-col gap-2 bg-zinc-950 border border-zinc-800/90 rounded-2xl shadow-xl p-4">
          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-1 text-center pb-2 border-b border-zinc-900">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-[11px] font-mono font-medium text-zinc-400 uppercase py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Month Grid */}
          <div className="grid grid-cols-7 gap-1.5 auto-rows-fr pt-1">
            {daysGrid.map((day, idx) => {
              if (day.isGhost) {
                return (
                  <div
                    key={idx}
                    className="min-h-[112px] p-2 rounded-xl bg-zinc-950/40 border border-zinc-900/60 flex flex-col justify-between opacity-30 select-none"
                  >
                    <span className="font-mono text-xs text-zinc-600">{day.dayNumber}</span>
                    <div className="text-right font-mono text-[10px] text-zinc-600">{day.monthName}</div>
                  </div>
                );
              }

              if (day.isToday) {
                return (
                  /* TODAY 24 CELL */
                  <div
                    key={idx}
                    onClick={() => setCurrentView('today')}
                    className="min-h-[112px] p-2 rounded-xl bg-zinc-900 border-2 border-indigo-500 shadow-lg shadow-indigo-950/60 flex flex-col justify-between cursor-pointer group hover:bg-zinc-850 transition-all relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-mono text-[11px] font-bold flex items-center justify-center">
                          {day.dayNumber}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 font-mono font-bold uppercase tracking-wider border border-indigo-800">
                          Today
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-indigo-400 font-semibold">{day.ratio}</span>
                    </div>

                    <div className="flex flex-col gap-1 my-1">
                      {day.todayItems?.map((it, i) => (
                        <div
                          key={i}
                          className="px-1.5 py-0.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-200 text-[10px] truncate flex items-center gap-1.5 font-medium"
                        >
                          <span>{it.emoji}</span>
                          <span className="truncate">{it.title}</span>
                        </div>
                      ))}
                      <div className="text-[10px] text-indigo-400 font-medium text-center hover:underline pt-0.5">
                        + 3 more tasks...
                      </div>
                    </div>

                    <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden border border-zinc-700/60">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${day.barPct}%` }} />
                    </div>
                  </div>
                );
              }

              return (
                /* REGULAR DAY CELL */
                <div
                  key={idx}
                  onClick={() => {
                    const matchedEvent = calendarEvents.find((e) => e.date === day.dateStr);
                    if (matchedEvent) setSelectedDayEvents(matchedEvent);
                  }}
                  className="min-h-[112px] p-2 rounded-xl bg-zinc-900/50 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900/80 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-zinc-300 group-hover:text-white">
                      {day.dayNumber}
                    </span>
                    {day.tag ? (
                      <span
                        className={`text-[9px] font-mono px-1 rounded border ${
                          day.tag === 'Milestone'
                            ? 'bg-indigo-950 text-indigo-300 border-indigo-800 font-bold'
                            : day.tag === 'Special'
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                        }`}
                      >
                        {day.tag}
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-zinc-500">{day.ratio}</span>
                    )}
                  </div>

                  {/* Day Content */}
                  <div className="flex flex-col gap-1 my-1">
                    {day.eventTitle && (
                      <div
                        className={`px-1.5 py-0.5 rounded text-[11px] truncate flex items-center gap-1 border ${
                          day.badgeClass
                            ? day.badgeClass
                            : 'bg-zinc-950/80 border-zinc-800/80 text-zinc-300'
                        }`}
                      >
                        {day.badgeEmoji && <span>{day.badgeEmoji}</span>}
                        {day.dotColor && <span className={`w-1.5 h-1.5 rounded-full ${day.dotColor}`} />}
                        <span className="truncate">{day.eventTitle}</span>
                      </div>
                    )}
                  </div>

                  {/* Cell Footer */}
                  {day.barPct !== undefined ? (
                    <div className="w-full bg-zinc-800/60 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${day.barPct}%` }}
                      />
                    </div>
                  ) : day.statusFooter ? (
                    <div className="text-[10px] font-mono text-zinc-500 truncate flex items-center justify-between">
                      <span>{day.statusFooter}</span>
                    </div>
                  ) : (
                    <div className="h-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar Section (col-span-4) */}
        <aside className="xl:col-span-4 flex flex-col gap-6">
          {/* September Planning & Insights */}
          <div className="bg-zinc-950 border border-zinc-800/90 p-6 rounded-2xl shadow-xl flex flex-col gap-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-400" />
                <h2 className="text-sm font-bold text-white tracking-tight">September Planning & Insights</h2>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                Active Cycle
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Live velocity sync across Section 9 through 12. Milestones and habit cadences calibrated against month-end targets.
            </p>

            {/* Completion Velocity Box with SVG Ring */}
            <div className="bg-zinc-900 border border-zinc-800/80 p-4 rounded-xl flex items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                  Completion Velocity
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white tracking-tight">80%</span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">67 / 84 tasks</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Habit adherence: <strong className="text-white font-medium">78% avg</strong></span>
                </div>
              </div>

              {/* Circular SVG Progress Ring */}
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    className="text-zinc-800 stroke-current"
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    strokeWidth="3.5"
                  />
                  <circle
                    className="text-indigo-500 stroke-current transition-all duration-700 ease-out"
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    strokeWidth="3.5"
                    strokeDasharray="80, 100"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-xs font-mono font-bold text-white">80%</span>
              </div>
            </div>
          </div>

          {/* Monthly Goals Checklist */}
          <div className="bg-zinc-950 border border-zinc-800/90 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Monthly Goals</h3>
              </div>
              <button
                type="button"
                onClick={() => setCurrentView('goals')}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300"
              >
                Edit Goals
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {goals.map((g) => (
                <div
                  key={g.id}
                  className="flex flex-col gap-1.5 p-3 rounded-xl bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white truncate max-w-[200px]">
                      {g.title}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-indigo-400">
                      {g.displayProgress}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${g.percentage}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {g.description || `${g.statusNote} • Due ${g.deadline}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Important Dates Agenda */}
          <div className="bg-zinc-950 border border-zinc-800/90 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-indigo-400" />
                <h3 className="text-sm font-bold text-white tracking-tight">Important Dates</h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">Q3 Agenda</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {/* Sep 05 */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80">
                <div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-zinc-950 border border-zinc-800 shrink-0">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase">Sep</span>
                  <span className="font-mono text-sm font-bold text-rose-400 leading-tight">05</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-medium text-white truncate">
                    Monthly payment deadline
                  </span>
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Cloud infrastructure & SaaS
                  </span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>

              {/* Sep 12 */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80">
                <div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-zinc-950 border border-zinc-800 shrink-0">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase">Sep</span>
                  <span className="font-mono text-sm font-bold text-indigo-400 leading-tight">12</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-medium text-white truncate">
                    Executive meeting
                  </span>
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Board presentation & sync
                  </span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>

              {/* Sep 20 */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80">
                <div className="flex flex-col items-center justify-center w-11 h-11 rounded-lg bg-zinc-950 border border-zinc-800 shrink-0">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase">Sep</span>
                  <span className="font-mono text-sm font-bold text-emerald-400 leading-tight">20</span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-medium text-white truncate">
                    Product launch event
                  </span>
                  <span className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Law Note 1.0 Release
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-300 font-semibold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Live
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
