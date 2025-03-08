import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, X, Camera as CameraIcon } from 'lucide-react-native';

export default function CameraScreen() {
  const router = useRouter();

  const handleAddMedicine = () => {
    // Simulate adding medicine on web
    const newMedicine = {
      id: Date.now(),
      name: 'New Prescription',
      dosage: '50mg',
      schedule: 'Morning',
      status: 'pending',
      time: '09:00 AM',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=60'
    };
    
    global.medicineList = [...(global.medicineList || []), newMedicine];
    router.back();
  };

  // Web-specific UI
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <View style={styles.webContent}>
          <CameraIcon size={48} color="#007AFF" style={styles.webIcon} />
          <Text style={styles.title}>Camera Not Available</Text>
          <Text style={styles.subtitle}>
            The camera feature is not available on web platforms.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleAddMedicine}
            >
              <Text style={styles.buttonText}>Add Test Medicine</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={() => router.back()}
            >
              <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Native platforms will use this UI
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera functionality is only available on native platforms.</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webContent: {
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  webIcon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelText: {
    color: '#666',
  },
});