
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Image as ImageIcon, Video, Chrome, Globe, Monitor, Terminal } from 'lucide-react';
import { TestResult } from '../../types/database';
import { cn, formatDuration } from '../../lib/utils';
import StatusBadge from './StatusBadge';

interface RunTimelineProps {
  results: TestResult[];
}

const RunTimeline: React.FC<RunTimelineProps> = ({ results }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getBrowserIcon = (browser: string) => {
    switch (browser) {
      case 'chromium': return Chrome;
      case 'webkit': return Globe;
      default: return Monitor;
    }
  };

  return (
    <div className="space-y-4">
      {results.map((result, index) => {
        const isExpanded = expandedId === result.id;
        const BrowserIcon = getBrowserIcon(result.browser);

        return (
          <div key={result.id} className="relative pl-8">
            {/* Vertical Line */}
            {index !== results.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-[-20px] w-[2px] bg-slate-200"></div>
            )}
            
            {/* Status Indicator Dot */}
            <div className={cn(
              'absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10',
              result.status === 'passed' ? 'bg-emerald-500' : result.status === 'failed' ? 'bg-red-500' : 'bg-slate-300'
            )}>
            </div>

            <div className={cn(
              'bg-white border rounded-xl overflow-hidden transition-all',
              isExpanded ? 'shadow-md border-blue-200' : 'hover:border-slate-300 shadow-sm'
            )}>
              <div 
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : result.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <h4 className="font-semibold text-slate-900 text-sm">{result.test_name}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <BrowserIcon className="w-3 h-3" />
                        <span className="capitalize">{result.browser}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span>{formatDuration(result.duration)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <StatusBadge status={result.status as any} size="sm" />
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-slate-100 bg-slate-50/50">
                  {result.status === 'failed' && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Erro</label>
                        <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-xs font-mono text-red-700 whitespace-pre-wrap">
                          {result.error_message || 'Nenhum detalhe do erro disponível.'}
                        </div>
                      </div>

                      {result.stack_trace && (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stack Trace</label>
                          <div className="bg-slate-900 text-slate-300 p-3 rounded-lg text-[11px] font-mono overflow-x-auto max-h-40">
                            {result.stack_trace}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        {result.screenshot_url && (
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Screenshot</label>
                             <div className="group relative rounded-lg border border-slate-200 overflow-hidden cursor-zoom-in bg-white">
                               <img src={result.screenshot_url} alt="Test Failure" className="w-full h-32 object-cover" />
                               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                 <ImageIcon className="text-white w-6 h-6" />
                               </div>
                             </div>
                          </div>
                        )}
                        {result.video_url && (
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gravação</label>
                             <div className="flex items-center justify-center h-32 rounded-lg border border-slate-200 border-dashed bg-white text-blue-600 hover:text-blue-700 hover:bg-blue-50 cursor-pointer transition-colors">
                               <Video className="w-8 h-8" />
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {result.status === 'passed' && (
                    <div className="mt-4 text-xs text-slate-500 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5" />
                      O teste foi concluído com sucesso em todas as asserções.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RunTimeline;
