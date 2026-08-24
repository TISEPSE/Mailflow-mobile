import React, { useState, useEffect } from 'react';
import { useAppStore } from './lib/store';
import { AndroidFrame } from './components/AndroidFrame';
import { TopHeader } from './components/TopHeader';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { FloatingComposeButton } from './components/FloatingComposeButton';
import { AccountSwitcherSheet } from './components/AccountSwitcherSheet';
import { FolderPickerSheet } from './components/FolderPickerSheet';
import { TrainingScheduleSheet } from './components/TrainingScheduleSheet';

import { CourrierView } from './views/CourrierView';
import { PromosView } from './views/PromosView';
import { NewslettersView } from './views/NewslettersView';
import { FormationsView } from './views/FormationsView';
import { RulesView } from './views/RulesView';
import { MailReaderView } from './views/MailReaderView';
import { PromoReaderView } from './views/PromoReaderView';
import { DigestView } from './views/DigestView';
import { SettingsView } from './views/SettingsView';
import { ComposeView } from './views/ComposeView';
import { SearchView } from './views/SearchView';
import { RuleEditorView } from './views/RuleEditorView';
import { OnboardingView } from './views/OnboardingView';

import { Capacitor } from '@capacitor/core';

export const App: React.FC = () => {
  const { state, store } = useAppStore();
  const [selectedTrainingForSchedule, setSelectedTrainingForSchedule] = useState<string | null>(null);

  const isNative = Capacitor.isNativePlatform();

  // Set theme attributes on HTML root
  useEffect(() => {
    document.documentElement.setAttribute('data-mf', state.theme);
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  const currentAccount = state.accounts.find(a => a.email === state.account) || state.accounts[0];
  const isDark = state.theme === 'dark';

  const unreadMails = state.mails.filter(m => m.unread).length;
  const promosCount = state.promos.length;
  const newsCount = state.news.length;
  const trainingsCount = state.trainings.filter(t => !t.automated).length;

  const searchHints: Record<number, string> = {
    1: 'Rechercher un e-mail direct…',
    2: 'Rechercher une offre commerciale…',
    3: 'Rechercher une newsletter…',
    4: 'Rechercher un rappel de cours…',
    5: 'Rechercher une règle de tri…'
  };

  const selectedMail = state.selectedMailId
    ? state.mails.find(m => m.id === state.selectedMailId) || null
    : null;

  const selectedPromo = state.selectedPromoId
    ? state.promos.find(p => p.id === state.selectedPromoId) || null
    : null;

  const editingRule = state.editingRuleId
    ? state.rules.find(r => r.id === state.editingRuleId) || null
    : null;

  return (
    <div
      data-mf={state.theme}
      style={{
        // @ts-ignore
        '--accent': state.settings.accentColor,
        '--accent-soft': isDark ? '#0842A0' : '#D3E3FD',
        '--accent-fg': isDark ? '#A8C7FA' : '#0842A0'
      }}
      className="w-full h-full min-h-screen"
    >
      <AndroidFrame
        dark={isDark}
        enabled={!isNative && state.isFrameEnabled}
        onToggleFrame={() => store.setState({ isFrameEnabled: !state.isFrameEnabled })}
      >
        {/* Onboarding Wizard Screen */}
        {!state.onboarded ? (
          <OnboardingView
            accounts={state.accounts}
            syncPct={state.syncPct}
            syncStep={state.syncStep}
            onFinish={() => store.startSyncSimulation()}
          />
        ) : (
          <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[var(--side)] text-[var(--fg)]">
            
            {/* Top Search Bar (when on main tabs) */}
            {!state.screen && (
              <TopHeader
                currentAccount={currentAccount}
                searchHint={searchHints[state.tab] || 'Rechercher…'}
                isNative={isNative}
                onOpenSearch={() => store.setState({ screen: 'search' })}
                onOpenAccounts={() => store.setState({ acctOpen: true })}
              />
            )}

            {/* Main Tabs Navigation Body */}
            {!state.screen && (
              <div className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
                {state.tab === 1 && (
                  <CourrierView
                    mails={state.mails}
                    onOpenMail={store.openMail}
                    onTrashMail={store.trashMail}
                    onArchiveMail={store.archiveMail}
                  />
                )}

                {state.tab === 2 && (
                  <PromosView
                    promos={state.promos}
                    onOpenPromo={store.openPromo}
                    onTrashPromo={store.trashPromo}
                    onBlockAndTrash={store.blockAndTrashPromo}
                  />
                )}

                {state.tab === 3 && (
                  <NewslettersView
                    news={state.news}
                    selectedTag={state.tag}
                    onSelectTag={(tag) => store.setState({ tag })}
                    onOpenDigest={() => store.setState({ screen: 'digest' })}
                    onArchiveNewsletter={(item) => store.archiveMail(item.id, 'Newsletters')}
                    onTrashNewsletter={(item) => store.trashMail(item.id)}
                  />
                )}

                {state.tab === 4 && (
                  <FormationsView
                    trainings={state.trainings}
                    onToggleAutomation={store.toggleTrainingAutomation}
                    onOpenScheduleSheet={(id) => {
                      setSelectedTrainingForSchedule(id);
                      store.setState({ sheet: 'trainingSchedule' });
                    }}
                  />
                )}

                {state.tab === 5 && (
                  <RulesView
                    rules={state.rules}
                    onToggleRule={store.toggleRule}
                    onEditRule={(rule) => store.setState({ editingRuleId: rule.id, screen: 'newRule' })}
                    onCreateRule={() => store.setState({ editingRuleId: null, screen: 'newRule' })}
                  />
                )}

                {/* Floating Compose Button on Mail Tab */}
                {state.tab === 1 && (
                  <FloatingComposeButton
                    onClick={() => store.setState({ screen: 'compose', cpTo: '', cpSubject: '', cpBody: '' })}
                    isNative={isNative}
                    dark={isDark}
                  />
                )}
              </div>
            )}

            {/* Full-Screen Views */}
            {state.screen === 'mail' && (
              <MailReaderView
                mail={selectedMail}
                aiStatus={selectedMail ? state.aiSum[selectedMail.id] || 'idle' : 'idle'}
                onBack={() => store.setState({ screen: null, selectedMailId: null })}
                onArchive={store.archiveMail}
                onTrash={store.trashMail}
                onRequestAiSummary={store.requestAiSummary}
                onReply={(m) => store.setState({
                  screen: 'compose',
                  cpTo: m.email,
                  cpSubject: `Re: ${m.subject}`,
                  cpBody: `\n\n--- En réponse à ${m.from} ---\n${m.body.join('\n')}`
                })}
                onOpenFolderSheet={() => store.setState({ sheet: 'folder' })}
              />
            )}

            {state.screen === 'promo' && (
              <PromoReaderView
                promo={selectedPromo}
                onBack={() => store.setState({ screen: null, selectedPromoId: null })}
                onTrash={store.trashPromo}
                onBlockAndTrash={store.blockAndTrashPromo}
              />
            )}

            {state.screen === 'digest' && (
              <DigestView
                onBack={() => store.setState({ screen: null })}
              />
            )}

            {state.screen === 'settings' && (
              <SettingsView
                settings={state.settings}
                notif={state.notif}
                accounts={state.accounts}
                theme={state.theme}
                onBack={() => store.setState({ screen: null })}
                onUpdateSettings={(s) => store.setState({ settings: { ...state.settings, ...s } })}
                onUpdateNotif={(n) => store.setState({ notif: { ...state.notif, ...n } })}
                onToggleTheme={() => store.setState({ theme: state.theme === 'dark' ? 'light' : 'dark' })}
                onSetAccentColor={(color) => store.setState({
                  settings: { ...state.settings, accentColor: color }
                })}
                onLogout={() => {
                  store.setState({ onboarded: false, screen: null });
                  store.flash('Session déconnectée');
                }}
              />
            )}

            {state.screen === 'compose' && (
              <ComposeView
                initialTo={state.cpTo}
                initialSubject={state.cpSubject}
                initialBody={state.cpBody}
                onClose={() => store.setState({ screen: null })}
                onSend={(to, subject, body) => {
                  store.setState({ cpTo: to, cpSubject: subject, cpBody: body });
                  store.sendMail();
                }}
              />
            )}

            {state.screen === 'search' && (
              <SearchView
                mails={state.mails}
                promos={state.promos}
                news={state.news}
                onClose={() => store.setState({ screen: null })}
                onOpenMail={(id) => {
                  store.openMail(id);
                }}
                onOpenPromo={(id) => {
                  store.openPromo(id);
                }}
              />
            )}

            {state.screen === 'newRule' && (
              <RuleEditorView
                initialRule={editingRule}
                onClose={() => store.setState({ screen: null, editingRuleId: null })}
                onSave={store.saveRule}
                onDelete={store.deleteRule}
              />
            )}

            {/* Bottom Nav Bar (when on main tabs) */}
            {!state.screen && (
              <BottomNav
                currentTab={state.tab}
                onSelectTab={(tab) => store.setState({ tab })}
                unreadCount={unreadMails}
                promosCount={promosCount}
                newsCount={newsCount}
                trainingsCount={trainingsCount}
                isNative={isNative}
                dark={isDark}
              />
            )}

            {/* Global Floating Toast */}
            <Toast
              message={state.toast}
              onUndo={state.undoAction ? store.triggerUndo : undefined}
              dark={isDark}
            />

            {/* Bottom Sheets and Dialogs */}
            <AccountSwitcherSheet
              isOpen={state.acctOpen}
              currentAccount={currentAccount}
              accounts={state.accounts}
              onClose={() => store.setState({ acctOpen: false })}
              onSelectAccount={(email) => {
                store.setState({ account: email, acctOpen: false });
                store.flash(`Compte actif : ${email}`);
              }}
              onAddAccount={() => {
                store.setState({ acctOpen: false, onboarded: false });
              }}
              onOpenSettings={() => store.setState({ acctOpen: false, screen: 'settings' })}
            />

            <FolderPickerSheet
              isOpen={state.sheet === 'folder'}
              folders={state.folders}
              onClose={() => store.setState({ sheet: null })}
              onSelectFolder={(folderName) => {
                if (state.selectedMailId) {
                  store.archiveMail(state.selectedMailId, folderName);
                }
              }}
              onCreateFolder={(newFolder) => {
                store.setState({
                  folders: [...state.folders, [newFolder, 'folder']]
                });
                if (state.selectedMailId) {
                  store.archiveMail(state.selectedMailId, newFolder);
                }
              }}
            />

            <TrainingScheduleSheet
              isOpen={state.sheet === 'trainingSchedule'}
              trainingId={selectedTrainingForSchedule}
              currentDay={selectedTrainingForSchedule ? state.trainDays[selectedTrainingForSchedule] : undefined}
              currentHour={selectedTrainingForSchedule ? state.trainHours[selectedTrainingForSchedule] : undefined}
              onClose={() => store.setState({ sheet: null })}
              onSaveSchedule={(id, day, hour) => {
                store.setState({
                  trainDays: { ...state.trainDays, [id]: day },
                  trainHours: { ...state.trainHours, [id]: hour }
                });
                store.flash(`Archivage programmé : ${day} à ${hour.replace(':', ' h ')}`);
              }}
            />

          </div>
        )}
      </AndroidFrame>
    </div>
  );
};
