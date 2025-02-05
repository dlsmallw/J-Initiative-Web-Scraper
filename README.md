// Start only the Electron main process with auto-restart:
    "dev:electron": "electronmon .",

    // Start only the Vite dev server (inside your renderer subfolder):
    "dev:renderer": "cd renderer/vite-demo && npm run dev",

    // Start both at once!
    "dev": "concurrently -k \"npm run dev:renderer\" \"npm run dev:electron\"",

    // For production
    "build": "cd renderer/vite-demo && npm run build"
