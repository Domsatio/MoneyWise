import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Bell, Plus } from 'lucide-react-native';

const ProgressBar = ({ value }:any) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { width: `${value}%` }]} />
  </View>
);

const Button = ({ children, style, ...props }: any) => (
  <TouchableOpacity style={[styles.button, style]} {...props}>
    {children}
  </TouchableOpacity>
);

export default function FinanceApp() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Hello, Master Anas</Text>
            <Text style={styles.headerSubtitle}>Welcome back</Text>
          </View>
          <Bell color={'#fff'} size={24} />
        </View>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$4,750.00</Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* Budget Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Overview</Text>
          <View style={styles.card}>
            <View style={styles.budgetHeader}>
              <Text style={styles.budgetText}>$3,200 / $4,000</Text>
              <Text style={styles.budgetRemaining}>20% left</Text>
            </View>
            <ProgressBar value={80} />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={[styles.section, styles.quickActions]}>
          <Button style={styles.incomeButton}>
            <Plus color={'#fff'} size={16} />
            <Text style={[styles.buttonText, { color: '#fff' }]}>Income</Text>
          </Button>
          <Button style={styles.expenseButton}>
            <Plus color={'#fff'} size={16} />
            <Text style={styles.buttonText}>Expense</Text>
          </Button>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {[
            { name: "Grocery Shopping", amount: -85.2, date: "Today" },
            { name: "Salary Deposit", amount: 3200, date: "Yesterday" },
            { name: "Electric Bill", amount: -120, date: "3 days ago" },
            { name: "Freelance Work", amount: 400, date: "1 week ago" },
          ].map((transaction, index) => (
            <View key={index} style={styles.transactionCard}>
              <View>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                { color: transaction.amount > 0 ? '#16a34a' : '#dc2626' }
              ]}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          ))}
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
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  balanceCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  content: {
    flex: 1,
    padding: 16,
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
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  budgetText: {
    fontSize: 14,
    color: '#4b5563',
  },
  budgetRemaining: {
    fontSize: 14,
    color: '#16a34a',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  incomeButton: {
    backgroundColor: '#22c55e',
    color: '#000',
  },
  expenseButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  transactionDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
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
});