import React from 'react';
import { PromoMessage } from '../types';
import { Icon } from '../components/Icon';
import { SwipeableItem } from '../components/SwipeableItem';
import { getAvatarColor } from '../lib/utils';

interface PromosViewProps {
  promos: PromoMessage[];
  onOpenPromo: (id: string) => void;
  onTrashPromo: (id: string) => void;
  onBlockAndTrash: (id: string) => void;
}

export const PromosView: React.FC<PromosViewProps> = ({
  promos,
  onOpenPromo,
  onTrashPromo,
  onBlockAndTrash
}) => {
  if (promos.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-[var(--faint)] flex items-center justify-center text-[var(--sub)]">
          <Icon name="sell" size={32} />
        </div>
        <div className="text-base font-semibold text-[var(--fg)]">Aucune promotion</div>
        <p className="text-xs text-[var(--sub)] max-w-xs">
          Toutes les offres commerciales ont été nettoyées ou filtrées.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto mf-scroll px-3 pt-1 pb-20">
      {/* Banner info */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 mb-2.5 rounded-2xl bg-[var(--sunk)] border border-[var(--line)]/50 text-[11px] text-[var(--sub)]">
        <Icon name="auto_delete" size={18} className="text-amber-500 flex-none" />
        <span>Glissez vers la gauche pour supprimer ou bloquer un expéditeur commercial.</span>
      </div>

      <div className="rounded-3xl bg-[var(--card)] border border-[var(--line)]/60 overflow-hidden shadow-xs divide-y divide-[var(--line)]/50">
        {promos.map((promo, index) => {
          const [avatarBg, avatarFg] = getAvatarColor(index + 3);

          return (
            <SwipeableItem
              key={promo.id}
              onSwipeLeft={() => onTrashPromo(promo.id)}
              rightIcon="delete"
              rightLabel="Supprimer"
            >
              <div
                onClick={() => onOpenPromo(promo.id)}
                className="flex items-start gap-3.5 p-3.5 cursor-pointer hover:bg-[var(--sunk)] active:bg-[var(--faint)] transition-colors"
              >
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex-none flex items-center justify-center text-xs font-bold shadow-xs mt-0.5"
                  style={{ backgroundColor: avatarBg, color: avatarFg }}
                >
                  {promo.name.slice(0, 2).toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[var(--fg)] truncate">
                      {promo.name}
                    </span>
                    <span className="text-[11px] text-[var(--sub)] flex-none">
                      {promo.time}
                    </span>
                  </div>

                  <div className="text-xs font-medium text-[var(--fg)] truncate mt-0.5">
                    {promo.subject}
                  </div>

                  <div className="text-[11.5px] text-[var(--sub)] line-clamp-1 mt-0.5 leading-snug">
                    {promo.snippet}
                  </div>
                </div>

                {/* Quick block button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBlockAndTrash(promo.id);
                  }}
                  className="p-1.5 rounded-full text-[var(--sub)] hover:text-red-500 hover:bg-[var(--sunk)] active:scale-95 transition-all"
                  title="Bloquer & Supprimer"
                >
                  <Icon name="block" size={17} />
                </button>
              </div>
            </SwipeableItem>
          );
        })}
      </div>
    </div>
  );
};
