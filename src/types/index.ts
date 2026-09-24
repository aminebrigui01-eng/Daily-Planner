export type CategoryType = 'work' | 'personal' | 'fitness' | 'projects' | 'routine' | 'finance';
export type PriorityType = 'high' | 'medium' | 'low';
export type HorizonType = 'yearly' | 'monthly' | 'weekly' | 'daily';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: CategoryType;
  priority: PriorityType;
  completed: boolean;
  scheduledTime?: string; // e.g. "09:00", "14:30 - 16:00", "18:30 - 19:15"
  duration?: string;      // e.g. "2h 30m slot", "60 mins"
  isBacklog?: boolean;
  reminder?: string;     // e.g. "15m before"
  repeat?: 'none' | 'daily' | 'weekly' | 'custom';
  repeatSchedule?: string; // e.g. "Mon / Wed / Fri • 17:30"
  activeNow?: boolean;
  callUrl?: string;
  date: string;          // e.g. "2026-09-24"
  dueDate?: string;      // e.g. "Due 16:30", "Due 18:00", "Tomorrow"
  completedAt?: string;  // e.g. "Completed at 07:45"
  clientMatter?: string; // e.g. "TechCorp Retainer", "Patent Litigation"
}

export interface Habit {
  id: string;
  name: string;
  frequency: string;     // e.g. "4x/week • Target 15/mo", "Daily system"
  icon: string;          // emoji: 🏋️, 💧, 📚, 🗣️, 🧘, 😴
  // history maps date string (e.g. "2026-09-18") to status
  history: Record<string, 'completed' | 'missed' | 'pending'>;
  streak: number;
}

export interface Goal {
  id: string;
  title: string;
  category: string;       // e.g. "Study / Personal", "Projects / Legal Ops", "Fitness / Longevity"
  horizon: HorizonType;
  priority: PriorityType;
  currentValue: number;
  targetValue: number;
  unit: string;
  displayProgress: string; // e.g. "4/5 Milestones", "Sprint Q3", "11 / 15 Sessions Done"
  deadline: string;       // e.g. "Dec 31, 2026", "Sep 30, 2026"
  statusNote: string;     // e.g. "On Track", "Final Review", "4 Remaining"
  percentage: number;
  description?: string;
}

export interface CalendarEvent {
  id: string;
  date: string;          // "2026-09-24"
  title: string;
  time?: string;
  sector: 'work' | 'personal' | 'fitness' | 'finance';
  type: 'event' | 'task' | 'milestone' | 'auto' | 'special';
  badgeEmoji?: string;
  statusText?: string;   // e.g. "Done", "Shipped", "Live", "Celebrated"
  tasksSummary?: string; // e.g. "2/2", "3/3", "4/5 done"
  isToday?: boolean;
}

export interface NoteItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
  category?: CategoryType;
}

export interface BusinessProfile {
  businessName: string;
  userName: string;
  userEmail: string;
  role: string;
  avatarUrl: string;
  logoUrl: string;
  timezone: string;
  todayReflection: string;
  todayMood: string;
  scratchpad: string;
  scratchpadTags: string[];
}

export type AppView =
  | 'today'
  | 'dashboard'
  | 'calendar'
  | 'tasks'
  | 'goals'
  | 'habits'
  | 'notes'
  | 'statistics'
  | 'settings';
