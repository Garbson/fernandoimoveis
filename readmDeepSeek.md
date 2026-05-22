# Fernando Pegoraro Imóveis

Landing page institucional de alto nível para Fernando Pegoraro, corretor especializado em investimentos imobiliários de luxo no litoral de Santa Catarina (Itapema, Porto Belo, Bombinhas). O site funciona como portfólio profissional e gerador de leads, redirecionando para WhatsApp.

---

## 🚀 Tech Stack

| Tecnologia                 | Uso                          |
| -------------------------- | ---------------------------- |
| **React 18**               | Biblioteca UI                |
| **Vite 5**                 | Bundler / dev server         |
| **Tailwind CSS 3**         | Estilização utilitária       |
| **GSAP + ScrollTrigger**   | Animações de alto desempenho |
| **PostCSS + Autoprefixer** | Processamento CSS            |

- **SPA sem roteamento** — navegação por âncora (`#sobre`, `#servicos`, etc.)
- Dependências enxutas: 3 de produção, 5 de desenvolvimento

---

## 🌐 Internacionalização

i18n caseiro com **3 idiomas** (pt / en / es):

- Contexto React via `LangContext` com hook `useLang()`
- Função `t(key)` para buscar traduções do objeto em `lib/translations.js`
- Persistência via `localStorage` (chave `fp_lang`)
- Seletor de idioma no header (desktop e mobile)

---

## 📐 Estrutura de Diretórios

```
fernandoimoveis/
├── index.html                 # Entry point com fonts Google
├── vite.config.mjs            # Alias @ para raiz
├── tailwind.config.cjs        # Cores, fonts, keyframes customizados
├── postcss.config.cjs
├── app/
│   └── globals.css            # Glass morphism, shimmer, animações CSS
├── src/
│   └── main.jsx               # React.StrictMode + ClientApp
├── components/
│   ├── ClientApp.jsx          # Layout raiz e montagem das seções
│   ├── Header.jsx             # Navbar fixa + lang switcher
│   ├── HeroSection.jsx        # Hero com parallax e animação de texto
│   ├── TickerBand.jsx         # Marquee infinito (financiamento)
│   ├── StatsSection.jsx       # Contadores animados (R$ 1.4B+, 12 países)
│   ├── AboutSection.jsx       # Sobre Fernando (foto + texto)
│   ├── ServicesSection.jsx    # 3 cards de serviços
│   ├── PortoBeloSection.jsx   # Carrossel 3D de fotos da região
│   ├── PropertiesSection.jsx  # 4 empreendimentos em carrossel 3D
│   ├── CtaBand.jsx            # CTA com parallax background
│   ├── FaqSection.jsx         # Acordeão com 8 perguntas
│   ├── ContactSection.jsx     # Cards de contato (WhatsApp, Instagram, LinkedIn)
│   ├── Footer.jsx             # Footer com nav e links sociais
│   ├── FloatWA.jsx            # Botão flutuante do WhatsApp
│   └── Icons.jsx              # Ícones SVG inline
├── context/
│   └── LangContext.jsx        # Contexto de idioma
└── lib/
    └── translations.js        # ~65 chaves por idioma (pt, en, es)
```

---

## 🎨 Design System (Tailwind)

**Cores customizadas:**

- `gold` (#C4975A) — realce principal (tags, shimmer text)
- `verde` (#4A5C35) — cor dos CTAs
- `ink` (#0F1923) — cor escura principal
- `surface` — backgrounds claros alternados

**Fontes do Google:**

- `Syne` — títulos (font-display)
- `Plus Jakarta Sans` — corpo (font-body)

**Efeitos CSS:**

- `glass` — glass morphism (blur + saturate + border + shadow), 4 variantes
- `shimmer-text` — gradiente animado no texto
- `glow-orb` — orbes decorativas com blur
- `reveal-section` — IntersectionObserver para fade-in ao scroll

---

## ✨ Animações (GSAP)

- **Importação dinâmica** em cada seção para code-splitting
- **ScrollTrigger** com `once: true` para animações de entrada (stagger, y, opacity)
- **Parallax** no Hero e CTA Band com `scrub` e `scale`/`yPercent`
- **Contadores animados** no Hero e StatsSection (de 0 até o valor real)
- **Carrossel 3D** nas seções Porto Belo e Properties (fan desktop / deck mobile)
- **Easing customizado:** `cubic-bezier(0.16, 1, 0.3, 1)`

---

## 📞 Links

- **WhatsApp:** `+55 47 9751-8960`
- **Instagram:** `@fernandopegoraro_`
- **LinkedIn:** `fernandopegoraro`

---

## 🛠 Scripts

```bash
npm run dev       # Vite dev server
npm run build     # Build de produção
npm run preview   # Preview do build
```
