import React, { useState, useEffect } from 'react';

const About = () => {
  const [nodeVersion, setNodeVersion] = useState('');
  const [chromeVersion, setChromeVersion] = useState('');
  const [electronVersion, setElectronVersion] = useState('');

  useEffect(() => {
    if (window.versions && typeof window.versions.node === 'function') {
      setNodeVersion(window.versions.node());
      setChromeVersion(window.versions.chrome());
      setElectronVersion(window.versions.electron());
    } else {
      // Fallback for browser environments
      setNodeVersion('N/A');
      setChromeVersion('N/A');
      setElectronVersion('N/A');
    }
  }, []);

  return (
    <div id="about-container" className="my-5 container">
      <h1 className="display-4">About</h1>
      <p>
        Node.js Version: <span id="node-version">{nodeVersion}</span>
      </p>
      <p>
        Chromium Version: <span id="chrome-version">{chromeVersion}</span>
      </p>
      <p>
        Electron Version: <span id="electron-version">{electronVersion}</span>
      </p>
    </div>
  );
};

export default About;
