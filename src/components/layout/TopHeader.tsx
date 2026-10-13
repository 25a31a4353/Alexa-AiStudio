import React, { useState } from 'react';
import { Search, Bell, CheckCircle2, Clock, X } from 'lucide-react';
import { ViewType } from '../../types';

interface TopHeaderProps {
  currentView: ViewType;
  onOpenSearch: () => void;
  onNavigate: (view: ViewType) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentView,
  onOpenSearch,
  onNavigate,
}) => {
  const isDark = currentView === 'home';
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const notifications = [
    {
      id: 'notif-1',
      title: 'Meeting Preparation in progress',
      time: '3m ago',
      desc: 'Step 5 of 7: Prioritized checklist is being generated.',
      icon: Clock,
      color: 'text-sky-500',
    },
    {
      id: 'notif-2',
      title: 'Document Analysis completed',
      time: '12m ago',
      desc: 'Extracted key insights from Q4 Product Roadmap.pdf',
      icon: CheckCircle2,
      color: 'text-emerald-500',
    },
  ];

  return (
    <header
      className={`h-16 px-6 flex items-center justify-between border-b shrink-0 transition-colors select-none ${
        isDark
          ? 'bg-[#080e1a] border-slate-800/80 text-white'
          : 'bg-white border-slate-200 text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
      }`}
    >
      {/* Search Input Button */}
      <div className="flex-1 max-w-xl mx-auto">
        <button
          onClick={onOpenSearch}
          className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm transition-all text-left ${
            isDark
              ? 'bg-[#121c2d] hover:bg-[#18253b] text-slate-400 hover:text-slate-200 border border-slate-800 shadow-inner'
              : 'bg-slate-100/90 hover:bg-slate-200/80 text-slate-500 hover:text-slate-700 border border-slate-200/80'
          }`}
        >
          <div className="flex items-center gap-2.5 truncate">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate text-xs sm:text-sm">
              Search your data, tools, or past conversations...
            </span>
          </div>
          <kbd
            className={`hidden sm:inline-flex items-center gap-0.5 text-[11px] font-mono px-2 py-0.5 rounded border font-semibold ${
              isDark
                ? 'bg-slate-800 text-slate-300 border-slate-700'
                : 'bg-white text-slate-600 border-slate-300 shadow-xs'
            }`}
          >
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 relative ml-4">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (unreadCount > 0) setUnreadCount(0);
            }}
            className={`p-2 rounded-xl transition-colors relative ${
              isDark
                ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 text-slate-900 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-semibold text-xs text-slate-800 uppercase tracking-wider">
                  Notifications
                </span>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 mt-2">
                {notifications.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.id}
                      onClick={() => {
                        setShowNotifications(false);
                        onNavigate('conversation');
                      }}
                      className="p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                    >
                      <div className="flex items-start gap-2.5">
                        <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${n.color}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-900 truncate">
                              {n.title}
                            </span>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                            {n.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('activity');
                  }}
                  className="w-full text-center text-xs text-sky-600 hover:text-sky-700 font-medium py-1"
                >
                  View all activity →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <button
          onClick={() => onNavigate('settings')}
          className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center font-bold text-xs text-white shadow-sm ring-2 ring-sky-500/30 hover:scale-105 transition-transform"
          title="Shanmukheswar (Pro Builder)"
        >
          SM
        </button>
      </div>
    </header>
  );
};
