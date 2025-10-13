# jornada-magica

app projeto integrador

# 🚀 Início Rápido - Jornada Mágica

## Para Começar em 5 Minutos

### 1️⃣ Extrair os Arquivos

Extraia o arquivo ZIP para: `C:\mobile\jornada-magica`

### 2️⃣ Instalar Node.js

Se ainda não tem, baixe em: https://nodejs.org/

### 3️⃣ Abrir Terminal

Abra o Prompt de Comando ou PowerShell e navegue até a pasta:

```cmd
cd C:\mobile\jornada-magica
```

### 4️⃣ Instalar Dependências

```cmd
npm install
```

⏱️ Aguarde alguns minutos...

### 5️⃣ Iniciar o App

```cmd
npm start
```

### 6️⃣ Testar no Celular

1. Instale o **Expo Go** no celular (Google Play ou App Store)
2. Escaneie o QR code que aparece no terminal
3. Pronto! O app abrirá no celular

---

## 📱 Testando no Navegador

Se preferir testar no computador primeiro:

```cmd
npm run web
```

---

## 🎨 Personalizar Atividades

Abra o arquivo: `src/utils/constants.js`

Encontre a seção `ACTIVITIES` e edite:

```javascript
{
  id: 1,
  title: 'Nome da Atividade',
  description: 'Descrição',
  icon: '🎯',
  position: { x: 0.5, y: 0.1 },
}
```

Salve o arquivo e o app recarrega automaticamente!

---

## 📚 Documentação Completa

- **README.md**: Visão geral do projeto
- **INSTALACAO_WINDOWS.md**: Guia detalhado de instalação
- **PERSONALIZACAO.md**: Como personalizar cores, textos e atividades
- **DOCUMENTACAO_TECNICA.md**: Detalhes técnicos da arquitetura

---

## ❓ Problemas?

### App não inicia

```cmd
npm install
npm start -- --clear
```

### Não consegue escanear QR code

- Certifique-se de que celular e computador estão na mesma rede Wi-Fi
- Use `npm run web` para testar no navegador

---

## 💡 Dicas

✅ Mantenha o terminal aberto enquanto usa o app
✅ Use Ctrl+C para parar o servidor
✅ Edite o código e veja as mudanças ao vivo
✅ Consulte PERSONALIZACAO.md para customizar

---

**Divirta-se com o Jornada Mágica! 🌟**

# 📱 Guia de Instalação - Windows

## Passo a Passo para Instalar o Jornada Mágica no Windows

### 1️⃣ Instalar Node.js

1. Acesse: https://nodejs.org/
2. Baixe a versão LTS (recomendada)
3. Execute o instalador e siga as instruções
4. Reinicie o computador após a instalação

**Verificar instalação:**

```cmd
node --version
npm --version
```

### 2️⃣ Copiar o Projeto

1. Extraia todos os arquivos do projeto
2. Copie a pasta para: `C:\mobile\jornada-magica`

### 3️⃣ Instalar Dependências

1. Abra o **Prompt de Comando** ou **PowerShell**
2. Navegue até a pasta do projeto:

```cmd
cd C:\mobile\jornada-magica
```

3. Instale as dependências:

```cmd
npm install
```

⏱️ Este processo pode levar alguns minutos...

### 4️⃣ Iniciar o Aplicativo

```cmd
npm start
```

Você verá um QR code no terminal e uma página web será aberta automaticamente.

### 5️⃣ Testar no Celular

#### Para Android:

1. Instale o **Expo Go** na Google Play Store
2. Abra o Expo Go
3. Escaneie o QR code que aparece no terminal

#### Para iOS:

1. Instale o **Expo Go** na App Store
2. Abra a câmera do iPhone
3. Escaneie o QR code que aparece no terminal
4. Toque na notificação para abrir no Expo Go

### 6️⃣ Testar no Navegador

Se quiser testar no navegador web:

```cmd
npm run web
```

O aplicativo abrirá automaticamente no seu navegador padrão.

## 🔧 Solução de Problemas Comuns

### Erro: "npm não é reconhecido"

**Solução:**

1. Reinstale o Node.js
2. Certifique-se de marcar a opção "Add to PATH" durante a instalação
3. Reinicie o computador

