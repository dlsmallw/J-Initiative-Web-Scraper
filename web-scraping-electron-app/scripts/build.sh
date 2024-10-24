#!/usr/bin/bash

npm run build:node

python -m venv .venv
source .venv/Scripts/activate

pip install pipenv
pipenv install