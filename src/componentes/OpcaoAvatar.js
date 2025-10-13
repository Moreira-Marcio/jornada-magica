import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../utils/constants";

const OpcaoAvatar = ({ avatar, selecionado, aoSelecionar }) => {
  return (
    <TouchableOpacity
      style={[styles.container, selecionado && styles.selecionado]}
      onPress={aoSelecionar}
      activeOpacity={0.7}
    >
      <View
        style={[styles.avatarContainer, { backgroundColor: avatar.corPele }]}
      >
        <View style={styles.cabeca}>
          <View style={styles.olhosContainer}>
            <View style={styles.olho} />
            <View style={styles.olho} />
          </View>
          <View style={styles.sorriso} />
        </View>
        <View style={[styles.corpo, { backgroundColor: avatar.corRoupa }]} />
      </View>
      <Text style={styles.nome}>{avatar.nome}</Text>
      {selecionado && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 140,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    borderWidth: 3,
    borderColor: COLORS.neutral,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selecionado: {
    borderColor: COLORS.primary,
    borderWidth: 4,
    backgroundColor: COLORS.background,
  },
  avatarContainer: {
    width: 60,
    height: 70,
    alignItems: "center",
    borderRadius: 10,
    padding: 5,
  },
  cabeca: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E8B87D",
  },
  olhosContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 2,
  },
  olho: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2C3E50",
    marginHorizontal: 5,
  },
  sorriso: {
    width: 14,
    height: 7,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: "#2C3E50",
  },
  corpo: {
    width: 30,
    height: 25,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 2,
  },
  nome: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 10,
    textAlign: "center",
  },
  checkmark: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmarkText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OpcaoAvatar;
