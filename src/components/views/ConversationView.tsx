import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Plus,
  Globe,
  Mic,
  ArrowUp,
  Calendar,
  FileText,
  Mail,
  Book,
  Bell,
  ExternalLink,
} from 'lucide-react';
import { ViewType, ExecutionStep } from '../../types';
import { AmazonLogo } from '../common/BrandAssets';

interface ConversationViewProps {
  onNavigate: (view: ViewType) => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'Plan' | 'Tools' | 'Sources' | 'Results'>('Plan');
  const [isStepsExpanded, setIsStepsExpanded] = useState(true);
  const [selectedStepId, setSelectedStepId] = useState<string | null>('step-5');
  const [followUpText, setFollowUpText] = useState('');

  const steps: ExecutionStep[] = [
    {
      id: 'step-1',
      label: 'Understanding your request and extracting key objectives...',
      duration: '12s',
      status: 'completed',
      details: 'Parsed primary goal: prepare tomorrow meeting. Extracted targets: calendar, documents, preparation checklist, and reminders.',
    },
    {
      id: 'step-2',
      label: 'Checking your calendar for upcoming meetings...',
      duration: '8s',
      status: 'completed',
      details: 'Identified tomorrow 10:00 AM - 11:00 AM event: "Product Roadmap Discussion" with Google Meet link.',
    },
    {
      id: 'step-3',
      label: 'Finding and analyzing relevant documents...',
      duration: '28s',
      status: 'completed',
      details: 'Queried Google Drive & Knowledge hub. Retrieved Q4_Roadmap.pdf, Competitor_Analysis.docx, and Market_Trends_2026.pdf.',
    },
    {
      id: 'step-4',
      label: 'Identifying preparation gaps...',
      duration: '15s',
      status: 'completed',
      details: 'Cross-referenced attendee requirements with document content. Found missing items: APAC pricing, supply chain contingency.',
    },
    {
      id: 'step-5',
      label: 'Creating a prioritized checklist...',
      status: 'in_progress',
      details: 'Currently ranking high-urgency discussion points for the product roadmap.',
    },
    {
      id: 'step-6',
      label: 'Setting up reminders...',
      status: 'pending',
      details: 'Will set alarms for 8:30 AM tomorrow and 15 mins prior to the meeting.',
    },
    {
      id: 'step-7',
      label: 'Finalizing and verifying the plan...',
      status: 'pending',
      details: 'Audit against stakeholder goals before generating debrief summary.',
    },
  ];

  const executionPlanItems = [
    { id: 1, title: 'Check calendar and meeting details', status: 'completed' },
    { id: 2, title: 'Gather and analyze relevant documents', status: 'completed' },
    { id: 3, title: 'Identify missing preparation items', status: 'completed' },
    { id: 4, title: 'Create prioritized checklist', status: 'in_progress' },
    { id: 5, title: 'Set reminders', status: 'pending' },
  ];

