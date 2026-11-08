import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import EventRow from '../../src/components/EventRow';
import { events } from '../../src/data/events';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [query, setQuery] = useState('');

  const visibleEvents = events.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  function toggleSaved(id: number) {
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
      data={visibleEvents}
      keyExtractor={(e) => String(e.id)}
      ListHeaderComponent={
        <View>
          <TextInput
            style={styles.search}
            placeholder="Search events"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
          />
          <Text style={styles.hint}>Long-press an event to save it. Saved: {savedIds.length}</Text>
        </View>
      }
      renderItem={({ item }) => (
        <EventRow
          event={item}
          saved={savedIds.includes(item.id)}
          onPress={() => router.push(`/events/${item.id}`)}
          onLongPress={() => toggleSaved(item.id)}
        />
      )}
      ListEmptyComponent={<Text>No events match.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
  },
  search: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  hint: {
    marginBottom: 12,
  },
});