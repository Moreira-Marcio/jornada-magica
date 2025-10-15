import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../utils/constants';
import Avatar from '../componentes/Avatar';
import ComponentePontos from '../componentes/ComponentePontos';

const TelaPontuacaoFinal = ({ route, navigation }) => {
  const { pontosTotais, tarefasCompletadas, totalTarefas } = route.params;
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const confettiAnims = useRef(
    [...Array(20)].map(() => ({
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }))
  ).current;

  const percentual = Math.round((tarefasCompletadas / totalTarefas) * 100);
  const medalha = percentual === 100 ? '🏆' : percentual >= 70 ? '🥇' : percentual >= 50 ? '🥈' : '🌟';

  useEffect(() => {
    // Animação de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Animação de confete
    confettiAnims.forEach((anim, index) => {
      const angle = (index / confettiAnims.length) * Math.PI * 2;
      const distance = 200 + Math.random() * 100;

      Animated.parallel([
        Animated.timing(anim.translateY, {
          toValue: Math.sin(angle) * distance,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(anim.translateX, {
          toValue: Math.cos(angle) * distance,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(anim.rotate, {
          toValue: 360 * 2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const handleVoltar = () => {
    navigation.navigate('EscolherTarefas');
  };

  const handleRecomecar = () => {
    navigation.navigate('Caminho');
  };

  const getMensagem = () => {
    if (percentual === 100) {
      return 'Incrível! Você completou todas as tarefas!';
    } else if (percentual >= 70) {
      return 'Muito bem! Você fez um ótimo trabalho!';
    } else if (percentual >= 50) {
      return 'Bom trabalho! Continue assim!';
    } else {
      return 'Você tentou e isso é o mais importante!';
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
        {/* Confete */}
        <View style={styles.confettiContainer}>
          {confettiAnims.map((anim, index) => (
            <Animated.View
              key={index}
              style={[
                styles.confetti,
                {
                  backgroundColor: [
                    '#FFD166',
                    '#7EC699',
                    '#6B9BD1',
                    '#A8D5BA',
                    '#F9C5D5',
                    '#FFB347',
                  ][index % 6],
                  transform: [
                    { translateX: anim.translateX },
                    { translateY: anim.translateY },
                    {
                      rotate: anim.rotate.interpolate({
                        inputRange: [0, 720],
                        outputRange: ['0deg', '720deg'],
                      }),
                    },
                  ],
                  opacity: anim.opacity,
                },
              ]}
            />
          ))}
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.card,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              <Avatar animated={true} />
            </View>

            {/* Medalha */}
            <Text style={styles.medalha}>{medalha}</Text>

            {/* Título */}
            <Text style={styles.titulo}>Jornada Concluída!</Text>

            {/* Mensagem */}
            <Text style={styles.mensagem}>{getMensagem()}</Text>

            {/* Pontos Totais */}
            <View style={styles.pontosContainer}>
              <ComponentePontos pontos={pontosTotais} animado={false} />
            </View>

            {/* Estatísticas */}
            <View style={styles.estatisticas}>
              <View style={styles.estatItem}>
                <Text style={styles.estatValor}>{tarefasCompletadas}</Text>
                <Text style={styles.estatLabel}>Completadas</Text>
              </View>

              <View style={styles.divisor} />

              <View style={styles.estatItem}>
                <Text style={styles.estatValor}>{totalTarefas}</Text>
                <Text style={styles.estatLabel}>Total</Text>
              </View>

              <View style={styles.divisor} />

              <View style={styles.estatItem}>
                <Text style={styles.estatValor}>{percentual}%</Text>
                <Text style={styles.estatLabel}>Sucesso</Text>
              </View>
            </View>

            {/* Mensagem de Encorajamento */}
            <View style={styles.encorajamentoContainer}>
              <Text style={styles.encorajamento}>
                {tarefasCompletadas === totalTarefas
                  ? '🎉 Você é incrível! Continue assim!'
                  : '💪 Amanhã você pode tentar de novo!'}
              </Text>
            </View>

            {/* Mensagem final personalizada do usuário */}
            <View style={styles.finalMessageContainer}>
              <Text style={styles.finalMessage}>
                🎊 Parabens conseguimos finalizaer o dia foi muito bom, e amanha sera melhor ainda!!
              </Text>
            </View>

            {/* Botões */}
            <View style={styles.botoesContainer}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoRecomecar]}
                onPress={handleRecomecar}
                activeOpacity={0.8}
              >
                <Text style={styles.botaoTexto}>🔄 Recomeçar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botao, styles.botaoVoltar]}
                onPress={handleVoltar}
                activeOpacity={0.8}
              >
                <Text style={styles.botaoTexto}>← Escolher Tarefas</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
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
  confettiContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  confetti: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 2,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  medalha: {
    fontSize: 80,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  mensagem: {
    fontSize: 18,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
  },
  pontosContainer: {
    marginBottom: 30,
  },
  estatisticas: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  estatItem: {
    alignItems: 'center',
  },
  estatValor: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  estatLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  divisor: {
    width: 2,
    backgroundColor: COLORS.neutral,
  },
  encorajamentoContainer: {
    backgroundColor: COLORS.success,
    borderRadius: 20,
    padding: 15,
    marginBottom: 30,
    width: '100%',
  },
  encorajamento: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '600',
  },
  botoesContainer: {
    width: '100%',
    gap: 10,
  },
  finalMessageContainer: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  finalMessage: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  botao: {
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  botaoRecomecar: {
    backgroundColor: COLORS.primary,
  },
  botaoVoltar: {
    backgroundColor: COLORS.secondary,
  },
  botaoTexto: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TelaPontuacaoFinal;

