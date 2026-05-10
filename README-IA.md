# Mapa de Contexto para IA (README-IA.md)

Este documento serve como um mapa e guia de contexto rápido para que eu (e outras instâncias de IA) possamos entender rapidamente a estrutura, as tecnologias e a arquitetura do projeto **Fernando Pegoraro Imóveis**.

## 🚀 Visão Geral do Projeto

Trata-se de uma aplicação web (provavelmente uma landing page interativa ou site de portfólio) focada no mercado imobiliário para "Fernando Pegoraro Imóveis". O projeto tem um forte apelo visual, com uso de animações avançadas e suporte a internacionalização (i18n).

## 🛠️ Stack Tecnológica

- **Framework Core:** Next.js 15 (usando App Router) com React 18.
- **Estilização:** Tailwind CSS (com PostCSS e Autoprefixer).
- **Animações:** GSAP (GreenSock Animation Platform) para animações fluidas e possivelmente interações com scroll/cursores customizados.
- **Deploy / Infraestrutura:** Preparado para rodar na Cloudflare via `@opennextjs/cloudflare` e configurado com `wrangler.jsonc` / `open-next.config.ts`.
- **Gerenciador de Pacotes:** NPM.

## 📂 Arquitetura e Estrutura de Diretórios

O projeto segue um padrão modular com delegação da UI para componentes client-side.

### `/app`
Contém a base do App Router do Next.js.
- `page.js`: Arquivo de entrada principal. É um Server Component que simplesmente renderiza e delega toda a UI para o componente `<ClientApp />`.
- `layout.js`: Layout principal da aplicação.
- `globals.css`: Estilos globais e diretrizes do Tailwind.

### `/components`
Diretório mais volumoso, contendo todas as peças da interface:
- **`ClientApp.jsx`**: O componente mestre (Client-Side) que orquestra e monta todas as seções da página.
- **Seções da Página:** `HeroSection`, `AboutSection`, `ServicesSection`, `PortoBeloSection`, `PropertiesSection`, `StatsSection`, `FaqSection`, `ContactSection`.
- **Elementos UI Comuns:** `Header`, `Footer`, `CtaBand`.
- **Interativos & Utilitários:** `Cursor.jsx` (provavelmente um cursor customizado animado com GSAP), `FloatWA.jsx` (Botão flutuante do WhatsApp), `Icons.jsx`.

### `/context`
- `LangContext.jsx`: Contexto React para gerenciar o idioma selecionado pelo usuário. A aplicação é multilíngue.

### `/lib`
- `translations.js`: Dicionário ou lógica de acesso a chaves de tradução que alimentam a interface de acordo com o `LangContext`.

## 🧠 Lógicas Chave a Observar

1. **Internacionalização (i18n):** O site gerencia o idioma no client-side usando `LangContext` e busca as strings em `lib/translations.js`. Ao adicionar novos textos na UI, eles devem ser sempre adicionados aos dicionários primeiro e consumidos via contexto.
2. **Animações (GSAP):** Muitos componentes provavelmente utilizam `useLayoutEffect` ou `@gsap/react` hooks para injetar animações em elementos na montagem ou via ScrollTrigger. Ao mexer no layout, ter cuidado para não quebrar referências (`ref`) usadas pelo GSAP.
3. **Client-Side Rendering predominante:** Como o `app/page.js` renderiza um `ClientApp`, quase toda a interatividade da página roda no cliente.

## 📝 Regras Gerais para a IA neste Repositório

- **Sempre verifique o `translations.js`** antes de adicionar textos "hardcoded" (fixos) aos componentes.
- **Mantenha a consistência do Tailwind CSS.** Não introduza CSS puro ou inline a menos que seja para propriedades dinâmicas atreladas a animações do GSAP.
- Caso seja necessário criar novas seções na página, crie o componente em `/components`, adicione-o ao `ClientApp.jsx` e garanta que seja responsivo.
