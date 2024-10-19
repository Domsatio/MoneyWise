import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/validation/auth.validation';
import { NavigationProps } from '@/types/navigation.type';

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC<NavigationProps> = ({ navigation }) => {
  const [isRemembered, setIsRemembered] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login Success:', data);
    navigation.push('tabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign In</Text>

      <View style={styles.formWrapper}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
          }}
        >
          Welcome Back!
        </Text>
        <Text style={{ marginBottom: 20 }}>Login to your account</Text>
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

        <View style={{ flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Switch value={isRemembered} onValueChange={() => setIsRemembered(prev => !prev)}/>
                <Text>Remember me</Text>
            </View>
          <TouchableOpacity>
            <Text style={{ color: '#3b82f6' }}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.submitButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.push('register')}>
            <Text style={{ color: '#3b82f6', marginLeft: 4 }}>Sign Up</Text>
          </TouchableOpacity>
          </View>
      </View>
    </View>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
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
