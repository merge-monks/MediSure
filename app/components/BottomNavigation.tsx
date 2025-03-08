import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface NavItem {
  icon: string;
  label: string;
  route?: string;
  active?: boolean;
}

interface BottomNavigationProps {
  activeRoute: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeRoute }) => {
  const router = useRouter();
  
  const navItems: NavItem[] = [
    { icon: '🏠', label: 'Home', route: '/', active: activeRoute === '/' },
    { icon: '📅', label: 'Calendar', route: '/schedule', active: activeRoute === '/schedule' },
    { icon: '📊', label: 'Reports', route: '/reports', active: activeRoute === '/reports' },
    { icon: '👥', label: 'Care Team', route: '/care-team', active: activeRoute === '/care-team' },
  ];

  const handleNavPress = (route?: string) => {
    if (route) router.push(route);
  };

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item, index) => (
        <TouchableOpacity 
          key={index}
          style={[styles.navItem, item.active && styles.navActive]}
          onPress={() => handleNavPress(item.route)}
        >
          <Text style={[styles.navIcon, item.active && styles.navActiveText]}>{item.icon}</Text>
          <Text style={[styles.navText, item.active && styles.navActiveText]}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingVertical: 16,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  navActive: {
    backgroundColor: '#eff6ff',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 6,
    color: '#94a3b8',
  },
  navText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  navActiveText: {
    color: '#4361ee',
    fontWeight: '500',
  },
});

export default BottomNavigation;
