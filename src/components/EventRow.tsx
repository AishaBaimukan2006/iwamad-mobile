import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  saved?: boolean;
};

export default function EventRow({ event, onPress, onToggleSaved, saved = false }: EventRowProps) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>{event.date} · {event.place}</Text>
          {saved && <Animated.Text entering={ZoomIn} style={styles.saved}>★ Saved</Animated.Text>}
        </Pressable>
      </Swipeable>
    </Animated.View>
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
  action: {
    minHeight: 44,
    width: 96,
    marginLeft: 8,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});