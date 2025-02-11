# Project Setup
## Requirements for building the project

### Python 
The following are required for developing and building the project:
 - `Python`: Version 3.7+
    - https://www.python.org/downloads/
 - `Bash`:
    - It is highly recommended to install and use a bash shell for building and running the project
    - The installation and setup for bash shells depends on the OS (Google the installation process for your specific system)
 - `pip`: The Python package installer
    - https://pip.pypa.io/en/stable/installation/
 - `pipenv`: A more refined package manager similar to `npm/yarn`
    - Run the following in terminal/cmd/bash:
    ```
    pip install pipenv
    ```
 - NOTE: If installation of `pipenv` will automatically happen if you have bash installed (occurs when running the `build` command after running the pkgmgr.sh script).

### NodeJS/Electron
The following are required for developing and building the project:
 - `NodeJS`
    - https://nodejs.org/en/download/package-manager
 - `yarn`: NodeJS package installer/manager
    - The installer can be downloaded from https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable, under the 'Alternatives' list
    - Run the following to validate that NodeJS and yarn are properly installed:
    ```
    node -v
    yarn --version
    ```

### Building the project
First, you will need to setup the Python venv by following the steps provided at 
 - https://fastapi.tiangolo.com/virtual-environments/#activate-the-virtual-environment

<i>It is recommended to run the pkgmgr.sh bash script and then using the bash functions for easier project setup</i>
This can be done by running the following in a bash shell within the root of the project (BASH SHELL IS REQUIRED):
```
source ./pkgmgr.sh
```

<i>NOTE: This will automatically install all of the project dependencies (NodeJS and Python).</i>
To build the project (install all NodeJS and Python dependencies), run the following in the bash shell:
```
# this runs the build function from the pkgmgr.sh script
build

# this checks that it properly activated
which python 
```

To clean the project (remove the node_modules and .venv file, which also deactivates the virtual environment), run the following in the bash shell:
```
clean
```

To rebuild the project (performs a project clean and then build), run the following in the bash shell:
```
rebuild
```

## Running the application
To launch the application (GUI) in dev mode, run the following in the bash shell:
```
run dev
```
This will go ahead and run the application in a dev environment (using `electronmon`, which allows the application to be automatically restarted when changes are made to the codebase). You can end this process by using the key combination, 'ctrl+c'.