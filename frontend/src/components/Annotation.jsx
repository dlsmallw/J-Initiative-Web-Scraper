import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const lsAPI = window.lsAPI
const electronAPI = window.electronAPI

export default function AnnotationPage() {
  const [lsUrl, setLsUrl] = useState(localStorage.getItem('lsURL') || '');
  const [apiToken, setApiToken] = useState(localStorage.getItem('apiToken') || '');
  const [isLsSet, setIsLsSet] = useState(!!lsUrl);
  const [showExternal, setShowExternal] = useState(false)

  // On mount or whenever lsUrl/token changes, store them in localStorage
  useEffect(() => {
    localStorage.setItem('lsURL', lsUrl);
    localStorage.setItem('apiToken', apiToken);
  }, [lsUrl, apiToken]);

  // If we do have an LS URL on mount, call lsAPI methods (like your original code).
  useEffect(() => {
    if (lsUrl) {
      if (apiToken) {
        lsAPI.initVariables(lsUrl, apiToken)
      } else {
        lsAPI.updateURL(lsUrl)
      }
    }
  }, [lsUrl, apiToken])

  // Utility: Validate that the LS URL is https + includes ".hf" + not 404
  const checkLSURL = (url) => {
    let lsURL
    try {
      lsURL = new URL(url)
    } catch (err) {
      return false
    }

  // Allow localhost for development even if not HTTPS
  if (lsURL.hostname === 'localhost') {
    return true;
  }

  if (lsURL.protocol !== 'https:') return false;

    // Quick check for .hf in the domain
    if (!lsURL.host.split('.').find((st) => st === 'hf')) {
      return false
    }

    // We won't do a blocking XHR here in React, but we could do fetch + 404 check
    return true
  }

   const handleSubmitUrl = () => {
    if (!lsUrl.trim()) {
      postAlert(`The URL '${lsUrl}' is not valid`, 'Invalid URL')
      setLsUrl('')
      return
    }
    if (!checkLSURL(lsUrl)) {
      postAlert(`The URL '${lsUrl}' is not valid`, 'Invalid URL')
      setLsUrl('')
      return
    }
    setIsLsSet(true)
  }

  const handleClearProject = () => {
    // Hide embedded
    setIsLsSet(false)
    setShowExternal(false)

    // Clear local storage
    localStorage.removeItem('lsURL')
    localStorage.removeItem('apiToken')

    // Clear React state
    setLsUrl('')
    setApiToken('')

    // Call electron API
    lsAPI.clearLinkedProject()
  }

  const handleOpenExternalWin = () => {
    setShowExternal(true)
    // In original code, we open an external LS window:
    lsAPI.openExternal(lsUrl)
  }

  const handleCloseExternalWin = () => {
    setShowExternal(false)
  }

  // If the external LS window closes, restore embedded view
  useEffect(() => {
    lsAPI?.extLSWinClosed(() => {
      setShowExternal(false)
    })
  }, [])

  // If the LS URL changes externally
  useEffect(() => {
    lsAPI?.urlChange((newUrl) => {
      setLsUrl(newUrl)
    })
  }, [])

  // Updating URL from the config input
  const handleUpdateLsUrl = (newUrl) => {
    if (!checkLSURL(newUrl)) {
      postAlert(`The URL '${newUrl}' is not valid`, 'Invalid URL')
      // revert to old value
      return
    }
    setLsUrl(newUrl)
  }

  // Updating the API token from the config
  const handleUpdateApiToken = (newToken) => {
    // If you want a more robust token check, do it here
    // For example: let regex = /^[A-Za-z0-9]+$/g;
    // If (!regex.test(newToken)) { ... }
    setApiToken(newToken)
    lsAPI.updateToken(newToken)
  }

  // postAlert, logInfo, etc. If you have a custom logger, you can call it here
  function postAlert(alertMsg, cause) {
    const json = { msg: alertMsg, errType: cause || null }
    if (!cause) {
      electronAPI.postDialog.general(JSON.stringify(json))
      console.info(alertMsg)
    } else {
      electronAPI.postDialog.error(JSON.stringify(json))
      console.error(`${alertMsg} Cause: ${cause}`)
    }
  }

  return (
    <div className="my-5 container">
      <h1 className="display-4">Label Studio</h1>
      {!isLsSet ? (
        <div className="my-4">
          <label className="form-label">URL of Label Studio Project</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter the URL to the Label Studio Project"
              value={lsUrl}
              onChange={(e) => setLsUrl(e.target.value)}
            />
            <button className="btn btn-outline-secondary" onClick={handleSubmitUrl}>Submit</button>
          </div>
        </div>
      ) : (
        <div className="position-relative">
          <iframe title="Label Studio" src={lsUrl} className="w-100" style={{ height: '500px', border: 'none' }}></iframe>
          <button className="btn btn-outline-danger mt-3" onClick={handleClearProject}>Clear Linked Project</button>
        </div>
      )}
      <div className="accordion mt-4">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ls-config">
              Label Studio Configuration
            </button>
          </h2>
          <div id="ls-config" className="accordion-collapse collapse">
            <div className="accordion-body">
              <label className="form-label">Label Studio Project API Token</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter API Token"
                  value={apiToken}
                  onChange={(e) => setApiToken(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
