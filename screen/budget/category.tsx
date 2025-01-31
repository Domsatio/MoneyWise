import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useSetHeader } from '@/hooks/useSetHeader';
import { Bell } from 'lucide-react-native';
import { Progress } from '@/components/ui/Progress';
import { Transaction } from '@/constants/Dummy';

interface Transaction {
  name: string;
  amount: number;
  desc: string;
  date: string;
}

import { RouteProp } from '@react-navigation/native';

interface BudgetDetailScreenProps {
  route: RouteProp<{ params: { [key: string]: any } }, 'params'>;
}

export default function BudgetDetailScreen({ route }: BudgetDetailScreenProps) {
  console.log(route);
  useSetHeader({ title: `Budget ${''}` });
  const [categories, setCategories] = useState<Transaction[]>(Transaction);

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle='light-content' />

      {/* Monthly Overview */}
        <Text style={styles.sectionTitle}>Monthly Overview</Text>
        <View style={styles.card}>
          <View style={styles.overviewHeader}>
            <Text style={styles.overviewLabel}>Total Budget</Text>
            <Text style={styles.overviewAmount}>$4,000</Text>
          </View>
          <Progress value={65} />
          <View style={styles.overviewFooter}>
            <Text style={styles.overviewFooterText}>Spent: $2,600</Text>
            <Text style={[styles.overviewFooterText, styles.remainingText]}>
              Remaining: $1,400
            </Text>
          </View>
        </View>
      {/* </View> */}

      {/* Category Breakdown */}
      <Text style={[styles.sectionTitle, styles.section]}>
        List {'id'} Expense ({categories.length})
      </Text>
        {categories.map((transaction, index) => (
          <View key={index} style={styles.transactionCard}>
          <View>
            <Text style={styles.transactionName}>{transaction.name}</Text>
            <Text style={styles.transactionDate}>{transaction.desc}</Text>
            <Text style={styles.transactionDate}>{transaction.date}</Text>
          </View>
          <Text style={[
            styles.transactionAmount,
            { color: '#dc2626' }
          ]}>
            ${Math.abs(transaction.amount).toFixed(2)}
          </Text>
        </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1f2937',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  overviewLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  overviewAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  overviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  overviewFooterText: {
    fontSize: 14,
    color: '#4b5563',
  },
  remainingText: {
    color: '#22c55e',
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
  addBudgetButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
  },
  addBudgetButtonText: {
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
  progressContainer: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
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

// export const unstable_settings = {
//   headerShown: true,  // Display the header
//   // hideTabBar: true,   // Hide the tab bar on this page
// };
