import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Animated,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../utils/constants";
import Avatar from "../components/Avatar";
import InputPersonalizado from "../componentes/InputPersonalizado";
import BotaoPersonalizado from "../componentes/BotaoPersonalizado";
import { SafeAreaView } from "react-native-safe-area-context";

const TelaLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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
    if (email && senha) {
      // Navega para escolher avatar
      navigation.navigate("EscolherAvatar");
    }
  };

  const irParaCadastro = () => {
    navigation.navigate("Cadastro");
  };

  const podeEntrar = email.length > 0 && senha.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
          <View style={styles.logoContainer}>
            <Avatar animated={true} />
            <Text style={styles.titulo}>Jornada Mágica</Text>
            <Text style={styles.subtitulo}>Bem-vindo de volta!</Text>
          </View>

          <View style={styles.formContainer}>
            <InputPersonalizado
              rotulo="Email"
              icone="📧"
              valor={email}
              aoMudar={setEmail}
              placeholder="seu@email.com"
              tipoTeclado="email-address"
              autoCapitalize="none"
            />

            <InputPersonalizado
              rotulo="Senha"
              icone="🔒"
              valor={senha}
              aoMudar={setSenha}
              placeholder="••••••••"
              senhaSegura={true}
              autoCapitalize="none"
            />

            <BotaoPersonalizado
              texto="Entrar"
              icone="✓"
              aoClicar={handleLogin}
              tipo="primario"
              desabilitado={!podeEntrar}
            />

            {/* Link para Cadastro */}
            <View style={styles.cadastroContainer}>
              <Text style={styles.cadastroTexto}>Primeira vez aqui?</Text>
              <TouchableOpacity onPress={irParaCadastro}>
                <Text style={styles.cadastroLink}>Criar conta</Text>
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
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 20,
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 18,
    color: COLORS.textLight,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  cadastroContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },
  cadastroTexto: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  cadastroLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default TelaLogin;
