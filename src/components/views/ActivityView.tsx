import React, { useState } from 'react';
import {
  Activity as ActivityIcon,
  MessageSquare,
  Target,
  Wrench,
  Share2,
  Calendar,
  FileText,
  BookOpen,
  BarChart2,
  Bell,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';
import { ActivityItem, ViewType } from '../../types';

interface ActivityViewProps {
  activities: ActivityItem[];
  onNavigate: (view: ViewType) => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const ActivityView: React.FC<ActivityViewProps> = ({
  activities,
  onNavigate,
  onShowToast,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<Record<string, boolean>>({
    Conversation: true,
    Mission: true,
    Tool: true,
    Knowledge: true,
    Integration: true,
  });
  const [dateRange, setDateRange] = useState('Last 7 days');

  const topTools = [
    { name: 'Document Analysis', count: 8, max: 10, color: 'bg-amber-500' },
    { name: 'Calendar', count: 6, max: 10, color: 'bg-sky-500' },
    { name: 'Knowledge Search', count: 5, max: 10, color: 'bg-indigo-500' },
    { name: 'Data Analysis', count: 4, max: 10, color: 'bg-purple-500' },
    { name: 'Notifications', count: 3, max: 10, color: 'bg-emerald-500' },
  ];

  const getActivityBadgeStyle = (type: ActivityItem['type']) => {
    switch (type) {
      case 'Conversation':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Mission':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Tool':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Knowledge':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Integration':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getActivityIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className="w-4 h-4 text-sky-500" />;
      case 'FileText':
        return <FileText className="w-4 h-4 text-amber-500" />;
      case 'Calendar':
        return <Calendar className="w-4 h-4 text-emerald-500" />;
      case 'CheckSquare':
        return <CheckCircle className="w-4 h-4 text-purple-500" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-rose-500" />;
      case 'BarChart2':
        return <BarChart2 className="w-4 h-4 text-indigo-500" />;
      case 'Bell':
        return <Bell className="w-4 h-4 text-amber-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
    }
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const clearFilters = () => {
    setSelectedTypes({
      Conversation: true,
      Mission: true,
      Tool: true,
      Knowledge: true,
      Integration: true,
    });
    onShowToast('Filters Reset');
  };

  const filteredActivities = activities.filter(
    (act) => selectedTypes[act.type]
  );

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-900 flex flex-col overflow-y-auto px-6 py-6 select-none">
      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
              <ActivityIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Activity</h1>
              <p className="text-xs text-slate-500">
                Track your conversations, missions, tool usage, and actions across Alexa+.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('Date Filter', 'Displaying activities for the last 7 days.')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{dateRange}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        {/* 4 Top Stat Cards with Sparklines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              count: 24,
              label: 'Total Activities',
              icon: MessageSquare,
              color: 'text-sky-600',
              sparkColor: '#0284c7',
            },
            {
              count: 8,
              label: 'Missions',
              icon: Target,
              color: 'text-emerald-600',
              sparkColor: '#059669',
            },
            {
              count: 12,
              label: 'Tool Actions',
              icon: Wrench,
              color: 'text-purple-600',
              sparkColor: '#7c3aed',
            },
            {
              count: 3,
              label: 'Integrations',
              icon: Share2,
              color: 'text-amber-600',
              sparkColor: '#d97706',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-2xl font-bold text-slate-900">{stat.count}</span>
                  </div>
                  <span className="text-xs text-slate-500">{stat.label}</span>
                </div>

                {/* Mini SVG Sparkline */}
                <div className="w-16 h-8">
                  <svg className="w-full h-full" viewBox="0 0 64 24" fill="none">
                    <path
                      d="M2 18 Q 16 4, 32 14 T 62 6"
                      stroke={stat.sparkColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Recent Activity Feed */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900">Recent Activity</h3>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                      {getActivityIcon(act.iconName)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{act.title}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{act.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] text-slate-400 hidden sm:inline">
                      {act.timestamp}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getActivityBadgeStyle(
                        act.type
                      )}`}
                    >
                      {act.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Filters and Top Tools Bar Chart */}
          <div className="lg:col-span-4 space-y-5">
            {/* Activity Filters Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-900">Activity Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Activity Type
                </span>
                {['Conversations', 'Missions', 'Tool Actions', 'Knowledge', 'Integrations'].map(
                  (typeKey) => {
                    const mapped =
                      typeKey === 'Conversations'
                        ? 'Conversation'
                        : typeKey === 'Missions'
                        ? 'Mission'
                        : typeKey === 'Tool Actions'
                        ? 'Tool'
                        : typeKey === 'Integrations'
                        ? 'Integration'
                        : 'Knowledge';
                    const isChecked = selectedTypes[mapped];

                    return (
                      <label
                        key={typeKey}
                        className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleType(mapped)}
                          className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-3.5 h-3.5"
                        />
                        <span>{typeKey}</span>
                      </label>
                    );
                  }
                )}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                  Date Range
                </span>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none"
                >
                  <option>Last 7 days</option>
                  <option>Last 14 days</option>
                  <option>Last 30 days</option>
                  <option>All time</option>
                </select>
              </div>
            </div>

            {/* Top Tools Used Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-900">Top Tools Used</h3>
                <button
                  onClick={() => onNavigate('tools')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {topTools.map((t, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center justify-between text-slate-700 mb-1">
                      <span className="font-medium text-slate-800">{t.name}</span>
                      <span className="font-semibold text-slate-600 font-mono">{t.count}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${t.color}`}
                        style={{ width: `${(t.count / t.max) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
