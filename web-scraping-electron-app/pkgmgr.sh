#!/usr/bin/bash

# Creastes the environment and installs all dependencies
build() {
    clean 
    yarn run build:node

    python -m venv .venv
    source .venv/Scripts/activate

    pip install pipenv
    pipenv install
}

# Cleans the project directory of unnecessary files
clean() {
    if [ -d ./.venv ]; 
    then
        deactivate
        rm -rf ./.venv
    fi

    if [ -d ./node_modules ]; 
    then
        rm -rf ./node_modules
    fi

    rm -rf package-lock.json
    rm -rf yarn.lock
}

# Cleans and then builds the project
rebuild() {
    clean
    build
}

# runs the application in dev or prod mode based on the specified argument (dev or prod)
run() {
    case $1 in
        dev)
            yarn run dev
            ;;
        prod)
            yarn run start
            ;;
        *)
            printf "Must specify 'dev' or 'prod'\n"
            ;;
    esac
}
