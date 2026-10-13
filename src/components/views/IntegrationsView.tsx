import React, { useState } from 'react';
import {
  Share2,
  Calendar,
  HardDrive,
  Mail,
  Book,
  MessageCircle,
  GitBranch,
  MapPin,
  Layout,
  CheckCircle2,
  Plus,
  ArrowRight,
  MoreVertical,
  Shield,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { IntegrationItem } from '../../types';
import { AmazonSmileSymbol } from '../common/BrandAssets';

interface IntegrationsViewProps {
  integrations: IntegrationItem[];
  onToggleConnect: (id: string) => void;
  onShowToast: (title: string, desc?: string) => void;
}

export const IntegrationsView: React.FC<IntegrationsViewProps> = ({
  integrations,
  onToggleConnect,
  onShowToast,
}) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [managingIntegration, setManagingIntegration] = useState<IntegrationItem | null>(null);

  const connectedCount = integrations.filter((i) => i.connected).length;
  const availableCount = integrations.length;

  const filters = [
    { id: 'All', label: 'All' },
    { id: 'Connected', label: `Connected (${connectedCount})` },
    { id: 'Available', label: `Available (${availableCount})` },
    { id: 'Productivity', label: 'Productivity' },
    { id: 'Knowledge', label: 'Knowledge' },
    { id: 'Communication', label: 'Communication' },
    { id: 'Data', label: 'Data' },
    { id: 'Development', label: 'Development' },
  ];

  const getIntegrationIcon = (name: string) => {
    switch (name) {
      case 'Calendar':
        return (
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
            31
          </div>
        );
      case 'HardDrive':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
            <HardDrive className="w-4 h-4" />
          </div>
        );
      case 'Mail':
        return (
          <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
            <span className="font-bold">M</span>
          </div>
        );
      case 'Book':
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            N
          </div>
        );
      case 'MessageCircle':
        return (
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
            <MessageCircle className="w-4 h-4" />
          </div>
        );
      case 'GitBranch':
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
            <GitBranch className="w-4 h-4" />
          </div>
        );
      case 'MapPin':
        return (
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
            <MapPin className="w-4 h-4" />
          </div>
        );
      case 'Layout':
        return (
          <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">
            <Layout className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
        );
    }
  };

  const filteredIntegrations = integrations.filter((item) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Connected') return item.connected;
    if (selectedFilter === 'Available') return true;
    return item.category === selectedFilter;
  });

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-900 flex flex-col overflow-y-auto px-6 py-6 select-none">
      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Integrations</h1>
            <p className="text-xs text-slate-500">
              Connect your data, tools, and services to give Alexa+ more capabilities.
            </p>
          </div>
        </div>

        {/* Hero Banner: Bring your world together */}
        <div className="bg-[#0b1528] rounded-2xl p-6 sm:p-7 text-white relative overflow-hidden border border-slate-800 shadow-md">
          <div className="max-w-xl z-10 relative">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight">
              Bring your world together.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
              Connect your favorite tools and services so Alexa+ can work across your data and take meaningful actions.
            </p>
            <button
              onClick={() => onShowToast('Integration Directory', 'Showing all available OAuth-compliant connectors.')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all backdrop-blur-xs group"
            >
              <span>Explore integrations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right graphics: Official Amazon Smile */}
          <div className="hidden md:block absolute right-6 bottom-4 z-10">
            <AmazonSmileSymbol className="w-56 h-12" glow={true} />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {filters.map((fil) => (
            <button
              key={fil.id}
              onClick={() => setSelectedFilter(fil.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors shrink-0 ${
                selectedFilter === fil.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {fil.label}
            </button>
          ))}
        </div>

        {/* Grid of Integration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIntegrations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getIntegrationIcon(item.iconName)}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setManagingIntegration(item)}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">
                  {item.description}
                </p>
              </div>

              {/* Status and Action Row */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.connected ? 'bg-emerald-500' : 'bg-slate-300'
                    }`}
                  />
                  <span
                    className={`text-[11px] font-medium ${
                      item.connected ? 'text-emerald-700 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    {item.connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>

                {item.connected ? (
                  <button
                    onClick={() => setManagingIntegration(item)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Manage →
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onToggleConnect(item.id);
                      onShowToast('Connected Successfully', `${item.name} is now connected to Alexa+.`);
                    }}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    Connect →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integration Management Modal */}
      {managingIntegration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              {getIntegrationIcon(managingIntegration.iconName)}
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {managingIntegration.name}
                </h3>
                <span
                  className={`text-xs font-medium ${
                    managingIntegration.connected ? 'text-emerald-600' : 'text-slate-500'
                  }`}
                >
                  {managingIntegration.connected ? 'Connected & Active' : 'Not Connected'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              {managingIntegration.description}
            </p>

            {managingIntegration.permissions && (
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs mb-4">
                <span className="font-semibold text-slate-800 block mb-1.5 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-sky-600" />
                  Granted Scopes & Permissions:
                </span>
                <ul className="space-y-1 text-slate-600">
                  {managingIntegration.permissions.map((p, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  onToggleConnect(managingIntegration.id);
                  onShowToast(
                    managingIntegration.connected ? 'Disconnected' : 'Connected',
                    `${managingIntegration.name} status updated.`
                  );
                  setManagingIntegration(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                  managingIntegration.connected
                    ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {managingIntegration.connected ? 'Disconnect Service' : 'Authorize & Connect'}
              </button>

              <button
                onClick={() => setManagingIntegration(null)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
