import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../utils/constants';
import Avatar from '../components/Avatar';

const TelaRespostaTarefa = ({ route, navigation }) => {
  const { tarefa, conseguiu, pontos, onContinuar } = route.params;
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const confettiAnims = useRef(
    [...Array(12)].map(() => ({
      translateY: new Animated.Value(0),
      translateX: new Animated.Value(0),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }))
  ).current;

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

    // Animação de confete se conseguiu
    if (conseguiu) {
      confettiAnims.forEach((anim, index) => {
        const angle = (index / confettiAnims.length) * Math.PI * 2;
        const distance = 180;

        Animated.parallel([
          Animated.timing(anim.translateY, {
            toValue: Math.sin(angle) * distance,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateX, {
            toValue: Math.cos(angle) * distance,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(anim.rotate, {
            toValue: 360,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(anim.opacity, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, []);

  const handleContinuar = () => {
    onContinuar();
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: conseguiu ? COLORS.success : COLORS.secondary },
      ]}
    >
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Confete para sucesso */}
        {conseguiu && (
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
                          inputRange: [0, 360],
                          outputRange: ['0deg', '360deg'],
                        }),
                      },
                    ],
                    opacity: anim.opacity,
                  },
                ]}
              />
            ))}
          </View>
        )}

        <View style={styles.card}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Avatar animated={true} />
          </View>

          {/* Ícone da Tarefa */}
          <Text style={styles.tarefaIcon}>{tarefa.icon}</Text>

          {/* Mensagem */}
          <View style={styles.messageContainer}>
            <Text style={styles.emoji}>{conseguiu ? '🎉' : '💙'}</Text>
            <Text style={styles.titulo}>
              {conseguiu ? 'Conseguimos!' : 'Tudo bem!'}
            </Text>
            <Text style={styles.mensagem}>
              {conseguiu
                ? `Você fez ${tarefa.title.toLowerCase()}! Estou muito orgulhoso de você!`
                : `Sem problemas, amanhã a gente consegue! O importante é que você está tentando. 😊`}
            </Text>
          </View>

          {/* Pontos Ganhos */}
          {conseguiu && (
            <View style={styles.pontosContainer}>
              <Text style={styles.pontosLabel}>Você ganhou</Text>
              <View style={styles.pontosBadge}>
                <Text style={styles.estrela}>⭐</Text>
                <Text style={styles.pontosValor}>+{pontos}</Text>
              </View>
              <Text style={styles.pontosLabel}>pontos!</Text>
            </View>
          )}

          {/* Botão Continuar */}
          <TouchableOpacity
            style={[
              styles.botao,
              { backgroundColor: conseguiu ? COLORS.primary : COLORS.textLight },
            ]}
            onPress={handleContinuar}
            activeOpacity={0.8}
          >
            <Text style={styles.botaoTexto}>Próxima tarefa →</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  confettiContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confetti: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 40,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  tarefaIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  mensagem: {
    fontSize: 18,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 26,
  },
  pontosContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    width: '100%',
  },
  pontosLabel: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  pontosBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  estrela: {
    fontSize: 32,
    marginRight: 10,
  },
  pontosValor: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  botao: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  botaoTexto: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TelaRespostaTarefa;

