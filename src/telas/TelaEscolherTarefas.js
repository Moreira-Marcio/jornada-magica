import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Animated,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, ACTIVITIES } from "../utils/constants";
import CardTarefa from "../componentes/CardTarefa";
import BotaoPersonalizado from "../componentes/BotaoPersonalizado";

const TelaEscolherTarefas = ({ navigation }) => {
  const [tarefasSelecionadas, setTarefasSelecionadas] = useState([]);
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleTarefa = (tarefaId) => {
    setTarefasSelecionadas((prev) => {
      if (prev.includes(tarefaId)) {
        return prev.filter((id) => id !== tarefaId);
      } else {
        return [...prev, tarefaId];
      }
    });
  };

  const handleContinuar = async () => {
    if (tarefasSelecionadas.length === 0) {
      Alert.alert("Atenção", "Selecione pelo menos uma tarefa para começar!", [
        { text: "OK" },
      ]);
      return;
    }

    try {
      // Salvar tarefas
      await AsyncStorage.setItem(
        "tarefasSelecionadas",
        JSON.stringify(tarefasSelecionadas)
      );

      // Navegar para o mapa
      navigation.navigate("Map");
    } catch (error) {
      console.error("Erro ao salvar tarefas:", error);
    }
  };

  const selecionarTodas = () => {
    setTarefasSelecionadas(ACTIVITIES.map((t) => t.id));
  };

  const limparSelecao = () => {
    setTarefasSelecionadas([]);
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
        <View style={styles.header}>
          <Text style={styles.titulo}>Escolha as Tarefas</Text>
          <Text style={styles.subtitulo}>
            Selecione as atividades da sua rotina
          </Text>
          <View style={styles.contadorContainer}>
            <Text style={styles.contador}>
              {tarefasSelecionadas.length} de {ACTIVITIES.length} selecionadas
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {ACTIVITIES.map((tarefa) => (
            <CardTarefa
              key={tarefa.id}
              tarefa={tarefa}
              selecionada={tarefasSelecionadas.includes(tarefa.id)}
              aoSelecionar={() => toggleTarefa(tarefa.id)}
            />
          ))}
        </ScrollView>

        {/* Rodapé com Botões */}
        <View style={styles.footer}>
          <View style={styles.botoesRapidos}>
            <BotaoPersonalizado
              texto="Todas"
              icone="✓"
              aoClicar={selecionarTodas}
              tipo="secundario"
            />
            <BotaoPersonalizado
              texto="Limpar"
              icone="✕"
              aoClicar={limparSelecao}
              tipo="secundario"
            />
          </View>

          <BotaoPersonalizado
            texto="Começar Jornada"
            icone="🚀"
            aoClicar={handleContinuar}
            tipo="sucesso"
            desabilitado={tarefasSelecionadas.length === 0}
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
    marginBottom: 10,
  },
  contadorContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
  },
  contador: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 2,
    borderTopColor: COLORS.neutral,
  },
  botoesRapidos: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
});

export default TelaEscolherTarefas;
