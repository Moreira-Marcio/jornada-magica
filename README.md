# Jornada Mágica - Aplicativo de Atividades para Crianças Autistas

Um aplicativo React Native desenvolvido especialmente para crianças autistas, com interface amigável, animações suaves e reforço positivo.

## 🌟 Características

- **Mapa de Atividades Estilo Candy Crush**: Caminho visual com pontos conectados
- **Avatar Animado**: Personagem escolinha que se move pelo mapa
- **Feedback Positivo**: Mensagens encorajadoras independente do resultado
- **Animações Suaves**: Transições gentis e previsíveis
- **Interface Adaptada**: Design limpo e claro para público autista
- **Progresso Persistente**: Salva automaticamente o progresso da criança

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go app (para testar no celular)

## 🚀 Instalação

### 1. Copiar o projeto para o caminho desejado

Copie todos os arquivos para: `C:\mobile\jornada-magica`

### 2. Instalar dependências

Abra o terminal no diretório do projeto e execute:

```bash
cd C:\mobile\jornada-magica
npm install
```

### 3. Executar o aplicativo

```bash
npm start
```

Ou use os comandos específicos:

```bash
# Para Android
npm run android

# Para iOS (apenas no macOS)
npm run ios

# Para web
npm run web
```

## 📱 Testando no Celular

1. Instale o aplicativo **Expo Go** no seu celular:
   - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Execute `npm start` no terminal

3. Escaneie o QR code que aparece no terminal com:
   - **Android**: Câmera do Expo Go
   - **iOS**: Câmera nativa do iPhone

## 🎨 Estrutura do Projeto

```
jornada-magica/
├── src/
│   ├── screens/
│   │   ├── MapScreen.js          # Tela do mapa de atividades
│   │   ├── ActivityScreen.js     # Tela de atividade individual
│   │   └── FeedbackScreen.js     # Tela de feedback positivo
│   ├── components/
│   │   ├── Avatar.js             # Componente do avatar animado
│   │   ├── ActivityNode.js       # Componente de ponto de atividade
│   │   └── PathLine.js           # Componente de linha do caminho
│   └── utils/
│       └── constants.js          # Cores e constantes do app
├── App.js                        # Arquivo principal com navegação
├── package.json
└── README.md
```

## 🎯 Funcionalidades

### Mapa de Atividades
- Visualização de todas as atividades em um caminho conectado
- Avatar que se move suavemente entre as atividades
- Indicadores visuais de progresso (completadas, atual, bloqueadas)

### Tela de Atividade
- Apresentação clara da atividade
- Avatar encorajador
- Dois botões grandes: "Consegui!" e "Não consegui hoje"

### Feedback Positivo
- **Sucesso**: Mensagem de parabéns com animação de confete
- **Não completou**: Mensagem encorajadora sem pressão
- Sempre reforço positivo, nunca negativo

## 🎨 Personalização

### Adicionar Novas Atividades

Edite o arquivo `src/utils/constants.js`:

```javascript
export const ACTIVITIES = [
  {
    id: 1,
    title: 'Nome da Atividade',
    description: 'Descrição clara e simples',
    icon: '🎯', // Emoji representativo
    position: { x: 0.5, y: 0.1 }, // Posição no mapa (0-1)
  },
  // ... mais atividades
];
```

### Alterar Cores

Modifique as cores em `src/utils/constants.js`:

```javascript
export const COLORS = {
  background: '#F5F7FA',
  primary: '#6B9BD1',
  secondary: '#A8D5BA',
  // ... outras cores
};
```

## 🧩 Princípios de Design para Autismo

1. **Clareza Visual**: Alto contraste, elementos grandes e espaçados
2. **Previsibilidade**: Mesma estrutura em todas as telas
3. **Redução de Estímulos**: Fundo limpo, poucos elementos por tela
4. **Feedback Claro**: Resposta imediata e mensagens simples
5. **Reforço Positivo**: Sempre encorajador, nunca punitivo

## 🐛 Solução de Problemas

### Erro ao iniciar o projeto
```bash
# Limpar cache e reinstalar
rm -rf node_modules
npm install
npm start -- --clear
```

### Avatar não aparece
Verifique se todas as dependências foram instaladas corretamente:
```bash
npm install react-native-svg react-native-reanimated
```

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e terapêuticos.

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas! Este aplicativo foi desenvolvido pensando nas necessidades específicas de crianças autistas.

## 📧 Suporte

Para dúvidas ou sugestões sobre o aplicativo, entre em contato.

---

**Desenvolvido com ❤️ para crianças especiais**

