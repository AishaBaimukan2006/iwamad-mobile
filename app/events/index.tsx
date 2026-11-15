import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import EventRow from '../../src/components/EventRow';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [query, setQuery] = useState('');

  function toggleSaved(id: number) {
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  if (isPending) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading events</Text>
      </ScrollView>
    );
  }

  if (isError) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.center}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.button}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </ScrollView>
    );
  }

  const visibleEvents = (data ?? []).filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
      data={visibleEvents}
      keyExtractor={(e) => String(e.id)}
      refreshing={isRefetching}
      onRefresh={() => refetch()}
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
  center: {
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
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