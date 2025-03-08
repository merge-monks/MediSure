import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Medication {
  name: string;
  dosage: string;
  icon: string;
  status: string;
}

interface MedicationCardProps {
  medication: Medication;
}

const MedicationCard: React.FC<MedicationCardProps> = ({ medication }) => {
  return (
    <TouchableOpacity
      style={styles.medicationCard}
      activeOpacity={0.7}
    >
      <View style={styles.medIcon}>
        <Text style={styles.medIconText}>{medication.icon}</Text>
      </View>
      <View style={styles.medDetails}>
        <Text style={styles.medName}>{medication.name}</Text>
        <Text style={styles.medDosage}>{medication.dosage}</Text>
      </View>
      <LinearGradient
        colors={['#4361ee', '#3a0ca3']}
        style={styles.medStatus}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.medStatusText}>{medication.status}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  medicationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  medIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
    shadowColor: '#e0e7ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
  },
  medIconText: {
    fontSize: 22,
  },
  medDetails: {
    flex: 1,
  },
  medName: {
    fontWeight: '600',
    marginBottom: 5,
    fontSize: 16,
    color: '#1e293b',
  },
  medDosage: {
    fontSize: 14,
    color: '#64748b',
  },
  medStatus: {
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 14,
    shadowColor: '#4361ee',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  medStatusText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default MedicationCard;
