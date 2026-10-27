# CaLL - Cursos Isolados | Landing Page de Alta Conversão

Landing page institucional e de alta conversão desenvolvida para o **CaLL - Cursos Isolados** (Centro de Aperfeiçoamento de Língua e Linguagem), instituição de referência em Natal/RN especializada em Redação e Linguagens para o ENEM e vestibulares de Medicina.

---

## 🎨 Identidade Visual e Recursos

- **Paleta Oficial:** Cobalt Blue (`#071A8C`), Deep Navy (`#060D2E`), Electric Purple (`#5227EA`), Solar Yellow (`#FFE500`) e Magenta (`#FF007F`).
- **Tipografia:** Montserrat 900 (títulos e botões principais) + Plus Jakarta Sans (leitura).
- **Simulador de Nota ENEM:** Cálculo interativo com pesos SISU para Medicina, Direito, Engenharias e Odontologia.
- **Estrutura de Alta Conversão:**
  - Barra de urgência com contagem regressiva em tempo real.
  - Abas interativas de cursos (Pré-ENEM, 1ª e 2ª Séries, Fundamental II, CaLL Online).
  - Fotos e história dos fundadores (Prof. Rosemberg Ramalho e Prof. Marco Aurélio).
  - Depoimentos, galeria da estrutura física em Lagoa Nova (Natal/RN) e FAQ expansível.
  - Botões diretos para matrícula no WhatsApp com mensagens personalizadas.

---

## 🚀 Como Subir para o GitHub e Ativar o GitHub Pages

### 1. Criar o repositório no GitHub
1. Acesse [github.com/new](https://github.com/new).
2. Dê um nome ao repositório (exemplo: `call-cursos-isolados`).
3. Deixe como **Public** (necessário para GitHub Pages gratuito).
4. Clique em **Create repository** (sem adicionar README ou .gitignore, pois já foram criados localmente).

### 2. Conectar e enviar os arquivos
No terminal deste projeto, execute:

```bash
git remote add origin https://github.com/SEU_USUARIO/call-cursos-isolados.git
git branch -M main
git push -u origin main
```

*(Substitua `SEU_USUARIO` pelo seu usuário do GitHub)*

---

### 3. Ativar o GitHub Pages (Automático via GitHub Actions)

1. No repositório no GitHub, clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment** > **Source**, selecione:
   👉 **GitHub Actions**
4. Pronto! O workflow configurado em `.github/workflows/deploy.yml` fará o build do Vite e publicará o site automaticamente.
5. O link estará disponível em:
   `https://SEU_USUARIO.github.io/call-cursos-isolados/`
