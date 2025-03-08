import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Animated } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Animation value for error message
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  // Trigger shake animation when error occurs
  useEffect(() => {
    if (errorMsg) {
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
      
      // Clear error after 5 seconds
      const timer = setTimeout(() => {
        setErrorMsg('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);

  const handleSignup = async () => {
    // Reset error message
    setErrorMsg('');
    
    // Validate inputs
    if (!fullName.trim()) {
      setErrorMsg('Full name is required');
      return;
    }
    
    if (!email.trim()) {
      setErrorMsg('Email address is required');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    
    if (!password.trim()) {
      setErrorMsg('Password is required');
      return;
    }
    
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long');
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        displayName: fullName,
        email,
        password,
        confirmPassword: password
      });
  
      await AsyncStorage.setItem('authToken', response.data.result);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        // Server responded with an error
        setErrorMsg(error.response.data?.error || 'Unable to create account. Please try again.');
      } else if (error.request) {
        // Request was made but no response
        setErrorMsg('Network error. Please check your connection and try again.');
      } else {
        // Error in setting up the request
        setErrorMsg('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <UserPlus size={48} color="#007AFF" />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
      </View>

      {errorMsg ? (
        <Animated.View 
          style={[
            styles.errorContainer, 
            { transform: [{ translateX: shakeAnimation }] }
          ]}
        >
          <Text style={styles.errorText}>{errorMsg}</Text>
        </Animated.View>
      ) : null}

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            autoCapitalize="words"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/login" style={styles.link}>
            Sign In
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#1a1a1a',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    fontFamily: 'Inter-Regular',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
    fontFamily: 'Inter-Regular',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  link: {
    color: '#007AFF',
    fontFamily: 'Inter-SemiBold',
  },
  errorContainer: {
    backgroundColor: '#FFE8E6',
    borderWidth: 1,
    borderColor: '#FF5A5F',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#D63031',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});