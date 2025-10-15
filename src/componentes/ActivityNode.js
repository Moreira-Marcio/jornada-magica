import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../utils/constants';

const ActivityNode = ({ activity, isCompleted, isLocked, isCurrent, onPress }) => {
  const getNodeStyle = () => {
    if (isCompleted) return styles.completed;
    if (isLocked) return styles.locked;
    if (isCurrent) return styles.current;
    return styles.available;
  };

  return (
    <TouchableOpacity
      style={[styles.container, getNodeStyle()]}
      onPress={onPress}
      disabled={isLocked}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{activity.icon}</Text>
      </View>
      {isCompleted && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
      {isLocked && (
        <View style={styles.lock}>
          <Text style={styles.lockText}>🔒</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 32,
  },
  completed: {
    backgroundColor: COLORS.success,
    borderColor: '#5FA77F',
  },
  locked: {
    backgroundColor: COLORS.neutral,
    borderColor: COLORS.locked,
    opacity: 0.6,
  },
  current: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 5,
  },
  available: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.secondary,
  },
  checkmark: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  checkmarkText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  lock: {
    position: 'absolute',
    top: 20,
    fontSize: 20,
  },
  lockText: {
    fontSize: 20,
  },
});

export default ActivityNode;
