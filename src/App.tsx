import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { TodayView } from './components/views/TodayView';
import { DashboardView } from './components/views/DashboardView';
import { CalendarView } from './components/views/CalendarView';
import { GoalsHabitsView } from './components/views/GoalsHabitsView';
import { TasksView } from './components/views/TasksView';
import { NotesView } from './components/views/NotesView';
import { StatisticsView } from './components/views/StatisticsView';
import { SettingsView } from './components/views/SettingsView';
import { QuickAddModal } from './components/QuickAddModal';
import { CommandPalette } from './components/CommandPalette';

const MainLayout: React.FC = () => {
  const { currentView } = useApp();

  const renderCurrentView = () => {
    switch (currentView) {
      case 'today':
        return <TodayView />;
      case 'dashboard':
        return <DashboardView />;
      case 'calendar':
        return <CalendarView />;
      case 'tasks':
        return <TasksView />;
      case 'goals':
      case 'habits':
        return <GoalsHabitsView />;
      case 'notes':
        return <NotesView />;
      case 'statistics':
        return <StatisticsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <TodayView />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 selection:bg-indigo-600 selection:text-white flex">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar />

      {/* Main Viewport Container */}
      <div className="pl-64 flex flex-col flex-1 min-h-screen bg-black">
        {/* Fixed Top Bar */}
        <Header />

        {/* Content View Area */}
        <main className="w-full pt-20 px-6 pb-12 flex-1 bg-black">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Modals */}
      <QuickAddModal />
      <CommandPalette />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
