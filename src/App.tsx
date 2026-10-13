import React, { useState, useEffect } from 'react';
import { ViewType, ToastMessage } from './types';
import {
  INITIAL_DOCUMENTS,
  INITIAL_TOOLS,
  INITIAL_INTEGRATIONS,
  INITIAL_ACTIVITIES,
} from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { HomeView } from './components/views/HomeView';
import { NewConversationView } from './components/views/NewConversationView';
import { ConversationView } from './components/views/ConversationView';
import { MissionsView } from './components/views/MissionsView';
import { KnowledgeView } from './components/views/KnowledgeView';
import { ToolsView } from './components/views/ToolsView';
import { IntegrationsView } from './components/views/IntegrationsView';
import { ActivityView } from './components/views/ActivityView';
import { SettingsView } from './components/views/SettingsView';
import { CommandPalette } from './components/common/CommandPalette';
import { ProfileModal } from './components/common/ProfileModal';
import { ToastContainer } from './components/common/ToastContainer';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // State collections
  const [documents] = useState(INITIAL_DOCUMENTS);
  const [tools] = useState(INITIAL_TOOLS);
  const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

  // Global Command/Ctrl + K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleToggleConnectIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.connected;
          // Add to activity stream
          setActivities((actPrev) => [
            {
              id: `act-${Date.now()}`,
              title: item.name,
              description: nextState ? 'Connected to workspace' : 'Disconnected from workspace',
              timestamp: 'Just now',
              type: 'Integration',
              iconName: item.iconName,
            },
            ...actPrev,
          ]);
          return { ...item, connected: nextState };
        }
        return item;
      })
    );
  };

  const handleStartGoal = (promptText: string) => {
    showToast('Mission Initiated', promptText.slice(0, 50) + '...');
    setCurrentView('conversation');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-900 font-sans antialiased text-slate-800">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50">
        {/* Persistent Top Navigation Bar */}
        <TopHeader
          currentView={currentView}
          onOpenSearch={() => setIsCommandPaletteOpen(true)}
          onNavigate={setCurrentView}
        />

        {/* Dynamic View Router */}
        <main className="flex-1 flex overflow-hidden">
          {currentView === 'home' && (
            <HomeView onStartGoal={handleStartGoal} onNavigate={setCurrentView} />
          )}

          {currentView === 'new-conversation' && (
            <NewConversationView onStartGoal={handleStartGoal} />
          )}

          {currentView === 'conversation' && (
            <ConversationView onNavigate={setCurrentView} onShowToast={showToast} />
          )}

          {currentView === 'missions' && (
            <MissionsView onNavigate={setCurrentView} onShowToast={showToast} />
          )}

          {currentView === 'knowledge' && (
            <KnowledgeView documents={documents} onShowToast={showToast} />
          )}

          {currentView === 'tools' && (
            <ToolsView tools={tools} onNavigate={setCurrentView} onShowToast={showToast} />
          )}

          {currentView === 'integrations' && (
            <IntegrationsView
              integrations={integrations}
              onToggleConnect={handleToggleConnectIntegration}
              onShowToast={showToast}
            />
          )}

          {currentView === 'activity' && (
            <ActivityView
              activities={activities}
              onNavigate={setCurrentView}
              onShowToast={showToast}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView onNavigate={setCurrentView} onShowToast={showToast} />
          )}
        </main>
      </div>

      {/* Global Interactive Modals & Overlays */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={setCurrentView}
        documents={documents}
        tools={tools}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onNavigate={setCurrentView}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}
