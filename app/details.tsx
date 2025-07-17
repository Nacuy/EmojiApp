import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEmojiStore } from '~/store/emojiStore';
import { decodeHtmlEntity } from '~/models/emoji';

export default function Details() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const emojis = useEmojiStore(state => state.emojis);
  const emojiDetails = emojis.find(e => e.name === name);

  if (!emojiDetails) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Loading emoji...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 24, alignItems: 'center', backgroundColor: '#fff' }}>
      <Text className="text-[96px] mb-4">
        {decodeHtmlEntity(emojiDetails.htmlCode[0])}
      </Text>
      <Text className="text-2xl font-semibold mb-6">{emojiDetails.name}</Text>

      <Text className="text-sm font-bold self-start mt-3">Category:</Text>
      <Text className="text-base mb-2 self-start">{emojiDetails.category}</Text>

      <Text className="text-sm font-bold self-start mt-3">Unicode:</Text>
      <Text className="text-base mb-2 self-start">{emojiDetails.unicode.join(', ')}</Text>

      <Text className="text-sm font-bold self-start mt-3">HTML Code:</Text>
      <Text className="text-base mb-2 self-start">{emojiDetails.htmlCode.join(', ')}</Text>
    </ScrollView>
  );
}
