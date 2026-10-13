import React from 'react';
import {
  Home,
  MessageSquarePlus,
  Target,
  MessageSquare,
  BookOpen,
  Wrench,
  Share2,
  Activity,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { ViewType } from '../../types';
import { AmazonLogo, AlexaPlusBadge } from '../common/BrandAssets';

interface SidebarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenProfileModal: () => void;
  hasActiveConversation?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onOpenProfileModal,
  hasActiveConversation = true,
}) => {
  const navItems = [
    { id: 'home' as ViewType, label: 'Home', icon: Home },
    { id: 'new-conversation' as ViewType, label: 'New Conversation', icon: MessageSquarePlus },
    { id: 'missions' as ViewType, label: 'Missions', icon: Target },
    ...(hasActiveConversation
      ? [
          {
            id: 'conversation' as ViewType,
            label: 'Conversations',
            icon: MessageSquare,
            badge: 'Live',
          },
        ]
      : []),
    { id: 'knowledge' as ViewType, label: 'Knowledge', icon: BookOpen },
    { id: 'tools' as ViewType, label: 'Tools', icon: Wrench },
    { id: 'integrations' as ViewType, label: 'Integrations', icon: Share2 },
    { id: 'activity' as ViewType, label: 'Activity', icon: Activity },
    { id: 'settings' as ViewType, label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a1120] text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="px-4.5 pt-6 pb-5 flex items-center justify-between border-b border-slate-800/40">
        <div className="flex items-center gap-2.5">
          <AmazonLogo dark={true} className="h-5.5" />
          <AlexaPlusBadge dark={true} />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-[#182844] text-white shadow-sm ring-1 ring-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className={isActive ? 'font-semibold text-white' : ''}>{item.label}</span>
              </div>

              {item.badge && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Footer Profile Pill */}
      <div className="p-3 border-t border-slate-800/60">
        <button
          onClick={onOpenProfileModal}
          className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 transition-all border border-slate-800/60 group text-left"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-sky-600 flex items-center justify-center font-bold text-xs text-white shadow-inner shrink-0 ring-2 ring-sky-500/30">
              SM
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-slate-200 truncate group-hover:text-white">
                Shanmukheswar
              </div>
              <div className="text-[11px] text-slate-400 font-medium">Pro Builder</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all shrink-0" />
        </button>
      </div>
    </aside>
  );
};
