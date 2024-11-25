#!/usr/bin/bash

# Creastes the environment and installs all dependencies
build() {
    clean 
    yarn install
}

# Cleans the project directory of unnecessary files
clean() {
    rm -rf package-lock.json

    if [ -d ./.venv ]; 
    then
        deactivate
        rm -rf ./.venv
        rm -rf ./Pipfile
        rm -rf Pipfile.lock
    fi

    if [ -d ./node_modules ]; 
    then
        rm -rf ./node_modules
    fi
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

package() {
    yarn run electron-forge package
}
