import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, ACTIVITIES } from "../utils/constants";
import Avatar from "../componentes/Avatar";
import ComponentePontos from "../componentes/ComponentePontos";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAP_HEIGHT = SCREEN_HEIGHT * 1.5;

const TelaCaminho = ({ navigation }) => {
  const [tarefaAtual, setTarefaAtual] = useState(0);
  const [tarefasCompletadas, setTarefasCompletadas] = useState([]);
  const [pontosTotais, setPontosTotais] = useState(0);
  const [tarefasSelecionadas, setTarefasSelecionadas] = useState([]);
  const avatarPositionRef = React.useRef(new Animated.ValueXY({ x: 0, y: 0 }));
  const avatarPosition = avatarPositionRef.current;

  useEffect(() => {
    carregarTarefas();
  }, []);

  useEffect(() => {
    // Anima o avatar para a posição da tarefa atual
    if (
      tarefasSelecionadas.length > 0 &&
      tarefaAtual < tarefasSelecionadas.length
    ) {
      const tarefa = tarefasSelecionadas[tarefaAtual];
      Animated.spring(avatarPosition, {
        toValue: {
          x: tarefa.position.x * SCREEN_WIDTH - 30,
          y: tarefa.position.y * MAP_HEIGHT - 30,
        },
        useNativeDriver: false,
        tension: 50,
        friction: 7,
      }).start();
    }
  }, [tarefaAtual]);

  const carregarTarefas = async () => {
    try {
      const saved = await AsyncStorage.getItem("tarefasSelecionadas");
      if (saved) {
        const ids = JSON.parse(saved);
        const tarefas = ACTIVITIES.filter((t) => ids.includes(t.id));
        setTarefasSelecionadas(tarefas);
      } else {
        // Se não tem tarefas salvas, usa todas
        setTarefasSelecionadas(ACTIVITIES);
      }
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      setTarefasSelecionadas(ACTIVITIES);
    }
  };

  const handleResposta = (conseguiu) => {
    const tarefa = tarefasSelecionadas[tarefaAtual];

    navigation.navigate("RespostaTarefa", {
      tarefa,
      conseguiu,
      pontos: conseguiu ? 10 : 0,
      onContinuar: () => {
        if (conseguiu) {
          setTarefasCompletadas([...tarefasCompletadas, tarefa.id]);
          setPontosTotais(pontosTotais + 10);
        }

        // Verifica se é a última tarefa
        if (tarefaAtual === tarefasSelecionadas.length - 1) {
          // Finaliza jornada: substitui a pilha de navegação pela tela de pontuação final
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "PontuacaoFinal",
                params: {
                  pontosTotais: pontosTotais + (conseguiu ? 10 : 0),
                  tarefasCompletadas:
                    tarefasCompletadas.length + (conseguiu ? 1 : 0),
                  totalTarefas: tarefasSelecionadas.length,
                },
              },
            ],
          });
        } else {
          setTarefaAtual(tarefaAtual + 1);
        }
      },
    });
  };

  if (tarefasSelecionadas.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando tarefas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const tarefaAtualObj = tarefasSelecionadas[tarefaAtual];

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho com Pontos */}
      <View style={styles.header}>
        <View style={styles.progressoContainer}>
          <Text style={styles.progressoTexto}>
            Tarefa {tarefaAtual + 1} de {tarefasSelecionadas.length}
          </Text>
        </View>
        <ComponentePontos pontos={pontosTotais} animado={true} />
      </View>

      {/* Mapa com Caminho */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.mapContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.map, { height: MAP_HEIGHT }]}>
          {/* Desenha as linhas do caminho */}
          {tarefasSelecionadas.map((tarefa, index) => {
            if (index < tarefasSelecionadas.length - 1) {
              const nextTarefa = tarefasSelecionadas[index + 1];
              return (
                <View
                  key={`line-${tarefa.id}`}
                  style={[
                    styles.linha,
                    {
                      top: tarefa.position.y * MAP_HEIGHT,
                      left: tarefa.position.x * SCREEN_WIDTH,
                      height:
                        (nextTarefa.position.y - tarefa.position.y) *
                        MAP_HEIGHT,
                    },
                  ]}
                />
              );
            }
            return null;
          })}

          {/* Desenha os nós das tarefas */}
          {tarefasSelecionadas.map((tarefa, index) => {
            const completada = tarefasCompletadas.includes(tarefa.id);
            const atual = index === tarefaAtual;
            const bloqueada = index > tarefaAtual;

            return (
              <View
                key={tarefa.id}
                style={[
                  styles.nodeContainer,
                  {
                    left: tarefa.position.x * SCREEN_WIDTH - 35,
                    top: tarefa.position.y * MAP_HEIGHT - 35,
                  },
                ]}
              >
                <View
                  style={[
                    styles.node,
                    completada && styles.nodeCompletada,
                    atual && styles.nodeAtual,
                    bloqueada && styles.nodeBloqueada,
                  ]}
                >
                  <Text style={styles.nodeIcon}>{tarefa.icon}</Text>
                  {completada && (
                    <View style={styles.checkmark}>
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.nodeTitle}>{tarefa.title}</Text>
              </View>
            );
          })}

          {/* Avatar animado */}
          <Animated.View
            style={[
              styles.avatarContainer,
              {
                left: avatarPosition.x,
                top: avatarPosition.y,
              },
            ]}
          >
            <Avatar animated={true} />
          </Animated.View>
        </View>
      </ScrollView>

      {/* Card da Tarefa Atual */}
      <View style={styles.tarefaCard}>
        <View style={styles.tarefaHeader}>
          <Text style={styles.tarefaIcon}>{tarefaAtualObj.icon}</Text>
          <View style={styles.tarefaInfo}>
            <Text style={styles.tarefaTitulo}>{tarefaAtualObj.title}</Text>
            <Text style={styles.tarefaDescricao}>
              {tarefaAtualObj.description}
            </Text>
          </View>
        </View>

        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={[styles.botao, styles.botaoSim]}
            onPress={() => handleResposta(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoTexto}>✓ Fiz!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoNao]}
            onPress={() => handleResposta(false)}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoTexto}>Não fiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.textLight,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.neutral,
  },
  progressoContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  progressoTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    paddingVertical: 20,
  },
  map: {
    width: SCREEN_WIDTH,
    position: "relative",
  },
  linha: {
    position: "absolute",
    width: 6,
    backgroundColor: COLORS.path,
    borderRadius: 3,
  },
  nodeContainer: {
    position: "absolute",
    alignItems: "center",
  },
  node: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.white,
    borderWidth: 4,
    borderColor: COLORS.neutral,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  nodeCompletada: {
    backgroundColor: COLORS.success,
    borderColor: "#5FA77F",
  },
  nodeAtual: {
    borderColor: COLORS.primary,
    borderWidth: 5,
    backgroundColor: COLORS.white,
  },
  nodeBloqueada: {
    backgroundColor: COLORS.neutral,
    borderColor: COLORS.locked,
    opacity: 0.6,
  },
  nodeIcon: {
    fontSize: 32,
  },
  nodeTitle: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.text,
    textAlign: "center",
    fontWeight: "600",
    maxWidth: 100,
  },
  checkmark: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  checkmarkText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  avatarContainer: {
    position: "absolute",
    width: 60,
    height: 60,
  },
  tarefaCard: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  tarefaHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  tarefaIcon: {
    fontSize: 48,
    marginRight: 15,
  },
  tarefaInfo: {
    flex: 1,
  },
  tarefaTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 5,
  },
  tarefaDescricao: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  botoesContainer: {
    flexDirection: "row",
    gap: 10,
  },
  botao: {
    flex: 1,
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  botaoSim: {
    backgroundColor: COLORS.success,
  },
  botaoNao: {
    backgroundColor: COLORS.secondary,
  },
  botaoTexto: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TelaCaminho;
