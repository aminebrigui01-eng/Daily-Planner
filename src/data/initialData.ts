import { Task, Habit, Goal, CalendarEvent, BusinessProfile, NoteItem } from '../types';

export const INITIAL_PROFILE: BusinessProfile = {
  businessName: 'Law Note Legal Ops',
  userName: 'Amine',
  userEmail: 'aminebrigui01@gmail.com',
  role: 'Legal Counsel & Business Operations',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiclKNYjwyli9j_aSRqCo0hSnBWFXnCwkhVxFRdCLWPUtCt0o6YMwqTKENPZvfIYuU4tqdIX2_y306nGLzVZviXO1T99JpBrG5sp-NAZSIY0nQ2PPIQLF3pu-hJcKaGgHHh3kspl9--FJOeNWpd6k4z5B2r5BSevfkkw9XOCkoYdrNTVCMUJ9M0r3gZWkcJ69w0Q7geROwmL4F_ETsHw2GFYVhJbw2ZD0tzyKmp0Ll6nYqlEMetULm',
  logoUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1XMel_3tpuGVzangVxQw3B3aM61djeLKsnmsZH9HkGVfsHWucra9JvvfCtuKpEGSKKDzdzMf71ZXKfUdIs5m04EiRsqwxwl2zWCYwD9xh-TWQhBfpZA26eQ5J1GtJD0WRrfqhLxofpHX4qqXFCPqbvZcdGdhwc0zkMS-kljhH9hKiHvcN7m0XGaCosyrCbFS8NXnxbfR5SFu-fV2e0yMySCLbuz4Zy2X7reFWCYI0csht3sh5lbRAOLJEk',
  timezone: 'UTC+01:00 London (GMT+1)',
  todayReflection: 'Captured clear action items during the client call. Need to isolate 90 uninterrupted minutes tomorrow for contract drafting and patent litigation brief...',
  todayMood: 'Focus & Calm',
  scratchpad: 'Client emphasized the need for mobile compliance by Q4. Follow up tomorrow regarding the API keys.',
  scratchpadTags: ['#ideas', '#focus', '#compliance', '#contracts']
};

