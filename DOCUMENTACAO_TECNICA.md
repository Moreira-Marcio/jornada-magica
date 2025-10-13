# 📚 Documentação Técnica - Jornada Mágica

## Visão Geral do Projeto

**Jornada Mágica** é um aplicativo React Native desenvolvido especialmente para crianças autistas, focado em auxiliar na realização de atividades diárias através de uma interface visual amigável, com reforço positivo constante e animações suaves.

## Arquitetura do Aplicativo

### Stack Tecnológico

- **Framework**: React Native (via Expo)
- **Navegação**: React Navigation v7 (Stack Navigator)
- **Animações**: React Native Reanimated v4
- **Persistência**: AsyncStorage
- **Gráficos**: React Native SVG
- **Gestos**: React Native Gesture Handler

### Estrutura de Diretórios

```
atividades-escolinha/
├── App.js                          # Ponto de entrada, configuração de navegação
├── index.js                        # Registro do componente raiz
├── babel.config.js                 # Configuração do Babel
├── package.json                    # Dependências e scripts
│
├── src/
│   ├── screens/                    # Telas do aplicativo
│   │   ├── MapScreen.js           # Tela principal com mapa de atividades
│   │   ├── ActivityScreen.js      # Tela de atividade individual
│   │   └── FeedbackScreen.js      # Tela de feedback positivo
│   │
│   ├── components/                 # Componentes reutilizáveis
│   │   ├── Avatar.js              # Componente do avatar animado
│   │   ├── ActivityNode.js        # Nó de atividade no mapa
│   │   └── PathLine.js            # Linha conectando atividades
│   │
│   ├── utils/                      # Utilitários e constantes
│   │   └── constants.js           # Cores, atividades, configurações
│   │
│   └── assets/                     # Recursos (vazio, pronto para uso)
│
└── assets/                         # Assets do Expo (ícones, splash)
```

## Componentes Principais

### 1. MapScreen (Tela do Mapa)

**Responsabilidades:**
- Exibir mapa de atividades estilo Candy Crush
- Gerenciar estado de progresso das atividades
- Animar avatar entre posições
- Persistir progresso usando AsyncStorage

**Estados:**
```javascript
completedActivities: Array<number>  // IDs das atividades completadas
currentActivityId: number           // ID da atividade atual
avatarPosition: Animated.ValueXY    // Posição animada do avatar
```

**Funcionalidades:**
- `loadProgress()`: Carrega progresso salvo
- `handleActivityPress()`: Navega para tela de atividade
- `handleActivityComplete()`: Marca atividade como completada
- `handleActivitySkip()`: Retorna ao mapa sem completar

### 2. ActivityScreen (Tela de Atividade)

**Responsabilidades:**
- Apresentar atividade individual
- Exibir avatar encorajador
- Fornecer opções de completar ou pular

**Props:**
```javascript
activity: {
  id: number,
  title: string,
  description: string,
  icon: string,
  position: { x: number, y: number }
}
isCompleted: boolean
onComplete: (activityId: number) => void
onSkip: () => void
```

**Animações:**
- Entrada com escala (spring animation)
- Avatar com bounce contínuo

### 3. FeedbackScreen (Tela de Feedback)

**Responsabilidades:**
- Exibir feedback positivo
- Animar confete em caso de sucesso
- Fornecer mensagem encorajadora

**Props:**
```javascript
success: boolean        // true = completou, false = não completou
activityTitle: string   // Nome da atividade
```

**Animações:**
- Fade in e scale para entrada
- Confete radial em 8 direções (apenas sucesso)
- Rotação e fade out do confete

### 4. Avatar (Componente)

**Responsabilidades:**
- Renderizar personagem escolinha
- Animar movimento de bounce
- Suportar animação de celebração

**Estrutura Visual:**
```
Avatar
├── Cabeça (círculo bege)
│   ├── Olhos (2 círculos pretos)
│   └── Sorriso (arco)
└── Corpo (retângulo azul)
    └── Camisa
```

**Animações:**
- Bounce vertical contínuo (800ms loop)
- Scale para celebração (opcional)

### 5. ActivityNode (Componente)

**Responsabilidades:**
- Renderizar nó de atividade no mapa
- Indicar estado visual (completada, atual, bloqueada)
- Responder a toques

**Estados Visuais:**
```javascript
completed: verde com checkmark
current: branco com borda azul grossa
locked: cinza com cadeado
available: branco com borda verde
```

### 6. PathLine (Componente)

**Responsabilidades:**
- Desenhar linha conectando atividades
- Usar curva de Bézier para suavidade

**Algoritmo:**
```javascript
// Calcula curva suave entre dois pontos
const midX = (x1 + x2) / 2;
const midY = (y1 + y2) / 2;
const controlX = midX + (x2 - x1) * 0.2;
const pathData = `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
```

## Sistema de Navegação

### Stack Navigator

```javascript
<Stack.Navigator>
  <Stack.Screen name="Map" component={MapScreen} />
  <Stack.Screen name="Activity" component={ActivityScreen} />
  <Stack.Screen name="Feedback" component={FeedbackScreen} />
</Stack.Navigator>
```

### Fluxo de Navegação

```
Map → Activity → Feedback → Map
 ↑                           ↓
 └───────────────────────────┘
```

**Transições:**
- Duração: 400ms
- Tipo: Fade (opacity)
- Sem header (headerShown: false)

## Sistema de Persistência

### AsyncStorage

**Chave:** `completedActivities`
**Formato:** JSON array de IDs

```javascript
// Salvar
await AsyncStorage.setItem('completedActivities', JSON.stringify([1, 2, 3]));

