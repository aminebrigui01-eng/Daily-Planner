import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Tag,
  Trash2,
  Share2,
  Calendar,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NoteItem } from '../../types';

export const NotesView: React.FC = () => {
  const { notes, addNote, deleteNote } = useApp();

  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0]?.id || '');
  const [searchTag, setSearchTag] = useState<string>('all');
  const [noteSearch, setNoteSearch] = useState('');

  // Active note in editor
  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  // Form for new note
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('#ideas, #brief');

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith('#') ? t : `#${t}`));

    addNote({
      title: newTitle.trim(),
      content: newContent.trim(),
      tags: tagsArray,
      category: 'work'
    });

    setNewTitle('');
    setNewContent('');
    setIsCreating(false);
  };

  // Collect all unique tags
  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  // Filtered notes
  const filteredNotes = notes.filter((n) => {
    if (searchTag !== 'all' && !n.tags.includes(searchTag)) return false;
    if (noteSearch.trim()) {
      const q = noteSearch.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6 pb-12 select-none">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-zinc-950 border border-zinc-800/90 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest bg-indigo-950/80 border border-indigo-800/80 px-2 py-0.5 rounded">
              Knowledge Repository
            </span>
            <span className="text-zinc-500 text-xs font-mono">• Executive Notes & Briefs</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Legal Notes & Scratchpad</h1>
          <p className="text-xs text-zinc-400">
            Jot down client advisory briefs, strategic protocols, meeting notes, and daily insights.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ New Note</span>
        </button>
      </div>

      {/* Tags Filter Bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={() => setSearchTag('all')}
          className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
            searchTag === 'all'
              ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm'
              : 'bg-zinc-950 border border-zinc-800/80 text-zinc-400 hover:text-white'
          }`}
        >
          #all ({notes.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSearchTag(tag)}
            className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
              searchTag === tag
                ? 'bg-indigo-950 text-indigo-300 border border-indigo-800 shadow-sm'
                : 'bg-zinc-950 border border-zinc-800/80 text-zinc-400 hover:text-white'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Main Split Grid (Sidebar list + Reader / Editor) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Notes List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
            <input
              type="text"
              value={noteSearch}
              onChange={(e) => setNoteSearch(e.target.value)}
              placeholder="Search notes content..."
              className="w-full h-9 pl-9 pr-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-zinc-200 placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            {filteredNotes.map((note) => {
              const isSelected = note.id === (activeNote?.id || '');
              return (
                <div
                  key={note.id}
                  onClick={() => {
                    setActiveNoteId(note.id);
                    setIsCreating(false);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-zinc-900 border-indigo-500/70 shadow-lg'
                      : 'bg-zinc-950 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-white line-clamp-1">{note.title}</h3>
                    <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                      {note.updatedAt.split('•')[0]}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {note.content}
                  </p>

                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {note.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Note Reader or Creation Form (8 cols) */}
        <div className="lg:col-span-8 flex flex-col">
          {isCreating ? (
            /* Creation Form */
            <form
              onSubmit={handleCreateNote}
              className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col gap-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="text-sm font-bold text-white">Create New Legal / Business Note</span>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Note Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. M&A Clause Review - Indemnification Limits"
                  className="w-full h-10 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500 font-semibold"
                  autoFocus
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="#contracts, #liability, #review"
                  className="w-full h-9 px-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-zinc-400">Content</label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={12}
                  placeholder="Write your brief, meeting minutes, or strategic framework..."
                  className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 placeholder:text-zinc-600 text-xs focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-900">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:bg-zinc-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all active:scale-95"
                >
                  Save Note
                </button>
              </div>
            </form>
          ) : activeNote ? (
            /* Reader View */
            <div className="bg-zinc-950 border border-zinc-800/90 rounded-2xl p-6 shadow-xl flex flex-col gap-4 min-h-[480px]">
              <div className="flex items-start justify-between border-b border-zinc-900 pb-4">
                <div className="flex flex-col gap-1.5">
                  <h2 className="text-lg font-bold text-white tracking-tight">{activeNote.title}</h2>
                  <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      {activeNote.updatedAt}
                    </span>
                    <span>•</span>
                    <span className="text-indigo-400 capitalize">{activeNote.category || 'work'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(`${activeNote.title}\n\n${activeNote.content}`);
                      alert('Note copied to clipboard!');
                    }}
                    className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                    title="Copy Note"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteNote(activeNote.id)}
                    className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {activeNote.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-indigo-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Note Content */}
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-900 text-xs text-zinc-200 font-mono leading-relaxed whitespace-pre-wrap flex-1 select-text">
                {activeNote.content}
              </div>
            </div>
          ) : (
            <div className="p-16 text-center text-zinc-500 font-mono text-xs">
              No note selected. Click "+ New Note" to write one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
