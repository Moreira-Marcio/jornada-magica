# 🎨 Guia de Personalização - Jornada Mágica

## Como Personalizar o Aplicativo para Suas Necessidades

### 1. Adicionar ou Modificar Atividades

Abra o arquivo: `src/utils/constants.js`

Encontre a seção `ACTIVITIES` e edite:

```javascript
export const ACTIVITIES = [
  {
    id: 1,                              // ID único (sequencial)
    title: 'Escovar os dentes',         // Nome da atividade
    description: 'Escove seus dentes por 2 minutos',  // Descrição
    icon: '🦷',                         // Emoji (escolha um adequado)
    position: { x: 0.5, y: 0.1 },      // Posição no mapa (0 a 1)
  },
  // Adicione mais atividades aqui...
];
```

#### Dicas para Posicionamento:
- **x**: 0 = esquerda, 0.5 = centro, 1 = direita
- **y**: 0 = topo, 0.5 = meio, 1 = fundo
- Alterne entre esquerda e direita para criar o efeito "zigue-zague"

#### Exemplos de Atividades:

```javascript
// Rotina Matinal
{ id: 1, title: 'Acordar', icon: '⏰', position: { x: 0.5, y: 0.1 } },
{ id: 2, title: 'Escovar os dentes', icon: '🦷', position: { x: 0.3, y: 0.2 } },
{ id: 3, title: 'Tomar banho', icon: '🚿', position: { x: 0.7, y: 0.3 } },

// Rotina Escolar
{ id: 1, title: 'Chegar na escola', icon: '🏫', position: { x: 0.5, y: 0.1 } },
{ id: 2, title: 'Guardar mochila', icon: '🎒', position: { x: 0.3, y: 0.2 } },
{ id: 3, title: 'Sentar na carteira', icon: '🪑', position: { x: 0.7, y: 0.3 } },

// Rotina de Estudos
{ id: 1, title: 'Fazer lição de casa', icon: '📝', position: { x: 0.5, y: 0.1 } },
{ id: 2, title: 'Ler um livro', icon: '📚', position: { x: 0.3, y: 0.2 } },
{ id: 3, title: 'Revisar matéria', icon: '📖', position: { x: 0.7, y: 0.3 } },
```

### 2. Alterar Cores do Aplicativo

No mesmo arquivo `src/utils/constants.js`, encontre `COLORS`:

```javascript
export const COLORS = {
  background: '#F5F7FA',    // Cor de fundo do app
  primary: '#6B9BD1',       // Cor principal (azul)
  secondary: '#A8D5BA',     // Cor secundária (verde)
  success: '#7EC699',       // Cor de sucesso
  warning: '#FFD166',       // Cor de aviso
  neutral: '#E8E8E8',       // Cor neutra (cinza claro)
  text: '#2C3E50',          // Cor do texto principal
  textLight: '#7F8C8D',     // Cor do texto secundário
  white: '#FFFFFF',         // Branco
  completed: '#7EC699',     // Cor de atividade completada
  locked: '#BDC3C7',        // Cor de atividade bloqueada
  path: '#D4E2F4',          // Cor do caminho no mapa
};
```

#### Paletas de Cores Sugeridas:

**Tons Pastéis (Suave):**
```javascript
primary: '#A8D5E2',
secondary: '#F9C5D5',
success: '#B4E7CE',
```

**Tons Quentes:**
```javascript
primary: '#FFB347',
secondary: '#FFD700',
success: '#98D8C8',
```

**Tons Frios:**
```javascript
primary: '#7EC8E3',
secondary: '#A8D5E2',
success: '#B4E7CE',
```

### 3. Personalizar Mensagens de Feedback

#### Mensagem de Sucesso

Abra: `src/screens/FeedbackScreen.js`

Encontre a linha:
```javascript
{success
  ? `Você conseguiu ${activityTitle.toLowerCase()}! Estou muito orgulhoso de você!`
  : '...'}
```

Altere para:
```javascript
{success
  ? `Incrível! Você fez ${activityTitle.toLowerCase()}! Continue assim!`
  : '...'}
```

#### Mensagem de Não Completou

Na mesma linha, altere:
```javascript
: 'Sem problemas, amanhã tentamos de novo! O importante é que você está tentando. 😊'
```

Para:
```javascript
: 'Tudo bem! Vamos tentar outra hora. Você é capaz! 💙'
```

### 4. Ajustar Velocidade das Animações

No arquivo `src/utils/constants.js`:

```javascript
export const ANIMATION_DURATION = 400;  // Duração em milissegundos
```

- **Mais rápido**: 200-300ms
- **Normal**: 400-500ms
- **Mais lento**: 600-800ms

### 5. Modificar Tamanho do Avatar

No mesmo arquivo:

```javascript
export const AVATAR_SIZE = 60;  // Tamanho em pixels
```

- **Pequeno**: 40-50
- **Médio**: 60-70
- **Grande**: 80-100

### 6. Personalizar o Avatar

Abra: `src/components/Avatar.js`

Você pode alterar:

**Cor da pele:**
```javascript
backgroundColor: '#FFD8A8',  // Tom de pele
```

**Cor da roupa:**
```javascript
backgroundColor: COLORS.primary,  // Cor da camisa
```

### 7. Alterar Textos dos Botões

#### Tela de Atividade

Abra: `src/screens/ActivityScreen.js`

```javascript
<Text style={styles.buttonText}>✓ Consegui!</Text>
// Altere para: "Fiz!", "Completei!", etc.

<Text style={styles.buttonText}>Não consegui hoje</Text>
// Altere para: "Depois eu tento", "Agora não", etc.
```

### 8. Adicionar Sons (Opcional)

Para adicionar sons de feedback:

1. Instale a biblioteca:
```bash
npm install expo-av
```

2. Adicione sons na pasta `src/assets/sounds/`

3. Importe e use em `FeedbackScreen.js`:
```javascript
import { Audio } from 'expo-av';

const playSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/sounds/success.mp3')
  );
  await sound.playAsync();
};
```

### 9. Resetar Progresso

Para resetar o progresso da criança, adicione um botão na tela do mapa:

Em `src/screens/MapScreen.js`, adicione:

```javascript
import { Alert } from 'react-native';

const resetProgress = async () => {
  Alert.alert(
    'Resetar Progresso',
    'Tem certeza que deseja resetar todo o progresso?',
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Resetar',
        onPress: async () => {
          await AsyncStorage.removeItem('completedActivities');
          setCompletedActivities([]);
          setCurrentActivityId(1);
        },
      },
    ]
  );
};
```

### 10. Dicas de Personalização para Autismo

#### Reduzir Estímulos Visuais:
- Use cores mais neutras
- Reduza o número de confetes na animação
- Diminua a velocidade das animações

#### Aumentar Clareza:
- Use fontes maiores
- Aumente o espaçamento entre elementos
- Use descrições mais detalhadas

#### Previsibilidade:
- Mantenha sempre a mesma ordem de atividades
- Não mude cores ou posições frequentemente
- Use os mesmos emojis para atividades similares

---

## 🔄 Aplicar Mudanças

Após fazer qualquer alteração:

1. Salve o arquivo
2. O aplicativo recarregará automaticamente
3. Se não recarregar, pressione `r` no terminal

---

## 💡 Precisa de Ajuda?

Se tiver dúvidas sobre personalização, consulte os arquivos de código - eles têm comentários explicativos!

**Divirta-se personalizando! 🎨**

