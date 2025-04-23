# ⚙️ Setup Guide



---

## 1. Prerequisites

Before you begin, make sure you have the following tools installed:

| Tool               | Minimum Version | macOS / Linux Install                                                                             | Windows Install                                                                                   |
|--------------------|-----------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| **Git**            | 2.20+           | `brew install git` (macOS) or your distro’s package manager (e.g. `apt install git`)              | Download installer from https://git-scm.com/download/win (includes Git Bash)                      |
| **Node.js & Yarn** | Node 14+ & Yarn 1.22+<br>(or npm) | `brew install node yarn`<br>or `curl -fsSL https://deb.nodesource.com/setup_16.x \| sudo bash - && sudo apt install nodejs yarn` | Download Node.js from https://nodejs.org (“LTS”); then in an elevated Powershell: `npm install --global yarn` |
| **Python & venv**  | 3.7+            | Already bundled on most distros; if missing: `brew install python3` or `sudo apt install python3` | Download from https://python.org; check “Add to PATH” at install time                              |
| **pipenv** (opt.)  | —               | `pip3 install --user pipenv`                                                                      | `pip install pipenv`                                                                              |

> **Why Python?**  
> Some auxiliary scripts (e.g. data sync) use Python. If you don’t need those, you can skip the Python steps below—just follow the Node/Electron parts.

---


## 2. Bash Setup Script

We’ve provided `scripts/setup.sh` to automate common checks & installs.

### 2.1 What it does

When you `source` it, it:

1. **Checks your Python** (≥ 3.7)  
2. **Checks pipenv** (if you’ll use a Python venv)  
3. **Checks Node & Yarn**  
4. **Checks for a local Python virtualenv** (`.venv`)  
5. **Installs/validates Node modules** in the `web-scraping-electron-app` folder  
6. **Exposes helper commands** for:  
   - `clean` – remove old builds & deps  
   - `build` – clean + `yarn install`  
   - `rebuild` – same as `clean` then `build`  
   - `run dev` – start Electron in dev mode (auto‑reload)  
   - `run prod` – start Electron “production” mode  
   - `package` – create distributables via `electron-forge`  
   - `docs` – generate JSDoc‑based Markdown for your API  

### 2.2 How to run it

```bash
# From the project root:
source ./scripts/setup.sh
# You should see colored [INFO] logs and, at the end:
# [INFO] setup.sh loaded. Type 'help' for usage.
```

### 2.3 Sample output

```text
[INFO] Detected Python version: 3.9
[INFO] Detected pipenv.
[INFO] Detected NodeJS version: v16.14.0
[INFO] Detected Yarn version: 1.22.19
[WARN] No local .venv found. If you need Python tasks, run: pipenv install
[WARN] node_modules directory not found. Running 'yarn install'...
[INFO] Node modules installed.
[INFO] setup.sh loaded. Type 'help' for usage.
[INFO] Try 'build' then 'run dev' to get started.
```

> **Debug tips:**  
> - If you see a **permission error**, ensure you’re using the system’s Bash (not Windows CMD). On Windows you can use **Git Bash** or **WSL**.  
> - If `pipenv` or `yarn` isn’t found, install them globally (`npm install -g yarn`, `pip install pipenv`).

---

## 3. Manual Setup (No Bash)

If you can’t—or prefer not to—source the script, do these steps manually:

### 3.1 (Optional) Python virtual environment

```bash
# macOS / Linux
python3 -m venv .venv
source .venv/bin/activate

# Windows PowerShell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

If you’re using **pipenv** instead:

```bash
pipenv install       # creates Pipfile & .venv
pipenv shell         # enter the venv
```

### 3.2 Install Node dependencies

```bash
cd web-scraping-electron-app
# With Yarn:
yarn install
# Or with npm:
npm install
```

### 3.3 Verify structure

```bash
# You should now see:
├── node_modules/
├── package.json
# in the project structure
```

---

## 4. Running the App Locally

### 4.1 Development mode

This gives hot‑reload and debug logging:

```bash
# If you sourced setup.sh:
run dev

# Or manually:
cd web-scraping-electron-app
yarn dev
# └─ which runs `electronmon .` under the hood
```

### 4.2 Production mode

Runs the same packaged Electron bundle without reload:

```bash
# If you sourced setup.sh:
run prod

# Or manually:
cd web-scraping-electron-app
npm start
```

> **Electron tips:**  
> - If the window crashes or is blank, open DevTools via `Ctrl+Shift+I` to inspect console errors.  
> - Add `--inspect` flags to your `package.json` start scripts to attach a debugger.

---

## 5. Build & Package for Production

We use **electron-forge** by default. Adjust to **electron-builder** if needed.

### 5.1 Using the setup script

```bash
# After sourcing:
package
```

### 5.2 Manually with Yarn / npm

```bash
cd web-scraping-electron-app
# With Electron Forge:
yarn run electron-forge package
# Or if you configured electron-builder:
yarn run make
```

### 5.3 Locate your artifacts

After a successful build, look in the output folder:

- **macOS**: `out/MyApp‑darwin-x64/MyApp.app`  
- **Windows**: `out/MyApp‑win32-x64/MyApp.exe`  
- **Linux**: `out/MyApp‑linux-x64/`  

You can zip or notarize these as your release bundle.

---

## Troubleshooting & Debug Tips

1. **“command not found”**  
   - Make sure you’re in a Bash‑compatible shell for `source setup.sh`.  
   - On Windows, use **Git Bash** or **WSL**, or run the manual steps.

2. **Dependency install fails**  
   - Delete `node_modules/` and retry:  
     ```bash
     rm -rf node_modules package-lock.json yarn.lock
     yarn install
     ```


