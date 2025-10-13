import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { COLORS, AVATAR_SIZE } from '../utils/constants';

const Avatar = ({ position, animated = false }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animação de pulo suave
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const celebrate = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateY: animated ? bounceAnim : 0 },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <View style={styles.avatar}>
        <View style={styles.head}>
          <View style={styles.eyesContainer}>
            <View style={styles.eye} />
            <View style={styles.eye} />
          </View>
          <View style={styles.smile} />
        </View>
        <View style={styles.body}>
          <View style={styles.shirt} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    alignItems: 'center',
  },
  head: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#FFD8A8',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#E8B87D',
  },
  eyesContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 2,
  },
  eye: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#2C3E50',
    marginHorizontal: 4,
  },
  smile: {
    width: 12,
    height: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#2C3E50',
  },
  body: {
    width: 25,
    height: 20,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginTop: 2,
  },
  shirt: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default Avatar;

