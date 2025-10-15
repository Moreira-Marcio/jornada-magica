import React from "react";
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

const ActivityScreen = ({ route, navigation }) => {
  const { activity, isCompleted, onComplete, onSkip } = route.params;
  const scaleAnimRef = React.useRef(new Animated.Value(0));
  const scaleAnim = scaleAnimRef.current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const handleComplete = () => {
    onComplete(activity.id);
    navigation.navigate("Feedback", {
      success: true,
      activityTitle: activity.title,
    });
  };

  const handleSkip = () => {
    onSkip(activity.id);
    navigation.navigate("Feedback", {
      success: false,
      activityTitle: activity.title,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.avatarSection}>
            <Avatar animated={true} />
            <View style={styles.speechBubble}>
              <Text style={styles.speechText}>Vamos fazer essa atividade?</Text>
            </View>
          </View>

          <View style={styles.activityInfo}>
            <Text style={styles.icon}>{activity.icon}</Text>
            <Text style={styles.title}>{activity.title}</Text>
            <Text style={styles.description}>{activity.description}</Text>
          </View>

          {isCompleted && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>✓ Já completada!</Text>
            </View>
          )}

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.successButton]}
              onPress={handleComplete}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>✓ Consegui!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.skipButton]}
              onPress={handleSkip}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Não consegui hoje</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Voltar ao mapa</Text>
        </TouchableOpacity>
      </View>
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
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  speechBubble: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 15,
    marginTop: 15,
    maxWidth: "80%",
  },
  speechText: {
    color: COLORS.white,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  activityInfo: {
    alignItems: "center",
    marginVertical: 20,
  },
  icon: {
    fontSize: 80,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: COLORS.textLight,
    textAlign: "center",
    lineHeight: 24,
  },
  completedBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  completedText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonsContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successButton: {
    backgroundColor: COLORS.success,
  },
  skipButton: {
    backgroundColor: COLORS.secondary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    alignItems: "center",
    padding: 15,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ActivityScreen;
