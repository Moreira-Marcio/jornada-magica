import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { COLORS } from "../utils/constants";
import Avatar from "../componentes/Avatar";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACTIVITIES } from '../utils/constants';

const FeedbackScreen = ({ route, navigation }) => {
  const { success, activityTitle } = route.params;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const confettiAnims = useRef(
    [...Array(8)].map(() => ({
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

    // Animação de confete se for sucesso
    if (success) {
      confettiAnims.forEach((anim, index) => {
        const angle = (index / confettiAnims.length) * Math.PI * 2;
        const distance = 150;

        Animated.parallel([
          Animated.timing(anim.translateY, {
            toValue: Math.sin(angle) * distance,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateX, {
            toValue: Math.cos(angle) * distance,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.rotate, {
            toValue: 360,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.opacity, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
      });
    }
  }, []);

  const handleContinue = async () => {
    try {
      // carrega o progresso atual
      const saved = await AsyncStorage.getItem('completedActivities');
      const completed = saved ? JSON.parse(saved) : [];

      // inclui esta atividade se ainda nao estiver (no caso de skip/complete já terem atualizado, pode ser redundante)
      const activityId = route.params?.activityId;
      const completedSet = new Set(completed);
      if (activityId && !completedSet.has(activityId)) {
        completedSet.add(activityId);
      }

      const completedArray = Array.from(completedSet).sort((a,b)=>a-b);

      // se completou todas as atividades, vai para a tela de pontuação final
      if (completedArray.length >= ACTIVITIES.length) {
        const pontosTotais = completedArray.length * 10;
        // reseta a pilha para evitar voltar para as telas anteriores
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'PontuacaoFinal',
              params: {
                pontosTotais,
                tarefasCompletadas: completedArray.length,
                totalTarefas: ACTIVITIES.length,
              },
            },
          ],
        });
      } else {
        // caso contrário retorna para o mapa
        navigation.navigate('Map');
      }
    } catch (error) {
      console.error('Erro avaliando progresso:', error);
      navigation.navigate('Map');
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: success ? COLORS.success : COLORS.secondary },
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
        {success && (
          <View style={styles.confettiContainer}>
            {confettiAnims.map((anim, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.confetti,
                  {
                    backgroundColor: [
                      "#FFD166",
                      "#7EC699",
                      "#6B9BD1",
                      "#A8D5BA",
                    ][index % 4],
                    transform: [
                      { translateX: anim.translateX },
                      { translateY: anim.translateY },
                      {
                        rotate: anim.rotate.interpolate({
                          inputRange: [0, 360],
                          outputRange: ["0deg", "360deg"],
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
          <Avatar animated={true} />

          <View style={styles.messageContainer}>
            <Text style={styles.emoji}>{success ? "🎉" : "💙"}</Text>
            <Text style={styles.title}>
              {success ? "Parabéns!" : "Tudo bem!"}
            </Text>
            <Text style={styles.message}>
              {success
                ? `Você conseguiu ${activityTitle.toLowerCase()}! Estou muito orgulhoso de você!`
                : "Sem problemas, amanhã tentamos de novo! O importante é que você está tentando. 😊"}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: success ? COLORS.primary : COLORS.textLight },
            ]}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continuar jornada</Text>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  confettiContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  confetti: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 40,
    alignItems: "center",
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  messageContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 15,
  },
  message: {
    fontSize: 18,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 26,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FeedbackScreen;
