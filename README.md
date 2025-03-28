
# **J-Initiative Web Scraper**  

---

## 📁 **Project Structure**
Below is a comprehensive README that references the project structure and the new, prompt-free setup.sh (was pkgmgr.sh) 
script. It provides clear guidance making it ideal for developers that want to get familiar with the project but need 
structured instructions and quick references.  

---

```
J-Initiative-Web-Scraper
├── .github/
│   └── workflows/
│       ├── node.js.yml
├── docs/
│   ├── General Database Diagram.png
│   ├── SER 401 Task #103.pdf
│   ├── Task#102 Database Research.pdf
│   ├── Task105DatabaseWindow.png
│   ├── research-notes.md
│   └── ...
├── scripts/
│   └── setup.sh             # Any additional build/test/deploy scripts
│
│
├── web-scraping-electron-app/
│   ├── docs/                           <-- All Docsify-related content lives here
│   │   ├── api/                        <-- JSDoc generated Markdown
│   │   │   ├── _sidebar.md  
│   │   │   ├── _database.md                    
│   │   │   ├── electron-main.md       
│   │   │   ├── README.md
│   │   │   ├── renderer.md
│   │   │   ├── services.md
│   │   │   ├── ui.md
│   │   │   ├── utils.md                     
│   │   │   └── webviews.md            
│   │   ├── usage/
│   │   │   ├── README.md
│   │   │   ├── scrape-page.md
│   │   │   ├── annotation-page.md
│   │   │   ├── workflows.md
│   │   │   └── update-token.md
│   │   ├── .nojekyll   
│   │   ├── _sidebar.md                <-- Docsify navigation
│   │   ├── index.html                 <-- Docsify entry point
│   │   ├── README.md                  <-- Docs landing page
│   │   ├── setup.md
│   ├── node_modules/
│   ├── public/
│   │   └── index.html         # Static entry for front-end
│   │
│   ├── src/                     # Source code (front-end + back-end)
│   │   ├── backend/
│   │   │   ├── database/
│   │   │   │   ├── AddEntry.js
│   │   │   │   ├── DeleteEntry.js
│   │   │   │   ├── FirebaseConfig.js
│   │   │   │   ├── FirebaseConnection.js
│   │   │   │   ├── ModifyEntry.js
│   │   │   │   └── SubCollectionEntry.mjs
│   │   │   ├── services/
│   │   │   │   └── label-studio-api.js
│   │   │   └── utils/
│   │   │       ├── logger.js
│   │   │       └── sanitizer.js
│   │   ├── electron/             # Electron main process & webview logic
│   │   │   ├── main/
│   │   │   │   ├── main.js       # Electron Main Process entry point
│   │   │   │   ├── preload.js    # Preload scripts for Electron
│   │   │   │   └── ...
│   │   │   ├── webviews/
│   │   │   │   ├── annotation/
│   │   │   │   │   └── annotation-webview-renderer.js
│   │   │   │   ├── scraping/
│   │   │   │   │   ├── scrape-webview-preload.js
│   │   │   │   │   └── scrape-webview-renderer.js
│   │   │   │   └── templates/
│   │   │   │       ├── anno-window.html
│   │   │   │       └── scrape-window.html
│   │   ├── frontend/
│   │   │   ├── assets/
│   │   │   │   ├── icons/
│   │   │   │   │   ├── icon8-settings.svg
│   │   │   │   │   └── open-new-window.svg
│   │   │   ├── components/
│   │   │   │   ├── templates/
│   │   │   │   │   ├── about.html
│   │   │   │   │   ├── annotation.html
│   │   │   │   │   ├── database.html
│   │   │   │   │   ├── home.html
│   │   │   │   │   ├── log.html
│   │   │   │   │   ├── scrape.html
│   │   │   │   │   └── theme.html
│   │   │   │   ├── views/
│   │   │   │   │   ├── about-page.js
│   │   │   │   │   ├── annotation-page.js
│   │   │   │   │   ├── database-page.js
│   │   │   │   │   ├── home-page.js
│   │   │   │   │   ├── log-page.js
│   │   │   │   │   └── scrape-page.js
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── js/
│   │   │       └── renderer.js
│   │   └── tests/               # Colocated tests or test entries
│   │       ├── backend/
│   │       │   └── database.test.js
│   │       └── frontend/
│   │           └── components.test.js
│   │  
│   ├── package.json
│   ├── yarn.lock
│   ├── .npmrc
│   └── README.md
│ 
├── .gitignore
├── J_Initiative_Web_Scraper_Colab_Notebook.ipynb
├── LICENSE
├── README.md

```
  

This repository uses a combination of NodeJS/Electron (for the app’s GUI and backend logic) and optionally Python   
(for certain scraping or ML-related tasks). Below is a minimal, prompt-free setup flow that checks your environment,   
logs any issues, and provides convenience commands like build, run dev, etc.  



## **Requirements**

