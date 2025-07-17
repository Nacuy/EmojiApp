import { useEffect, useState } from 'react';
import { View, FlatList, Text, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { EmojiItem } from '~/components/EmojiItem';
import { Emoji } from '~/models/emoji';
import { getAllCategories, getAllEmojis, getRandomEmoji } from '~/api/emojiApi';
import { router } from 'expo-router';
import { useEmojiStore } from '~/store/emojiStore';

export default function Home() {
  const setEmojis = useEmojiStore(state => state.setEmojis);
  const allEmojis = useEmojiStore(state => state.emojis);

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredEmojis, setFilteredEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const emojis = await getAllEmojis();
        setEmojis(emojis);

        const cats = await getAllCategories();
        setCategories(cats);
      } catch (e) {
        console.error(e);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredEmojis(allEmojis);
    } else {
      setFilteredEmojis(allEmojis.filter(e => e.category === selectedCategory));
    }
  }, [allEmojis, selectedCategory]);

  async function toRandomEmoji() {
    const randomEmoji: Emoji = await getRandomEmoji();
    router.push({ pathname: '/details', params: { name: randomEmoji.name } });
  }

  return (
    <View className="flex-1 pt-10 px-4 bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-3">Emoji Grid</Text>

      <Pressable
        className="bg-blue-600 rounded-md py-2 px-4 mb-4"
        onPress={toRandomEmoji}
        android_ripple={{ color: '#2563eb' }}
      >
        <Text className="text-white font-semibold text-center">Random Emoji</Text>
      </Pressable>

      <Picker
        selectedValue={selectedCategory}
        onValueChange={value => setSelectedCategory(value)}
        style={{ marginBottom: 12, backgroundColor: 'white' }}
      >
        <Picker.Item label="All" value="All" />
        {categories.map(cat => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

      <FlatList
        data={filteredEmojis}
        numColumns={6}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item }) => <EmojiItem emoji={item} />}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
