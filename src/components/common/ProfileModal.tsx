import React from 'react';
import { Award, Calendar, MapPin, X, Settings, ArrowRight, ShieldCheck } from 'lucide-react';
import { ViewType } from '../../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewType) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            User Account
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3.5 my-4">
          <div className="w-12 h-12 rounded-full bg-sky-600 text-white font-bold text-base flex items-center justify-center shadow-md ring-4 ring-sky-50">
            SM
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Shanmukheswar</h3>
            <span className="text-xs font-semibold text-sky-600">Pro Builder</span>
            <span className="text-[11px] text-slate-400 block">
              shanmukheswar@example.com
            </span>
          </div>
        </div>

        <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 mb-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <MapPin className="w-3.5 h-3.5" /> Location
            </span>
            <span className="font-medium text-slate-900">India</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3.5 h-3.5" /> Member Since
            </span>
            <span className="font-medium text-slate-900">Oct 2026</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Plan Status
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              Active Tier
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <button
            onClick={() => {
              onNavigate('settings');
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5" />
              <span>Manage Settings & Preferences</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
