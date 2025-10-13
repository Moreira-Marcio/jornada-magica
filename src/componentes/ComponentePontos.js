import React from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { COLORS } from '../utils/constants';

const ComponentePontos = ({ pontos, animado = false }) => {
  const scaleAnim = new Animated.Value(1);

  React.useEffect(() => {
    if (animado) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [pontos]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.estrelaContainer}>
        <Text style={styles.estrela}>⭐</Text>
      </View>
      <Text style={styles.pontos}>{pontos}</Text>
      <Text style={styles.label}>pontos</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  estrelaContainer: {
    marginBottom: 5,
  },
  estrela: {
    fontSize: 32,
  },
  pontos: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  label: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 2,
  },
});

export default ComponentePontos;

