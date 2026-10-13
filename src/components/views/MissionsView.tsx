import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ChevronUp,
  MoreVertical,
  Play,
  RotateCw,
  Copy,
  Check,
  CheckCheck,
  BarChart2,
  Cpu,
} from 'lucide-react';
import { ViewType } from '../../types';

interface MissionsViewProps {
  onNavigate: (view: ViewType) => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const MissionsView: React.FC<MissionsViewProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [copiedInput, setCopiedInput] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  const pipelineStages = [
    { id: 'understand', label: 'Understand', status: 'completed' },
    { id: 'plan', label: 'Plan', status: 'completed' },
    { id: 'use_tools', label: 'Use Tools', status: 'active' },
    { id: 'verify', label: 'Verify', status: 'pending' },
    { id: 'results', label: 'Results', status: 'pending' },
  ];

  const missionSubsteps = [
    { id: 1, text: 'Connected to your calendar...', status: 'completed' },
    {
      id: 2,
      text: "Found tomorrow's meeting: Product Roadmap Discussion",
      status: 'completed',
    },
    { id: 3, text: 'Searching for relevant documents...', status: 'completed' },
    { id: 4, text: 'Analyzing document content...', status: 'in_progress' },
    { id: 5, text: 'Identifying missing preparation items...', status: 'pending' },
    { id: 6, text: 'Creating a prioritized checklist...', status: 'pending' },
    { id: 7, text: 'Setting up reminders...', status: 'pending' },
  ];

  const inputJson = `{
  "documents": ["roadmap.pdf", "notes.docx"],
  "analysis_type": "key_points",
  "focus": ["decisions", "action_items", "risks"]
}`;

  const outputJson = `{
  "key_topics": ["Q1 roadmap", "resource allocation"],
  "action_items": ["Prepare market analysis", "Review competitor strategy"],
  "risks": ["timeline dependency", "budget approval"]
}`;

  const copyToClipboard = (text: string, isInput: boolean) => {
    navigator.clipboard.writeText(text);
    if (isInput) {
      setCopiedInput(true);
      setTimeout(() => setCopiedInput(false), 2000);
    } else {
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    }
    onShowToast('Copied to Clipboard');
  };

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-900 flex flex-col overflow-y-auto px-6 py-6 select-none">
      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* Top Breadcrumb & Live status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span
              onClick={() => onNavigate('home')}
              className="text-sky-600 hover:text-sky-700 cursor-pointer"
            >
              Mission
            </span>
            <span className="text-slate-400">›</span>
            <span className="text-slate-900 font-semibold">Meeting Preparation</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isRunning ? 'Live' : 'Paused'}</span>
            </div>

            <button
              onClick={() => {
                setIsRunning(!isRunning);
                onShowToast(isRunning ? 'Mission Paused' : 'Mission Resumed');
              }}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              title={isRunning ? 'Pause execution' : 'Resume execution'}
            >
              {isRunning ? <Clock className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onShowToast('Mission Options')}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Goal Description Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900 mb-1">Meeting Preparation</h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              I have an important meeting tomorrow. Check my calendar, understand what the meeting is about, find the relevant documents, determine what I haven't prepared, prepare a checklist, and remind me what I need to do.
            </p>
          </div>
        </div>

        {/* Stepper Pipeline (Horizontal) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between max-w-4xl mx-auto relative">
            {pipelineStages.map((stage, idx) => {
              const isDone = stage.status === 'completed';
              const isActive = stage.status === 'active';
              return (
                <React.Fragment key={stage.id}>
                  <div className="flex flex-col items-center z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                        isDone
                          ? 'bg-emerald-500 text-white shadow-sm ring-4 ring-emerald-50'
                          : isActive
                          ? 'bg-blue-600 text-white shadow-md ring-4 ring-sky-100'
                          : 'bg-slate-100 text-slate-400 border border-slate-300'
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-5 h-5 font-bold" />
                      ) : isActive ? (
                        <Cpu className="w-5 h-5 animate-pulse" />
                      ) : idx === 3 ? (
                        <CheckCheck className="w-4 h-4" />
                      ) : (
                        <BarChart2 className="w-4 h-4" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-semibold ${
                        isActive
                          ? 'text-sky-700 font-bold'
                          : isDone
                          ? 'text-slate-700'
                          : 'text-slate-400'
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>

                  {idx < pipelineStages.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 -mt-6 transition-colors ${
                        isDone ? 'bg-emerald-400' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Two-Column Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Current Step & Substeps */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
                <h3 className="text-xs font-bold text-slate-900">
                  Current Step: Gathering information using tools
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>24s</span>
                <ChevronUp className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="p-4 divide-y divide-slate-100">
              {missionSubsteps.map((substep) => (
                <div
                  key={substep.id}
                  className="py-3 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    {substep.status === 'completed' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                    {substep.status === 'in_progress' && (
                      <div className="w-4 h-4 rounded-full border-2 border-sky-600 border-t-transparent animate-spin shrink-0" />
                    )}
                    {substep.status === 'pending' && (
                      <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                    )}

                    <span
                      className={`truncate ${
                        substep.status === 'completed'
                          ? 'text-slate-700'
                          : substep.status === 'in_progress'
                          ? 'font-semibold text-sky-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {substep.text}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      substep.status === 'completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : substep.status === 'in_progress'
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {substep.status === 'completed'
                      ? 'Completed'
                      : substep.status === 'in_progress'
                      ? 'In progress'
                      : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Current Tool with Live JSON Input/Output */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Current Tool
                </span>
                <button
                  onClick={() => onNavigate('tools')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  View all tools
                </button>
              </div>

              {/* Tool Header Card */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/70 flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Document Analysis</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Analyzing relevant meeting documents and extracting key information.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Running
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">12s</span>
                </div>
              </div>

              {/* Input JSON Block */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-semibold text-slate-600">Input</span>
                  <button
                    onClick={() => copyToClipboard(inputJson, true)}
                    className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800"
                  >
                    {copiedInput ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedInput ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-[#0d1627] text-sky-200 rounded-xl text-[11px] font-mono leading-relaxed overflow-x-auto border border-slate-800">
                  <code>{inputJson}</code>
                </pre>
              </div>

              {/* Output (Live) JSON Block */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-semibold text-slate-600">
                    Output (Live)
                  </span>
                  <button
                    onClick={() => copyToClipboard(outputJson, false)}
                    className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800"
                  >
                    {copiedOutput ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    <span>{copiedOutput ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-3 bg-[#0d1627] text-emerald-300 rounded-xl text-[11px] font-mono leading-relaxed overflow-x-auto border border-slate-800">
                  <code>{outputJson}</code>
                </pre>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => onShowToast('Tool Rerun', 'Document analysis refreshed with new parameters.')}
                className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Rerun Analysis</span>
              </button>

              <button
                onClick={() => onNavigate('conversation')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Back to conversation →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
