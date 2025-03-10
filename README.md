

---

### 📁 **Project Structure Refactor Proposal**
**🚀 Goal:** Improve maintainability, readability, and scalability of our J-Initiative Web Scraper project.

---

## 📂 **Proposed New Structure**
```
J-Initiative-Web-Scraper
├── .github/
│   └── workflows/
│       ├── node.js.yml
├── 🔥 .gitignore
├── 📜 LICENSE
├── 📖 README.md
├── docs/
│   ├── 📜 architecture-overview.md
│   ├── 📜 database-design.png
│   ├── 📜 research-notes.md
│   └── ...
├── scripts/
│   └── 📜 pkgmgr.sh             # Any additional build/test/deploy scripts
├── web-scraping-electron-app/
│   ├── 📂 electron/             # Electron main process & webview logic
│   │   ├── main/
│   │   │   ├── ⚙️ main.js       # Electron Main Process entry point
│   │   │   ├── ⚙️ preload.js    # Preload scripts for Electron
│   │   │   └── ...
│   │   ├── webviews/
│   │   │   ├── 📝 annotation/
│   │   │   │   └── 📄 annotation-webview-renderer.js
│   │   │   ├── 🔍 scraping/
│   │   │   │   ├── 📄 scrape-webview-preload.js
│   │   │   │   └── 📄 scrape-webview-renderer.js
│   │   │   └── 🖼️ templates/
│   │   │       ├── 📄 anno-window.html
│   │   │       └── 📄 scrape-window.html
│   ├── src/                     # Source code (front-end + back-end)
│   │   ├── backend/
│   │   │   ├── database/
│   │   │   │   ├── 📄 AddEntry.js
│   │   │   │   ├── 📄 DeleteEntry.js
│   │   │   │   ├── 📄 FirebaseConnection.js
│   │   │   │   ├── 📄 ModifyEntry.js
│   │   │   │   └── 📄 SubCollectionEntry.mjs
│   │   │   ├── services/
│   │   │   │   └── 🔗 label-studio-api.js
│   │   │   └── utils/
│   │   │       ├── 📝 logger.js
│   │   │       └── 🔒 sanitizer.js
│   │   ├── frontend/
│   │   │   ├── assets/
│   │   │   │   ├── 🎨 icons/
│   │   │   │   │   ├── ⚙️ icon8-settings.svg
│   │   │   │   │   └── 🖼️ open-new-window.svg
│   │   │   │   └── 📄 loadingscreen.html
│   │   │   ├── components/
│   │   │   │   ├── views/
│   │   │   │   │   ├── 🏠 HomePage.js
│   │   │   │   │   ├── 📋 AnnotationPage.js
│   │   │   │   │   ├── 🔎 ScrapePage.js
│   │   │   │   │   ├── 🗄️ DatabasePage.js
│   │   │   │   │   ├── 📖 AboutPage.js
│   │   │   │   │   └── 📝 LogPage.js
│   │   │   │   ├── templates/
│   │   │   │   │   ├── 📄 Home.html
│   │   │   │   │   ├── 📄 Scrape.html
│   │   │   │   │   ├── 📄 Database.html
│   │   │   │   │   ├── 📄 Annotation.html
│   │   │   │   │   ├── 📄 Log.html
│   │   │   │   │   └── 🎨 Theme.html
│   │   │   ├── 🎨 css/
│   │   │   │   └── 📄 style.css
│   │   │   └── ⚙️ js/
│   │   │       └── 🎭 renderer.js
│   │   └── tests/               # Colocated tests or test entries
│   │       ├── backend/
│   │       │   └── 📄 database.test.js
│   │       └── frontend/
│   │           └── 📄 components.test.js
│   ├── public/
│   │   └── 📄 index.html         # Static entry for front-end
│   ├── 🎯 main.js                # (optional) If you prefer the main entry at this level
│   ├── 📜 package.json
│   ├── 📦 yarn.lock
│   ├── 🛠️ .npmrc
│   └── 📖 README.md
├── 📓 J_Initiative_Web_Scraper_Colab_Notebook.ipynb

```
