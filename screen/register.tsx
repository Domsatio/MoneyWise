import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/validation/auth.validation';
import { NavigationProps } from '@/types/navigation.type';

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage({ navigation }: NavigationProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Register Success:', { data });
    navigation.push('login');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <Text style={styles.headerText}>Register</Text>

        <View style={styles.formWrapper}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            Create Your Account!
          </Text>
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              name='username'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder='Username'
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder='Email'
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder='Password'
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              name='confirmPassword'
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder='Confirm Password'
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitButtonText}>Register</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.push('login')}>
                <Text style={{ color: '#3b82f6', marginLeft: 4 }}>Sign In</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardview: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#0D92F4',
  },
  headerText: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
    padding: 20,
    marginVertical: 20,
  },
  formWrapper: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
});
