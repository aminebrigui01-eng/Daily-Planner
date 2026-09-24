import React from 'react';
import {
  LayoutDashboard,
  Sun,
  CalendarDays,
  CheckCircle2,
  Flag,
  Repeat,
  FileText,
  TrendingUp,
  Settings,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, setIsQuickAddOpen, setQuickAddType, profile } = useApp();

  const navItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
    { view: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { view: 'today', label: 'Today', icon: <Sun className="w-5 h-5 text-amber-400" /> },
    { view: 'calendar', label: 'Calendar', icon: <CalendarDays className="w-5 h-5" /> },
    { view: 'tasks', label: 'Tasks', icon: <CheckCircle2 className="w-5 h-5" /> },
    { view: 'goals', label: 'Goals', icon: <Flag className="w-5 h-5" /> },
    { view: 'habits', label: 'Habits', icon: <Repeat className="w-5 h-5" /> },
    { view: 'notes', label: 'Notes', icon: <FileText className="w-5 h-5" /> },
    { view: 'statistics', label: 'Statistics', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-zinc-800/80 z-50 flex flex-col justify-between p-4 select-none">
      <div className="flex flex-col gap-4">
        {/* Brand Header */}
        <div className="flex items-center justify-between px-1">
          <div
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center p-1.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <img
                src={profile.logoUrl}
                alt="Law Note"
                className="w-full h-full object-contain filter invert contrast-200"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-white font-bold text-base leading-none">LN</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                {profile.businessName.split(' ')[0] || 'Law'} Note
              </span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase">Business Suite</span>
            </div>
          </div>
          <span className="text-[11px] font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
            v1.0
          </span>
        </div>

        {/* Quick Add Action Button */}
        <button
          type="button"
          onClick={() => {
            setQuickAddType('task');
            setIsQuickAddOpen(true);
          }}
          className="w-full flex items-center justify-between bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white px-3.5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/25 border border-indigo-500/40"
        >
          <span className="flex items-center gap-2 text-sm font-semibold">
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Quick Add
          </span>
          <kbd className="bg-black/40 text-indigo-200 px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold border border-white/10">
            N
          </kbd>
        </button>

        {/* Main Navigation Links */}
        <nav className="flex flex-col gap-1 mt-1">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white font-semibold shadow-sm border border-zinc-800/90'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                }`}
              >
                <span className={isActive ? 'text-indigo-400' : 'text-zinc-400'}>{item.icon}</span>
                <span>{item.label}</span>
                {item.view === 'today' && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area: Settings & Workspace Status */}
      <div className="pt-3 border-t border-zinc-900 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setCurrentView('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
            currentView === 'settings'
              ? 'bg-zinc-900 text-white font-semibold border border-zinc-800'
              : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
          }`}
        >
          <Settings className="w-5 h-5 text-zinc-400" />
          <span>Settings</span>
        </button>

        {/* Practice status indicator */}
        <div className="px-3 py-2 rounded-xl bg-zinc-950/80 border border-zinc-900 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="truncate max-w-[120px] font-mono text-[11px]">{profile.businessName}</span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono">Q3 ACTIVE</span>
        </div>
      </div>
    </aside>
  );
};
