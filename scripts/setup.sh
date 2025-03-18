#!/usr/bin/bash

# =======================
# === Color Loggers  ===
# =======================
GREEN='\033[1;32m'; YELLOW='\033[1;33m'; RED='\033[1;31m'; BLUE='\033[1;34m'; CYAN='\033[1;36m'; NC='\033[0m'

log_info()   { echo -e "${GREEN}[INFO] $1${NC}"; }
log_warn()   { echo -e "${YELLOW}[WARN] $1${NC}"; }
log_error()  { echo -e "${RED}[ERROR] $1${NC}"; }
log_help()   { echo -e "${CYAN}$1${NC}"; }


# =========================
# === Sourced-Only Check ==
# =========================
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    log_error "Please source this script instead of running it directly:"
    echo "    source ./scripts/setup.sh"
    exit 1
fi

# ======================
# === Project Paths  ===
# ======================
PROJECT_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd )"
APP_DIR="$PROJECT_ROOT/web-scraping-electron-app"


# ================================
# === 1) Python Version Check  ===
# ================================
check_python_version() {
    REQUIRED="3.7"
    if ! command -v python3 &> /dev/null; then
        log_warn "python3 not found. Python >= 3.7 is recommended if you need Python tasks."
    else
        PY_VER=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
        if [[ $(printf '%s\n' "$REQUIRED" "$PY_VER" | sort -V | head -n1) != "$REQUIRED" ]]; then
            log_warn "Detected Python version: $PY_VER (older than $REQUIRED). You may want to upgrade."
        else
            log_info "Detected Python version: $PY_VER"
        fi
    fi
}

# =================================
# === 2) pipenv Check (No Prompt)
# =================================
check_pipenv() {
    if ! command -v pipenv &> /dev/null; then
        log_warn "pipenv not found. Install via 'pip install pipenv' if needed for Python venv."
    else
        log_info "Detected pipenv."
    fi
}

# =================================
# === 3) NodeJS & Yarn Check   ===
# =================================
check_node_yarn() {
    if ! command -v node &> /dev/null; then
        log_warn "NodeJS not found. Install from: https://nodejs.org/"
    else
        log_info "Detected NodeJS version: $(node -v)"
    fi

    if ! command -v yarn &> /dev/null; then
        log_warn "Yarn not found. Install from: https://classic.yarnpkg.com/en/docs/install"
    else
        log_info "Detected Yarn version: $(yarn --version)"
    fi
}

# =======================================
# === 4) Virtual Env Existence Check ====
# =======================================
check_virtualenv() {
    cd "$APP_DIR" || return 1

    if [ -d .venv ]; then
        log_info "Local .venv found. (Activate via 'cd web-scraping-electron-app && pipenv shell')"
    else
        log_warn "No local .venv found. If you want a local Python env, run:"
        echo "       cd web-scraping-electron-app && pipenv install"
    fi
}

# ===========================
# === Help Command       ===
# ===========================
help() {
    log_help "Usage: source ./scripts/setup.sh"
    echo "Available commands:"
    echo "  build       - Yarn install (no forced clean)."
    echo "  clean       - Remove node_modules, .venv, Pipfile, etc."
    echo "  rebuild     - Clean + build from scratch."
    echo "  run dev     - Run Electron in dev mode (auto restart)."
    echo "  run prod    - Run Electron in production mode."
    echo "  package     - Package Electron app via electron-forge."
    echo "  help        - Show this help message."
    echo
    echo "[Note]"
    echo "  If you need Python-based tasks, consider 'pipenv install' and 'pipenv shell'."
    echo "  Then re-source this script inside that shell if you want these 'build', 'run', etc. functions."
}

# ========================
# === Clean Function   ===
# ========================
clean() {
    cd "$APP_DIR" || return 1
    log_info "Cleaning node_modules and Python environment..."

    [ -d node_modules ] && rm -rf node_modules && log_info "Removed node_modules/"
    [ -f package-lock.json ] && rm -f package-lock.json && log_info "Removed package-lock.json"
    if [ -d .venv ]; then
        log_info "Removing local .venv directory..."
        rm -rf .venv
    fi
    [ -f Pipfile ] && rm -f Pipfile && log_info "Removed Pipfile"
    [ -f Pipfile.lock ] && rm -f Pipfile.lock && log_info "Removed Pipfile.lock"

    if [[ -n "$VIRTUAL_ENV" ]]; then
        if type deactivate &> /dev/null; then
            log_info "Deactivating active virtualenv..."
            deactivate
        else
            log_warn "Virtualenv is active but 'deactivate' not found in current shell."
            log_info "Unsetting VIRTUAL_ENV variable..."
            unset VIRTUAL_ENV
        fi
    else
        log_info "No active virtualenv to deactivate."
    fi
}

# ============================
# === Build Function      ===
# ============================
build() {
    cd "$APP_DIR" || return 1
    log_info "Installing NodeJS dependencies with yarn..."
    yarn install || { log_error "Yarn install failed."; return 1; }
}

# ============================
# === Rebuild Function     ===
# ============================
rebuild() {
    clean
    build
}

# ============================
# === Run App (dev/prod)  ===
# ============================
run() {
    cd "$APP_DIR" || return 1
    case $1 in
        dev)
            log_info "Running Electron in dev mode (electronmon)..."
            yarn run dev
            ;;
        prod)
            log_info "Running Electron in production mode..."
            yarn run start
            ;;
        *)
            log_error "Specify 'dev' or 'prod'. e.g.: run dev"
            ;;
    esac
}

# ============================
# === Package Electron App ===
# ============================
package() {
    cd "$APP_DIR" || return 1
    log_info "Packaging Electron app (electron-forge)..."
    yarn run electron-forge package
}

# ============================
# === Execute Checks      ===
# ============================
check_python_version
check_pipenv
check_node_yarn
check_virtualenv

log_info "setup.sh loaded. Type 'help' for commands."
log_info "To build & run the app: 'build' then 'run dev'."
