import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  time: string;
  status: 'pending' | 'taken';
}

interface UpcomingMedicinesProps {
  medicines: Medicine[];
}

const UpcomingMedicinesComponent: React.FC<UpcomingMedicinesProps> = ({
  medicines = [],
}) => {
  const pendingMedicines = medicines.filter((med) => med.status === 'pending');

  const groupByTime = () => {
    const timeGroups: Record<string, Medicine[]> = {};

    pendingMedicines.forEach((med) => {
      if (!timeGroups[med.time]) {
        timeGroups[med.time] = [];
      }
      timeGroups[med.time].push(med);
    });

    return Object.entries(timeGroups)
      .map(([time, meds]) => ({ time, meds }))
      .sort(
        (a, b) =>
          new Date(`1970-01-01T${a.time}:00`).getTime() -
          new Date(`1970-01-01T${b.time}:00`).getTime()
      );
  };

  const upcomingGroups = groupByTime();

  const handleTakeMedicine = (id: string) => {
    console.log(`Medicine ${id} taken`);
  };

  if (upcomingGroups.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No upcoming medications for today</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Upcoming Medications</Text>
      <ScrollView style={styles.scrollContainer}>
        {upcomingGroups.map((group, groupIndex) => (
          <View key={`group-${groupIndex}`} style={styles.timeGroup}>
            <View style={styles.timeHeader}>
              <Text style={styles.timeText}>{group.time}</Text>
              <View style={styles.countPill}>
                <Text style={styles.countPillText}>
                  {group.meds.length}{' '}
                  {group.meds.length === 1 ? 'medication' : 'medications'}
                </Text>
              </View>
            </View>

            {group.meds.map((med) => (
              <View key={med.id} style={styles.medicationItem}>
                <View style={styles.medicationIcon}>
                  <Text style={styles.medicationIconText}>💊</Text>
                </View>
                <View style={styles.medicationDetails}>
                  <Text style={styles.medicationName}>{med.name}</Text>
                  <Text style={styles.medicationDosage}>{med.dosage}</Text>
                </View>
                <TouchableOpacity
                  style={styles.takeMedButton}
                  onPress={() => handleTakeMedicine(med.id)}
                >
                  <Text style={styles.takeMedButtonText}>Take</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  emptyText: { fontSize: 16, color: '#666', textAlign: 'center' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 20,
    marginVertical: 16,
  },
  scrollContainer: { paddingHorizontal: 20 },
  timeGroup: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  timeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f3ff',
    marginBottom: 12,
  },
  timeText: { fontSize: 16, fontWeight: '600', color: '#4a6bff' },
  countPill: {
    backgroundColor: '#f0f3ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  countPillText: { color: '#4a6bff', fontSize: 13, fontWeight: '500' },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  medicationIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  medicationIconText: { fontSize: 20 },
  medicationDetails: { flex: 1 },
  medicationName: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  medicationDosage: { fontSize: 14, color: '#666' },
  takeMedButton: {
    backgroundColor: '#4a6bff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  takeMedButtonText: { color: 'white', fontSize: 14, fontWeight: '500' },
  bottomPadding: { height: 20 },
});

export default UpcomingMedicinesComponent;