export const INITIAL_TASKS: Task[] = [
  // Today's scheduled hourly items
  {
    id: 't-01',
    title: 'Wake up & morning routine',
    description: 'Hydration, light stretching, coffee',
    category: 'routine',
    priority: 'low',
    completed: true,
    scheduledTime: '07:00',
    duration: '60 mins',
    date: '2026-09-24',
    completedAt: '07:00'
  },
  {
    id: 't-02',
    title: 'Healthy breakfast & plan day',
    description: 'Oatmeal, vitamins & top 3 prioritization',
    category: 'personal',
    priority: 'low',
    completed: true,
    scheduledTime: '08:00',
    duration: '45 mins',
    date: '2026-09-24',
    completedAt: '08:00'
  },
  {
    id: 't-03',
    title: 'Deep Work: Product Architecture Review',
    description: 'Prepare slides and system flow diagrams for Q4 roadmap',
    category: 'work',
    priority: 'high',
    completed: true,
    scheduledTime: '09:00',
    duration: '2h 30m slot',
    reminder: '15m before',
    date: '2026-09-24',
    completedAt: '11:30'
  },
  {
    id: 't-04',
    title: 'Quick standup sync with design team',
    description: 'Figma design system token handoff & compliance review',
    category: 'work',
    priority: 'medium',
    completed: true,
    scheduledTime: '11:30',
    duration: '30 mins',
    date: '2026-09-24',
    completedAt: '12:00'
  },
  {
    id: 't-05',
    title: 'Lunch break & walk',
    description: '20 min outdoor walk, park loop',
    category: 'personal',
    priority: 'low',
    completed: true,
    scheduledTime: '13:00',
    duration: '45 mins',
    date: '2026-09-24',
    completedAt: '13:45'
  },
  {
    id: 't-06',
    title: 'Client Consultation & Law Note feedback',
    description: 'Review feedback on contract management modules and document legal workflow',
    category: 'work',
    priority: 'high',
    completed: false,
    scheduledTime: '14:30',
    duration: '1h 30m',
    activeNow: true,
    callUrl: '#join-call',
    date: '2026-09-24',
    dueDate: 'Due 16:00',
    clientMatter: 'TechCorp Retainer'
  },
  {
    id: 't-07',
    title: 'Code refactoring & QA review',
    description: 'Clean up schedule store logic & write tests',
    category: 'work',
    priority: 'medium',
    completed: false,
    scheduledTime: '16:30',
    duration: '60 mins',
    date: '2026-09-24',
    dueDate: 'Due 17:30'
  },
  {
    id: 't-08',
    title: 'Gym: Leg Day & Cardio',
    description: 'Squats, Romanian deadlifts, 25m HIIT stairmaster',
    category: 'fitness',
    priority: 'high',
    completed: false,
    scheduledTime: '17:30',
    duration: '60 mins',
    repeatSchedule: 'Mon / Wed / Fri • 17:30',
    date: '2026-09-24'
  },
  {
    id: 't-09',
    title: 'Dinner & family time',
    description: 'Cook fresh pasta, catch up without screens',
    category: 'personal',
    priority: 'low',
    completed: false,
    scheduledTime: '19:30',
    duration: '60 mins',
    date: '2026-09-24'
  },
  {
    id: 't-10',
    title: 'Personal Project: Daily Planner feature development',
    description: 'Finish time slot dragging prototypes',
    category: 'projects',
    priority: 'medium',
    completed: false,
    scheduledTime: '20:30',
    duration: '90 mins',
    date: '2026-09-24'
  },
  {
    id: 't-11',
    title: 'Reading 20 mins & Wind down',
    description: 'Atomic Habits chapter 5',
    category: 'routine',
    priority: 'low',
    completed: false,
    scheduledTime: '22:30',
    duration: '30 mins',
    date: '2026-09-24'
  },
  {
    id: 't-12',
    title: 'Sleep',
    description: 'Target 7.5 hours rest',
    category: 'routine',
    priority: 'low',
    completed: false,
    scheduledTime: '23:00',
    duration: '7.5h',
    date: '2026-09-24'
  },

  // Priority Tasks on Dashboard
  {
    id: 'pt-01',
    title: 'Finalize contract brief for TechCorp',
    category: 'work',
    priority: 'high',
    completed: false,
    dueDate: 'Due 16:30',
    date: '2026-09-24',
    clientMatter: 'TechCorp M&A'
  },
  {
    id: 'pt-02',
    title: 'Review design specifications with engineering team',
    category: 'work',
    priority: 'medium',
    completed: false,
    dueDate: 'Due 18:00',
    date: '2026-09-24',
    clientMatter: 'Law Note Core UI'
  },
  {
    id: 'pt-03',
    title: 'Schedule annual wellness checkup',
    category: 'personal',
    priority: 'low',
    completed: false,
    dueDate: 'Tomorrow',
    date: '2026-09-24'
  },
  {
    id: 'pt-04',
    title: 'Morning cardio workout (45 min)',
    category: 'fitness',
    priority: 'medium',
    completed: true,
    completedAt: '07:45',
    date: '2026-09-24'
  },

  // Unscheduled Backlog Tasks
  {
    id: 'ub-01',
    title: 'Send revised retainer invoice',
    description: 'Finance • 15m review with accounts receivable',
    category: 'finance',
    priority: 'high',
    completed: false,
    isBacklog: true,
    duration: '15m',
    date: '2026-09-24',
    clientMatter: 'Apex Retainer #104'
  },
  {
    id: 'ub-02',
    title: 'Review patent litigation summary',
    description: 'Research • 45m deep dive into IP precedent filings',
    category: 'work',
    priority: 'high',
    completed: false,
    isBacklog: true,
    duration: '45m',
    date: '2026-09-24',
    clientMatter: 'Patent Case #89'
  },
  {
    id: 'ub-03',
    title: 'Book train tickets for Zurich forum',
    description: 'Travel • 10m booking SBB executive pass',
    category: 'personal',
    priority: 'low',
    completed: false,
    isBacklog: true,
    duration: '10m',
    date: '2026-09-24'
  }
];

