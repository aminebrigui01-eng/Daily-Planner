import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Repeat, Flag, FileText, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType, PriorityType, HorizonType } from '../types';

export const QuickAddModal: React.FC = () => {
  const {
    isQuickAddOpen,
    setIsQuickAddOpen,
    quickAddType,
    setQuickAddType,
    addTask,
    addHabit,
    addGoal,
    addNote,
    addCalendarEvent
  } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CategoryType>('work');
  const [priority, setPriority] = useState<PriorityType>('medium');
  const [time, setTime] = useState('14:00 - 15:00');
  const [repeat, setRepeat] = useState<'none' | 'daily' | 'weekly'>('none');
  const [clientMatter, setClientMatter] = useState('');
  const [horizon, setHorizon] = useState<HorizonType>('monthly');
  const [targetVal, setTargetVal] = useState('10');
  const [unit, setUnit] = useState('Sessions');
  const [deadline, setDeadline] = useState('Oct 31, 2026');
  const [icon, setIcon] = useState('⚡');
  const [noteContent, setNoteContent] = useState('');
  const [tags, setTags] = useState('#ideas, #brief');

  if (!isQuickAddOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (quickAddType === 'task') {
      addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        category,
        priority,
        completed: false,
        scheduledTime: time.trim() || undefined,
        repeat,
        clientMatter: clientMatter.trim() || undefined,
        dueDate: 'Today',
        date: '2026-09-24'
      });
    } else if (quickAddType === 'event') {
      addCalendarEvent({
        title: title.trim(),
        date: '2026-09-24',
        time: time.trim() || undefined,
        sector: category === 'finance' ? 'finance' : category === 'fitness' ? 'fitness' : category === 'personal' ? 'personal' : 'work',
        type: 'event'
      });
      // Also add to today's tasks so it appears in the schedule
      addTask({
        title: title.trim(),
        description: description.trim() || undefined,
        category,
        priority,
        completed: false,
        scheduledTime: time.trim() || undefined,
        date: '2026-09-24'
      });
    } else if (quickAddType === 'habit') {
      addHabit(title.trim(), `${category} system`, icon);
    } else if (quickAddType === 'goal') {
      const numTarget = parseFloat(targetVal) || 10;
      addGoal({
        title: title.trim(),
        category,
        horizon,
        priority,
        currentValue: 1,
        targetValue: numTarget,
        unit,
        displayProgress: `1 / ${numTarget} ${unit}`,
        deadline,
        statusNote: 'In Progress',
        percentage: Math.round((1 / numTarget) * 100),
        description: description.trim() || undefined
      });
    } else if (quickAddType === 'note') {
      const tagsArr = tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .map((t) => (t.startsWith('#') ? t : `#${t}`));
      addNote({
        title: title.trim(),
        content: noteContent.trim() || description.trim(),
        tags: tagsArr,
        category
      });
    }

    // Reset
    setTitle('');
    setDescription('');
    setClientMatter('');
    setNoteContent('');
    setIsQuickAddOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-tight">Quick Add</h3>
          </div>
          <button
            type="button"
            onClick={() => setIsQuickAddOpen(false)}
            className="text-zinc-500 hover:text-white p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
          {[
            { type: 'task', label: 'Task', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
            { type: 'event', label: 'Event', icon: <Calendar className="w-3.5 h-3.5" /> },
            { type: 'habit', label: 'Habit', icon: <Repeat className="w-3.5 h-3.5" /> },
            { type: 'goal', label: 'Goal', icon: <Flag className="w-3.5 h-3.5" /> },
            { type: 'note', label: 'Note', icon: <FileText className="w-3.5 h-3.5" /> }
          ].map((tab) => (
            <button
              key={tab.type}
              type="button"
              onClick={() => setQuickAddType(tab.type as any)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                quickAddType === tab.type
                  ? 'bg-zinc-800 text-white font-semibold shadow-sm border border-zinc-700/60'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-1">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-zinc-400">
              {quickAddType === 'task'
                ? 'Task Title'
                : quickAddType === 'event'
                ? 'Event Name'
                : quickAddType === 'habit'
                ? 'Habit System Name'
                : quickAddType === 'goal'
                ? 'Milestone / Goal Title'
                : 'Note Title'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Executive Consultation Briefing"
              className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500 font-medium"
              autoFocus
            />
          </div>

          {/* Conditional Fields based on Type */}
          {(quickAddType === 'task' || quickAddType === 'event') && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-zinc-400">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as PriorityType)}
                    className="h-9 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-zinc-400">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="h-9 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                  >
                    <option value="work">Work & Client</option>
                    <option value="personal">Personal</option>
                    <option value="fitness">Fitness</option>
                    <option value="projects">Projects</option>
                    <option value="routine">Routine</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-zinc-400">Time Range / Slot</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="14:00 - 15:00"
                    className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-zinc-400">Client / Matter Code</label>
                  <input
                    type="text"
                    value={clientMatter}
                    onChange={(e) => setClientMatter(e.target.value)}
                    placeholder="e.g. TechCorp #92"
                    className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {quickAddType === 'habit' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Icon</label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none text-center text-base"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Target Cadence</label>
                <input
                  type="text"
                  value="Daily system"
                  readOnly
                  className="h-9 px-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-500 text-xs"
                />
              </div>
            </div>
          )}

          {quickAddType === 'goal' && (
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Target</label>
                <input
                  type="number"
                  value={targetVal}
                  onChange={(e) => setTargetVal(e.target.value)}
                  className="h-9 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Unit</label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="h-9 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Horizon</label>
                <select
                  value={horizon}
                  onChange={(e) => setHorizon(e.target.value as HorizonType)}
                  className="h-9 px-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          )}

          {quickAddType === 'note' && (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none font-mono"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Note Content</label>
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  rows={4}
                  placeholder="Draft client advice or scratch notes..."
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs focus:outline-none font-mono"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-900 mt-2">
            <button
              type="button"
              onClick={() => setIsQuickAddOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:bg-zinc-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            >
              Create Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
