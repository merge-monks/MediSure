import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

interface HeaderProps {
  greeting: string;
  name: string;
  formattedDate: string;
}

const Header: React.FC<HeaderProps> = ({ greeting, name, formattedDate }) => {
  const router = useRouter();
  
  return (
    <LinearGradient
      colors={['#4361ee', '#3a0ca3']}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.headerTop}>
        <Text style={styles.logo}>MediSure</Text>
        <TouchableOpacity 
          style={styles.profile}
          onPress={() => router.push('/profile')}
        >
          <Text style={styles.profileText}>JS</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.greeting}>{`${greeting}, ${name}`}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontWeight: '700',
    fontSize: 22,
    color: 'white',
    letterSpacing: -0.5,
  },
  profile: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  profileText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  date: {
    opacity: 0,
    fontSize: 15,
  },
});

export default Header;
