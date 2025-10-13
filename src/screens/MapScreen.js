import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, ACTIVITIES } from '../utils/constants';
import ActivityNode from '../components/ActivityNode';
import PathLine from '../components/PathLine';
import Avatar from '../components/Avatar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_HEIGHT = SCREEN_HEIGHT * 1.2;

const MapScreen = ({ navigation }) => {
  const [completedActivities, setCompletedActivities] = useState([]);
  const [currentActivityId, setCurrentActivityId] = useState(1);
  const avatarPosition = new Animated.ValueXY({ x: 0, y: 0 });

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    // Anima o avatar para a posição da atividade atual
    const currentActivity = ACTIVITIES.find(a => a.id === currentActivityId);
    if (currentActivity) {
      Animated.spring(avatarPosition, {
        toValue: {
          x: currentActivity.position.x * SCREEN_WIDTH - 30,
          y: currentActivity.position.y * MAP_HEIGHT - 30,
        },
        useNativeDriver: false,
        tension: 50,
        friction: 7,
      }).start();
    }
  }, [currentActivityId]);

  const loadProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem('completedActivities');
      if (saved) {
        const completed = JSON.parse(saved);
        setCompletedActivities(completed);
        setCurrentActivityId(completed.length + 1);
      }
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    }
  };

  const handleActivityPress = (activity) => {
    const isCompleted = completedActivities.includes(activity.id);
    const isLocked = activity.id > currentActivityId;
    
    if (!isLocked) {
      navigation.navigate('Activity', {
        activity,
        isCompleted,
        onComplete: handleActivityComplete,
        onSkip: handleActivitySkip,
      });
    }
  };

  const handleActivityComplete = async (activityId) => {
    if (!completedActivities.includes(activityId)) {
      const updated = [...completedActivities, activityId];
      setCompletedActivities(updated);
      setCurrentActivityId(activityId + 1);
      
      try {
        await AsyncStorage.setItem('completedActivities', JSON.stringify(updated));
      } catch (error) {
        console.error('Erro ao salvar progresso:', error);
      }
    }
  };

  const handleActivitySkip = () => {
    // Não avança, mas volta ao mapa
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Jornada Mágica</Text>
        <Text style={styles.subtitle}>
          {completedActivities.length} de {ACTIVITIES.length} atividades
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.mapContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.map, { height: MAP_HEIGHT }]}>
          {/* Desenha as linhas conectando as atividades */}
          {ACTIVITIES.map((activity, index) => {
            if (index < ACTIVITIES.length - 1) {
              return (
                <PathLine
                  key={`path-${activity.id}`}
                  fromPosition={activity.position}
                  toPosition={ACTIVITIES[index + 1].position}
                  width={SCREEN_WIDTH}
                  height={MAP_HEIGHT}
                />
              );
            }
            return null;
          })}

          {/* Desenha os nós de atividades */}
          {ACTIVITIES.map((activity) => {
            const isCompleted = completedActivities.includes(activity.id);
            const isLocked = activity.id > currentActivityId;
            const isCurrent = activity.id === currentActivityId;

            return (
              <View
                key={activity.id}
                style={[
                  styles.nodeContainer,
                  {
                    left: activity.position.x * SCREEN_WIDTH - 35,
                    top: activity.position.y * MAP_HEIGHT - 35,
                  },
                ]}
              >
                <ActivityNode
                  activity={activity}
                  isCompleted={isCompleted}
                  isLocked={isLocked}
                  isCurrent={isCurrent}
                  onPress={() => handleActivityPress(activity)}
                />
                <Text style={styles.activityTitle}>{activity.title}</Text>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.neutral,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  scrollView: {
    flex: 1,
  },
  mapContainer: {
    paddingVertical: 20,
  },
  map: {
    width: SCREEN_WIDTH,
    position: 'relative',
  },
  nodeContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  activityTitle: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: '600',
    maxWidth: 100,
  },
  avatarContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
  },
});

export default MapScreen;

