import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { X, DollarSign, Tag, FileText } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type TransactionType = 'income' | 'expense';

interface AddTransactionFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (type: TransactionType, amount: number, category: string, description: string) => void;
  transactionType: TransactionType;
}

const transactionSchema = z.object({
    amount: z.string().nonempty({ message: 'Amount is required' }).refine(value => !isNaN(parseFloat(value)), { message: 'Amount must be a valid number' }),
    category: z.string().nonempty({ message: 'Category is required' }),
    description: z.string().optional(),
  });
  
type TransactionFormData = z.infer<typeof transactionSchema>;

export default function AddTransactionForm({ isVisible, onClose, onSubmit, transactionType }: AddTransactionFormProps) {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<TransactionFormData>({
        resolver: zodResolver(transactionSchema),
      });

      const handleFormSubmit = (data: TransactionFormData) => {
        const { amount, category, description } = data;
        onSubmit(transactionType, parseFloat(amount), category, description || '');
        reset(); 
        onClose(); 
      };

      const handleOnClose = () => { 
        reset();
        onClose();
    };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                Add {transactionType === 'income' ? 'Income' : 'Expense'}
              </Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X color="#6b7280" size={24} onPress={handleOnClose} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <DollarSign color="#6b7280" size={20} style={styles.inputIcon} />
                <Controller
                  control={control}
                  name="amount"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Amount"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>
              {errors.amount && <Text style={styles.errorText}>{errors.amount.message}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Tag color="#6b7280" size={20} style={styles.inputIcon} />
                <Controller
                  control={control}
                  name="category"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <Picker
                        selectedValue={value}
                        onValueChange={(itemValue) => onChange(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select a category" value="" />
                        <Picker.Item label="Food" value="Food" />
                        <Picker.Item label="Transportation" value="Transportation" />
                        <Picker.Item label="Entertainment" value="Entertainment" />
                        <Picker.Item label="Utilities" value="Utilities" />
                        <Picker.Item label="Shopping" value="Shopping" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                  )}
                />
              </View>
              {errors.category && <Text style={styles.errorText}>{errors.category.message}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <FileText color="#6b7280" size={20} style={styles.inputIcon} />
                <Controller
                  control={control}
                  name="description"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Description (optional)"
                      value={value}
                      onChangeText={onChange}
                      multiline
                    />
                  )}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: transactionType === 'income' ? '#22c55e' : '#ef4444' }
              ]}
              onPress={handleSubmit(handleFormSubmit)}
            >
              <Text style={styles.submitButtonText}>
                Add {transactionType === 'income' ? 'Income' : 'Expense'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  closeButton: {
    padding: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  picker: {
    flex: 1,
    color: '#1f2937',
  },
  errorText: { 
    color: 'red',
    marginTop: 5 
},
  submitButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});