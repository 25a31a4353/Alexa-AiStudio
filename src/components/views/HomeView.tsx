import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  BarChart2,
  CheckCircle,
  Plus,
  Globe,
  Mic,
  ArrowUp,
  Sparkles,
  ChevronDown,
  ArrowRight,
  GitBranch,
} from 'lucide-react';
import { ViewType } from '../../types';
import { AmazonSmileSymbol } from '../common/BrandAssets';

interface HomeViewProps {
  onStartGoal: (promptText: string) => void;
  onNavigate: (view: ViewType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onStartGoal, onNavigate }) => {
  const [goalInput, setGoalInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('Deep Research');
  const [webActive, setWebActive] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [showModelMenu, setShowModelMenu] = useState(false);

  const modelOptions = [
    { id: 'Deep Research', label: 'Deep Research', badge: 'Thorough' },
    { id: 'Fast Reasoning', label: 'Fast Reasoning', badge: 'Ultra-fast' },
    { id: 'Multi-Agent', label: 'Multi-Agent Planner', badge: 'Autonomous' },
  ];

  const quickPills = [
    { icon: FileText, label: 'Analyze documents', prompt: 'Analyze my recent Q4 Product Roadmap and competitor analysis documents.' },
    { icon: Calendar, label: 'Plan and organize', prompt: 'Prepare a strategic schedule and milestones plan for next week.' },
    { icon: BarChart2, label: 'Work with your data', prompt: 'Review our 2026 market metrics and generate a performance forecast.' },
    { icon: GitBranch, label: 'Use multiple tools', prompt: 'Orchestrate calendar, Drive docs, and task reminders for tomorrow.' },
    { icon: Sparkles, label: 'Take actions for you', prompt: 'Prepare me for my meeting tomorrow: check calendar, analyze documents, and set reminders.' },
  ];

  const popularUseCases = [
    {
      id: 'uc-1',
      icon: Calendar,
      title: 'Prepare me for my meeting tomorrow',
      desc: 'Check my calendar, analyze documents, and create a preparation plan.',
      prompt: 'I have an important meeting tomorrow. Check my calendar, understand what the meeting is about, find relevant documents, determine what I haven\'t prepared, prepare a checklist, and remind me what I need to do.',
    },
    {
      id: 'uc-2',
      icon: FileText,
      title: 'Analyze these documents',
      desc: 'Summarize key information, find insights, and create an action plan.',
      prompt: 'Summarize key information from my roadmap and competitor analysis, find strategic insights, and create an actionable execution plan.',
    },
    {
      id: 'uc-3',
      icon: BarChart2,
      title: 'Review this data',
      desc: 'Find key trends, risks and opportunities, and generate a report.',
      prompt: 'Review the market trends dataset, find key growth trends, risks and opportunities, and generate a comprehensive executive report.',
    },
    {
      id: 'uc-4',
      icon: CheckCircle,
      title: 'Create an action plan',
      desc: 'Break down my goal into tasks, set priorities, and track progress.',
      prompt: 'Break down my product launch goal into concrete tasks, set priorities, estimate timelines, and establish a tracking framework.',
    },
  ];

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!goalInput.trim()) {
      onStartGoal('I have an important meeting tomorrow. Check my calendar, understand what the meeting is about, find relevant documents, determine what I haven\'t prepared, prepare a checklist, and remind me what I need to do.');
    } else {
      onStartGoal(goalInput);
    }
  };

  const toggleMic = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setGoalInput('Check my calendar, review roadmap documents, and generate a checklist...');
    }
  };

  return (
    <div className="flex-1 bg-[#060c18] text-white flex flex-col justify-between overflow-y-auto px-6 py-8 relative">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Hero Container */}
      <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center pt-4 sm:pt-8 z-10">
        {/* Amazon Alexa+ Tag */}
        <div className="text-[11px] font-bold tracking-[0.2em] text-slate-400 mb-3 uppercase">
          Amazon Alexa+
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 max-w-3xl leading-tight">
          Turn complex goals into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 drop-shadow-sm">
            real outcomes with Alexa+
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mb-8 font-normal leading-relaxed">
          I can understand your objective, plan the work, use multiple tools, take actions, and keep you updated.
        </p>

        {/* Quick Pills Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 max-w-3xl">
          {quickPills.map((pill, idx) => {
            const Icon = pill.icon;
            return (
              <button
                key={idx}
                onClick={() => setGoalInput(pill.prompt)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#111c30]/90 hover:bg-[#192844] border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all shadow-sm group"
              >
                <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 transition-colors" />
                <span>{pill.label}</span>
              </button>
            );
          })}
        </div>

        {/* Official Amazon Smile Symbol */}
        <div className="mb-6 flex justify-center">
          <AmazonSmileSymbol className="w-72 sm:w-88 h-14" glow={true} />
        </div>

        {/* Main Prompt Input Box */}
        <div className="w-full max-w-3xl bg-[#0f1b2e] rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden focus-within:border-sky-500/70 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all">
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 flex flex-col gap-3">
            <textarea
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              rows={2}
              placeholder="Tell me your goal in natural language..."
              className="w-full bg-transparent resize-none text-slate-100 placeholder-slate-400 text-sm sm:text-base focus:outline-none leading-relaxed"
            />

            {/* Bottom Controls inside Input Card */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-2 relative">
                {/* Plus Attachment Button */}
                <button
                  type="button"
                  onClick={() => onNavigate('knowledge')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
                  title="Add context or document"
                >
                  <Plus className="w-4 h-4" />
                </button>

                {/* Model Selector Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowModelMenu(!showModelMenu)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition-colors"
                  >
                    <span>{selectedModel}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {showModelMenu && (
                    <div className="absolute bottom-full left-0 mb-2 w-52 bg-[#0c1626] rounded-xl border border-slate-700 shadow-xl p-1.5 z-50 text-left">
                      {modelOptions.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            setSelectedModel(m.id);
                            setShowModelMenu(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                            selectedModel === m.id
                              ? 'bg-sky-600/30 text-sky-300 font-semibold'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span>{m.label}</span>
                          <span className="text-[10px] text-slate-400">{m.badge}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Web Toggle */}
                <button
                  type="button"
                  onClick={() => setWebActive(!webActive)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors border ${
                    webActive
                      ? 'bg-sky-950/60 text-sky-300 border-sky-800/80 shadow-xs'
                      : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Web</span>
                </button>
              </div>

              {/* Right Mic and Submit */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`p-2 rounded-xl transition-all ${
                    isListening
                      ? 'bg-rose-600/30 text-rose-400 ring-2 ring-rose-500/50 animate-pulse'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                  title={isListening ? 'Listening...' : 'Voice Dictation'}
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95"
                  title="Execute Goal"
                >
                  <ArrowUp className="w-4 h-4 font-bold" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* POPULAR USE CASES Section (Bottom 4 cards) */}
      <div className="max-w-6xl w-full mx-auto mt-10 z-10">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            Popular Use Cases
          </span>
          <button
            onClick={() => onNavigate('new-conversation')}
            className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {popularUseCases.map((uc) => {
            const Icon = uc.icon;
            return (
              <button
                key={uc.id}
                onClick={() => {
                  setGoalInput(uc.prompt);
                  onStartGoal(uc.prompt);
                }}
                className="flex flex-col justify-between p-4 rounded-2xl bg-[#0e192c]/90 hover:bg-[#15233c] border border-slate-800 hover:border-slate-700/80 text-left transition-all group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="w-8 h-8 rounded-xl bg-slate-800/80 flex items-center justify-center text-sky-400 mb-3 group-hover:bg-sky-950/60 group-hover:text-sky-300 transition-colors border border-slate-700/60">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white mb-1.5 leading-snug">
                    {uc.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {uc.desc}
                  </p>
                </div>

                <div className="mt-3 flex justify-end">
                  <span className="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all text-xs">
                    →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
