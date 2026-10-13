import React, { useState } from 'react';
import {
  Settings,
  MapPin,
  Calendar,
  Award,
  ChevronRight,
  MessageSquare,
  Wrench,
  Bell,
  Palette,
  Database,
  Shield,
  Download,
  Trash2,
  Check,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { ViewType } from '../../types';

interface SettingsViewProps {
  onNavigate: (view: ViewType) => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<
    'Account' | 'Preferences' | 'Privacy & Data' | 'Connected Services' | 'Notifications' | 'Appearance'
  >('Account');

  const [userName, setUserName] = useState('Shanmukheswar');
  const [userEmail, setUserEmail] = useState('shanmukheswar@example.com');
  const [userCountry, setUserCountry] = useState('India');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('System');
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');

  const tabs = [
    'Account',
    'Preferences',
    'Privacy & Data',
    'Connected Services',
    'Notifications',
    'Appearance',
  ] as const;

  const planFeatures = [
    'Unlimited conversations',
    'Advanced tool access',
    'Priority processing',
    'Extended context memory',
    'Early access to new features',
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    onShowToast('Profile Updated', 'Your profile details have been saved.');
  };

  const handleExportData = () => {
    const data = JSON.stringify(
      {
        user: { name: userName, email: userEmail, plan: 'Pro Builder' },
        exportDate: new Date().toISOString(),
        version: 'Alexa+ Beta 1.0',
      },
      null,
      2
    );
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alexa_plus_export_${Date.now()}.json`;
    a.click();
    onShowToast('Export Started', 'Your conversation and profile data has been exported.');
  };

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-900 flex flex-col overflow-y-auto px-6 py-6 select-none">
      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Settings</h1>
            <p className="text-xs text-slate-500">
              Customize your Alexa+ experience, manage your data, and control your preferences.
            </p>
          </div>
        </div>

        {/* Sub-navigation tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Left Settings Sections */}
          <div className="lg:col-span-8 space-y-5">
            {/* 1. Profile Information Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Profile Information</h3>
                  <p className="text-xs text-slate-500">
                    Manage your account details and profile settings.
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-sky-600 hover:bg-sky-50 transition-colors"
                >
                  Edit Profile
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-sky-600 text-white font-bold text-sm flex items-center justify-center shadow-md ring-2 ring-sky-500/20">
                    SM
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{userName}</h4>
                    <span className="text-xs font-medium text-slate-500 block">Pro Builder</span>
                    <span className="text-xs text-slate-400">{userEmail}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 text-left sm:text-right">
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{userCountry}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Joined Oct 2026</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span className="font-semibold text-slate-900">Pro Builder Plan</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Preferences Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Preferences</h3>
                  <p className="text-xs text-slate-500">
                    Customize how Alexa+ works for you.
                  </p>
                </div>
                <button
                  onClick={() => onShowToast('Preferences Ready', 'Settings saved automatically.')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  Configure
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    icon: MessageSquare,
                    title: 'Conversation Preferences',
                    desc: 'Set response style, language, and conversation behavior.',
                    color: 'text-sky-600 bg-sky-50 border-sky-100',
                  },
                  {
                    icon: Wrench,
                    title: 'Tool Preferences',
                    desc: 'Manage default tools and automation settings.',
                    color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
                  },
                  {
                    icon: Bell,
                    title: 'Notification Preferences',
                    desc: 'Choose what updates and reminders you want to receive.',
                    color: 'text-amber-600 bg-amber-50 border-amber-100',
                  },
                  {
                    icon: Palette,
                    title: 'Appearance',
                    desc: 'Customize theme, font size, and interface preferences.',
                    color: 'text-purple-600 bg-purple-50 border-purple-100',
                  },
                ].map((pref, i) => {
                  const Icon = pref.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => onShowToast('Preference Clicked', pref.title)}
                      className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-left transition-colors flex items-start justify-between group"
                    >
                      <div className="flex items-start gap-2.5 min-w-0 pr-2">
                        <div className={`p-2 rounded-lg border ${pref.color} shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                            {pref.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                            {pref.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-transform shrink-0 mt-2" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Privacy & Data Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Privacy & Data</h3>
                  <p className="text-xs text-slate-500">
                    Manage your data, history, and privacy settings.
                  </p>
                </div>
                <button
                  onClick={() => onShowToast('Privacy Dashboard', 'All encrypted at rest.')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  Manage
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    icon: Database,
                    title: 'Conversation History',
                    desc: 'View, manage, or delete your conversation data.',
                    color: 'text-sky-600 bg-sky-50 border-sky-100',
                  },
                  {
                    icon: Shield,
                    title: 'Data Controls',
                    desc: 'Manage data usage and retention settings.',
                    color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
                  },
                  {
                    icon: Download,
                    title: 'Export Data',
                    desc: 'Download your data and insights.',
                    color: 'text-blue-600 bg-blue-50 border-blue-100',
                    action: handleExportData,
                  },
                  {
                    icon: Trash2,
                    title: 'Delete Data',
                    desc: 'Remove your data from Alexa+.',
                    color: 'text-rose-600 bg-rose-50 border-rose-100',
                    action: () =>
                      onShowToast(
                        'Data Purge Requested',
                        'A confirmation email has been dispatched.'
                      ),
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={i}
                      onClick={item.action || (() => onShowToast('Data Control', item.title))}
                      className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-left transition-colors flex items-start justify-between group"
                    >
                      <div className="flex items-start gap-2.5 min-w-0 pr-2">
                        <div className={`p-2 rounded-lg border ${item.color} shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-transform shrink-0 mt-2" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column Summary Cards */}
          <div className="lg:col-span-4 space-y-5">
            {/* Account Plan Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 text-sm">👑</span>
                  <h3 className="text-xs font-bold text-slate-900">Account Plan</h3>
                </div>
                <button
                  onClick={() => onShowToast('Subscription', 'Pro Builder Tier active.')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  Manage Plan
                </button>
              </div>

              <div className="p-3.5 bg-sky-50/40 rounded-xl border border-sky-100 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sky-600 font-bold">🪄</span>
                  <h4 className="text-xs font-bold text-slate-900">Pro Builder</h4>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Access all tools, integrations, and advanced capabilities.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                {planFeatures.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 font-bold" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connected Services Quick List */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-900">Connected Services</h3>
                <button
                  onClick={() => onNavigate('integrations')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700"
                >
                  Manage
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { name: 'Google Calendar', connected: true },
                  { name: 'Google Drive', connected: true },
                  { name: 'Gmail', connected: true },
                  { name: 'Notion', connected: false },
                  { name: 'Slack', connected: false },
                ].map((s, i) => (
                  <div
                    key={i}
                    onClick={() => onNavigate('integrations')}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <span className="font-medium text-slate-800">{s.name}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        s.connected
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {s.connected ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3">
                <button
                  onClick={() => onNavigate('integrations')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                >
                  <span>View All Integrations</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Danger Zone Card */}
            <div className="bg-white rounded-2xl border border-rose-200/80 p-5 shadow-xs">
              <div className="flex items-center gap-2 text-rose-600 mb-1">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="text-xs font-bold">Danger Zone</h3>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                These actions are permanent and cannot be undone.
              </p>

              <button
                onClick={() =>
                  onShowToast('Action Blocked', 'Account deletion requires 2FA confirmation.')
                }
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
              >
                <span>Delete Account</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Edit Profile Details</h3>
            <p className="text-xs text-slate-500 mb-4">
              Update how your profile appears across Alexa+.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Location</label>
                <input
                  type="text"
                  value={userCountry}
                  onChange={(e) => setUserCountry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