  const documents = [
    {
      id: 'doc-1',
      title: 'Q4_Roadmap.pdf',
      meta: 'PDF · 12 pages',
      badge: 'Relevance: High',
      color: 'bg-rose-50 text-rose-600 border-rose-200',
    },
    {
      id: 'doc-2',
      title: 'Competitor_Analysis.docx',
      meta: 'DOCX · 8 pages',
      badge: 'Relevance: High',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      id: 'doc-3',
      title: 'Market_Trends_2026.pdf',
      meta: 'PDF · 15 pages',
      badge: 'Relevance: Medium',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
  ];

  const handleAction = (actionName: string) => {
    if (actionName === 'reminder') {
      onShowToast('Reminder Created', 'Meeting preparation alert set for tomorrow at 8:30 AM.');
    } else if (actionName === 'email') {
      onShowToast('Checklist Drafted', 'Sent draft checklist to your email: shanmukheswar@example.com.');
    } else if (actionName === 'notion') {
      onShowToast('Saved to Notion', 'Created new page "Oct 14 Meeting Prep" in your Notion workspace.');
    }
  };

  return (
    <div className="flex-1 bg-white text-slate-900 flex overflow-hidden">
      {/* LEFT COLUMN: Main Chat & Realtime Progress */}
      <div className="flex-1 flex flex-col justify-between border-r border-slate-200 bg-slate-50/50 overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* User Message */}
          <div className="flex items-start gap-3 max-w-2xl">
            <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
              SM
            </div>
            <div className="flex-1">
              <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm p-4 shadow-xs text-sm text-slate-800 leading-relaxed">
                I have an important meeting tomorrow. Check my calendar, understand what the meeting is about, find relevant documents, determine what I haven't prepared, prepare a checklist, and remind me what I need to do.
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">10:12 PM</span>
            </div>
          </div>

          {/* Alexa+ Response */}
          <div className="flex items-start gap-3 max-w-2xl">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm border border-slate-800">
              <span className="text-[10px] font-black text-sky-400">A+</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <AmazonLogo dark={false} className="h-3.5" />
                <span className="text-xs font-bold text-slate-900">
                  Alexa<span className="text-sky-500">+</span>
                </span>
              </div>
              <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm p-4 shadow-xs text-sm text-slate-800 leading-relaxed">
                Got it. I'll help you prepare for your meeting. I'll check your calendar, gather relevant documents, analyze the content, identify what's missing, and create a prioritized checklist. I'll also set reminders for you.
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">10:12 PM</span>
            </div>
          </div>

          {/* Collapsible Steps Progress Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden ml-11 max-w-2xl">
            {/* Header */}
            <div
              onClick={() => setIsStepsExpanded(!isStepsExpanded)}
              className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100/60 transition-colors select-none"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-4 h-4 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
                <span className="text-xs font-semibold text-slate-900">
                  Working on your request...
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500">5/7 steps completed</span>
                {isStepsExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </div>
            </div>

            {/* Steps List */}
            {isStepsExpanded && (
              <div className="divide-y divide-slate-100">
                {steps.map((step) => {
                  const isSelected = selectedStepId === step.id;
                  return (
                    <div key={step.id} className="text-xs">
                      <button
                        onClick={() =>
                          setSelectedStepId(isSelected ? null : step.id)
                        }
                        className={`w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 text-left transition-colors ${
                          isSelected ? 'bg-sky-50/40' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          {step.status === 'completed' && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                          {step.status === 'in_progress' && (
                            <div className="w-4 h-4 rounded-full border-2 border-sky-600 border-t-transparent animate-spin shrink-0" />
                          )}
                          {step.status === 'pending' && (
                            <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                          )}

                          <span
                            className={`truncate ${
                              step.status === 'completed'
                                ? 'text-slate-700'
                                : step.status === 'in_progress'
                                ? 'font-semibold text-sky-900'
                                : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {step.duration && (
                            <span className="text-[11px] text-slate-400 font-mono">
                              {step.duration}
                            </span>
                          )}
                          {step.status === 'in_progress' && (
                            <span className="text-[11px] font-semibold text-sky-600 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                              In progress
                            </span>
                          )}
                          {step.status === 'pending' && (
                            <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                              Pending
                            </span>
                          )}
                          <ChevronRight
                            className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                              isSelected ? 'rotate-90 text-sky-600' : ''
                            }`}
                          />
                        </div>
                      </button>

                      {/* Expanded detail */}
                      {isSelected && step.details && (
                        <div className="px-9 py-2 bg-slate-50/60 text-slate-600 border-t border-slate-100 text-[11px] leading-relaxed">
                          {step.details}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Prompt Input */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="max-w-2xl bg-slate-50 border border-slate-200 rounded-2xl p-2.5 focus-within:border-sky-500 focus-within:bg-white transition-all shadow-xs">
            <input
              type="text"
              value={followUpText}
              onChange={(e) => setFollowUpText(e.target.value)}
              placeholder="Tell me what you want to do..."
              className="w-full bg-transparent px-2 py-1 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 mt-1.5 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-medium">
                  <span>Deep Research</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200 text-sky-700 font-medium">
                  <Globe className="w-3 h-3 text-sky-500" />
                  <span>Web</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-slate-600 rounded"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (followUpText.trim()) {
                      onShowToast('Action Added', followUpText);
                      setFollowUpText('');
                    }
                  }}
                  className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 shadow-sm"
                >
                  <ArrowUp className="w-3.5 h-3.5 font-bold" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Execution Plan, Key Info, Docs, Actions */}
      <div className="w-96 bg-white flex flex-col h-full overflow-y-auto shrink-0 select-none">
        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 px-4 text-xs font-semibold shrink-0">
          {(['Plan', 'Tools', 'Sources', 'Results'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-3 border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-sky-600 text-sky-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 space-y-5 overflow-y-auto flex-1">
          {/* Execution Plan Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600" />
                <h3 className="text-xs font-bold text-slate-900">Execution Plan</h3>
              </div>
              <button
                onClick={() => onNavigate('missions')}
                className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-0.5"
              >
                <span>View Details</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {executionPlanItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1">
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="text-[11px] font-mono text-slate-400 w-3">{item.id}</span>
                    {item.status === 'completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : item.status === 'in_progress' ? (
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-sky-600 border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                    )}
                    <span
                      className={`truncate ${
                        item.status === 'completed'
                          ? 'text-slate-700'
                          : item.status === 'in_progress'
                          ? 'font-medium text-slate-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  {item.status === 'in_progress' && (
                    <span className="text-[10px] text-sky-600 font-semibold bg-sky-50 px-1.5 py-0.5 rounded">
                      In Progress
                    </span>
                  )}
                  {item.status === 'pending' && (
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      Pending
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Key Information Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-600" />
                <h3 className="text-xs font-bold text-slate-900">Key Information</h3>
              </div>
              <button
                onClick={() => onNavigate('missions')}
                className="text-[11px] font-semibold text-sky-600 hover:text-sky-700"
              >
                View All
              </button>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1.5">
              <div className="text-xs font-bold text-slate-900">
                Product Roadmap Discussion
              </div>
              <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>Tomorrow, 10:00 AM - 11:00 AM</span>
              </div>
              <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
                <ExternalLink className="w-3 h-3 text-sky-500" />
                <span className="text-sky-700 font-medium">Google Meet</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 leading-relaxed">
                Discuss Q4 product roadmap, feature prioritization, and alignment with stakeholder goals.
              </p>
            </div>
          </div>

          {/* Documents Found Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold text-slate-900">Documents Found (5)</h3>
              </div>
              <button
                onClick={() => onNavigate('knowledge')}
                className="text-[11px] font-semibold text-sky-600 hover:text-sky-700"
              >
                View All
              </button>
            </div>

            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => onNavigate('knowledge')}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100/80 cursor-pointer border border-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <div className={`p-1.5 rounded border ${doc.color}`}>
                      <FileText className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-slate-800 truncate">
                        {doc.title}
                      </div>
                      <div className="text-[10px] text-slate-400">{doc.meta}</div>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 ${
                      doc.badge.includes('High')
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {doc.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-amber-500 text-sm font-bold">⚡</span>
              <h3 className="text-xs font-bold text-slate-900">Quick Actions</h3>
            </div>

            <div className="space-y-1.5">
              <button
                onClick={() => handleAction('reminder')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors text-left"
              >
                <Bell className="w-3.5 h-3.5 text-sky-600" />
                <span>Create Reminder</span>
              </button>
              <button
                onClick={() => handleAction('email')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors text-left"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-600" />
                <span>Email Checklist</span>
              </button>
              <button
                onClick={() => handleAction('notion')}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition-colors text-left"
              >
                <Book className="w-3.5 h-3.5 text-slate-700" />
                <span>Save to Notion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
