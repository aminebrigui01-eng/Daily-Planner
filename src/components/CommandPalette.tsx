import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  LayoutDashboard,
  Sun,
  Calendar,
  CheckCircle2,
  Flag,
  Repeat,
  FileText,
  TrendingUp,
  Settings,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AppView } from '../types';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setCurrentView,
    tasks,
    notes,
    goals,
    habits,
    setIsQuickAddOpen,
    setQuickAddType
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!isCommandPaletteOpen) return null;

  const views: { id: AppView; label: string; icon: React.ReactNode; category: 'Navigation' }[] = [
    { id: 'today', label: 'Go to Today Timeline', icon: <Sun className="w-4 h-4 text-amber-400" />, category: 'Navigation' },
    { id: 'dashboard', label: 'Go to Dashboard', icon: <LayoutDashboard className="w-4 h-4 text-indigo-400" />, category: 'Navigation' },
    { id: 'calendar', label: 'Go to Calendar Q3', icon: <Calendar className="w-4 h-4 text-indigo-400" />, category: 'Navigation' },
    { id: 'tasks', label: 'Go to Tasks Ledger', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />, category: 'Navigation' },
    { id: 'goals', label: 'Go to Goals & Habits', icon: <Flag className="w-4 h-4 text-indigo-400" />, category: 'Navigation' },
    { id: 'notes', label: 'Go to Legal Notes', icon: <FileText className="w-4 h-4 text-amber-400" />, category: 'Navigation' },
    { id: 'statistics', label: 'Go to Productivity Analytics', icon: <TrendingUp className="w-4 h-4 text-emerald-400" />, category: 'Navigation' },
    { id: 'settings', label: 'Go to Settings', icon: <Settings className="w-4 h-4 text-zinc-400" />, category: 'Navigation' }
  ];

  // Actions
  const actions = [
    {
      id: 'action-task',
      label: 'Create New Task',
      action: () => {
        setIsCommandPaletteOpen(false);
        setQuickAddType('task');
        setIsQuickAddOpen(true);
      },
      icon: <CheckCircle2 className="w-4 h-4 text-indigo-400" />,
      category: 'Actions'
    },
    {
      id: 'action-event',
      label: 'Schedule New Event',
      action: () => {
        setIsCommandPaletteOpen(false);
        setQuickAddType('event');
        setIsQuickAddOpen(true);
      },
      icon: <Calendar className="w-4 h-4 text-emerald-400" />,
      category: 'Actions'
    },
    {
      id: 'action-note',
      label: 'Write New Note / Brief',
      action: () => {
        setIsCommandPaletteOpen(false);
        setQuickAddType('note');
        setIsQuickAddOpen(true);
      },
      icon: <FileText className="w-4 h-4 text-amber-400" />,
      category: 'Actions'
    }
  ];

  // Filter tasks and notes
  const q = query.toLowerCase().trim();
  const matchedViews = views.filter((v) => !q || v.label.toLowerCase().includes(q));
  const matchedActions = actions.filter((a) => !q || a.label.toLowerCase().includes(q));

  const matchedTasks = tasks
    .filter((t) => q && (t.title.toLowerCase().includes(q) || t.clientMatter?.toLowerCase().includes(q)))
    .slice(0, 4);

  const matchedNotes = notes
    .filter((n) => q && (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)))
    .slice(0, 3);

  const totalResults = [
    ...matchedViews.map((v) => ({ type: 'view', item: v })),
    ...matchedActions.map((a) => ({ type: 'action', item: a })),
    ...matchedTasks.map((t) => ({ type: 'task', item: t })),
    ...matchedNotes.map((n) => ({ type: 'note', item: n }))
  ];

  const handleSelect = (idx: number) => {
    const target = totalResults[idx];
    if (!target) return;

    if (target.type === 'view') {
      setCurrentView((target.item as any).id);
    } else if (target.type === 'action') {
      (target.item as any).action();
    } else if (target.type === 'task') {
      setCurrentView('tasks');
    } else if (target.type === 'note') {
      setCurrentView('notes');
    }

    setIsCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-start justify-center pt-24 p-4">
      <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-scale-up">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800 bg-zinc-900/60">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, search tasks, notes, or jump to view..."
            className="w-full bg-transparent text-white placeholder:text-zinc-500 text-xs focus:outline-none"
            autoFocus
          />
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 font-mono text-[10px]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 flex flex-col gap-1">
          {/* Quick Actions */}
          {matchedActions.length > 0 && (
            <div className="flex flex-col gap-0.5 mb-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500 px-3 py-1">Actions</span>
              {matchedActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => action.action()}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left text-zinc-200 hover:text-white hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {action.icon}
                    <span>{action.label}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
                </button>
              ))}
            </div>
          )}

          {/* Navigation Views */}
          {matchedViews.length > 0 && (
            <div className="flex flex-col gap-0.5 mb-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500 px-3 py-1">Navigation</span>
              {matchedViews.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => {
                    setCurrentView(view.id);
                    setIsCommandPaletteOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left text-zinc-200 hover:text-white hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {view.icon}
                    <span>{view.label}</span>
                  </div>
                  <kbd className="text-[10px] font-mono text-zinc-600 bg-zinc-900 px-1.5 py-0.5 rounded">
                    Jump
                  </kbd>
                </button>
              ))}
            </div>
          )}

          {/* Tasks match */}
          {matchedTasks.length > 0 && (
            <div className="flex flex-col gap-0.5 mb-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500 px-3 py-1">Tasks</span>
              {matchedTasks.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setCurrentView('tasks');
                    setIsCommandPaletteOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left text-zinc-200 hover:text-white hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{t.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 shrink-0 capitalize">
                    {t.category}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Notes match */}
          {matchedNotes.length > 0 && (
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono uppercase text-zinc-500 px-3 py-1">Notes</span>
              {matchedNotes.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => {
                    setCurrentView('notes');
                    setIsCommandPaletteOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left text-zinc-200 hover:text-white hover:bg-zinc-900 transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{n.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 shrink-0">Note</span>
                </button>
              ))}
            </div>
          )}

          {totalResults.length === 0 && (
            <div className="p-8 text-center text-xs text-zinc-500 font-mono">
              No matching commands or items found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-zinc-900 bg-zinc-950 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>Navigate with mouse or enter</span>
          <span>Law Note Command Engine</span>
        </div>
      </div>
    </div>
  );
};
