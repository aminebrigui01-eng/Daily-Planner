import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Task,
  Habit,
  Goal,
  CalendarEvent,
  BusinessProfile,
  NoteItem,
  AppView
} from '../types';
import {
  INITIAL_PROFILE,
  INITIAL_TASKS,
  INITIAL_HABITS,
  INITIAL_GOALS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_NOTES
} from '../data/initialData';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  tasks: Task[];
  habits: Habit[];
  goals: Goal[];
  calendarEvents: CalendarEvent[];
  notes: NoteItem[];
  profile: BusinessProfile;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isQuickAddOpen: boolean;
  setIsQuickAddOpen: (open: boolean) => void;
  quickAddType: 'task' | 'event' | 'habit' | 'goal' | 'note';
  setQuickAddType: (type: 'task' | 'event' | 'habit' | 'goal' | 'note') => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;

  // Actions
  toggleTask: (id: string) => void;
  addTask: (task: Omit<Task, 'id' | 'date'> & { date?: string }) => void;
  deleteTask: (id: string) => void;
  scheduleBacklogTask: (id: string, timeSlot: string) => void;
  toggleHabitDay: (habitId: string, dateStr: string) => void;
  addHabit: (name: string, frequency: string, icon: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoalProgress: (goalId: string, currentVal: number) => void;
  updateReflection: (text: string) => void;
  updateScratchpad: (text: string) => void;
  updateProfile: (profileUpdates: Partial<BusinessProfile>) => void;
  addNote: (note: Omit<NoteItem, 'id' | 'updatedAt'>) => void;
  deleteNote: (id: string) => void;
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  resetToDefaults: () => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddType, setQuickAddType] = useState<'task' | 'event' | 'habit' | 'goal' | 'note'>('task');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Persistent States
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('law_note_tasks_v2');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('law_note_habits_v2');
    return saved ? JSON.parse(saved) : INITIAL_HABITS;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('law_note_goals_v2');
    return saved ? JSON.parse(saved) : INITIAL_GOALS;
  });

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    const saved = localStorage.getItem('law_note_cal_v2');
    return saved ? JSON.parse(saved) : INITIAL_CALENDAR_EVENTS;
  });

  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('law_note_notes_v2');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [profile, setProfile] = useState<BusinessProfile>(() => {
    const saved = localStorage.getItem('law_note_profile_v2');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('law_note_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('law_note_habits_v2', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('law_note_goals_v2', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('law_note_cal_v2', JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem('law_note_notes_v2', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('law_note_profile_v2', JSON.stringify(profile));
  }, [profile]);

  // Global Keyboard listener for shortcut 'N' and 'Cmd+K' / 'Ctrl+K'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in input or textarea
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target?.tagName)) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          setIsCommandPaletteOpen((prev) => !prev);
        }
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setQuickAddType('task');
        setIsQuickAddOpen(true);
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        setQuickAddType('event');
        setIsQuickAddOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextState = !t.completed;
          return {
            ...t,
            completed: nextState,
            completedAt: nextState ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined
          };
        }
        return t;
      })
    );
  };

  const addTask = (newTask: Omit<Task, 'id' | 'date'> & { date?: string }) => {
    const task: Task = {
      ...newTask,
      id: 't-' + Date.now().toString(36),
      date: newTask.date || '2026-09-24',
      completed: newTask.completed ?? false
    };
    setTasks((prev) => [task, ...prev]);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const scheduleBacklogTask = (id: string, timeSlot: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          return {
            ...t,
            isBacklog: false,
            scheduledTime: timeSlot
          };
        }
        return t;
      })
    );
  };

  const toggleHabitDay = (habitId: string, dateStr: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const currentStatus = h.history[dateStr] || 'pending';
          let nextStatus: 'completed' | 'missed' | 'pending';
          if (currentStatus === 'completed') {
            nextStatus = 'missed';
          } else if (currentStatus === 'missed') {
            nextStatus = 'pending';
          } else {
            nextStatus = 'completed';
          }

          const nextHistory = { ...h.history, [dateStr]: nextStatus };
          // Calculate streak
          let streakCount = 0;
          const dates = Object.keys(nextHistory).sort();
          for (let i = dates.length - 1; i >= 0; i--) {
            if (nextHistory[dates[i]] === 'completed') {
              streakCount++;
            } else if (nextHistory[dates[i]] === 'missed') {
              break;
            }
          }

          return {
            ...h,
            history: nextHistory,
            streak: streakCount
          };
        }
        return h;
      })
    );
  };

  const addHabit = (name: string, frequency: string, icon: string) => {
    const habit: Habit = {
      id: 'h-' + Date.now().toString(36),
      name,
      frequency: frequency || 'Daily system',
      icon: icon || '⚡',
      history: {
        '2026-09-24': 'pending'
      },
      streak: 0
    };
    setHabits((prev) => [...prev, habit]);
  };

  const addGoal = (newGoal: Omit<Goal, 'id'>) => {
    const goal: Goal = {
      id: 'g-' + Date.now().toString(36),
      ...newGoal
    };
    setGoals((prev) => [...prev, goal]);
  };

  const updateGoalProgress = (goalId: string, currentVal: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const percentage = Math.min(100, Math.round((currentVal / g.targetValue) * 100));
          return {
            ...g,
            currentValue: currentVal,
            percentage,
            displayProgress: `${currentVal} / ${g.targetValue} ${g.unit}`
          };
        }
        return g;
      })
    );
  };

  const updateReflection = (text: string) => {
    setProfile((prev) => ({ ...prev, todayReflection: text }));
  };

  const updateScratchpad = (text: string) => {
    setProfile((prev) => ({ ...prev, scratchpad: text }));
  };

  const updateProfile = (profileUpdates: Partial<BusinessProfile>) => {
    setProfile((prev) => ({ ...prev, ...profileUpdates }));
  };

  const addNote = (noteData: Omit<NoteItem, 'id' | 'updatedAt'>) => {
    const note: NoteItem = {
      id: 'n-' + Date.now().toString(36),
      updatedAt: 'Today • ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...noteData
    };
    setNotes((prev) => [note, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const addCalendarEvent = (eventData: Omit<CalendarEvent, 'id'>) => {
    const evt: CalendarEvent = {
      id: 'ce-' + Date.now().toString(36),
      ...eventData
    };
    setCalendarEvents((prev) => [...prev, evt]);
  };

  const resetToDefaults = () => {
    setTasks(INITIAL_TASKS);
    setHabits(INITIAL_HABITS);
    setGoals(INITIAL_GOALS);
    setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    setNotes(INITIAL_NOTES);
    setProfile(INITIAL_PROFILE);
    localStorage.clear();
  };

  const exportDataJSON = () => {
    const data = {
      profile,
      tasks,
      habits,
      goals,
      calendarEvents,
      notes,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `law_note_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importDataJSON = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.tasks) setTasks(data.tasks);
      if (data.habits) setHabits(data.habits);
      if (data.goals) setGoals(data.goals);
      if (data.calendarEvents) setCalendarEvents(data.calendarEvents);
      if (data.notes) setNotes(data.notes);
      if (data.profile) setProfile(data.profile);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        tasks,
        habits,
        goals,
        calendarEvents,
        notes,
        profile,
        searchQuery,
        setSearchQuery,
        isQuickAddOpen,
        setIsQuickAddOpen,
        quickAddType,
        setQuickAddType,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        toggleTask,
        addTask,
        deleteTask,
        scheduleBacklogTask,
        toggleHabitDay,
        addHabit,
        addGoal,
        updateGoalProgress,
        updateReflection,
        updateScratchpad,
        updateProfile,
        addNote,
        deleteNote,
        addCalendarEvent,
        resetToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
