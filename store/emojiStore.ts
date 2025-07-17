import create from 'zustand';
import { Emoji } from '~/models/emoji';

interface EmojiState {
  emojis: Emoji[];
  setEmojis: (emojis: Emoji[]) => void;
}

export const useEmojiStore = create<EmojiState>((set) => ({
  emojis: [],
  setEmojis: (emojis) => set({ emojis }),
}));
