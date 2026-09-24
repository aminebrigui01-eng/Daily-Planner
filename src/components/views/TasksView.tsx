import React, { useState } from 'react';
import {
  CheckCircle2,
  Plus,
  Search,
  Filter,
  Trash2,
  Clock,
  Calendar,
  Check,
  Tag
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CategoryType, PriorityType, Task } from '../../types';

export const TasksView: React.FC = () => {
  const { tasks, toggleTask, addTask, deleteTask, scheduleBacklogTask } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed' | 'backlog'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [taskSearch, setTaskSearch] = useState('');

  // Inline Quick Add state
  const [inlineTitle, setInlineTitle] = useState('');
  const [inlineCategory, setInlineCategory] = useState<CategoryType>('work');
  const [inlinePriority, setInlinePriority] = useState<PriorityType>('medium');
  const [inlineMatter, setInlineMatter] = useState('');

  const handleInlineAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inlineTitle.trim()) return;

    addTask({
      title: inlineTitle.trim(),
      category: inlineCategory,
      priority: inlinePriority,
      completed: false,
      date: '2026-09-24',
      clientMatter: inlineMatter.trim() || undefined,
      dueDate: 'Today'
    });

    setInlineTitle('');
    setInlineMatter('');
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'completed' && !t.completed) return false;
    if (activeFilter === 'pending' && (t.completed || t.isBacklog)) return false;
    if (activeFilter === 'backlog' && !t.isBacklog) return false;

    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;

    if (taskSearch.trim()) {
      const q = taskSearch.toLowerCase();
      const matchTitle = t.title.toLowerCase().includes(q);
      const matchDesc = t.description?.toLowerCase().includes(q);
      const matchMatter = t.clientMatter?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchMatter) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6 pb-12 select-none">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-zinc-950 border border-zinc-800/90 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-950/80 border border-indigo-800/80 px-2 py-0.5 rounded">
              Practice Task Ledger
            </span>
            <span className="text-zinc-500 text-xs font-mono">• Active Operations</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Business & Case Tasks</h1>
          <p className="text-xs text-zinc-400">
            Track matter deliverables, client commitments, and operational execution queues.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
            {(['all', 'pending', 'completed', 'backlog'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  activeFilter === filter
                    ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/60 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inline Quick Add Form */}
      <form
        onSubmit={handleInlineAdd}
        className="bg-zinc-950 border border-zinc-800/90 p-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-3"
      >
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={inlineTitle}
            onChange={(e) => setInlineTitle(e.target.value)}
            placeholder="Add new task or legal action item..."
            className="w-full h-10 px-3 pl-9 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500"
          />
          <Plus className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <input
            type="text"
            value={inlineMatter}
            onChange={(e) => setInlineMatter(e.target.value)}
            placeholder="Client / Matter (optional)"
            className="h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500 w-44"
          />

          <select
            value={inlineCategory}
            onChange={(e) => setInlineCategory(e.target.value as CategoryType)}
            className="h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none cursor-pointer"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="fitness">Fitness</option>
            <option value="projects">Projects</option>
            <option value="routine">Routine</option>
            <option value="finance">Finance</option>
          </select>

          <select
            value={inlinePriority}
            onChange={(e) => setInlinePriority(e.target.value as PriorityType)}
            className="h-10 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none cursor-pointer"
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button
            type="submit"
            className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 shadow-md shadow-indigo-600/30 transition-all active:scale-95"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
          <input
            type="text"
            value={taskSearch}
            onChange={(e) => setTaskSearch(e.target.value)}
            placeholder="Search tasks or client matters..."
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-zinc-200 placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs font-mono text-zinc-500">
            Showing {filteredTasks.length} tasks
          </span>
        </div>
      </div>

      {/* Tasks Table / Card List */}
      <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl shadow-xl overflow-hidden divide-y divide-zinc-900">
        {filteredTasks.map((t) => (
          <div
            key={t.id}
            className="p-4 flex items-center justify-between gap-4 hover:bg-zinc-900/40 transition-colors group"
          >
            <div className="flex items-start gap-3 min-w-0">
              <button
                type="button"
                onClick={() => toggleTask(t.id)}
                className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                  t.completed
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                    : 'border border-zinc-700 hover:border-emerald-500 bg-zinc-900'
                }`}
              >
                {t.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>

              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-sm font-semibold select-none ${
                      t.completed ? 'line-through text-zinc-500' : 'text-zinc-100'
                    }`}
                  >
                    {t.title}
                  </span>
                  {t.clientMatter && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-indigo-300 border border-zinc-800 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-indigo-400" />
                      {t.clientMatter}
                    </span>
                  )}
                </div>

                {t.description && (
                  <span className="text-xs text-zinc-400 mt-0.5">{t.description}</span>
                )}

                <div className="flex items-center gap-3 text-zinc-500 text-[11px] font-mono mt-1">
                  {t.scheduledTime && (
                    <span className="flex items-center gap-1 text-zinc-300">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      {t.scheduledTime}
                    </span>
                  )}
                  {t.dueDate && (
                    <span className="flex items-center gap-1 text-amber-400">
                      <Calendar className="w-3 h-3" />
                      {t.dueDate}
                    </span>
                  )}
                  {t.isBacklog && (
                    <span className="text-amber-400 font-semibold">[Backlog]</span>
                  )}
                  <span>•</span>
                  <span className="capitalize">{t.category}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase ${
                  t.completed
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : t.priority === 'high'
                    ? 'bg-rose-950 text-rose-300 border-rose-900'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                }`}
              >
                {t.completed ? 'Done' : t.priority}
              </span>

              {t.isBacklog && (
                <button
                  type="button"
                  onClick={() => {
                    const promptTime = prompt(`Schedule "${t.title}" for what time?`, '17:00');
                    if (promptTime) scheduleBacklogTask(t.id, promptTime);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono border border-zinc-800"
                >
                  Schedule
                </button>
              )}

              <button
                type="button"
                onClick={() => deleteTask(t.id)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-zinc-600 hover:text-rose-400 hover:bg-zinc-900 transition-all"
                title="Delete Task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="p-12 text-center flex flex-col items-center gap-2">
            <CheckCircle2 className="w-8 h-8 text-zinc-600" />
            <span className="text-sm text-zinc-400 font-medium">No tasks found</span>
            <span className="text-xs text-zinc-600 font-mono">
              Try adjusting your filter or search query.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
