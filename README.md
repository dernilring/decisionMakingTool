# Decision Making Tool
```
decisionList
├─ .prettierignore
├─ .prettierrc
├─ .stylelintrc
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.svg
├─ src
│  ├─ app
│  │  └─ app.ts
│  ├─ components
│  ├─ constants
│  ├─ main.ts
│  ├─ pages
│  │  ├─ Error.ts
│  │  ├─ Home.ts
│  │  └─ Wheel.ts
│  ├─ router
│  │  └─ router.ts
│  ├─ store
│  │  └─ OptionsStore.ts
│  ├─ styles
│  │  └─ global.css
│  ├─ types
│  │  └─ Option.ts
│  ├─ utils
│  │  └─ create-element.ts
│  ├─ views
│  └─ vite-env.d.ts
├─ tsconfig.json
└─ vite.config.ts

```


SPA for weighted random choice – built with TypeScript, Vite, Canvas API.

[Demo](https://er-dmt-demo.netlify.app/) (reference)

---

## Features

- **Options list** – add/edit/delete weighted options, store in `localStorage`  
- **Wheel** – sections sized by weight, random colors, animated spin with easing  
- **Picker** – adjustable duration (≥5s), sound toggle, highlighted result  
- **Hash routing** – `#list` / `#picker` / `#error`

---

## Tech Stack

- TypeScript (strict)
- Vite
- Canvas API
- localStorage & File API
- ESLint + Prettier + StyleLint (optional)

---

## Setup

```bash
git clone <repo>
cd decision-making-tool
npm install
npm run dev