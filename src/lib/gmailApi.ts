/**
 * Google Gmail REST API & OAuth Client for MailFlow Mobile
 * Performs real Google OAuth authentication and Gmail API interactions
 */

export interface GoogleUserProfile {
  email: string;
  name: string;
  picture?: string;
}

export interface ParsedGmailMessage {
  id: string;
  threadId: string;
  from: string;
  name: string;
  email: string;
  initials: string;
  subject: string;
  snippet: string;
  time: string;
  full: string;
  fullDate: string;
  unread: boolean;
  category: 'direct' | 'promo' | 'newsletter' | 'training';
  body: string[];
  tags: string[];
  logoBg: string;
  logoFg: string;
  summary: string;
}

const GMAIL_API_BASE = 'https://gmail.googleapis.com/gmail/v1/users/me';

// Base64Url decode helper
function decodeBase64Url(str: string): string {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return jsonPayload;
  } catch (e) {
    try {
      return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
    } catch {
      return str;
    }
  }
}

/**
 * Perform real Google OAuth2 Authentication via Web Popup / Redirect
 */
export function startGoogleOAuth(clientId?: string): Promise<{ token: string; profile: GoogleUserProfile }> {
  return new Promise((resolve, reject) => {
    const redirectUri = window.location.origin;
    const scope = encodeURIComponent(
      'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.send'
    );

    // Standard Google Implicit OAuth endpoint for web / webview clients
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      clientId || '1082987178942-mobilemailflow.apps.googleusercontent.com'
    }&response_type=token&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scope}&prompt=select_account`;

    // Listen for OAuth hash redirect
    const checkHash = async () => {
      if (window.location.hash && window.location.hash.includes('access_token')) {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = params.get('access_token');
        if (accessToken) {
          try {
            // Fetch real user profile from Google UserInfo endpoint
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` }
            });
            const profileData = await res.json();
            
            // Clean hash URL
            window.history.replaceState(null, '', window.location.pathname);
            
            resolve({
              token: accessToken,
              profile: {
                email: profileData.email,
                name: profileData.name || profileData.email.split('@')[0],
                picture: profileData.picture
              }
            });
            return;
          } catch (e) {
            reject(e);
            return;
          }
        }
      }
    };

    checkHash();

    // Open Google OAuth window/tab
    const oauthWindow = window.open(oauthUrl, 'GoogleOAuth', 'width=520,height=650');

    // Poll for completion or fallback modal prompt
    const timer = setInterval(async () => {
      if (window.location.hash.includes('access_token')) {
        clearInterval(timer);
        if (oauthWindow && !oauthWindow.closed) oauthWindow.close();
        await checkHash();
      } else if (oauthWindow && oauthWindow.closed) {
        clearInterval(timer);
      }
    }, 500);
  });
}

/**
 * Fetch real user messages directly from Google Gmail REST API
 */
