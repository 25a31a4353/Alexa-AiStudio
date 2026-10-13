import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Upload,
  FileText,
  Lightbulb,
  Bookmark,
  Sparkles,
  ExternalLink,
  MoreVertical,
  Check,
  Calendar,
  Layers,
} from 'lucide-react';
import { DocumentItem } from '../../types';

interface KnowledgeViewProps {
  documents: DocumentItem[];
  onShowToast: (title: string, desc?: string) => void;
}

export const KnowledgeView: React.FC<KnowledgeViewProps> = ({
  documents,
  onShowToast,
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || 'doc-1');
  const [activeTab, setActiveTab] = useState<'Summary' | 'Key Insights' | 'Action Items' | 'Related Content' | 'Metadata'>('Summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [docList, setDocList] = useState<DocumentItem[]>(documents);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const selectedDoc = docList.find((d) => d.id === selectedDocId) || docList[0];

  const filteredDocs = docList.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' ||
      (categoryFilter === 'Documents' && (doc.type === 'pdf' || doc.type === 'docx')) ||
      (categoryFilter === 'Notes' && doc.category === 'Notes') ||
      (categoryFilter === 'Meetings' && doc.category === 'Meeting') ||
      (categoryFilter === 'Reports' && doc.category === 'Research') ||
      (categoryFilter === 'Links' && false);
    return matchesSearch && (categoryFilter === 'All' ? true : matchesCategory);
  });

  const toggleActionItem = (itemId: string) => {
    setDocList((prev) =>
      prev.map((doc) => {
        if (doc.id === selectedDoc.id) {
          return {
            ...doc,
            actionItems: doc.actionItems.map((act) =>
              act.id === itemId ? { ...act, done: !act.done } : act
            ),
          };
        }
        return doc;
      })
    );
  };

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploadModalOpen(false);
    onShowToast('Document Uploaded', 'New document added to knowledge repository and indexed.');
  };

  return (
    <div className="flex-1 bg-[#f8fafc] text-slate-900 flex flex-col overflow-y-auto px-6 py-6 select-none">
      <div className="max-w-6xl w-full mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Knowledge</h1>
              <p className="text-xs text-slate-500">
                Find, analyze, and work with your documents, information, and past insights.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Document</span>
          </button>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              icon: Search,
              title: 'Search & Retrieve',
              desc: 'Find relevant documents and information.',
              color: 'text-sky-600 bg-sky-50 border-sky-100',
            },
            {
              icon: FileText,
              title: 'Analyze Documents',
              desc: 'Extract key insights and summaries.',
              color: 'text-purple-600 bg-purple-50 border-purple-100',
            },
            {
              icon: Lightbulb,
              title: 'Find Insights',
              desc: 'Discover important information and trends.',
              color: 'text-amber-600 bg-amber-50 border-amber-100',
            },
            {
              icon: Bookmark,
              title: 'Saved Knowledge',
              desc: 'Access your saved context and insights.',
              color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
            },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex items-start gap-3"
              >
                <div className={`p-2 rounded-xl border ${feat.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{feat.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search Knowledge Bar */}
        <div className="flex items-center gap-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-1.5 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20 transition-all">
          <div className="flex-1 flex items-center gap-2 px-3">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents, notes, or past insights..."
              className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none py-1.5"
            />
          </div>
          <button
            onClick={() => onShowToast('Search Executed', `Searched for "${searchQuery}"`)}
            className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 transition-colors shadow-xs"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {['All', 'Documents', 'Notes', 'Meetings', 'Reports', 'Links'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Split View: Left List, Right Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Recent Documents List */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900">Recent Documents</h3>
              <button
                onClick={() => setCategoryFilter('All')}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700"
              >
                View all →
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => {
                const isSelected = doc.id === selectedDoc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors ${
                      isSelected ? 'bg-sky-50/60 border-l-4 border-l-sky-600' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div
                        className={`p-2 rounded-lg shrink-0 ${
                          doc.type === 'pdf'
                            ? 'bg-rose-50 text-rose-600 border border-rose-200'
                            : doc.type === 'docx'
                            ? 'bg-blue-50 text-blue-600 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        }`}
                      >
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-slate-900 truncate">
                          {doc.title}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {doc.type.toUpperCase()} · {doc.pages || 10} pages
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {doc.category}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">{doc.date}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Selected Document Detail Inspector */}
          {selectedDoc && (
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
              {/* Doc Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{selectedDoc.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedDoc.type.toUpperCase()} · {selectedDoc.pages || 12} pages · {selectedDoc.size}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onShowToast('Document Opened', selectedDoc.title)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => onShowToast('AI Summarization', `Generating smart summary for ${selectedDoc.title}...`)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                    <span>Summarize</span>
                  </button>
                  <button
                    onClick={() => onShowToast('Options', selectedDoc.title)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-semibold">
                {(['Summary', 'Key Insights', 'Action Items', 'Related Content', 'Metadata'] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 py-1 rounded-lg transition-colors ${
                        activeTab === tab
                          ? 'bg-sky-50 text-sky-700 font-bold'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              {/* Tab: Summary */}
              {activeTab === 'Summary' && (
                <div className="space-y-4 pt-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-sky-600" />
                      <h4 className="text-xs font-bold text-slate-900">Document Summary</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {selectedDoc.summary}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <h4 className="text-xs font-bold text-slate-900">Key Insights</h4>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600 pl-1">
                      {selectedDoc.insights.map((ins, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-sky-500 font-bold">•</span>
                          <span>{ins}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <h4 className="text-xs font-bold text-slate-900">Action Items</h4>
                    </div>
                    <div className="space-y-2">
                      {selectedDoc.actionItems.map((act) => (
                        <label
                          key={act.id}
                          className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900 select-none p-1.5 rounded-lg hover:bg-slate-50"
                        >
                          <input
                            type="checkbox"
                            checked={act.done}
                            onChange={() => toggleActionItem(act.id)}
                            className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 w-3.5 h-3.5"
                          />
                          <span className={act.done ? 'line-through text-slate-400' : ''}>
                            {act.text}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Key Insights */}
              {activeTab === 'Key Insights' && (
                <div className="space-y-2 pt-1 text-xs">
                  {selectedDoc.insights.map((ins, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                        {i + 1}
                      </span>
                      <span>{ins}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Action Items */}
              {activeTab === 'Action Items' && (
                <div className="space-y-2 pt-1">
                  {selectedDoc.actionItems.map((act) => (
                    <div
                      key={act.id}
                      onClick={() => toggleActionItem(act.id)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 border border-slate-100 cursor-pointer flex items-center justify-between text-xs"
                    >
                      <span className={act.done ? 'line-through text-slate-400' : 'text-slate-800'}>
                        {act.text}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${act.done ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                        {act.done ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Related Content */}
              {activeTab === 'Related Content' && (
                <div className="space-y-2 pt-1 text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-semibold text-slate-800 block mb-1">Connected Workspace Pages</span>
                    <p>Referenced in Notion note: "Q4 Roadmap Strategy & Go-To-Market Alignment".</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-semibold text-slate-800 block mb-1">Calendar Attachments</span>
                    <p>Attached to tomorrow's meeting "Product Roadmap Discussion" (10:00 AM).</p>
                  </div>
                </div>
              )}

              {/* Tab: Metadata */}
              {activeTab === 'Metadata' && (
                <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">File Size</span>
                    <span className="font-semibold text-slate-800">{selectedDoc.size}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Page Count</span>
                    <span className="font-semibold text-slate-800">{selectedDoc.pages} pages</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Category</span>
                    <span className="font-semibold text-slate-800">{selectedDoc.category}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block">Indexed Date</span>
                    <span className="font-semibold text-slate-800">{selectedDoc.date}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-1">Upload to Knowledge Base</h3>
            <p className="text-xs text-slate-500 mb-4">
              Supported formats: PDF, DOCX, XLSX, TXT, CSV (up to 50MB)
            </p>

            <form onSubmit={handleSimulateUpload} className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-6 text-center cursor-pointer bg-slate-50/50">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <span className="text-xs font-semibold text-slate-700 block">
                  Click to browse or drag and drop files here
                </span>
                <span className="text-[11px] text-slate-400">PDF, Word, or Markdown documents</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                >
                  Upload & Index
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
