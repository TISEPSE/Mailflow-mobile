import React, { useState } from 'react';
import { Icon } from './Icon';

interface TrainingScheduleSheetProps {
  isOpen: boolean;
  trainingId: string | null;
  currentDay?: string;
  currentHour?: string;
  onClose: () => void;
  onSaveSchedule: (id: string, day: string, hour: string) => void;
}

const DAYS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const HOURS = ['08:00', '12:00', '18:00', '20:00'];

export const TrainingScheduleSheet: React.FC<TrainingScheduleSheetProps> = ({
  isOpen,
  trainingId,
  currentDay = 'vendredi',
  currentHour = '18:00',
  onClose,
  onSaveSchedule
}) => {
  const [day, setDay] = useState(currentDay);
  const [hour, setHour] = useState(currentHour);

  if (!isOpen || !trainingId) return null;

  const handleSave = () => {
    onSaveSchedule(trainingId, day, hour);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-t-3xl p-5 bg-[var(--card)] border-t border-[var(--line)] shadow-2xl animate-rise flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-[var(--line)] mx-auto" />

        <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]/50">
          <span className="text-xs font-bold text-[var(--fg)]">Programmation de l'archivage</span>
          <button
            onClick={handleSave}
            className="text-xs font-bold text-[var(--accent)]"
          >
            Valider
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold text-[var(--sub)] uppercase">Jour de la semaine</span>
          <div className="flex flex-wrap gap-1.5">
            {DAYS.map(d => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  day === d
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--sunk)] text-[var(--sub)]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold text-[var(--sub)] uppercase">Heure d'archivage</span>
          <div className="flex gap-2">
            {HOURS.map(h => (
              <button
                key={h}
                onClick={() => setHour(h)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                  hour === h
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--sunk)] text-[var(--sub)]'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-2xl bg-[var(--accent-soft)]/50 text-[11px] text-[var(--accent-fg)] font-medium">
          <Icon name="info" size={16} />
          <span>Ce message sera automatiquement déplacé vers les archives chaque {day} à {hour.replace(':', ' h ')}.</span>
        </div>
      </div>
    </div>
  );
};
