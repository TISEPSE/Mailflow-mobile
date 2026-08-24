import React from 'react';
import { AutoRule, RuleCategory } from '../types';
import { Icon } from '../components/Icon';

interface RulesViewProps {
  rules: AutoRule[];
  onToggleRule: (id: string) => void;
  onEditRule: (rule: AutoRule) => void;
  onCreateRule: () => void;
}

const CATEGORY_CONFIG: Record<RuleCategory, { label: string; icon: string; color: string }> = {
  publicite: { label: 'Publicités', icon: 'delete_sweep', color: '#C5221F' },
  newsletter: { label: 'Newsletters', icon: 'auto_awesome', color: '#8E24AA' },
  formation: { label: 'Formations', icon: 'schedule', color: '#0F9D58' }
};

export const RulesView: React.FC<RulesViewProps> = ({
  rules,
  onToggleRule,
  onEditRule,
  onCreateRule
}) => {
  const getRuleActionText = (r: AutoRule) => {
    if (r.action === 'supprimer_toujours') return `Supprimer automatiquement tout de ${r.email}`;
    if (r.action === 'generer_resume_et_archiver') return `Résumer par IA puis archiver · ${r.email}`;
    return `Archiver chaque ${r.day || 'vendredi'} à ${(r.hour || '18:00').replace(':', ' h ')}`;
  };

  const categories: RuleCategory[] = ['publicite', 'newsletter', 'formation'];

  return (
    <div className="flex-1 overflow-y-auto mf-scroll px-3 pt-1 pb-20 flex flex-col gap-4">
      {/* Create rule button header */}
      <button
        onClick={onCreateRule}
        className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[var(--accent)] text-white font-semibold text-xs shadow-md active:scale-98 transition-all cursor-pointer"
      >
        <Icon name="add" size={20} />
        <span>Créer une nouvelle règle automatique</span>
      </button>

      {/* Grouped Rules by Category */}
      {categories.map((cat) => {
        const catRules = rules.filter(r => r.cat === cat);
        if (catRules.length === 0) return null;

        const config = CATEGORY_CONFIG[cat];
        const activeCount = catRules.filter(r => r.active).length;

        return (
          <div key={cat} className="flex flex-col gap-2">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--fg)]">
                  {config.label}
                </span>
                <span className="text-[11px] text-[var(--sub)] font-medium">
                  ({activeCount}/{catRules.length} actives)
                </span>
              </div>
            </div>

            <div className="rounded-3xl bg-[var(--card)] border border-[var(--line)]/60 overflow-hidden shadow-xs divide-y divide-[var(--line)]/50">
              {catRules.map((rule) => (
                <div
                  key={rule.id}
                  onClick={() => onEditRule(rule)}
                  className={`p-3.5 flex items-start gap-3.5 cursor-pointer hover:bg-[var(--sunk)] transition-colors ${
                    !rule.active ? 'opacity-50' : ''
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-none mt-0.5"
                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                  >
                    <Icon name={config.icon} size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-[var(--fg)] truncate">{rule.nom}</div>
                    <div className="text-[11.5px] text-[var(--sub)] leading-snug mt-0.5 line-clamp-2">
                      {getRuleActionText(rule)}
                    </div>
                  </div>

                  {/* Active Toggle Switch */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleRule(rule.id);
                    }}
                    className="flex-none pt-0.5"
                  >
                    <div
                      className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                        rule.active ? 'bg-[var(--accent)]' : 'bg-[var(--line)]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                          rule.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
