import React, { useState, useEffect } from 'react';
import {
  Search,
  FileText,
  Calendar,
  Wrench,
  Share2,
  Activity,
  Settings,
  Target,
  ArrowRight,
  X,
} from 'lucide-react';
import { ViewType, DocumentItem, ToolItem } from '../../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewType) => void;
  documents: DocumentItem[];
  tools: ToolItem[];
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  documents,
  tools,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Handled externally
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickPages = [
    { label: 'Home - Goals & Outcomes', view: 'home' as ViewType, icon: Target },
    { label: 'New Conversation - Prompt Library', view: 'new-conversation' as ViewType, icon: FileText },
    { label: 'Live Mission - Meeting Preparation', view: 'missions' as ViewType, icon: Calendar },
    { label: 'Conversations - Active Chat & Plan', view: 'conversation' as ViewType, icon: FileText },
    { label: 'Knowledge Hub - 5 Documents Indexed', view: 'knowledge' as ViewType, icon: FileText },
    { label: 'Tools Directory - 9 Orchestrated Tools', view: 'tools' as ViewType, icon: Wrench },
    { label: 'Integrations - 9 Connected APIs & Tools', view: 'integrations' as ViewType, icon: Share2 },
    { label: 'Activity Feed & Tool Statistics', view: 'activity' as ViewType, icon: Activity },
    { label: 'Settings & Pro Builder Preferences', view: 'settings' as ViewType, icon: Settings },
  ];

  const filteredPages = quickPages.filter((p) =>
    p.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDocs = documents.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTools = tools.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, documents, tools, or past actions..."
            className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-4 divide-y divide-slate-100 text-xs">
          {/* Views */}
          <div className="pt-1">
            <span className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Pages & Navigation
            </span>
            <div className="space-y-1 mt-1">
              {filteredPages.map((page) => {
                const Icon = page.icon;
                return (
                  <button
                    key={page.view}
                    onClick={() => {
                      onNavigate(page.view);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-sky-50 group-hover:text-sky-600">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-slate-800 group-hover:text-sky-700">
                        {page.label}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Documents */}
          {filteredDocs.length > 0 && (
            <div className="pt-2">
              <span className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Knowledge Documents
              </span>
              <div className="space-y-1 mt-1">
                {filteredDocs.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => {
                      onNavigate('knowledge');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4 text-amber-500" />
                      <div>
                        <span className="font-medium text-slate-800">{doc.title}</span>
                        <span className="text-[10px] text-slate-400 ml-2">{doc.category}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">View in Knowledge</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tools */}
          {filteredTools.length > 0 && (
            <div className="pt-2">
              <span className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Tools
              </span>
              <div className="space-y-1 mt-1">
                {filteredTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      onNavigate('tools');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Wrench className="w-4 h-4 text-sky-500" />
                      <span className="font-medium text-slate-800">{tool.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">{tool.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Navigate with mouse or click</span>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded font-mono">
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
