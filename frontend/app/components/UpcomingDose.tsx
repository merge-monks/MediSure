import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MedicationCard from './MedicationCard';

interface Medication {
  name: string;
  dosage: string;
  icon: string;
  status: string;
}

interface UpcomingDoseProps {
  medications: Medication[];
  time: string;
}

const UpcomingDose: React.FC<UpcomingDoseProps> = ({ medications, time }) => {
  return (
    <View style={styles.nextDose}>
      <View style={styles.nextDoseTitle}>
        <Text style={styles.nextDoseHeading}>Upcoming Dose</Text>
        <LinearGradient
          colors={['#4361ee', '#3a0ca3']}
          style={styles.timePill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.timePillText}>{time}</Text>
        </LinearGradient>
      </View>

      {medications.map((medication, index) => (
        <MedicationCard key={index} medication={medication} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  nextDose: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 24,
    marginHorizontal: 20,
    marginTop: -40,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  nextDoseTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nextDoseHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  timePill: {
    borderRadius: 24,
    padding: 6,
    paddingHorizontal: 14,
    shadowColor: '#4361ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  timePillText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default UpcomingDose;
