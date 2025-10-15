import React, { useEffect, useRef } from "react";
import { StyleSheet, Animated as RNAnimated, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "../utils/constants";

// Create animated Path component
const AnimatedPath = RNAnimated.createAnimatedComponent(Path);

const PathLine = ({ fromPosition, toPosition, width, height }) => {
  // Calcula as coordenadas em pixels
  const x1 = fromPosition.x * width;
  const y1 = fromPosition.y * height;
  const x2 = toPosition.x * width;
  const y2 = toPosition.y * height;

  // Cria uma curva suave entre os pontos (curva de Bézier)
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  // Pontos de controle para criar uma curva suave
  const controlX = midX + (x2 - x1) * 0.2;
  const controlY = midY;

  const pathData = `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
  // approximation of path length based on control points
  const dx = x2 - x1;
  const dy = y2 - y1;
  const straightDist = Math.hypot(dx, dy);
  // factor to compensate for curve length
  const approxLen = Math.max(30, Math.floor(straightDist * 1.8));

  // animation values
  const dashOffset = useRef(new RNAnimated.Value(approxLen)).current;
  const opacity = useRef(new RNAnimated.Value(0)).current;
  const progress = useRef(new RNAnimated.Value(0)).current; // 0..1 for fallback bar

  useEffect(() => {
    // reset values in case positions changed
    dashOffset.setValue(approxLen);
    opacity.setValue(0);
    progress.setValue(0);

    // Animate dash offset and fade-in
    RNAnimated.parallel([
      RNAnimated.timing(dashOffset, {
        toValue: 0,
        duration: 800,
        useNativeDriver: false,
      }),
      RNAnimated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }),
      RNAnimated.timing(progress, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }),
    ]).start();
  }, [dashOffset, opacity, approxLen]);

  return (
    <Svg height={height} width={width} style={styles.svg}>
      <AnimatedPath
        d={pathData}
        stroke={COLORS.path}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`12, 8`}
        strokeDashoffset={dashOffset}
        opacity={opacity}
      />
      {/* Fallback progress bar: a straight animated View from (x1,y1) to (x2,y2) */}
      <RNAnimated.View
        style={{
          position: "absolute",
          left: x1,
          top: y1,
          width: straightDist,
          height: 8,
          transform: [
            { translateX: 0 },
            { translateY: -4 }, // centro vertical
            { rotate: `${Math.atan2(dy, dx)}rad` },
            { translateX: -straightDist / 2 },
            { scaleX: progress },
            { translateX: straightDist / 2 },
          ],
          backgroundColor: COLORS.path,
          borderRadius: 4,
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0.0, 1.0],
          }),
        }}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

export default PathLine;
