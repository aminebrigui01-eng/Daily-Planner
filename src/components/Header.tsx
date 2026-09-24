import React, { useState } from 'react';
import { Search, Calendar, Bell, ChevronDown, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { profile, setIsCommandPaletteOpen, setCurrentView } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-black/90 backdrop-blur-md border-b border-zinc-800/80 z-40 px-6 flex items-center justify-between select-none">
      {/* Search Input trigger */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          type="button"
          onClick={() => setIsCommandPaletteOpen(true)}
          className="relative w-full h-10 px-3 pl-9 pr-12 rounded-xl bg-zinc-950 border border-zinc-800 text-left text-zinc-400 hover:border-zinc-700 hover:text-zinc-300 transition-all flex items-center group cursor-pointer shadow-inner"
        >
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 group-hover:text-indigo-400 transition-colors" />
          <span className="text-xs truncate">Search tasks, events, notes...</span>
          <kbd className="absolute right-2.5 top-2 bg-zinc-900 border border-zinc-700/60 text-zinc-400 px-1.5 py-0.5 rounded text-[10px] font-mono shadow-xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Date, Notifications, and Profile */}
      <div className="flex items-center gap-5">
        {/* Date Display */}
        <div className="hidden md:flex items-center gap-2 text-zinc-400 text-xs font-medium">
          <Calendar className="w-4 h-4 text-zinc-400" />
          <span>Thursday, Sep 24, 2026</span>
        </div>

        <div className="h-4 w-px bg-zinc-800 hidden md:block" />

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-black animate-pulse" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-3 z-50 flex flex-col gap-2">
              <div className="flex items-center justify-between px-2 py-1 border-b border-zinc-900 pb-2">
                <span className="text-xs font-semibold text-white">Notifications</span>
                <span className="text-[10px] font-mono text-zinc-500">3 unread</span>
              </div>
              <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto">
                <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white">Upcoming Client Call</span>
                    <span className="text-[11px] text-zinc-400">14:30 TechCorp Consultation feedback</span>
                    <span className="text-[10px] text-zinc-500 mt-1">Starting in 10 mins</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-zinc-900/40 border border-zinc-900 flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white">Habit Streak Maintained</span>
                    <span className="text-[11px] text-zinc-400">Study English hit 24 days active!</span>
                    <span className="text-[10px] text-zinc-500 mt-1">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <div
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-1 cursor-pointer group"
          >
            <div className="relative">
              <img
                src={profile.avatarUrl}
                alt={profile.userName}
                className="w-8 h-8 rounded-full object-cover ring-1 ring-zinc-700 group-hover:ring-indigo-500 transition-all"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face';
                }}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-black" />
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-200 font-medium group-hover:text-white">
              <span>{profile.userName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-transform" />
            </div>
          </div>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl p-2 z-50 flex flex-col gap-1">
              <div className="px-3 py-2 border-b border-zinc-900">
                <p className="text-xs font-semibold text-white">{profile.userName}</p>
                <p className="text-[11px] text-zinc-400 truncate">{profile.userEmail}</p>
                <p className="text-[10px] text-indigo-400 font-mono mt-0.5">{profile.businessName}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  setCurrentView('settings');
                }}
                className="w-full text-left px-3 py-2 text-xs rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                Business Profile & Settings
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowProfileMenu(false);
                  setCurrentView('statistics');
                }}
                className="w-full text-left px-3 py-2 text-xs rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                Productivity Analytics
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
