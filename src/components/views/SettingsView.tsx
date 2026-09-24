import React, { useState } from 'react';
import {
  Settings,
  Building,
  User,
  Shield,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Palette
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SettingsView: React.FC = () => {
  const { profile, updateProfile, resetToDefaults, exportDataJSON, importDataJSON } = useApp();

  const [businessName, setBusinessName] = useState(profile.businessName);
  const [userName, setUserName] = useState(profile.userName);
  const [role, setRole] = useState(profile.role);
  const [userEmail, setUserEmail] = useState(profile.userEmail);
  const [timezone, setTimezone] = useState(profile.timezone);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      businessName,
      userName,
      role,
      userEmail,
      timezone
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importDataJSON(content);
        if (ok) alert('Business data imported successfully!');
        else alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6 pb-12 select-none">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-zinc-950 border border-zinc-800/90 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-950/80 border border-indigo-800/80 px-2 py-0.5 rounded">
              Practice Configuration
            </span>
            <span className="text-zinc-500 text-xs font-mono">• Business & Environment</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Business Settings</h1>
          <p className="text-xs text-zinc-400">
            Configure your legal practice profile, theme aesthetic, and manage data export/backups.
          </p>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Settings saved successfully!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Business Profile Form (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <form
            onSubmit={handleSaveProfile}
            className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-900">
              <Building className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-white tracking-tight">Practice & Identity Profile</h2>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-zinc-400">Practice / Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Law Note Legal Practice"
                className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Owner / Principal Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Amine Brigui"
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Professional Role / Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Managing Partner / Legal Counsel"
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Contact Email</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="aminebrigui01@gmail.com"
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Operating Timezone</label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="UTC+01:00 London (GMT+1)"
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-900 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-95"
              >
                Save Practice Profile
              </button>
            </div>
          </form>

          {/* Theme Display Card */}
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-900">
              <Palette className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-white tracking-tight">App Visual Theme</h2>
            </div>

            <div className="p-4 rounded-xl bg-black border-2 border-indigo-500 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
                  <span className="text-xs font-bold text-white">OLED Pure Black (Active)</span>
                </div>
                <span className="text-[11px] text-zinc-400">
                  User requested pitch-black background with subtle zinc borders and vivid semantic accents.
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Data Management & Backup (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <div className="flex items-center gap-2 pb-3 border-b border-zinc-900">
              <Shield className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white tracking-tight">Data Management & Backup</h2>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Your business tasks, habits history, notes, and milestones are saved locally in your browser storage. You can create JSON backups or restore data anytime.
            </p>

            <div className="flex flex-col gap-2.5 pt-1">
              <button
                type="button"
                onClick={exportDataJSON}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-white transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-indigo-400" />
                  Export All Practice Data (.json)
                </span>
                <span className="text-[10px] font-mono text-zinc-500">Instant Download</span>
              </button>

              <label className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-white transition-colors cursor-pointer">
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  Import Backup File (.json)
                </span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="text-[10px] font-mono text-zinc-500">Upload</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Reset all tasks, habits, and goals to initial demo state?')) {
                    resetToDefaults();
                    alert('App reset to clean initial demo data.');
                  }
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-rose-950/40 border border-zinc-800 hover:border-rose-900 text-xs font-medium text-zinc-400 hover:text-rose-300 transition-colors mt-2"
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-rose-400" />
                  Reset to Initial Seed Data
                </span>
                <span className="text-[10px] font-mono text-zinc-500">Restore Default</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
