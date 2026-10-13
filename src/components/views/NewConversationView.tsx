import React, { useState } from 'react';
import {
  Calendar,
  FileText,
  CheckSquare,
  Search,
  BarChart2,
  Share2,
  Paperclip,
  Mic,
  ArrowRight,
  Plus,
  ChevronDown,
} from 'lucide-react';
import { AmazonSmileSymbol } from '../common/BrandAssets';

interface NewConversationViewProps {
  onStartGoal: (promptText: string) => void;
}

export const NewConversationView: React.FC<NewConversationViewProps> = ({ onStartGoal }) => {
  const [inputText, setInputText] = useState('');
  const [selectedModel, setSelectedModel] = useState('Claude 3.5 Sonnet');
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [activeFilterPill, setActiveFilterPill] = useState<string | null>(null);

  const promptCards = [
    {
      id: 'plan-day',
      icon: Calendar,
      title: 'Plan my day',
      desc: '"Check my calendar and prepare for tomorrow\'s meeting."',
      prompt: 'I have an important meeting tomorrow. Check my calendar, understand what the meeting is about, find relevant documents, determine what I haven\'t prepared, prepare a checklist, and remind me what I need to do.',
      color: 'bg-sky-50 text-sky-600 border-sky-100',
    },
    {
      id: 'analyze-doc',
      icon: FileText,
      title: 'Analyze a document',
      desc: '"Summarize this report and highlight key insights."',
      prompt: 'Summarize the Q4 Product Roadmap report and extract key insights and action items.',
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      id: 'create-checklist',
      icon: CheckSquare,
      title: 'Create a checklist',
      desc: '"I\'m launching a project. Create a step-by-step checklist."',
      prompt: 'I\'m launching a new feature. Create a step-by-step checklist prioritizing critical dependencies and milestones.',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      id: 'find-info',
      icon: Search,
      title: 'Find information',
      desc: '"Search my knowledge base for relevant documents."',
      prompt: 'Search my knowledge base for all documents mentioning 2026 roadmap and competitor pricing.',
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      id: 'analyze-data',
      icon: BarChart2,
      title: 'Analyze data',
      desc: '"Analyze this data and generate a report."',
      prompt: 'Analyze the recent market trends dataset and generate an executive summary report with risk assessment.',
      color: 'bg-rose-50 text-rose-600 border-rose-100',
    },
    {
      id: 'use-tools',
      icon: Share2,
      title: 'Use my tools',
      desc: '"Find documents in Drive, check my Notion, and summarize."',
      prompt: 'Find documents in Google Drive, cross-reference my Notion workspace notes, and summarize next steps.',
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
  ];

  const bottomActionPills = [
    { id: 'search', label: 'Search', icon: Search },
    { id: 'deep-research', label: 'Deep Research', icon: FileText },
    { id: 'create-plan', label: 'Create Plan', icon: CheckSquare },
    { id: 'use-tools', label: 'Use Tools', icon: Share2 },
  ];

  const handleCardClick = (prompt: string) => {
    setInputText(prompt);
    onStartGoal(prompt);
  };

  const handleSend = () => {
    if (!inputText.trim()) {
      onStartGoal('I have an important meeting tomorrow. Check my calendar, understand what the meeting is about, find relevant documents, determine what I haven\'t prepared, prepare a checklist, and remind me what I need to do.');
    } else {
      onStartGoal(inputText);
    }
  };

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-900 flex flex-col justify-between overflow-y-auto px-6 py-6">
      {/* Top Welcome Section */}
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center pt-2 sm:pt-4">
        {/* Official Amazon Smile Symbol */}
        <div className="mb-2">
          <AmazonSmileSymbol className="w-48 sm:w-60 h-10" glow={true} />
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
          How can <span className="text-sky-600">Alexa+</span> help you today?
        </h1>

        {/* Subtitle */}
        <p className="text-slate-500 text-xs sm:text-sm max-w-xl mb-7 font-normal leading-relaxed">
          Ask a complex question, set a goal, or give me a task. I can understand, plan, use the right tools, and get things done for you.
        </p>

        {/* 3x2 Grid of 6 Prompt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 w-full max-w-4xl">
          {promptCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.prompt)}
                className="flex items-start justify-between p-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 text-left transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md group"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${card.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 italic">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 ml-2 mt-1">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-sky-600 group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Input Area */}
      <div className="max-w-4xl w-full mx-auto mt-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all">
          {/* Main textarea & right actions */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Describe what you want to do..."
              className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none px-2 py-1.5"
            />

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Voice dictation"
              >
                <Mic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95"
                title="Send"
              >
                <ArrowRight className="w-4 h-4 font-bold" />
              </button>
            </div>
          </div>

          {/* Under-bar filter pills and model switcher */}
          <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>

              {bottomActionPills.map((pill) => {
                const Icon = pill.icon;
                const isActive = activeFilterPill === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => setActiveFilterPill(isActive ? null : pill.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-colors border ${
                      isActive
                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                        : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-3 h-3 text-slate-500" />
                    <span>{pill.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Model Selector on Bottom Right */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowModelMenu(!showModelMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-slate-600 hover:text-slate-900 font-medium hover:bg-slate-100 rounded-lg transition-colors"
              >
                <span>{selectedModel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showModelMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-xl border border-slate-200 shadow-lg p-1 z-50 text-left">
                  {['Claude 3.5 Sonnet', 'Alexa+ Omni', 'Gemini 1.5 Pro'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setSelectedModel(m);
                        setShowModelMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs ${
                        selectedModel === m
                          ? 'bg-sky-50 text-sky-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
