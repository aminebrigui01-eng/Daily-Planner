import React from 'react';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  Flame,
  Award,
  Calendar,
  Zap,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StatisticsView: React.FC = () => {
  const { tasks, habits, goals } = useApp();

  const completedTasks = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const overallRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6 pb-12 select-none">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-zinc-950 border border-zinc-800/90 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-950/80 border border-indigo-800/80 px-2 py-0.5 rounded">
              Performance Intelligence
            </span>
            <span className="text-zinc-500 text-xs font-mono">• Q3 Continuous Audit</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Executive Productivity Metrics</h1>
          <p className="text-xs text-zinc-400">
            Real-time analytics on completion velocity, habit adherence, and operational focus distribution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
            Period: Sep 01 – Sep 24, 2026
          </span>
        </div>
      </div>

      {/* 4 Analytics Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-zinc-950 border border-zinc-800/90 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Task Velocity</span>
              <span className="text-3xl font-bold text-white tracking-tight mt-1">{overallRate}%</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-800 flex items-center justify-center text-indigo-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono mt-3">
            {completedTasks} of {totalTasks} total tasks resolved
          </span>
        </div>

        <div className="bg-zinc-950 border border-zinc-800/90 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Habit Score</span>
              <span className="text-3xl font-bold text-emerald-400 tracking-tight mt-1">84%</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono mt-3">
            +6% improvement vs previous cycle
          </span>
        </div>

        <div className="bg-zinc-950 border border-zinc-800/90 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Deep Work Hours</span>
              <span className="text-3xl font-bold text-white tracking-tight mt-1">34.5h</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-800 flex items-center justify-center text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono mt-3">
            Average 4.9 hours/day uninterrupted
          </span>
        </div>

        <div className="bg-zinc-950 border border-zinc-800/90 p-5 rounded-2xl shadow-xl flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">Active Milestones</span>
              <span className="text-3xl font-bold text-white tracking-tight mt-1">{goals.length}</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono mt-3">
            All horizons on track for Q3 close
          </span>
        </div>
      </div>

      {/* Main Breakdown Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Time Allocation */}
        <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">Time Allocation by Category</h3>
            </div>
            <span className="text-xs font-mono text-zinc-500">Weekly Target</span>
          </div>

          <div className="flex flex-col gap-3.5 pt-1">
            {[
              { label: 'Work & Client Consultations', pct: 45, hours: '18.0h', color: 'bg-indigo-500' },
              { label: 'Projects & Legal Ops Architecture', pct: 25, hours: '10.0h', color: 'bg-amber-500' },
              { label: 'Fitness & Physical Recovery', pct: 15, hours: '6.0h', color: 'bg-emerald-500' },
              { label: 'Personal & Study (Languages, Books)', pct: 10, hours: '4.0h', color: 'bg-purple-500' },
              { label: 'Routine & Admin', pct: 5, hours: '2.0h', color: 'bg-zinc-600' }
            ].map((cat) => (
              <div key={cat.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-200 font-medium">{cat.label}</span>
                  <span className="font-mono text-zinc-400 text-[11px]">
                    {cat.hours} ({cat.pct}%)
                  </span>
                </div>
                <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-zinc-800">
                  <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Consistency Heatmap */}
        <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">System Consistency Heatmap</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">96% on Tuesdays</span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            Execution reliability measured across recurring daily habits and scheduled blocks over the last 4 weeks.
          </p>

          <div className="grid grid-cols-7 gap-2 pt-2">
            {[
              { day: 'Mon', score: '88%', fill: 'bg-emerald-600' },
              { day: 'Tue', score: '96%', fill: 'bg-emerald-500' },
              { day: 'Wed', score: '82%', fill: 'bg-emerald-700' },
              { day: 'Thu', score: '90%', fill: 'bg-emerald-500' },
              { day: 'Fri', score: '78%', fill: 'bg-emerald-800' },
              { day: 'Sat', score: '65%', fill: 'bg-zinc-800' },
              { day: 'Sun', score: '60%', fill: 'bg-zinc-800' }
            ].map((d) => (
              <div
                key={d.day}
                className="flex flex-col items-center p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 gap-1.5"
              >
                <span className="text-xs font-mono text-zinc-400">{d.day}</span>
                <div className={`w-3.5 h-3.5 rounded-md ${d.fill}`} />
                <span className="text-[11px] font-mono text-zinc-300 font-bold">{d.score}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto p-3.5 rounded-xl bg-zinc-900 border border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
            <span>Optimal Focus Window:</span>
            <strong className="text-white font-mono">09:00 – 12:30 GMT+1</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
