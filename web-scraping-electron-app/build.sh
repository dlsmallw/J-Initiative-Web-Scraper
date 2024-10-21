#!/usr/bin/bash

python -m venv .venv
source .venv/Scripts/activate

pip install pipenv
pipenv install