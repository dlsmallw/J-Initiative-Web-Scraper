

---

### 📁 **Project Structure Refactor Proposal**
**🚀 Goal:** Improve maintainability, readability, and scalability of our J-Initiative Web Scraper project.

---

## 📂 **Proposed New Structure**
```
J-Initiative-Web-Scraper
├── .github/  
├── .idea/  
├── web-scraping-electron-app/  
│   ├── 📂 src/                     # Main source code  
│   │   ├── 🛠️ backend/            # Backend logic (Database & APIs)  
│   │   │   ├── 📂 database/  
│   │   │   │   ├── 📄 AddEntry.js  
│   │   │   │   ├── 📄 DeleteEntry.js  
│   │   │   │   ├── 📄 FirebaseConnection.js  
│   │   │   │   ├── 📄 ModifyEntry.js  
│   │   │   │   ├── 📄 SubCollectionEntry.mjs  
│   │   │   ├── 📂 services/  
│   │   │   │   ├── 🔗 label-studio-api.js  
│   │   │   ├── 📂 utils/  
│   │   │   │   ├── 📝 logger.js  
│   │   │   │   ├── 🔒 sanitizer.js  
│   │   ├── 🎨 frontend/            # Frontend UI (Electron/React)  
│   │   │   ├── 📂 assets/  
│   │   │   │   ├── 🎨 icons/  
│   │   │   │   │   ├── ⚙️ icon8-settings.svg  
│   │   │   │   │   ├── 🖼️ open-new-window.svg  
│   │   │   │   ├── 📄 loadingscreen.html  
│   │   │   ├── 📂 components/  
│   │   │   │   ├── 📂 views/  
│   │   │   │   │   ├── 🏠 HomePage.js  
│   │   │   │   │   ├── 📋 AnnotationPage.js  
│   │   │   │   │   ├── 🔎 ScrapePage.js  
│   │   │   │   │   ├── 🗄️ DatabasePage.js  
│   │   │   │   │   ├── 📖 AboutPage.js  
│   │   │   │   │   ├── 📝 LogPage.js  
│   │   │   │   ├── 📂 templates/  
│   │   │   │   │   ├── 📄 Home.html  
│   │   │   │   │   ├── 📄 Scrape.html  
│   │   │   │   │   ├── 📄 Database.html  
│   │   │   │   │   ├── 📄 Annotation.html  
│   │   │   │   │   ├── 📄 Log.html  
│   │   │   │   │   ├── 🎨 Theme.html  
│   │   │   ├── 🎨 css/  
│   │   │   │   ├── 📄 style.css  
│   │   │   ├── ⚙️ js/  
│   │   │   │   ├── 🎭 renderer.js  
│   │   ├── 🌐 webviews/             # Electron WebView Components  
│   │   │   ├── 📝 annotation/  
│   │   │   │   ├── 📄 annotation-webview-renderer.js  
│   │   │   ├── 🔍 scraping/  
│   │   │   │   ├── 📄 scrape-webview-preload.js  
│   │   │   │   ├── 📄 scrape-webview-renderer.js  
│   │   │   ├── 🖼️ templates/  
│   │   │   │   ├── 📄 anno-window.html  
│   │   │   │   ├── 📄 scrape-window.html  
│   ├── 🔬 tests/  
│   ├── 📂 public/                    # Static files  
│   │   ├── 📄 index.html  
│   ├── 🎯 main.js                     # Electron Main Process  
│   ├── ⚡ preload.js                   # Preload scripts  
│   ├── 📜 package.json  
│   ├── 📖 README.md  
│   ├── 📝 LOGGING.md  
│   ├── 📦 yarn.lock  
│   ├── 🛠️ .npmrc  
│   ├── 📜 pkgmgr.sh  
├── 📂 docs/                          # Documentation & Research  
│   ├── 📌 GeneralDatabaseDiagram.png  
│   ├── 📜 SER401_Task_103.pdf  
│   ├── 📜 Task_102_Database_Research.pdf  
│   ├── 📜 Task105DatabaseWindow.png  
├── 📓 J_Initiative_Web_Scraper_Colab_Notebook.ipynb  
├── 📜 LICENSE  
├── 🔥 .gitignore  
├── 📖 README.md  
```
