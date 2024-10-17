import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  ArrowDown,
  ArrowUp,
  Bell,
  ChevronRight,
  DollarSign,
  Home,
  PieChart,
  CreditCard,
  User,
} from 'lucide-react-native';
import AddBudgetCategoryForm from '@/components/AddBudgetCategoryForm';

interface BudgetCategory {
  name: string;
  amount: number;
  spent: number;
  color: string;
}

const Progress = ({ value, color = '#3b82f6' }: any) => (
  <View style={styles.progressContainer}>
    <View
      style={[
        styles.progressBar,
        { width: `${value}%`, backgroundColor: color },
      ]}
    />
  </View>
);

const Button = ({ children, variant, style, ...props }: any) => (
  <TouchableOpacity
    style={[styles.button, variant === 'ghost' && styles.ghostButton, style]}
    {...props}
  >
    {children}
  </TouchableOpacity>
);

export default function BudgetScreen() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [categories, setCategories] = useState<BudgetCategory[]>([
    { name: 'Housing', amount: 1500, spent: 1200, color: '#3b82f6' },
    { name: 'Food', amount: 600, spent: 450, color: '#22c55e' },
    { name: 'Transportation', amount: 400, spent: 200, color: '#eab308' },
    { name: 'Entertainment', amount: 500, spent: 300, color: '#a855f7' },
  ]);

  const handleAddCategory = (name: string, amount: number, color: string) => {
    setCategories([...categories, { name, amount, spent: 0, color }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget</Text>
        <Bell color='#fff' size={24} />
      </View>

      {/* Main Content */}
      {/* Monthly Overview */}
      <View style={styles.section}>
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
      </View>

      {/* Category Breakdown */}
      <Text style={[styles.sectionTitle, styles.section]}>
        Category Breakdown ({categories.length})
      </Text>
      <ScrollView style={styles.section}>
        {categories.map((category, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryAmount}>
                ${category.spent} / ${category.amount}
              </Text>
            </View>
            <Progress
              value={(category.spent / category.amount) * 100}
              color={category.color}
            />
          </View>
        ))}
      </ScrollView>

      {/* Quick Add Budget */}
      <View style={styles.section}>
        <Button
          style={styles.addBudgetButton}
          onPress={() => setIsFormVisible(true)}
        >
          <Text style={styles.addBudgetButtonText}>
            Add Budget Category
          </Text>
        </Button>
      </View>

      <AddBudgetCategoryForm
        isVisible={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        onSubmit={handleAddCategory}
      />
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
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  categoryAmount: {
    fontSize: 14,
    color: '#4b5563',
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
