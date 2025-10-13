import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { COLORS } from '../utils/constants';

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

  return (
    <Svg height={height} width={width} style={styles.svg}>
      <Path
        d={pathData}
        stroke={COLORS.path}
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="10, 5"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default PathLine;

