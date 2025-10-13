import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { COLORS } from '../utils/constants';

const InputPersonalizado = ({
  rotulo,
  icone,
  valor,
  aoMudar,
  placeholder,
  senhaSegura = false,
  tipoTeclado = 'default',
  autoCapitalize = 'sentences',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.rotulo}>
        {icone} {rotulo}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        value={valor}
        onChangeText={aoMudar}
        secureTextEntry={senhaSegura}
        keyboardType={tipoTeclado}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  rotulo: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: COLORS.text,
    borderWidth: 2,
    borderColor: COLORS.neutral,
  },
});

export default InputPersonalizado;

