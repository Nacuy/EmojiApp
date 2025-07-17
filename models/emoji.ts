export interface Emoji {
  name: string;
  category: string;
  group: string;
  htmlCode: string[];
  unicode: string[];
}

export function decodeHtmlEntity(html: string) {
  return String.fromCodePoint(parseInt(html.replace('&#', '').replace(';', ''), 10));
}
