import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { X, DollarSign, Tag, Palette } from "lucide-react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const schema = z.object({
  name: z.string().min(1, "Category name is required"),
  amount: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid number")
    .transform((val) => parseFloat(val)),
});

type FormValues = {
  name: string;
  amount: string;
};

interface AddBudgetCategoryFormProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (name: string, amount: number, color: string) => void;
}

const colorOptions = [
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#a855f7",
  "#f43f5e",
  "#10b981",
  "#ef4444",
  "#f59e0b",
  "#6366f1",
  "#6b7280",
];

export default function AddBudgetCategoryForm({
  isVisible,
  onClose,
  onSubmit,
}: AddBudgetCategoryFormProps) {
  const color = useSharedValue(colorOptions[0]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      amount: "",
    },
  });

  const handleColorChange = (newColor: string) => {
    color.value = newColor;
  };

  const onSubmitForm = (data: FormValues) => {
    const { name, amount } = data;
    onSubmit(name, Number(amount), color.value);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    reset();
    color.value = colorOptions[0];
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView>
            <View style={styles.header}>
              <Text style={styles.headerText}>Add New Budget Category</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X color="#6b7280" size={24} />
              </TouchableOpacity>
            </View>

            {/* Category Name Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Tag color="#6b7280" size={20} style={styles.inputIcon} />
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Category Name"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>
              {errors.name && (
                <Text style={styles.errorText}>{errors.name.message}</Text>
              )}
            </View>

            {/* Budget Amount Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <DollarSign color="#6b7280" size={20} style={styles.inputIcon} />
                <Controller
                  control={control}
                  name="amount"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Budget Amount"
                      keyboardType="numeric"
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                />
              </View>
              {errors.amount && (
                <Text style={styles.errorText}>{errors.amount.message}</Text>
              )}
            </View>

            {/* Color Selection */}
            <View style={styles.inputContainer}>
              <Text style={styles.colorLabel}>Select Color</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {colorOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => handleColorChange(option)}
                  >
                    <Animated.View
                      style={[
                        styles.colorOption,
                        { backgroundColor: option },
                        useAnimatedStyle(() => ({
                          borderWidth: withTiming(
                            color.value === option ? 2 : 0
                          ),
                          borderColor: withTiming(
                            color.value === option ? "#000" : "transparent"
                          ),
                        })),
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(onSubmitForm)}
            >
              <Text style={styles.submitButtonText}>Add Budget Category</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  closeButton: {
    padding: 5,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1d5db",
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
    color: "#1f2937",
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1f2937",
    marginBottom: 8,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 3,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: "#000",
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#ef4444",
    fontSize: 14,
    marginTop: 4,
  },
});
