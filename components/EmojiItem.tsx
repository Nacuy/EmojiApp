import { Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Emoji, decodeHtmlEntity } from '~/models/emoji';

interface Props {
  emoji: Emoji;
}

export function EmojiItem({ emoji }: Props) {
  const router = useRouter();

  return (
    <Pressable
      className="flex-1 aspect-square my-1 mx-1 items-center justify-center bg-white rounded-xl p-2 shadow-md active:scale-95 active:opacity-80"
      onPress={() => router.push({ pathname: '/details', params: { name: emoji.name } })}
    >
      <Text className="text-3xl">{decodeHtmlEntity(emoji.htmlCode[0])}</Text>
      <Text className="text-xs mt-1 text-center" numberOfLines={1}>{emoji.name}</Text>
    </Pressable>
  );
}

