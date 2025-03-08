import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

interface Pill {
  name: string;
  dotColor: string;
}

export interface TimeSlotData {
  id: string;
  time: string;
  title: string;
  pills: Pill[];
  completed?: boolean;
  missed?: boolean;
  showOptions?: boolean;
}

interface TimeSlotProps {
  slot: TimeSlotData;
  onToggleOptions: (id: string) => void;
  onUpdateStatus: (id: string, status: 'taken' | 'missed') => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({
  slot,
  onToggleOptions,
  onUpdateStatus,
}) => {
  const cardStyle = [
    styles.timeCard,
    slot.completed && styles.completedCard,
    slot.missed && styles.missedCard,
  ];
  const dropdownAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(dropdownAnim, {
        toValue: slot.showOptions ? 1 : 0,
        duration: 250,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: slot.showOptions ? 1.03 : 1,
          duration: 150,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, [slot.showOptions]);

  const dropdownStyle = {
    opacity: dropdownAnim,
    transform: [
      {
        translateY: dropdownAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-20, 0],
        }),
      },
      {
        scale: dropdownAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1],
        }),
      }
    ],
  };

  const cardAnimStyle = {
    transform: [{ scale: scaleAnim }]
  };

  return (
    <View style={styles.timeSlot}>
      <View style={styles.timeIndicator}>
        <Text style={styles.timeText}>{slot.time}</Text>
        <View style={styles.timeLine}>
          <View
            style={[
              styles.timeCircle,
              slot.completed && styles.completedCircle,
              slot.missed && styles.missedCircle,
            ]}
          />
        </View>
      </View>

      <View style={styles.slotContainer}>
        {/* <Animated.View style={cardAnimStyle}> */}
          <TouchableOpacity
            style={cardStyle}
            activeOpacity={0.8}
            onPress={() => onToggleOptions(slot.id)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.timeCardTitle}>{slot.title}</Text>
              {slot.completed && (
                <View style={styles.statusIndicator}>
                  <Text style={styles.statusText}>Taken ✓</Text>
                </View>
              )}
              {slot.missed && (
                <View style={[styles.statusIndicator, styles.missedIndicator]}>
                  <Text style={styles.statusText}>Missed ✗</Text>
                </View>
              )}
            </View>

            <View style={styles.pills}>
              {slot.pills.map((pill, pillIndex) => (
                <View key={pillIndex} style={styles.pill}>
                  <View
                    style={[
                      styles.pillDot,
                      pill.dotColor === 'blue' && styles.blueDot,
                      pill.dotColor === 'red' && styles.redDot,
                      pill.dotColor === 'green' && styles.greenDot,
                    ]}
                  />
                  <Text style={styles.pillText}>{pill.name}</Text>
                </View>
              ))}
            </View>
          </TouchableOpacity>
{/*         </Animated.View> */}

        {/* Dropdown options */}
        {slot.showOptions && (
          <Animated.View style={[styles.optionsDropdown, dropdownStyle]}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => onUpdateStatus(slot.id, 'taken')}
            >
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.optionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.optionContent}>
                  <View style={styles.checkIcon}>
                    <Text style={styles.iconText}>✓</Text>
                  </View>
                  <Text style={styles.optionText}>Mark as Taken</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => onUpdateStatus(slot.id, 'missed')}
            >
              <LinearGradient
                colors={['#ef4444', '#dc2626']}
                style={styles.optionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.optionContent}>
                  <View style={styles.missedIcon}>
                    <Text style={styles.iconText}>✗</Text>
                  </View>
                  <Text style={styles.optionText}>Mark as Missed</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeSlot: {
    flexDirection: 'row',
    marginBottom: 22,
  },
  timeIndicator: {
    alignItems: 'center',
    width: 60,
  },
  timeText: {
    fontWeight: '500',
    marginBottom: 10,
    color: '#64748b',
    fontSize: 14,
  },
  timeLine: {
    flex: 1,
    width: 2,
    backgroundColor: '#e2e8f0',
    alignItems: 'center',
  },
  timeCircle: {
    position: 'absolute',
    top: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4361ee',
    shadowColor: '#4361ee',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  completedCircle: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
  },
  missedCircle: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  timeCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
    marginLeft: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  completedCard: {},
  missedCard: {},
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  statusIndicator: {
    backgroundColor: '#10b981',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  missedIndicator: {
    backgroundColor: '#ef4444',
    shadowColor: '#ef4444',
  },
  statusText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  slotContainer: {
    flex: 1,
  },
  optionsDropdown: {
    marginLeft: 18,
    marginTop: 12,
    gap: 0,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  optionButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    elevation: 3,
    padding: 5,
  },
  optionGradient: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  missedIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  iconText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  optionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 15,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
    maxWidth: '100%',
  },
  pillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    flexShrink: 0,
  },
  blueDot: {
    backgroundColor: '#4361ee',
  },
  redDot: {
    backgroundColor: '#f72585',
  },
  greenDot: {
    backgroundColor: '#10b981',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#334155',
  },
});

export default TimeSlot;