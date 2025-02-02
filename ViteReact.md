Node.js and npm: Verify by running node -v and npm -v.
Vite CLI: Install globally for ease of use.  

``` npm install -g create-vite ```

Navigate to renderer directory and list installed Vue packages:  
``` npm ls vue ```

Uninstall Vue Dependencies  
```npm uninstall @vue/server-renderer@3.5.13 extraneous```

Clean node_modules and Reinstall Dependencies  
```rm -rf node_modules package-lock.json```

Reinstall  
```npm install```

Use Vite's CLI to scaffold a new React project within the renderer directory:
```npm create vite@latest```

Set up Vite with React
Project name: vite-demo
Framework: React.
Variant: JavaScript 
```
renderer/
├── index.html
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── ...other React components
├── package.json
├── vite.config.js
└── ...other Vite files
```

React setup
```npm install @vitejs/plugin-react --save-dev```

To run the demo you need to navigate to renderer/vite-demo
Here is a list of commands:
```
Scripts available in vite-demo@0.0.0 via `npm run-script`:
  dev
    vite
  build
    vite build
  lint
    eslint .
  preview
    vite preview
```

