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