export async function fetchRealGmailMessages(accessToken: string): Promise<ParsedGmailMessage[]> {
  try {
    // 1. List latest 25 messages from user's Gmail inbox
    const listRes = await fetch(`${GMAIL_API_BASE}/messages?maxResults=25&q=in:inbox`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    if (!listRes.ok) {
      throw new Error(`Gmail API error: ${listRes.statusText}`);
    }

    const listData = await listRes.json();
    if (!listData.messages || listData.messages.length === 0) {
      return [];
    }

    // 2. Fetch full message details for each message in parallel
    const fullMessages = await Promise.all(
      listData.messages.map(async (m: { id: string }) => {
        const msgRes = await fetch(`${GMAIL_API_BASE}/messages/${m.id}?format=full`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        return msgRes.json();
      })
    );

    // 3. Parse headers, body, categories and dates
    return fullMessages.map(msg => parseGmailMessageObject(msg));
  } catch (err) {
    console.error('Failed to fetch real Gmail messages', err);
    throw err;
  }
}

/**
 * Parse raw Google Gmail API JSON object into clean MailFlow structure
 */
function parseGmailMessageObject(msg: any): ParsedGmailMessage {
  const headers = msg.payload?.headers || [];

  const getHeader = (name: string) => {
    const found = headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase());
    return found ? found.value : '';
  };

  const fromHeader = getHeader('From');
  const subjectHeader = getHeader('Subject') || '(Sans objet)';
  const dateHeader = getHeader('Date');

  // Extract name and clean email from "Name <email@domain.com>"
  let fromName = fromHeader;
  let fromEmail = fromHeader;
  const emailMatch = fromHeader.match(/<([^>]+)>/);
  if (emailMatch) {
    fromEmail = emailMatch[1];
    fromName = fromHeader.replace(/<[^>]+>/, '').replace(/"/g, '').trim() || fromEmail;
  }

  // Initials
  const parts = fromName.trim().split(/\s+/);
  const initials = parts.length >= 2 
    ? (parts[0][0] + parts[1][0]).toUpperCase() 
    : fromName.slice(0, 2).toUpperCase();

  // Date formatting
  const dateObj = dateHeader ? new Date(dateHeader) : new Date();
  const timeStr = dateObj.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  const fullDateStr = dateObj.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

  // Body extraction
  let bodyText = msg.snippet || '';
  if (msg.payload?.parts) {
    const textPart = msg.payload.parts.find((p: any) => p.mimeType === 'text/plain');
    if (textPart && textPart.body?.data) {
      bodyText = decodeBase64Url(textPart.body.data);
    }
  } else if (msg.payload?.body?.data) {
    bodyText = decodeBase64Url(msg.payload.body.data);
  }

  const bodyParagraphs = bodyText
    .split('\n')
    .map((p: string) => p.trim())
    .filter((p: string) => p.length > 0);

  // Auto-Categorization Logic
  const labelIds: string[] = msg.labelIds || [];
  const isUnread = labelIds.includes('UNREAD');
  
  let category: ParsedGmailMessage['category'] = 'direct';
  const tags: string[] = [];

  const lowerFrom = fromEmail.toLowerCase();
  const lowerSub = subjectHeader.toLowerCase();
  const hasUnsubscribe = !!getHeader('List-Unsubscribe');

  if (labelIds.includes('CATEGORY_PROMOTIONS') || lowerSub.includes('soldes') || (lowerSub.includes('-') && lowerSub.includes('%'))) {
    category = 'promo';
  } else if (hasUnsubscribe || lowerFrom.includes('newsletter') || lowerFrom.includes('digest') || lowerFrom.includes('tech') || lowerFrom.includes('tldr')) {
    category = 'newsletter';
    if (lowerSub.includes('ai') || lowerSub.includes('ia') || lowerSub.includes('llm')) tags.push('#IA');
    if (lowerSub.includes('tech') || lowerSub.includes('code') || lowerSub.includes('dev')) tags.push('#Tech');
    if (lowerSub.includes('eco') || lowerSub.includes('finance') || lowerSub.includes('bourse')) tags.push('#Économie');
    if (lowerSub.includes('design') || lowerSub.includes('ui') || lowerSub.includes('ux')) tags.push('#Design');
    if (tags.length === 0) tags.push('#Tech');
  } else if (lowerSub.includes('formation') || lowerSub.includes('cours') || lowerSub.includes('webinaire') || lowerFrom.includes('udemy') || lowerFrom.includes('coursera')) {
    category = 'training';
  }

  return {
    id: msg.id,
    threadId: msg.threadId,
    from: fromName,
    name: fromName,
    email: fromEmail,
    initials,
    subject: subjectHeader,
    snippet: msg.snippet || bodyText.slice(0, 100),
    time: timeStr,
    full: fullDateStr,
    fullDate: fullDateStr,
    unread: isUnread,
    category,
    body: bodyParagraphs.length > 0 ? bodyParagraphs : [msg.snippet || 'Pas de contenu textuel.'],
    tags,
    logoBg: '#0B57D0',
    logoFg: '#FFFFFF',
    summary: msg.snippet || bodyText.slice(0, 140) + '…'
  };
}

/**
 * Send real email via Google Gmail REST API
 */
export async function sendRealGmailMessage(
  accessToken: string,
  to: string,
  subject: string,
  body: string
): Promise<void> {
  const emailLines = [
    `To: ${to}`,
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    body
  ];

  const rawMessage = btoa(unescape(encodeURIComponent(emailLines.join('\r\n'))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch(`${GMAIL_API_BASE}/messages/send`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ raw: rawMessage })
  });

  if (!res.ok) {
    throw new Error(`Erreur envoi Gmail: ${res.statusText}`);
  }
}

/**
 * Trash real message on Google Gmail servers
 */
export async function trashRealGmailMessage(accessToken: string, messageId: string): Promise<void> {
  await fetch(`${GMAIL_API_BASE}/messages/${messageId}/trash`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` }
  });
}

/**
 * Archive real message on Google Gmail servers (Remove INBOX label)
 */
export async function archiveRealGmailMessage(accessToken: string, messageId: string): Promise<void> {
  await fetch(`${GMAIL_API_BASE}/messages/${messageId}/batchModify`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ids: [messageId],
      removeLabelIds: ['INBOX']
    })
  });
}