### Erro: "Cannot find module"

**Solução:**

```cmd
cd C:\mobile\jornada-magica
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Erro ao executar "npm start"

**Solução:**

```cmd
npm install -g expo-cli
npm start
```

### Firewall bloqueando conexão

**Solução:**

1. Permita o Node.js no Firewall do Windows
2. Certifique-se de que o celular e o computador estão na mesma rede Wi-Fi

## 📱 Testando sem Celular

Se você não tem um celular disponível, pode testar no navegador:

```cmd
npm run web
```

**Nota:** Algumas funcionalidades podem ter comportamento diferente no navegador.

## 🎯 Próximos Passos

Após a instalação bem-sucedida:

1. ✅ O aplicativo está rodando
2. 📱 Teste no celular ou navegador
3. 🎨 Personalize as atividades em `src/utils/constants.js`
4. 🚀 Compartilhe com a criança!

## 💡 Dicas

- **Mantenha o terminal aberto** enquanto estiver testando o app
- **Use Ctrl+C** no terminal para parar o servidor
- **Atualizações automáticas**: O app recarrega automaticamente quando você edita o código

## 📞 Precisa de Ajuda?

Se encontrar problemas:

1. Verifique se o Node.js está instalado corretamente
2. Certifique-se de estar na pasta correta (`C:\mobile\jornada-magica`)
3. Tente limpar o cache: `npm start -- --clear`

---

**Boa sorte com o Jornada Mágica! 🌟**

# 🎨 Novas Telas Adicionadas - Jornada Mágica

## ✨ Telas Criadas

### 1. 🔐 Tela de Login

**Arquivo:** `src/telas/TelaLogin.js`

**Funcionalidades:**

- Campo de email
- Campo de senha
- Botão "Entrar"
- Link para criar conta
- Validação de campos preenchidos
- Animação de entrada suave

**Navegação:**

- Ao fazer login → vai para **Escolher Avatar**
- Link "Criar conta" → vai para **Cadastro**

---

### 2. 📝 Tela de Cadastro

**Arquivo:** `src/telas/TelaCadastro.js`

**Funcionalidades:**

- Campo nome da criança
- Campo email do responsável
- Campo senha (mínimo 6 caracteres)
- Campo confirmar senha
- Validação de senhas coincidentes
- Aviso visual quando senhas não coincidem
- Botão "Criar Conta"
- Link para voltar ao login
- Scroll para teclado não cobrir campos

**Navegação:**

- Ao criar conta → vai para **Escolher Avatar**
- Link "Entrar" → volta para **Login**

---

### 3. 👧 Tela de Escolher Avatar

**Arquivo:** `src/telas/TelaEscolherAvatar.js`

**Funcionalidades:**

- 6 avatares diferentes para escolher
- Cada avatar tem nome e cores únicas
- Seleção visual com borda destacada
- Checkmark no avatar selecionado
- Mostra nome do avatar escolhido
- Botão "Continuar" (só ativo se escolher avatar)
- Grid responsivo de avatares

**Avatares Disponíveis:**

1. **Ana** - Pele clara, roupa azul
2. **Pedro** - Pele média, roupa verde
3. **Maria** - Pele média, roupa laranja
4. **João** - Pele morena, roupa verde claro
5. **Sofia** - Pele clara, roupa rosa
6. **Lucas** - Pele morena, roupa roxa

**Navegação:**

- Ao escolher e continuar → vai para **Escolher Tarefas**

---

### 4. ✅ Tela de Escolher Tarefas

**Arquivo:** `src/telas/TelaEscolherTarefas.js`

**Funcionalidades:**

- Lista de todas as tarefas disponíveis
- Cards grandes com ícone, título e descrição
- Checkbox visual em cada tarefa
- Contador de tarefas selecionadas
- Botões rápidos: "Todas" e "Limpar"
- Botão "Começar Jornada"
- Validação: precisa selecionar pelo menos 1 tarefa
- Salva tarefas selecionadas no AsyncStorage

**Tarefas Disponíveis:**

- 🦷 Escovar os dentes
- 🍳 Tomar café da manhã
- 🛏️ Arrumar a cama
- 👕 Vestir o uniforme
- 🎒 Pegar a mochila
- 🏫 Ir para a escola

**Navegação:**

- Ao começar jornada → vai para **Mapa** (tela principal)

---

## 🧩 Componentes Criados

### 1. InputPersonalizado

**Arquivo:** `src/componentes/InputPersonalizado.js`

**Props:**

- `rotulo` - Texto do label
- `icone` - Emoji do ícone
- `valor` - Valor do input
- `aoMudar` - Função callback
- `placeholder` - Texto placeholder
- `senhaSegura` - Boolean para senha
- `tipoTeclado` - Tipo do teclado
- `autoCapitalize` - Capitalização automática

---

### 2. BotaoPersonalizado

**Arquivo:** `src/componentes/BotaoPersonalizado.js`

**Props:**

- `texto` - Texto do botão
- `aoClicar` - Função callback
- `tipo` - 'primario', 'secundario', 'sucesso'
- `desabilitado` - Boolean
- `icone` - Emoji opcional

**Estilos:**

- Primário: Azul
- Secundário: Verde claro
- Sucesso: Verde

---

### 3. OpcaoAvatar

**Arquivo:** `src/componentes/OpcaoAvatar.js`

**Props:**

- `avatar` - Objeto com id, nome, corPele, corRoupa
- `selecionado` - Boolean
- `aoSelecionar` - Função callback

**Visual:**

- Card arredondado
- Avatar desenhado com código
- Nome abaixo
- Borda destacada quando selecionado
- Checkmark verde quando selecionado

---

### 4. CardTarefa

**Arquivo:** `src/componentes/CardTarefa.js`

**Props:**

- `tarefa` - Objeto com id, title, description, icon
- `selecionada` - Boolean
- `aoSelecionar` - Função callback

**Visual:**

- Card horizontal
- Ícone grande à esquerda
- Título e descrição no centro
- Checkbox à direita
- Borda verde quando selecionada

---

## 📂 Estrutura de Pastas

```
src/
├── telas/                          # Telas em português
│   ├── TelaLogin.js
│   ├── TelaCadastro.js
│   ├── TelaEscolherAvatar.js
│   └── TelaEscolherTarefas.js
│
├── componentes/                    # Componentes em português
│   ├── InputPersonalizado.js
│   ├── BotaoPersonalizado.js
│   ├── OpcaoAvatar.js
│   └── CardTarefa.js
│
├── screens/                        # Telas antigas (mantidas)
│   ├── MapScreen.js
│   ├── ActivityScreen.js
│   └── FeedbackScreen.js
│
├── components/                     # Componentes antigos (mantidos)
│   ├── Avatar.js
│   ├── ActivityNode.js
│   └── PathLine.js
│
└── utils/
    └── constants.js
