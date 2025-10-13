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

