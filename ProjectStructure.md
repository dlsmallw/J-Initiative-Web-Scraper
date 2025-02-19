# J-Initiative-Web-Scraper
```plaintext
J-Initiative-Web-Scraper
├── backend                    # Backend for Electron (was "web-scraping-electron-app")
│   ├── database               # Database-related files
│   │   ├── Database Logic
│   │   ├── FirebaseConfig.js
│   │   ├── General Database Diagram.png
│   │   ├── SER 401 Task #103.pdf
│   │   ├── Task #102 Database Research.pdf
│   │   └── Task105DatabaseWindow.png
│   ├── dist                   # Electron build output
│   │   ├── assets
│   │   │   ├── index-Bc7M_tGw.css
│   │   │   ├── index-D33E36Lg.js
│   ├── out                    # Source files
│   │   ├── main
│   │   │   ├── index.js       # Electron main process entry
│   │   ├── preload
│   │   │   ├── index.js       # Preload scripts
│   ├── logging                # Logs and Logging system
│   │   ├── logger.js
│   │   ├── LOGGING.md
│   ├── tests                  # Testing files
│   │   ├── TESTS_README.md
│   ├── config                 # Configuration files
│   │        
│   │   ├── pkgmgr.sh
│   │   ├── yarn.lock
│   ├── label-studio-api.js    # API integrations
│   ├── main.js                # Main Electron process
│   ├── preload.js             # Preload script
│   ├── package.json 
│   ├── electron.vite.config.js
│   └── README.md
│
├── frontend                   # Frontend (was "renderer")
│                    
│   │   ├── assets
│   │   │   ├── html
│   │   │   ├── open-new-window.svg
│   │   ├── components
│   │   │   ├── about.html
│   │   │   ├── annotation.html
│   │   │   ├── controllers
│   │   │   ├── database.html
│   │   │   ├── home.html
│   │   │   ├── log.html
│   │   │   ├── scrape.html
│   │   │   └── theme.html
│   │   ├── css
│   │   │   ├── style.css
│   │   ├── js
│   │   │   ├── renderer.js
│   │   │   ├── sanitizer.js
│   │   ├── node_modules
│   │   │   ├── .vite
│   │   │       ├── deps
│   │   ├── src
│   │   │   ├── components
│   │   │       ├── About.jsx
│   │   │       ├── etc. 
│   │   │   ├── App.jsx
│   │   │   ├── index.css
│   │   │   ├── main.jsx
│   │   ├── window-templates
│   │   │   ├── anno-window.html
│   │   │   ├── js
│   │   │   ├── scrape-window.html
│   │   ├── .gitignore
│   │   ├── eslint.config.js
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.js
│   ├── dist                   # Vite build output
│   │   ├── css
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── js
│
├── J_Initiative_Web_Scraper_Colab_Notebook.ipynb
├── LICENSE
├── README.md
