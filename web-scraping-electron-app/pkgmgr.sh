#!/usr/bin/bash

build() {
    clean 
    yarn run build:node

    python -m venv .venv
    source .venv/Scripts/activate

    pip install pipenv
    pipenv install
}

clean() {
    if [ -d ./.venv ]; then
        deactivate
        rm -rf ./.venv
    fi

    if [ -d ./node_modules ]; then
        rm -rf ./node_modules
    fi
}

rebuild() {
    clean
    build
}