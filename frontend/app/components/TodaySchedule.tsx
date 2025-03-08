import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TimeSlot, { TimeSlotData } from './TimeSlot';

interface TodayScheduleProps {
  slots: TimeSlotData[];
  onToggleOptions: (id: string) => void;
  onUpdateStatus: (id: string, status: 'taken' | 'missed') => void;
}

const TodaySchedule: React.FC<TodayScheduleProps> = ({ 
  slots, 
  onToggleOptions, 
  onUpdateStatus 
}) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Today's Schedule</Text>
      <View style={styles.todaySchedule}>
        {slots.map((slot, index) => (
          <TimeSlot 
            key={index} 
            slot={slot} 
            onToggleOptions={onToggleOptions} 
            onUpdateStatus={onUpdateStatus} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    paddingHorizontal: 24,
    marginTop: 34,
    marginBottom: 18,
    fontSize: 19,
    fontWeight: '600',
    color: '#1e293b',
    letterSpacing: -0.5,
  },
  todaySchedule: {
    paddingHorizontal: 20,
  },
});

export default TodaySchedule;
