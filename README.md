# J-Initiative-Web-Scraper

---

### **Linting & Formatting**
We will use **ESLint** and **Prettier** to ensure consistent code style and quality.


### Lint & Prettier Config
- ESLint: [eslint.config.mjs](./eslint.config.mjs)
- Prettier: [.prettierrc.json](./.prettierrc.json)

---

## ESLint + Prettier Scripts**

```json
"scripts": {
  "lint": "eslint \"**/*.{js,mjs}\"",
  "lint:fix": "eslint \"**/*.{js,mjs}\" --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check ."
}
```

This gives us:
- `yarn lint`: check for lint issues
- `yarn lint:fix`: auto-fix issues
- `yarn format`: format codebase
- `yarn format:check`: check if formatting is correct 

---

###  **2. Test the Scripts**
Run these from `web-scraping-electron-app/`:

```bash
yarn lint
yarn lint:fix
yarn format
```

---
