#!/usr/bin/bash

# Function to prompt user for pipenv install
check_and_prompt_pipenv() {
    if ! command -v pipenv &> /dev/null; then
        echo -e "\033[1;33m[WARNING] pipenv is not installed.\033[0m"
        read -p "Do you want to install pipenv now? (y/n): " answer
        case "$answer" in
            [Yy]* )
                echo -e "\033[1;32m[INFO] Installing pipenv...\033[0m"
                pip install pipenv || {
                    echo -e "\033[1;31m[ERROR] pipenv installation failed.\033[0m"
                    return 1
                }
                ;;
            [Nn]* )
                echo -e "\033[1;31m[INFO] pipenv not installed. Canceling setup.\033[0m"
                return 1
                ;;
            * )
                echo -e "\033[1;31m[ERROR] Invalid input. Canceling setup.\033[0m"
                return 1
                ;;
        esac
    fi
    return 0
}

# Help message
help() {
    echo -e "\033[1;34mUsage: source ./scripts/pkgmgr.sh\033[0m"
    echo "Available commands:"
    echo "  build       - Install dependencies (cleans first)"
    echo "  clean       - Remove node_modules and virtualenv"
    echo "  rebuild     - clean + build"
    echo "  run dev     - Run app in dev mode"
    echo "  run prod    - Run app in production mode"
    echo "  package     - Package app for distribution"
}

# Creates the environment and installs all dependencies
build() {
    echo -e "\033[1;32m[INFO] Building project...\033[0m"
    clean
    yarn install
}

# Cleans the project directory of unnecessary files
clean() {
    echo -e "\033[1;33m[INFO] Cleaning project...\033[0m"

    [ -f package-lock.json ] && rm -f package-lock.json
    [ -d ./node_modules ] && rm -rf ./node_modules

    if [ -d ./.venv ]; then
        if [[ "$VIRTUAL_ENV" != "" ]]; then
            deactivate
        fi
        rm -rf ./.venv Pipfile Pipfile.lock
    fi
}

# Cleans and then builds the project
rebuild() {
    clean
    build
}

# Runs the application in dev or prod mode
run() {
    case $1 in
        dev)
            echo -e "\033[1;32m[INFO] Running in development mode...\033[0m"
            yarn run dev
            ;;
        prod)
            echo -e "\033[1;32m[INFO] Running in production mode...\033[0m"
            yarn run start
            ;;
        *)
            echo -e "\033[1;31m[ERROR] Must specify 'dev' or 'prod'\033[0m"
            ;;
    esac
}

# Package the Electron app
package() {
    echo -e "\033[1;32m[INFO] Packaging app...\033[0m"
    yarn run electron-forge package
}

# Auto-load check
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    echo -e "\033[1;31m[ERROR] Please source this script: source ./scripts/pkgmgr.sh\033[0m"
    exit 1
fi

# Initial check for pipenv
if ! check_and_prompt_pipenv; then
    echo -e "\033[1;31m[EXIT] Setup aborted due to missing pipenv.\033[0m"
    return 1
fi

echo -e "\033[1;36m[INFO] pkgmgr.sh loaded. Run 'help' for available commands.\033[0m"