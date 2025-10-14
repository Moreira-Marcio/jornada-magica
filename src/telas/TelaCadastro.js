import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../utils/constants";
import Avatar from "../components/Avatar";
import InputPersonalizado from "../componentes/InputPersonalizado";
import BotaoPersonalizado from "../componentes/BotaoPersonalizado";
import { SafeAreaView } from "react-native-safe-area-context";

const TelaCadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const scaleAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCadastro = () => {
    if (podeCadastrar) {
      //adicionar validação e salvar os dados
      navigation.navigate("EscolherAvatar");
    }
  };

  const voltarParaLogin = () => {
    navigation.goBack();
  };

  const podeCadastrar =
    nome.length > 0 &&
    email.length > 0 &&
    senha.length >= 6 &&
    senha === confirmarSenha;

  const senhasNaoCoincidem =
    senha.length > 0 && confirmarSenha.length > 0 && senha !== confirmarSenha;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
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
              <Text style={styles.titulo}>Criar Conta</Text>
              <Text style={styles.subtitulo}>Vamos começar sua jornada!</Text>
            </View>

            <View style={styles.formContainer}>
              <InputPersonalizado
                rotulo="Nome da Criança"
                icone="👤"
                valor={nome}
                aoMudar={setNome}
                placeholder="Nome completo"
                autoCapitalize="words"
              />

              <InputPersonalizado
                rotulo="Email do Responsável"
                icone="📧"
                valor={email}
                aoMudar={setEmail}
                placeholder="responsavel@email.com"
                tipoTeclado="email-address"
                autoCapitalize="none"
              />

              <InputPersonalizado
                rotulo="Senha"
                icone="🔒"
                valor={senha}
                aoMudar={setSenha}
                placeholder="Mínimo 6 caracteres"
                senhaSegura={true}
                autoCapitalize="none"
              />

              <InputPersonalizado
                rotulo="Confirmar Senha"
                icone="🔒"
                valor={confirmarSenha}
                aoMudar={setConfirmarSenha}
                placeholder="Digite a senha novamente"
                senhaSegura={true}
                autoCapitalize="none"
              />

              {senhasNaoCoincidem && (
                <View style={styles.avisoContainer}>
                  <Text style={styles.avisoTexto}>
                    ⚠️ As senhas não coincidem
                  </Text>
                </View>
              )}

              <BotaoPersonalizado
                texto="Criar Conta"
                icone="✨"
                aoClicar={handleCadastro}
                tipo="sucesso"
                desabilitado={!podeCadastrar}
              />

              <View style={styles.loginContainer}>
                <Text style={styles.loginTexto}>Já tem uma conta?</Text>
                <TouchableOpacity onPress={voltarParaLogin}>
                  <Text style={styles.loginLink}>Entrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  content: {
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
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
  avisoContainer: {
    backgroundColor: "#FFE5E5",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  avisoTexto: {
    color: "#D32F2F",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },
  loginTexto: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  loginLink: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default TelaCadastro;
