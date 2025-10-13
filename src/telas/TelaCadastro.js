import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
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

const TelaCadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // 1. Mova a animação para dentro do useEffect para garantir que ela seja criada apenas uma vez.
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handleCadastro = () => {
    if (podeCadastrar) {
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
      {/* 2. Ajuste crucial no KeyboardAvoidingView */}
      <KeyboardAvoidingView
        // Apenas 'padding' para iOS. No Android, ele não fará nada,
        // deixando o ScrollView gerenciar o layout.
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
        // Adicione um offset se o padding do iOS não for suficiente
        // keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" // Boa prática para usabilidade
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
  // 3. Estilo de sombra separado para cada plataforma
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 30,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
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