- **Python** 3.7+ (optional, if you want Python-based tasks like scraping or ML).
- **NodeJS** and **Yarn** for building/running the Electron app.
- **Bash** or any Unix-like shell. 

### Quick Checks

```bash
python3 --version
node -v
yarn --version
```
If something’s missing or outdated, update/install accordingly.

---

## **Using `setup.sh`**

From the **project root** (i.e. `J-Initiative-Web-Scraper`):

```bash
source ./scripts/setup.sh
```

This script will:

1. **Check** for Python ≥ 3.7, pipenv, NodeJS, and Yarn.
2. **Warn** if any are missing or out of date.
3. **Check** if you have a local `.venv` in `web-scraping-electron-app/`.  
4. **Define** shell functions like `build`, `clean`, `rebuild`, `run dev`, `run prod`, `package`, and `help`.

No yes/no prompts are used—just logs/warnings. After loading, you can do:

```bash
# Install NodeJS dependencies (no forced clean):
build

# Run Electron dev mode (auto reload with electronmon):
run dev

# Or do a complete clean + build:
rebuild

# Or package the app with electron-forge:
package
```

---

## **Optional: Python Virtual Environment**

If you have **Python-based** tasks (e.g., advanced scraping, ML training, etc.):

1. **Create a local `.venv`** (if you want an in-project environment):
   ```bash
   cd web-scraping-electron-app
   pipenv install  # Uses Pipfile to install dependencies;
   ```
2. **Activate** the environment:
   ```bash
   pipenv shell
   ```
3. **(Optional)** Re-source the script **inside** that environment if you want the shell functions:
   ```bash
   source ../scripts/setup.sh
   ```
   Or just keep using the original shell if you only need Node/Electron tasks.

---

## **Additional Commands**

- **`clean`**: Removes `node_modules/`, local `.venv/`, `Pipfile`, etc.  
- **`help`**: Shows the script usage and available commands.

---

## **Running the App**

Once dependencies are installed:

```bash
build
run dev
```
This launches the Electron GUI in dev mode using `electronmon` (auto restarts on code changes). Press `Ctrl + C` to stop.

---

## **Production / Packaging**

```bash
package
```
Uses **electron-forge** to create distributable packages in an `out/` folder. Or run:
```bash
run prod
```
for a basic production-mode test.

---
Yes — your root `README.md` is the perfect place to include a section about:

- your **comment style guide**,
- how to **generate and view documentation**, and
- the tooling choices: **JSDoc** + **Docsify**.

It’s important context for contributors and makes the setup feel polished and professional. Here's a clean section you can append to the bottom of your existing README:

---

## Developer Docs & Commenting Guide

### Comment Style (JSDoc Standard)

We use [JSDoc](https://jsdoc.app/) to document JavaScript modules and functions.

**Basic example:**
```js
/**
 * Fetches data from a given URL.
 * @function fetchData
 * @param {string} url - The target URL.
 * @returns {Promise<Object>} Parsed JSON data.
 */
async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}
```

- Use `@function`, `@param`, `@returns`, `@memberof`, and `@async` where applicable.
- Keep descriptions concise but clear.
- Use full sentences for clarity, especially for public modules or shared logic.

---

### Generate API Docs (Markdown Format)

Our API documentation is generated via [`jsdoc2md`](https://github.com/jsdoc2md/jsdoc-to-markdown) into Markdown files, scoped by module.

To regenerate:

```bash
# Inside the Electron app folder:
cd web-scraping-electron-app

# Create /docs/api/ if it doesn't exist
mkdir -p docs/api

# Generate module-based docs
npx jsdoc2md src/backend/database/*.js > docs/api/database.md
npx jsdoc2md src/backend/services/*.js > docs/api/services.md
npx jsdoc2md src/frontend/components/views/*.js > docs/api/ui.md
```

These Markdown files are then rendered by Docsify in the in-app `/docs/` site.

---

### Viewing the Docs

We use [Docsify](https://docsify.js.org) for an interactive, navigable site experience.

To preview the full documentation locally:

```bash
cd web-scraping-electron-app
npx docsify serve docs
```

This will start a local server at [http://localhost:3000](http://localhost:3000), where you can browse:

- `docs/setup.md` – install and configuration
- `docs/usage/*` – usage walkthroughs
- `docs/api/*` – auto-generated API docs

---

## **Summary**

1. **Install** Python (optional if you need Python tasks), NodeJS, Yarn, and Bash.
2. **`source ./scripts/setup.sh`** from the project root to see any environment warnings.
3. **Use** `build`, `run dev`, `help`, etc. in the same shell session.
4. **Create** a local `.venv` if you need Python-based tasks. Otherwise, skip if purely Node/Electron.
5. **No interactive prompts**—the script logs warnings & next steps, giving you freedom to set up your environment as you prefer.

---

### **How This Helps Developers**

- The script logs **what’s missing** or **outdated**.
- The **README** clarifies where to fix environment issues and how to optionally handle Python tasks with pipenv.