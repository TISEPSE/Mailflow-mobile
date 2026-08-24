import React, { useState } from 'react';
import { Icon } from './Icon';

interface FolderPickerSheetProps {
  isOpen: boolean;
  folders: [string, string][];
  onClose: () => void;
  onSelectFolder: (folderName: string) => void;
  onCreateFolder: (newFolderName: string) => void;
}

export const FolderPickerSheet: React.FC<FolderPickerSheetProps> = ({
  isOpen,
  folders,
  onClose,
  onSelectFolder,
  onCreateFolder
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  if (!isOpen) return null;

  const handleCreate = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] rounded-t-3xl p-5 bg-[var(--card)] border-t border-[var(--line)] shadow-2xl animate-rise"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-[var(--line)] mx-auto mb-4" />

        <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]/50">
          <span className="text-xs font-bold text-[var(--fg)]">Déplacer vers un libellé</span>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="text-xs font-semibold text-[var(--accent)] flex items-center gap-1"
          >
            <Icon name="create_new_folder" size={16} />
            <span>Nouveau</span>
          </button>
        </div>

        {isCreating && (
          <div className="py-3 flex items-center gap-2 border-b border-[var(--line)]/40">
            <input
              type="text"
              autoFocus
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Nom du nouveau libellé…"
              className="flex-1 text-xs text-[var(--fg)] bg-[var(--sunk)] border border-[var(--line)] px-3 py-2 rounded-xl outline-none"
            />
            <button
              onClick={handleCreate}
              className="px-3 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-bold"
            >
              Créer
            </button>
          </div>
        )}

        <div className="py-2 flex flex-col gap-1 max-h-60 overflow-y-auto mf-scroll">
          {folders.map(([name, iconName]) => (
            <button
              key={name}
              onClick={() => {
                onSelectFolder(name);
                onClose();
              }}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[var(--sunk)] active:bg-[var(--faint)] text-left w-full transition-colors cursor-pointer"
            >
              <Icon name={iconName || 'folder'} size={20} className="text-[var(--sub)]" />
              <span className="text-xs font-semibold text-[var(--fg)]">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
