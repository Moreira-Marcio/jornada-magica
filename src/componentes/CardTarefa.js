import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/constants';

const CardTarefa = ({ tarefa, selecionada, aoSelecionar }) => {
  return (
    <TouchableOpacity
      style={[styles.container, selecionada && styles.selecionada]}
      onPress={aoSelecionar}
      activeOpacity={0.7}
    >
      <View style={styles.iconeContainer}>
        <Text style={styles.icone}>{tarefa.icon}</Text>
      </View>
      
      <View style={styles.conteudo}>
        <Text style={styles.titulo}>{tarefa.title}</Text>
        <Text style={styles.descricao} numberOfLines={2}>
          {tarefa.description}
        </Text>
      </View>

      <View style={[styles.checkbox, selecionada && styles.checkboxSelecionado]}>
        {selecionada && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.neutral,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selecionada: {
    borderColor: COLORS.success,
    borderWidth: 3,
    backgroundColor: COLORS.background,
  },
  iconeContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  icone: {
    fontSize: 32,
  },
  conteudo: {
    flex: 1,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  descricao: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 18,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: COLORS.neutral,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  checkboxSelecionado: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CardTarefa;

