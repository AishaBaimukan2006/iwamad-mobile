import { Pressable, StyleSheet, Text } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
  saved?: boolean;
};

export default function EventRow({ event, onPress, onLongPress, saved = false }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>{event.date} · {event.place}</Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cardPressed: {
    backgroundColor: '#bfdbfe',
    borderColor: '#2563eb',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  meta: {
    fontSize: 14,
    color: '#4b5563',
  },
  saved: {
    marginTop: 4,
    fontSize: 14,
  },
});