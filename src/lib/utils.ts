export const AVATAR_PALETTES = [
  ['#D3E3FD', '#0842A0'],
  ['#E9DCFB', '#5B2FA8'],
  ['#FDE3DC', '#B3502F'],
  ['#D7EDDC', '#1C5C39'],
  ['#FBE8C6', '#6B4A12'],
  ['#E6E6EC', '#444746']
];

export function getAvatarColor(index: number): [string, string] {
  return AVATAR_PALETTES[Math.abs(index) % AVATAR_PALETTES.length] as [string, string];
}

export function generateInitials(nameOrEmail: string): string {
  if (!nameOrEmail) return '?';
  const parts = nameOrEmail.trim().split(/[\s@._-]+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return nameOrEmail.slice(0, 2).toUpperCase();
}