export const INITIAL_HABITS: Habit[] = [
  {
    id: 'h-01',
    name: 'Gym Workout',
    frequency: '4x/week • Target 15/mo',
    icon: '🏋️',
    history: {
      '2026-09-18': 'completed',
      '2026-09-19': 'completed',
      '2026-09-20': 'missed',
      '2026-09-21': 'completed',
      '2026-09-22': 'completed',
      '2026-09-23': 'missed',
      '2026-09-24': 'completed'
    },
    streak: 5,
  },
  {
    id: 'h-02',
    name: 'Drink 2.5L Water',
    frequency: 'Daily system',
    icon: '💧',
    history: {
      '2026-09-18': 'completed',
      '2026-09-19': 'completed',
      '2026-09-20': 'completed',
      '2026-09-21': 'completed',
      '2026-09-22': 'completed',
      '2026-09-23': 'completed',
      '2026-09-24': 'completed'
    },
    streak: 18,
  },
  {
    id: 'h-03',
    name: 'Read 20 Pages',
    frequency: 'Daily system',
    icon: '📚',
    history: {
      '2026-09-18': 'completed',
      '2026-09-19': 'completed',
      '2026-09-20': 'completed',
      '2026-09-21': 'completed',
      '2026-09-22': 'missed',
      '2026-09-23': 'completed',
      '2026-09-24': 'completed'
    },
    streak: 2,
  },
  {
    id: 'h-04',
    name: 'Study English / Vocab',
    frequency: 'Daily system',
    icon: '🗣️',
    history: {
      '2026-09-18': 'completed',
      '2026-09-19': 'completed',
      '2026-09-20': 'completed',
      '2026-09-21': 'completed',
      '2026-09-22': 'completed',
      '2026-09-23': 'completed',
      '2026-09-24': 'completed'
    },
    streak: 24,
  },
  {
    id: 'h-05',
    name: 'Meditation & Breathing',
    frequency: 'Daily system',
    icon: '🧘',
    history: {
      '2026-09-18': 'completed',
      '2026-09-19': 'missed',
      '2026-09-20': 'completed',
      '2026-09-21': 'completed',
      '2026-09-22': 'completed',
      '2026-09-23': 'missed',
      '2026-09-24': 'completed'
    },
    streak: 3,
  },
  {
    id: 'h-06',
    name: 'Sleep before 23:00',
    frequency: 'Daily system',
    icon: '😴',
    history: {
      '2026-09-18': 'completed',
      '2026-09-19': 'completed',
      '2026-09-20': 'missed',
      '2026-09-21': 'completed',
      '2026-09-22': 'completed',
      '2026-09-23': 'missed',
      '2026-09-24': 'pending'
    },
    streak: 0,
  }
];