// Carregar
const saved = await AsyncStorage.getItem('completedActivities');
const completed = JSON.parse(saved);
```

## Sistema de Animações

### Princípios para Autismo

1. **Previsibilidade**: Mesmas animações sempre
2. **Suavidade**: Transições lentas (400-800ms)
3. **Simplicidade**: Movimentos simples e claros
4. **Consistência**: Padrões repetidos

### Tipos de Animação

**Spring (Mola):**
```javascript
Animated.spring(value, {
  toValue: 1,
  tension: 50,    // Rigidez da mola
  friction: 7,    // Resistência
  useNativeDriver: true
});
```

**Timing (Linear):**
```javascript
Animated.timing(value, {
  toValue: 1,
  duration: 400,
  useNativeDriver: true
});
```

**Loop (Repetição):**
```javascript
Animated.loop(
  Animated.sequence([...])
).start();
```

## Design System

### Paleta de Cores

```javascript
background: '#F5F7FA'   // Azul muito claro (fundo)
primary: '#6B9BD1'      // Azul suave (principal)
secondary: '#A8D5BA'    // Verde suave (secundário)
success: '#7EC699'      // Verde claro (sucesso)
warning: '#FFD166'      // Amarelo (aviso)
neutral: '#E8E8E8'      // Cinza claro (neutro)
text: '#2C3E50'         // Cinza escuro (texto)
textLight: '#7F8C8D'    // Cinza médio (texto secundário)
```

### Tipografia

- **Título**: 28-32px, bold
- **Subtítulo**: 16-18px, regular
- **Corpo**: 14-16px, regular
- **Botão**: 18-20px, bold

### Espaçamento

- **Pequeno**: 8-10px
- **Médio**: 15-20px
- **Grande**: 30-40px

### Bordas

- **Botões**: 25px (muito arredondado)
- **Cards**: 30px (muito arredondado)
- **Nós**: 35px (circular)

## Configuração de Atividades

### Estrutura de Atividade

```javascript
{
  id: number,              // ID único sequencial
  title: string,           // Nome curto
  description: string,     // Descrição clara
  icon: string,            // Emoji representativo
  position: {
    x: number,            // 0-1 (esquerda-direita)
    y: number             // 0-1 (topo-fundo)
  }
}
```

### Posicionamento no Mapa

O mapa usa coordenadas relativas (0-1) que são convertidas para pixels:

```javascript
const pixelX = position.x * SCREEN_WIDTH;
const pixelY = position.y * MAP_HEIGHT;
```

**Padrão Zigue-Zague:**
```javascript
{ x: 0.5, y: 0.1 }  // Centro-topo
{ x: 0.3, y: 0.25 } // Esquerda
{ x: 0.7, y: 0.4 }  // Direita
{ x: 0.4, y: 0.55 } // Esquerda
{ x: 0.6, y: 0.7 }  // Direita
{ x: 0.5, y: 0.85 } // Centro-fundo
```

## Performance

### Otimizações

1. **useNativeDriver**: Todas as animações usam driver nativo
2. **Memoization**: Componentes podem usar React.memo se necessário
3. **Lazy Loading**: Telas carregadas sob demanda
4. **AsyncStorage**: Operações assíncronas não bloqueiam UI

### Considerações

- Mapa com altura 1.2x da tela para scroll suave
- Máximo 8 confetes para evitar sobrecarga
- Animações com duração fixa (não infinitas, exceto bounce)

## Acessibilidade para Autismo

### Implementações

1. **Visual**
   - Alto contraste
   - Elementos grandes (mínimo 44x44px)
   - Espaçamento generoso

2. **Comportamental**
   - Sem surpresas
   - Feedback imediato
   - Sempre reforço positivo

3. **Cognitivo**
   - Instruções simples
   - Uma ação por vez
   - Progresso visual claro

## Extensibilidade

### Adicionar Nova Tela

1. Criar arquivo em `src/screens/`
2. Adicionar rota no `App.js`
3. Implementar navegação

### Adicionar Novo Componente

1. Criar arquivo em `src/components/`
2. Exportar componente
3. Importar onde necessário

### Adicionar Sons

1. Instalar `expo-av`
2. Adicionar arquivos em `src/assets/sounds/`
3. Implementar reprodução

### Adicionar Imagens

1. Adicionar arquivos em `src/assets/images/`
2. Importar com `require()`
3. Usar em `<Image>` ou `<ImageBackground>`

## Testes

### Testar no Expo Go

```bash
npm start
# Escanear QR code no celular
```

### Testar no Navegador

```bash
npm run web
```

### Testar Build Nativo

```bash
# Android
npm run android

# iOS (apenas macOS)
npm run ios
```

## Deployment

### Publicar no Expo

```bash
expo publish
```

### Build APK (Android)

```bash
expo build:android
```

### Build IPA (iOS)

```bash
expo build:ios
```

## Manutenção

### Atualizar Dependências

```bash
npm update
```

### Limpar Cache

```bash
npm start -- --clear
```

### Resetar Projeto

```bash
rm -rf node_modules
npm install
```

## Troubleshooting

### Erro de Navegação

- Verificar se `react-native-gesture-handler` está importado no `App.js`
- Verificar se todas as rotas estão definidas

### Erro de Animação

- Verificar se `react-native-reanimated/plugin` está no `babel.config.js`
- Limpar cache: `npm start -- --clear`

### Erro de AsyncStorage

- Verificar se `@react-native-async-storage/async-storage` está instalado
- Verificar permissões no dispositivo

---

## Contato e Suporte

Para dúvidas técnicas, consulte:
- Documentação do React Native: https://reactnative.dev/
- Documentação do Expo: https://docs.expo.dev/
- Documentação do React Navigation: https://reactnavigation.org/

---

**Desenvolvido com ❤️ para inclusão e acessibilidade**

