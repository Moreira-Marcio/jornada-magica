import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

// Telas novas
import TelaLogin from "./src/telas/TelaLogin.js";
import TelaCadastro from "./src/telas/TelaCadastro.js";
import TelaEscolherAvatar from "./src/telas/TelaEscolherAvatar.js";
import TelaEscolherTarefas from "./src/telas/TelaEscolherTarefas.js";

// Telas existentes
import MapScreen from "./src/screens/MapScreen";
import ActivityScreen from "./src/screens/ActivityScreen";
import FeedbackScreen from "./src/screens/FeedbackScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 400,
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 400,
              },
            },
          },
        }}
      >
        {/* Fluxo de Autenticação */}
        <Stack.Screen name="Login" component={TelaLogin} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} />
        <Stack.Screen name="EscolherAvatar" component={TelaEscolherAvatar} />
        <Stack.Screen name="EscolherTarefas" component={TelaEscolherTarefas} />

        {/* Fluxo Principal do App */}
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Activity" component={ActivityScreen} />
        <Stack.Screen name="Feedback" component={FeedbackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
