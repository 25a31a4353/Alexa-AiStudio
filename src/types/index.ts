export type ViewType =
  | 'home'
  | 'new-conversation'
  | 'conversation'
  | 'missions'
  | 'knowledge'
  | 'tools'
  | 'integrations'
  | 'activity'
  | 'settings';

export interface DocumentItem {
  id: string;
  title: string;
  type: 'pdf' | 'docx' | 'sheet' | 'notes';
  pages?: number;
  size: string;
  category: 'Meeting' | 'Research' | 'Data' | 'Notes' | 'Planning';
  date: string;
  summary: string;
  insights: string[];
  actionItems: { id: string; text: string; done: boolean }[];
  relevance?: 'High' | 'Medium' | 'Low';
}

export interface ToolItem {
  id: string;
  title: string;
  description: string;
  category: 'Knowledge' | 'Planning' | 'Context' | 'Data' | 'External Services' | 'Verification';
  iconName: string;
  usageCount: number;
  status: 'active' | 'ready';
}

export interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  category: 'Productivity' | 'Knowledge' | 'Communication' | 'Data' | 'Development';
  connected: boolean;
  iconName: string;
  permissions?: string[];
  lastSync?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'Conversation' | 'Tool' | 'Integration' | 'Mission' | 'Knowledge';
  iconName: string;
}

export interface ExecutionStep {
  id: string;
  label: string;
  duration?: string;
  status: 'completed' | 'in_progress' | 'pending';
  details?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}
