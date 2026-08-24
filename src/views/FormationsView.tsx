import React from 'react';
import { TrainingItem } from '../types';
import { Icon } from '../components/Icon';

interface FormationsViewProps {
  trainings: TrainingItem[];
  onToggleAutomation: (id: string) => void;
  onOpenScheduleSheet: (id: string) => void;
}

export const FormationsView: React.FC<FormationsViewProps> = ({
  trainings,
  onToggleAutomation,
  onOpenScheduleSheet
}) => {
  const soon = trainings.filter(t => t.soon);
  const later = trainings.filter(t => !t.soon);

  const renderGroup = (title: string, hint: string, items: TrainingItem[]) => {
    if (items.length === 0) return null;

    return (
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--sub)]">{title}</span>
          <span className="text-[11px] text-[var(--sub)]">{hint}</span>
        </div>

        <div className="rounded-3xl bg-[var(--card)] border border-[var(--line)]/60 overflow-hidden shadow-xs divide-y divide-[var(--line)]/50">
          {items.map((item) => (
            <div key={item.id} className="p-3.5 flex items-start gap-3.5 hover:bg-[var(--sunk)] transition-colors">
              {/* Date badge */}
              <div className="w-11 h-12 rounded-2xl bg-[var(--sunk)] border border-[var(--line)]/50 flex flex-col items-center justify-center flex-none">
                <span className="text-[10px] uppercase font-bold text-[var(--sub)] leading-none">{item.dayName}</span>
                <span className="text-sm font-bold text-[var(--fg)] leading-none mt-0.5">{item.dayNum}</span>
              </div>

              {/* Training Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[var(--sub)] uppercase">{item.org}</span>
                  <span className="text-[11px] text-[var(--sub)]">·</span>
                  <span className="text-[11px] font-medium text-[var(--accent)]">{item.kind}</span>
                </div>
                <div className="text-xs font-semibold text-[var(--fg)] mt-0.5 leading-snug">
                  {item.title}
                </div>
                <div className="text-[11.5px] text-[var(--sub)] mt-1 flex items-center gap-1">
                  <Icon name="schedule" size={14} />
                  <span>{item.when}</span>
                </div>
              </div>

              {/* Automation Toggle Switch */}
              <div className="flex flex-col items-end gap-1.5 flex-none pt-0.5">
                <button
                  onClick={() => onToggleAutomation(item.id)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    item.automated ? 'bg-[var(--accent)]' : 'bg-[var(--line)]'
                  }`}
                  aria-label="Automatiser le tri"
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                      item.automated ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                {item.automated && (
                  <button
                    onClick={() => onOpenScheduleSheet(item.id)}
                    className="text-[10px] text-[var(--accent)] font-medium underline flex items-center gap-0.5"
                  >
                    Horaires
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto mf-scroll px-3 pt-1 pb-20 flex flex-col gap-4">
      {/* Intro info box */}
      <div className="p-3.5 rounded-2xl bg-[var(--sunk)] border border-[var(--line)]/50 text-[11px] text-[var(--sub)] leading-relaxed">
        Activez l'interrupteur pour archiver automatiquement les notifications de rappel à l'horaire de votre choix.
      </div>

      {renderGroup('Cette semaine', `${soon.length} rappels`, soon)}
      {renderGroup('À venir', `${later.length} rappels`, later)}
    </div>
  );
};
