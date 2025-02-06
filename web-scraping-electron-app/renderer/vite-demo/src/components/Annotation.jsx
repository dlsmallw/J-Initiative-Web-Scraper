import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function AnnotationPage() {
  const [lsUrl, setLsUrl] = useState(localStorage.getItem('lsURL') || '');
  const [apiToken, setApiToken] = useState(localStorage.getItem('apiToken') || '');
  const [isLsSet, setIsLsSet] = useState(!!lsUrl);

  useEffect(() => {
    localStorage.setItem('lsURL', lsUrl);
    localStorage.setItem('apiToken', apiToken);
  }, [lsUrl, apiToken]);

  const handleSubmitUrl = () => {
    if (lsUrl.trim() === '') {
      alert('Please enter a valid URL');
      return;
    }
    setIsLsSet(true);
  };

  const handleClearProject = () => {
    setLsUrl('');
    setApiToken('');
    setIsLsSet(false);
  };

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
