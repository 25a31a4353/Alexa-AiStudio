import React, { useState } from 'react';
import {
  Wrench,
  Search,
  FileText,
  Calendar,
  CheckSquare,
  Database,
  Bell,
  MessageSquare,
  ShieldCheck,
  Link as LinkIcon,
  Settings,
  ArrowRight,
  Play,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ToolItem, ViewType } from '../../types';
import { AmazonSmileSymbol } from '../common/BrandAssets';

interface ToolsViewProps {
  tools: ToolItem[];
  onNavigate: (view: ViewType) => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const ToolsView: React.FC<ToolsViewProps> = ({
  tools,
  onNavigate,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tools');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedToolForRun, setSelectedToolForRun] = useState<ToolItem | null>(null);

  const categories = [
    'All Tools',
    'Knowledge',
    'Planning',
    'Context',
    'Data',
    'External Services',
    'Verification',
  ];

  const getToolIcon = (name: string) => {
    switch (name) {
      case 'FileText':
        return <FileText className="w-5 h-5 text-amber-600" />;
      case 'Calendar':
        return <Calendar className="w-5 h-5 text-sky-600" />;
      case 'Search':
        return <Search className="w-5 h-5 text-amber-600" />;
      case 'CheckSquare':
        return <CheckSquare className="w-5 h-5 text-emerald-600" />;
      case 'Database':
        return <Database className="w-5 h-5 text-purple-600" />;
      case 'Bell':
        return <Bell className="w-5 h-5 text-sky-600" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-rose-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      default:
        return <LinkIcon className="w-5 h-5 text-indigo-600" />;
    }
  };

  const getCategoryBg = (cat: string) => {
    switch (cat) {
      case 'Knowledge':
        return 'text-amber-700 bg-amber-50';
      case 'External Services':
        return 'text-sky-700 bg-sky-50';
      case 'Planning':
        return 'text-emerald-700 bg-emerald-50';
      case 'Data':
        return 'text-purple-700 bg-purple-50';
      case 'Context':
        return 'text-rose-700 bg-rose-50';
      case 'Verification':
        return 'text-emerald-700 bg-emerald-50';
      default:
        return 'text-slate-700 bg-slate-100';
    }
  };

  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'All Tools' || tool.category === selectedCategory;
    const matchesSearch =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRunTool = (tool: ToolItem) => {
    setSelectedToolForRun(tool);
  };

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-900 flex flex-col overflow-y-auto px-6 py-6 select-none">
      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Tools</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Use powerful tools to get information, analyze data, and take actions.
            </p>
          </div>
          <button
            onClick={() => onShowToast('Tool Configuration', 'Tool management panel opened.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Manage Tools</span>
          </button>
        </div>

        {/* Hero Banner: Multiple capabilities. One intelligent agent. */}
        <div className="bg-[#0b1528] rounded-2xl p-6 sm:p-7 text-white relative overflow-hidden border border-slate-800 shadow-md">
          {/* Subtle glow blur */}
          <div className="absolute right-10 -bottom-10 w-96 h-48 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl z-10 relative">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight">
              Multiple capabilities. One intelligent agent.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
              Alexa+ can discover, understand, and use the right tools for your request.
            </p>
            <button
              onClick={() => onShowToast('Tool Discovery Active', 'All 9 native tools are ready for mission execution.')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all backdrop-blur-xs group"
            >
              <span>Explore all tools</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right graphics: Official Amazon Smile */}
          <div className="hidden md:block absolute right-6 bottom-4 z-10">
            <AmazonSmileSymbol className="w-56 h-12" glow={true} />
          </div>
        </div>

        {/* Filter Categories & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Tools Input */}
          <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-3 py-1.5 text-xs shadow-xs focus-within:border-sky-500 w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools..."
              className="w-full bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* 3x3 Grid of Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                    {getToolIcon(tool.iconName)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${getCategoryBg(
                    tool.category
                  )}`}
                >
                  {tool.category}
                </span>

                <button
                  onClick={() => handleRunTool(tool)}
                  className="flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 group-hover:translate-x-0.5 transition-all"
                >
                  <span>Use</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner: Tool Orchestration */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-3 max-w-sm">
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-900">Tool Orchestration</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Alexa+ automatically selects and combines multiple tools to accomplish complex tasks.
              </p>
            </div>
          </div>

          {/* Stepper Pipeline */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto text-[11px] font-semibold text-slate-600">
            {[
              { label: 'Discover Tools', icon: Search },
              { label: 'Select', icon: Settings },
              { label: 'Execute', icon: Play },
              { label: 'Verify', icon: ShieldCheck },
              { label: 'Deliver Results', icon: FileText },
            ].map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">
                      {st.label}
                    </span>
                  </div>
                  {i < 4 && <span className="text-slate-300 text-xs">→</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tool Runner Modal */}
      {selectedToolForRun && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                {getToolIcon(selectedToolForRun.iconName)}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Run {selectedToolForRun.title}
                </h3>
                <span className="text-xs text-slate-500">{selectedToolForRun.category}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              {selectedToolForRun.description}
            </p>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-700 mb-4 font-mono">
              Ready to invoke in current mission pipeline. Execution output will stream to live logs.
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedToolForRun(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onShowToast(
                    'Tool Invoked',
                    `Executed ${selectedToolForRun.title} with default schema parameters.`
                  );
                  setSelectedToolForRun(null);
                  onNavigate('missions');
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              >
                Execute in Mission →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