```

---

## 🔄 Fluxo de Navegação Completo

```
Login
  ↓
  ├─→ Cadastro
  │     ↓
  └─────┴─→ Escolher Avatar
              ↓
          Escolher Tarefas
              ↓
            Mapa
              ↓
          Atividade
              ↓
          Feedback
              ↓
            Mapa (volta)
```

---

## 🎨 Design Adaptado para Autismo

### Características Implementadas:

1. **Cores Suaves**

   - Paleta pastél
   - Sem cores agressivas
   - Alto contraste para leitura

2. **Elementos Grandes**

   - Botões com 18px de padding vertical
   - Cards espaçados
   - Ícones grandes (32px)

3. **Feedback Visual Claro**

   - Bordas destacadas na seleção
   - Checkmarks verdes
   - Contador de progresso

4. **Animações Suaves**

   - Transições de 400ms
   - Spring animations suaves
   - Sem movimentos bruscos

5. **Instruções Claras**
   - Títulos grandes e legíveis
   - Subtítulos explicativos
   - Emojis para contexto visual

---

## 🚀 Como Testar

### 1. Instalar e Rodar

```bash
cd C:\mobile\jornada-magica
npm install
npm start
```

### 2. Fluxo de Teste

1. Abra o app (começa no Login)
2. Clique em "Criar conta"
3. Preencha os campos do cadastro
4. Escolha um avatar
5. Selecione as tarefas
6. Clique em "Começar Jornada"
7. Veja o mapa com as tarefas selecionadas

### 3. Testar Login Direto

1. Na tela de login, digite qualquer email e senha
2. Clique em "Entrar"
3. Escolha avatar e tarefas

---

## 💾 Persistência de Dados

### AsyncStorage

O app salva automaticamente:

- ✅ Tarefas selecionadas
- ✅ Progresso das atividades

**Chaves usadas:**

- `tarefasSelecionadas` - Array de IDs
- `completedActivities` - Array de IDs completados

---

## 🎯 Próximos Passos Sugeridos

### Melhorias Futuras:

1. **Autenticação Real**

   - Integrar com Firebase ou backend
   - Salvar dados do usuário

2. **Perfis Múltiplos**

   - Várias crianças no mesmo dispositivo
   - Trocar entre perfis

3. **Personalização**

   - Criar avatares customizados
   - Adicionar tarefas personalizadas
   - Upload de fotos

4. **Relatórios**
   - Gráficos de progresso
   - Histórico de atividades
   - Compartilhar com terapeutas

---

## ✅ Checklist de Entrega

- ✅ 4 novas telas criadas
- ✅ 4 componentes reutilizáveis
- ✅ Navegação completa configurada
- ✅ Design adaptado para autismo
- ✅ Validações implementadas
- ✅ Animações suaves
- ✅ Persistência de dados
- ✅ Código em português
- ✅ Comentários explicativos

---

**Todas as telas estão prontas e funcionais! 🎉**

# 🎨 Guia de Personalização - Jornada Mágica

## Como Personalizar o Aplicativo para Suas Necessidades

### 1. Adicionar ou Modificar Atividades

Abra o arquivo: `src/utils/constants.js`

Encontre a seção `ACTIVITIES` e edite:

```javascript
export const ACTIVITIES = [
  {
    id: 1, // ID único (sequencial)
    title: "Escovar os dentes", // Nome da atividade
    description: "Escove seus dentes por 2 minutos", // Descrição
    icon: "🦷", // Emoji
    position: { x: 0.5, y: 0.1 }, // Posição no mapa (0 a 1)
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
  background: "#F5F7FA", // Cor de fundo do app
  primary: "#6B9BD1", // Cor principal (azul)
  secondary: "#A8D5BA", // Cor secundária (verde)
  success: "#7EC699", // Cor de sucesso
  warning: "#FFD166", // Cor de aviso
  neutral: "#E8E8E8", // Cor neutra (cinza claro)
  text: "#2C3E50", // Cor do texto principal
  textLight: "#7F8C8D", // Cor do texto secundário
  white: "#FFFFFF", // Branco
  completed: "#7EC699", // Cor de atividade completada
  locked: "#BDC3C7", // Cor de atividade bloqueada
  path: "#D4E2F4", // Cor do caminho no mapa
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
{
  success
    ? `Você conseguiu ${activityTitle.toLowerCase()}! Estou muito orgulhoso de você!`
    : "...";
}
```

Altere para:

```javascript
{
  success
    ? `Incrível! Você fez ${activityTitle.toLowerCase()}! Continue assim!`
    : "...";
}
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
export const ANIMATION_DURATION = 400; // Duração em milissegundos
```

- **Mais rápido**: 200-300ms
- **Normal**: 400-500ms
- **Mais lento**: 600-800ms

### 5. Modificar Tamanho do Avatar

No mesmo arquivo:

```javascript
export const AVATAR_SIZE = 60; // Tamanho em pixels
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
import { Audio } from "expo-av";

const playSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../assets/sounds/success.mp3")
  );
  await sound.playAsync();
};
```

### 9. Resetar Progresso

Para resetar o progresso da criança, adicione um botão na tela do mapa:

Em `src/screens/MapScreen.js`, adicione:

```javascript
import { Alert } from "react-native";

const resetProgress = async () => {
  Alert.alert(
    "Resetar Progresso",
    "Tem certeza que deseja resetar todo o progresso?",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Resetar",
        onPress: async () => {
          await AsyncStorage.removeItem("completedActivities");
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
