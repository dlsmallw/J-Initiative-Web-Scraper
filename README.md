

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
├── .gitignore
├── LICENSE
├── README.md
├── docs/
│   ├── General Database Diagram.png
│   ├── SER 401 Task #103.pdf
│   ├── Task#102 Database Research.pdf
│   ├── Task105DatabaseWindow.png
│   ├── research-notes.md
│   └── ...
├── scripts/
│   └── pkgmgr.sh             # Any additional build/test/deploy scripts
├── web-scraping-electron-app/
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
│   │   │   │   │   └── Theme.html
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
│   ├── public/
│   │   └── index.html         # Static entry for front-end
│   ├── 📜 package.json
│   ├── 📦 yarn.lock
│   ├── 🛠️ .npmrc
│   └── 📖 README.md
├── 📓 J_Initiative_Web_Scraper_Colab_Notebook.ipynb

```