export const INITIAL_GOALS: Goal[] = [
  {
    id: 'g-01',
    title: 'Learn Spanish & Achieve B2 Level',
    category: 'Study / Personal',
    horizon: 'yearly',
    priority: 'high',
    currentValue: 4,
    targetValue: 5,
    unit: 'Milestones',
    displayProgress: '4/5 Milestones',
    deadline: 'Dec 31, 2026',
    statusNote: 'On Track',
    percentage: 80,
    description: 'Complete DELE B2 practice modules, pass conversational fluency exams, and read Spanish commercial law articles.'
  },
  {
    id: 'g-02',
    title: 'Complete Law Note UI & Design System',
    category: 'Projects / Legal Ops',
    horizon: 'monthly',
    priority: 'high',
    currentValue: 88,
    targetValue: 100,
    unit: '%',
    displayProgress: 'Sprint Q3',
    deadline: 'Sep 30, 2026',
    statusNote: 'Final Review',
    percentage: 88,
    description: 'Finalize design tokens, interactive agenda widgets, timeline calendar views, and dark mode theme.'
  },
  {
    id: 'g-03',
    title: 'Hit Gym 15 Times this Month',
    category: 'Fitness / Longevity',
    horizon: 'monthly',
    priority: 'medium',
    currentValue: 11,
    targetValue: 15,
    unit: 'Sessions',
    displayProgress: '11 / 15 Sessions Done',
    deadline: 'Sep 30, 2026',
    statusNote: '4 Remaining',
    percentage: 73,
    description: 'Compound lifts, HIIT conditioning, and mobility recovery routines.'
  },
  {
    id: 'g-04',
    title: "Read 'Atomic Habits' & Take Notes",
    category: 'Personal Growth',
    horizon: 'weekly',
    priority: 'medium',
    currentValue: 12,
    targetValue: 20,
    unit: 'Chapters',
    displayProgress: 'Ch. 12 of 20',
    deadline: 'Sep 27, 2026',
    statusNote: '3 Days Left',
    percentage: 60,
    description: 'Read and synthesize core systems principles for personal execution frameworks.'
  },
  {
    id: 'g-05',
    title: 'Save $1,200',
    category: 'Finance',
    horizon: 'monthly',
    priority: 'medium',
    currentValue: 950,
    targetValue: 1200,
    unit: '$',
    displayProgress: '$950 / $1,200',
    deadline: 'Sep 30, 2026',
    statusNote: '$250 gap scheduled',
    percentage: 79,
    description: 'End of quarter cash buffer allocation for practice expansion.'
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'ce-01', date: '2026-09-01', title: 'Morning Run 5k', sector: 'fitness', type: 'task', tasksSummary: '2/2' },
  { id: 'ce-02', date: '2026-09-02', title: 'Contracts sync', sector: 'work', type: 'task', tasksSummary: '1/1' },
  { id: 'ce-03', date: '2026-09-03', title: 'Read Chapter 3', sector: 'personal', type: 'task', tasksSummary: '3/3' },
  { id: 'ce-04', date: '2026-09-04', title: 'Audit Prep', sector: 'work', type: 'task', tasksSummary: '0/1' },
  { id: 'ce-05', date: '2026-09-05', title: 'Pay Subscription', sector: 'finance', type: 'auto', badgeEmoji: '💳', statusText: 'Done', tasksSummary: 'Auto' },
  { id: 'ce-06', date: '2026-09-06', title: 'Sunday Rest', sector: 'personal', type: 'event', statusText: 'No alarms' },
  { id: 'ce-07', date: '2026-09-07', title: 'Sprint Standup', sector: 'work', type: 'task', tasksSummary: '2/2' },
  { id: 'ce-08', date: '2026-09-08', title: 'Leg Day', sector: 'fitness', type: 'task', tasksSummary: '3/4' },
  { id: 'ce-09', date: '2026-09-09', title: 'Dentist 11:00', sector: 'personal', type: 'event', tasksSummary: '1/1' },
  { id: 'ce-10', date: '2026-09-10', title: 'PR Reviews', sector: 'work', type: 'task', tasksSummary: '2/3' },
  { id: 'ce-11', date: '2026-09-11', title: 'Cardio Interval', sector: 'fitness', type: 'task', tasksSummary: '4/4' },
  { id: 'ce-12', date: '2026-09-12', title: 'Team Sprint Planning', sector: 'work', type: 'event', badgeEmoji: '👥', statusText: '5/5 done', tasksSummary: 'Work' },
  { id: 'ce-13', date: '2026-09-13', title: 'Farmers Market', sector: 'personal', type: 'event', statusText: 'Weekend' },
  { id: 'ce-14', date: '2026-09-14', title: 'Case Analysis', sector: 'work', type: 'task', tasksSummary: '3/3' },
  { id: 'ce-15', date: '2026-09-15', title: "Mom's Birthday", sector: 'personal', type: 'special', badgeEmoji: '🎂', statusText: 'Celebrated', tasksSummary: 'Special' },
  { id: 'ce-16', date: '2026-09-16', title: 'Swimming', sector: 'fitness', type: 'task', tasksSummary: '2/2' },
  { id: 'ce-17', date: '2026-09-17', title: 'Draft QA review', sector: 'work', type: 'task', tasksSummary: '3/3' },
  { id: 'ce-18', date: '2026-09-18', title: 'Dev freeze 18:00', sector: 'work', type: 'task', tasksSummary: '1/2' },
  { id: 'ce-19', date: '2026-09-19', title: 'Dry run release', sector: 'work', type: 'event', statusText: 'Staging' },
  { id: 'ce-20', date: '2026-09-20', title: 'Law Note Beta Launch', sector: 'work', type: 'milestone', badgeEmoji: '🚀', statusText: 'Shipped', tasksSummary: 'Milestone' },
  { id: 'ce-21', date: '2026-09-21', title: 'User telemetry', sector: 'work', type: 'task', tasksSummary: '3/3' },
  { id: 'ce-22', date: '2026-09-22', title: 'Upper Body Workout', sector: 'fitness', type: 'task', tasksSummary: '4/4' },
  { id: 'ce-23', date: '2026-09-23', title: 'Book Club 20:00', sector: 'personal', type: 'event', tasksSummary: '2/2' },
  { id: 'ce-24', date: '2026-09-24', title: 'Client Review (14:30)', sector: 'work', type: 'event', isToday: true, tasksSummary: '4/5 done' },
  { id: 'ce-25', date: '2026-09-25', title: 'Investor Briefing', sector: 'work', type: 'event', tasksSummary: '0/3' },
  { id: 'ce-26', date: '2026-09-26', title: 'Trail Hike 10k', sector: 'fitness', type: 'task', tasksSummary: '0/1' },
  { id: 'ce-27', date: '2026-09-27', title: 'Meal prep', sector: 'personal', type: 'event', statusText: 'Relax' },
  { id: 'ce-28', date: '2026-09-28', title: 'Q3 Review', sector: 'work', type: 'event', badgeEmoji: '📊', statusText: '0/2 done', tasksSummary: 'Executive' },
  { id: 'ce-29', date: '2026-09-29', title: 'Gym Session 15', sector: 'fitness', type: 'task', tasksSummary: '0/2' },
  { id: 'ce-30', date: '2026-09-30', title: 'Month-end Goal Check', sector: 'work', type: 'milestone', badgeEmoji: '🎯', statusText: 'Upcoming', tasksSummary: 'Closure' }
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'n-01',
    title: 'Client Consultation - TechCorp Agreement Structure',
    content: `Meeting Summary with TechCorp General Counsel:
- Emphasized need for mobile compliance by Q4 2026.
- API Key handling: Server-side proxy architecture accepted.
- Next steps: Finalize NDA and schedule Q4 roadmap alignment call next Tuesday.`,
    tags: ['#contracts', '#techcorp', '#focus'],
    updatedAt: 'Sep 24, 2026 • 15:45',
    category: 'work'
  },
  {
    id: 'n-02',
    title: 'Patent Litigation Case #89 Synthesis',
    content: `Prior art review complete for Section 101 subject-matter eligibility.
Key precedents: Alice Corp, Berkheimer, and recent Federal Circuit software algorithm holdings.
Draft briefing memo to lead litigator by Friday noon.`,
    tags: ['#patent', '#litigation', '#research'],
    updatedAt: 'Sep 23, 2026 • 18:20',
    category: 'work'
  },
  {
    id: 'n-03',
    title: 'Systems Over Goals - Operating Protocol V1',
    content: `"You do not rise to the level of your goals. You fall to the level of your systems."
1. Time blocking: First 3 hours reserved for Deep Cognitive Output.
2. Communications triage: Batch at 11:30 and 16:30 only.
3. Daily physical reset: 17:30 gym conditioning non-negotiable.`,
    tags: ['#systems', '#productivity', '#ideas'],
    updatedAt: 'Sep 22, 2026 • 21:10',
    category: 'projects'
  }
];
