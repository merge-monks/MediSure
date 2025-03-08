import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Clock, MapPin, User } from 'lucide-react-native';

const APPOINTMENTS = [
  { time: '09:30 AM', doctor: 'Dr. Smith', specialty: 'Cardiologist', location: 'Heart Center' },
  { time: '02:15 PM', doctor: 'Dr. Johnson', specialty: 'Dermatologist', location: 'Skin Care Clinic' },
  { time: '04:45 PM', doctor: 'Dr. Williams', specialty: 'Neurologist', location: 'Brain & Spine Institute' },
];

export default function ScheduleScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming Appointments</Text>
        <Text style={styles.subtitle}>Your scheduled doctor visits</Text>
      </View>

      <ScrollView style={styles.timeline}>
        {APPOINTMENTS.map((appointment, index) => (
          <View key={index} style={styles.timeSlot}>
            <View style={styles.timeHeader}>
              <Clock size={20} color="#007AFF" />
              <Text style={styles.timeText}>{appointment.time}</Text>
            </View>
            <View style={styles.appointmentDetails}>
              <View style={styles.appointmentItem}>
                <View style={styles.doctorRow}>
                  <User size={16} color="#555" />
                  <Text style={styles.doctorName}>{appointment.doctor}</Text>
                </View>
                <Text style={styles.appointmentInfo}>{appointment.specialty}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={16} color="#007AFF" />
                  <Text style={styles.appointmentLocation}>{appointment.location}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    fontFamily: 'Inter-Regular',
  },
  timeline: {
    padding: 20,
  },
  timeSlot: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  timeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1a1a1a',
  },
  appointmentDetails: {
    gap: 8,
  },
  appointmentItem: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  doctorName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
  },
  appointmentInfo: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginTop: 4,
    marginLeft: 22,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  appointmentLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#007AFF',
  },
});