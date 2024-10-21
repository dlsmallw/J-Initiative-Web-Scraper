# Project Setup
## Requirements for building the project

### Python 
The following are required for developing and building the project:
 - `Python`: Version 3.7+
    - https://www.python.org/downloads/
 - `pip`: The Python package installer
    - https://pip.pypa.io/en/stable/installation/
 - `pipenv`: A more refined package manager similar to `npm`
    - Run the following in terminal/cmd/bash:
    ```
    pip install pipenv
    ```
 - NOTE: If installation of `pipenv` will automatically happen if you have bash installed (occurs when running the `npm run build` command).

### NodeJS/Electron
The following are required for developing and building the project:
 - `NodeJS`
    - https://nodejs.org/en/download/package-manager
 - `npm`: NodeJS package installer/manager
    - NodeJS installation includes NPM, but if there are issues you can visit https://docs.npmjs.com/getting-started
    - Run the following to validate that NodeJS and NPM are properly installed:
    ```
    node -v
    npm -v
    ```

### Building the project
First, you will need to setup the Python venv by following the steps provided at 
 - https://fastapi.tiangolo.com/virtual-environments/#activate-the-virtual-environment

To build the project (install all NodeJS and Python dependencies), run the following:
```
npm run build
```
<i>NOTE: This utilizes a build.sh bash script which will automatically build the python environment, which will automatically install all of the project dependencies (NodeJS and Python).</i>

You will then need to manually activate the venv, so that your system doesn't default to the global Python venv:
 - If you are using bash, run the following:
```
source .venv/Scripts/activate

# this checks that it properly activated
which python 
```
 - If you are using Linux or MacOS, run the following:
```
source .venv/bin/activate

# this checks that it properly activated
which python 
```
 - If you are using Windows Powershell, run the following:
```
.venv\Scripts\Activate.ps1

# this checks that it properly activated
Get-Command python
```

## Running the application in a dev environment
To launch the application (GUI), run the following:
```
npm run dev
```
This will go ahead and run the application in a dev environment (using `electronmon`, which allows the application to be automatically restarted when changes are made to the codebase).