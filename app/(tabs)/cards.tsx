import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Bell, CreditCard, Home, PieChart, Plus, User } from 'lucide-react-native';

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

export default function CardsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cards</Text>
        <Bell color="#fff" size={24} />
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Cards List */}
        <View style={styles.cardsList}>
          {[
            { name: "Main Credit Card", number: "**** **** **** 1234", balance: 2500, limit: 5000, color: "#3b82f6" },
            { name: "Savings Debit Card", number: "**** **** **** 5678", balance: 4750, color: "#22c55e" },
            { name: "Travel Rewards Card", number: "**** **** **** 9012", balance: 1000, limit: 3000, color: "#a855f7" },
          ].map((card, index) => (
            <View key={index} style={[styles.card, { backgroundColor: card.color }]}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.cardName}>{card.name}</Text>
                  <Text style={styles.cardNumber}>{card.number}</Text>
                </View>
                <CreditCard color="#fff" size={32} />
              </View>
              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.cardLabel}>Current Balance</Text>
                  <Text style={styles.cardBalance}>${card.balance.toLocaleString()}</Text>
                </View>
                {card.limit && (
                  <View style={styles.cardLimitContainer}>
                    <Text style={styles.cardLabel}>Credit Limit</Text>
                    <Text style={styles.cardLimit}>${card.limit.toLocaleString()}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Add New Card Button */}
        <Button variant='' style={styles.addCardButton}>
          <Plus color="#fff" size={16} />
          <Text style={styles.addCardButtonText}>Add New Card</Text>
        </Button>
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
  cardsList: {
    marginBottom: 24,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardNumber: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cardBalance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardLimitContainer: {
    alignItems: 'flex-end',
  },
  cardLimit: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  addCardButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  addCardButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
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