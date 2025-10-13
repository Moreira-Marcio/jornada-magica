import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/constants';

const BotaoPersonalizado = ({
  texto,
  aoClicar,
  tipo = 'primario', // primario, secundario, sucesso
  desabilitado = false,
  icone = '',
}) => {
  const getButtonStyle = () => {
    if (desabilitado) return styles.desabilitado;
    
    switch (tipo) {
      case 'primario':
        return styles.primario;
      case 'secundario':
        return styles.secundario;
      case 'sucesso':
        return styles.sucesso;
      default:
        return styles.primario;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.botao, getButtonStyle()]}
      onPress={aoClicar}
      disabled={desabilitado}
      activeOpacity={0.8}
    >
      <Text style={styles.texto}>
        {icone} {texto}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  botao: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primario: {
    backgroundColor: COLORS.primary,
  },
  secundario: {
    backgroundColor: COLORS.secondary,
  },
  sucesso: {
    backgroundColor: COLORS.success,
  },
  desabilitado: {
    backgroundColor: COLORS.neutral,
    opacity: 0.6,
  },
  texto: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default BotaoPersonalizado;

