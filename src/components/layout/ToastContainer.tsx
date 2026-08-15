import React from 'react';
import { useCareer } from '../../context/CareerContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCareer();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />,
        };

        const bgStyles = {
          success: 'bg-white dark:bg-zinc-900 border-emerald-500/30 text-zinc-900 dark:text-zinc-100 shadow-lg shadow-emerald-500/10',
          error: 'bg-white dark:bg-zinc-900 border-rose-500/30 text-zinc-900 dark:text-zinc-100 shadow-lg shadow-rose-500/10',
          warning: 'bg-white dark:bg-zinc-900 border-amber-500/30 text-zinc-900 dark:text-zinc-100 shadow-lg shadow-amber-500/10',
          info: 'bg-white dark:bg-zinc-900 border-indigo-500/30 text-zinc-900 dark:text-zinc-100 shadow-lg shadow-indigo-500/10',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border transition-all duration-300 transform translate-y-0 opacity-100 ${bgStyles[toast.type]}`}
          >
            <div className="flex items-center gap-3">
              {icons[toast.type]}
              <span className="text-sm font-medium">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
