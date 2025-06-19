export function toBoldLatin(input: string): string {
  const map: Record<string, string> = {
    'č': 'c',
    'ć': 'c',
    'ž': 'z',
    'š': 's',
    'đ': 'dj',
    'Č': 'C',
    'Ć': 'C',
    'Ž': 'Z',
    'Š': 'S',
    'Đ': 'Dj',
  };

  return input.replace(/[čćžšđČĆŽŠĐ]/g, (char) => map[char] || char);
}