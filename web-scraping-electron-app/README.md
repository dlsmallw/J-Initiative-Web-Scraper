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
To automatically build the project (install all NodeJS and Python dependencies), run the following:
```
npm run build
```
This will automatically install all of the project dependencies (NodeJS and Python).

## Running the application in a dev environment
To launch the application (GUI), run the following:
```
npm run dev
```
This will go ahead and run the application in a dev environment (using `electronmon`, which allows the application to be automatically restarted when changes are made to the codebase).