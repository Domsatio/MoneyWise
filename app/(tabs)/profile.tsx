import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import { Bell, ChevronRight, CreditCard, Home, PieChart, Settings, User } from 'lucide-react-native';

const Avatar = ({ source, fallback, size = 64 }: any) => (
  <View style={[styles.avatar, { width: size, height: size }]}>
    {source ? (
      <Image source={source} style={[styles.avatarImage, { width: size, height: size }]} />
    ) : (
      <Text style={styles.avatarFallback}>{fallback}</Text>
    )}
  </View>
);

const Button = ({ children, variant, style, ...props }: any) => (
  <TouchableOpacity
    style={[
      styles.button,
      variant === 'ghost' && styles.ghostButton,
      style
    ]}
    {...props}
  >
    {children}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Settings color="#fff" size={24} />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* User Info */}
        <View style={styles.userInfoCard}>
          <View style={styles.userInfo}>
            <Avatar
              source={{ uri: 'https://via.placeholder.com/64' }}
              fallback="AJ"
              size={64}
            />
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>Master Anas</Text>
              <Text style={styles.userEmail}>masteranas@gmail.com</Text>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.card}>
            {[
              { name: "Personal Information", icon: User },
              { name: "Notification Preferences", icon: Bell },
              { name: "Linked Accounts", icon: CreditCard },
              { name: "Privacy and Security", icon: Settings },
            ].map((item, index) => (
              <TouchableOpacity key={index} style={styles.settingsItem}>
                <item.icon color="#6b7280" size={20} />
                <Text style={styles.settingsItemText}>{item.name}</Text>
                <ChevronRight color="#6b7280" size={20} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.card}>
            {[
              { name: "Currency", value: "USD" },
              { name: "Language", value: "English" },
              { name: "Theme", value: "Light" },
            ].map((item, index) => (
              <View key={index} style={styles.appSettingsItem}>
                <Text style={styles.appSettingsItemName}>{item.name}</Text>
                <Text style={styles.appSettingsItemValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#3b82f6',
    padding: 16,
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  userInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfoText: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1f2937',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  settingsItemText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#1f2937',
  },
  appSettingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  appSettingsItemName: {
    fontSize: 16,
    color: '#1f2937',
  },
  appSettingsItemValue: {
    fontSize: 16,
    color: '#6b7280',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    color: '#6b7280',
  },
  activeNavLabel: {
    color: '#3b82f6',
  },
  avatar: {
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
});