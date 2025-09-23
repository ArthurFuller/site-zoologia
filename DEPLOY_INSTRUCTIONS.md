# 🚀 Instruções para Deploy do Site de Zoologia

## 📋 Passos para Criar o Repositório no GitHub

### 1. Criar Repositório no GitHub
1. Acesse [GitHub.com](https://github.com) e faça login com sua conta **ArthurFuller**
2. Clique no botão **"New"** ou **"+"** no canto superior direito
3. Preencha as informações:
   - **Repository name**: `site-zoologia` ou `diversidade-biologica-animal`
   - **Description**: `Site educativo interativo sobre Zoologia - Diversidade Biológica Animal I`
   - **Visibility**: Public ✅
   - **Initialize with README**: ❌ NÃO marcar (já temos arquivos)
   - **Add .gitignore**: ❌ NÃO marcar (já temos)
   - **Choose a license**: Opcional (pode adicionar MIT License)

### 2. Conectar Repositório Local ao GitHub
Após criar o repositório, execute estes comandos no terminal:

```bash
# Adicionar o repositório remoto (substitua SEU-USERNAME pelo seu username)
git remote add origin https://github.com/ArthurFuller/NOME-DO-REPOSITORIO.git

# Verificar se foi adicionado corretamente
git remote -v

# Fazer push do código para o GitHub
git push -u origin master
```

### 3. Configurar GitHub Pages
1. No repositório do GitHub, vá em **Settings** (Configurações)
2. Role para baixo até a seção **"Pages"**
3. Em **"Source"**, selecione **"Deploy from a branch"**
4. Em **"Branch"**, selecione **"master"** ou **"main"**
5. Em **"Folder"**, deixe **"/ (root)"**
6. Clique em **"Save"**

### 4. Acessar o Site
Após alguns minutos, seu site estará disponível em:
`https://ArthurFuller.github.io/NOME-DO-REPOSITORIO/`

## 🔧 Comandos Git Úteis

```bash
# Ver status dos arquivos
git status

# Adicionar mudanças
git add .

# Fazer commit
git commit -m "Descrição da mudança"

# Enviar para GitHub
git push

# Ver histórico
git log --oneline
```

## 📱 Funcionalidades do Site

✅ **Design Responsivo** - Funciona em todos os dispositivos
✅ **Modo Escuro/Claro** - Alternância de tema
✅ **Sistema de Busca** - Pesquisa inteligente no conteúdo
✅ **Quiz Interativo** - 3 níveis de dificuldade
✅ **Navegação Suave** - Scroll automático entre seções
✅ **Conteúdo Científico** - 46.200 espécies catalogadas

## 🎯 Próximos Passos Opcionais

1. **Domínio Personalizado**: Configurar um domínio próprio
2. **Analytics**: Adicionar Google Analytics
3. **SEO**: Otimizar para mecanismos de busca
4. **PWA**: Transformar em Progressive Web App
5. **CI/CD**: Automatizar deploys

---

**Desenvolvido com 💜 para o estudo da Zoologia**
