import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { COLORS } from '../utils/constants';
import Avatar from '../components/Avatar';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const scaleAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogin = () => {
    // Aqui você pode adicionar validação e autenticação
    if (email && password) {
      // Navega para escolher avatar
      navigation.navigate('ChooseAvatar');
    }
  };

  const handleGoToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Logo/Avatar */}
          <View style={styles.logoContainer}>
            <Avatar animated={true} />
            <Text style={styles.title}>Jornada Mágica</Text>
            <Text style={styles.subtitle}>Bem-vindo de volta!</Text>
          </View>

          {/* Formulário */}
          <View style={styles.formContainer}>
            {/* Campo Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>📧 Email</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Campo Senha */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>🔒 Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            {/* Botão Entrar */}
            <TouchableOpacity
              style={[
                styles.button,
                styles.loginButton,
                (!email || !password) && styles.buttonDisabled,
              ]}
              onPress={handleLogin}
              disabled={!email || !password}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            {/* Link para Cadastro */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Primeira vez aqui?</Text>
              <TouchableOpacity onPress={handleGoToRegister}>
                <Text style={styles.registerLink}>Criar conta</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textLight,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 2,
    borderColor: COLORS.neutral,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
  },
  buttonDisabled: {
    backgroundColor: COLORS.neutral,
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 5,
  },
  registerText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  registerLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default LoginScreen;

