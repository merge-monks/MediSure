import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

// Import components
import Header from '../components/Header';
import UpcomingDose from '../components/UpcomingDose';
import TodaySchedule from '../components/TodaySchedule';
import FloatingActionButton from '../components/FloatingActionButton';
import BottomNavigation from '../components/BottomNavigation';

// Import types
import { Medication, TimeSlot } from '../types';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  
  // Current date
  const currentDate = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
  const formattedDate = currentDate.toLocaleDateString('en-US', dateOptions);

  // Mock data
  const upcomingMedications: Medication[] = [
    {
      name: 'Lisinopril',
      dosage: '10mg • 1 pill',
      icon: '💊',
      status: 'Take in 15 min',
    },
    {
      name: 'Vitamin D3',
      dosage: '1000IU • 1 capsule',
      icon: '💊',
      status: 'Take in 15 min',
    },
  ];

  // Updated todaySchedule with IDs
  const [todaySchedule, setTodaySchedule] = useState<TimeSlot[]>([
    {
      id: '1',
      time: '8:00 AM',
      title: 'Morning Medications',
      pills: [
        { name: 'Metformin', dotColor: 'blue' },
        { name: 'Aspirin', dotColor: 'red' },
      ],
      completed: true,
    },
    {
      id: '2',
      time: '9:00 AM',
      title: 'Blood Pressure Meds',
      pills: [
        { name: 'Lisinopril', dotColor: 'blue' },
        { name: 'Vitamin D3', dotColor: 'green' },
      ],
      showOptions: false,
    },
    {
      id: '3',
      time: '1:00 PM',
      title: 'Lunch Medications',
      pills: [{ name: 'Metformin', dotColor: 'blue' }],
      showOptions: false,
    },
    {
      id: '4',
      time: '8:00 PM',
      title: 'Evening Medications',
      pills: [
        { name: 'Metformin', dotColor: 'blue' },
        { name: 'Amlodipine', dotColor: 'red' },
        { name: 'Vitamin C', dotColor: 'green' },
      ],
      showOptions: false,
    },
  ]);

  // Function to toggle options dropdown
  const toggleOptions = (id: string) => {
    setTodaySchedule(schedule =>
      schedule.map(slot => ({
        ...slot,
        showOptions: slot.id === id ? !slot.showOptions : false
      }))
    );
  };

  // Function to mark medication as taken or missed
  const updateMedicationStatus = (id: string, status: 'taken' | 'missed') => {
    setTodaySchedule(schedule =>
      schedule.map(slot => {
        if (slot.id === id) {
          return {
            ...slot,
            completed: status === 'taken',
            missed: status === 'missed',
            showOptions: false,
          };
        }
        return slot;
      })
    );
  };

  // Handle scan button press
  const handleScanPress = () => {
    console.log('Navigating to scan page');
    router.push('/scanPage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Component */}
        <Header 
          greeting="Good morning"
          name="John"
          formattedDate={formattedDate}
        />

        {/* Upcoming Dose Component */}
        <UpcomingDose 
          medications={upcomingMedications} 
          time="9:00 AM" 
        />

        {/* Today's Schedule Component */}
        <TodaySchedule 
          slots={todaySchedule}
          onToggleOptions={toggleOptions}
          onUpdateStatus={updateMedicationStatus}
        />
      </ScrollView>

      {/* Floating Action Button Component */}
      <FloatingActionButton onPress={handleScanPress} />

      {/* Bottom Navigation Component */}
      <BottomNavigation activeRoute="/" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
});

export default HomeScreen;