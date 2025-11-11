import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Animated,
} from "react-native";
import { COLORS } from "../utils/constants";
import OpcaoAvatar from "../componentes/OpcaoAvatar";
import BotaoPersonalizado from "../componentes/BotaoPersonalizado";

const AVATARES_DISPONIVEIS = [
  {
    id: 1,
    nome: "Ana",
    corPele: "#FFD8A8",
    corRoupa: "#6B9BD1",
  },
  {
    id: 2,
    nome: "Pedro",
    corPele: "#F4C4A0",
    corRoupa: "#7EC699",
  },
  {
    id: 3,
    nome: "Maria",
    corPele: "#E8B87D",
    corRoupa: "#FFB347",
  },
  {
    id: 4,
    nome: "João",
    corPele: "#D4A574",
    corRoupa: "#A8D5BA",
  },
  {
    id: 5,
    nome: "Sofia",
    corPele: "#FFE4C4",
    corRoupa: "#F9C5D5",
  },
  {
    id: 6,
    nome: "Lucas",
    corPele: "#C68642",
    corRoupa: "#9B59B6",
  },
];

const TelaEscolherAvatar = ({ navigation }) => {
  const [avatarSelecionado, setAvatarSelecionado] = useState(null);
  const fadeAnimRef = React.useRef(new Animated.Value(0));
  const fadeAnim = fadeAnimRef.current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleContinuar = () => {
    if (avatarSelecionado) {
      // Salvar avatar selecionado
      navigation.navigate("EscolherTarefas");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Escolha seu Avatar</Text>
          <Text style={styles.subtitulo}>
            Quem vai te acompanhar na jornada?
          </Text>
        </View>

        {/* Grid de Avatares */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.avatarGrid}>
            {AVATARES_DISPONIVEIS.map((avatar) => (
              <OpcaoAvatar
                key={avatar.id}
                avatar={avatar}
                selecionado={avatarSelecionado?.id === avatar.id}
                aoSelecionar={() => setAvatarSelecionado(avatar)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Botão Continuar */}
        <View style={styles.footer}>
          {avatarSelecionado && (
            <View style={styles.selecaoInfo}>
              <Text style={styles.selecaoTexto}>
                Você escolheu:{" "}
                <Text style={styles.selecaoNome}>{avatarSelecionado.nome}</Text>
              </Text>
            </View>
          )}

          <BotaoPersonalizado
            texto="Continuar"
            icone="→"
            aoClicar={handleContinuar}
            tipo="primario"
            desabilitado={!avatarSelecionado}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.neutral,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: "center",
  },
  scrollContent: {
    padding: 20,
  },
  avatarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 2,
    borderTopColor: COLORS.neutral,
  },
  selecaoInfo: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  selecaoTexto: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  selecaoNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});

export default TelaEscolherAvatar;
