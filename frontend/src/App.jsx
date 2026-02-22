// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import DownloadService from './services/download.service';
import './App.css';

function App() {
  const [windowsDownload, setWindowsDownload] = useState(null);
  const [macosDownload, setMacosDownload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const GITHUB_REPO_URL = "https://github.com/simeon-stamboliyski/SynapseVisionLab";

  useEffect(() => {
    // Fetch Windows download info
    DownloadService.getDownloadForPlatform('windows')
      .then(response => {
        if (response.data.success) {
          setWindowsDownload(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching Windows download:', error);
        setError('Failed to load Windows download info');
      });

    // Fetch macOS download info  
    DownloadService.getDownloadForPlatform('macos')
      .then(response => {
        if (response.data.success) {
          setMacosDownload(response.data.data);
        }
      })
      .catch(error => {
        console.error('Error fetching macOS download:', error);
        setError('Failed to load macOS download info');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDownload = (platform) => {
      DownloadService.downloadFile(platform);
  };

  if (loading) {
    return <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="grid-overlay"></div>

      <section className="hero">

        <div className="hero-content">
          <h1><span className="grad">Synapse</span>VisionLab</h1>

          <p className="subtitle">
            Advanced EEG signal visualization and processing.
            Real-time analysis, artifact rejection, and spectral decomposition — all in one interface.
          </p>

          {error && (
            <div style={{color: 'red', marginBottom: '1rem'}}>
              {error}
            </div>
          )}

          <div className="download-row">
            {windowsDownload && (
              <button 
                className="btn btn-primary"
                onClick={() => handleDownload('windows')}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M3 5.5A2.5 2.5 0 015.5 3h5A2.5 2.5 0 0113 5.5V7h-2V5.5a.5.5 0 00-.5-.5h-5a.5.5 0 00-.5.5v13a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V17h2v1.5a2.5 2.5 0 01-2.5 2.5h-5A2.5 2.5 0 013 18.5v-13zM21 12l-4-4v3H9v2h8v3l4-4z"/>
                </svg>
                Download for Windows {windowsDownload.version && `v${windowsDownload.version}`}
                <span className="ext">.exe</span>
              </button>
            )}

            {macosDownload && (
              <button 
                className="btn btn-secondary"
                onClick={() => handleDownload('macos')}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.97 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.89C10.1 6.87 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                Download for macOS {macosDownload.version && `v${macosDownload.version}`}
                <span className="ext">.dmg</span>
              </button>
            )}
          </div>
        </div>

        <div className="wave-container">
          <svg width="100%" height="100%" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path className="signal-line" d="M0,50 Q30,20 60,50 T120,50 T180,50 T240,50 T300,50 T360,50 T420,50 T480,50 T540,50 T600,50 T660,50 T720,50 T780,50 T840,50 T900,50 T960,50 T1020,50 T1080,50 T1140,50 T1200,50" fill="none" stroke="hsl(185 80% 55%)" strokeWidth="2"/>
            <path className="signal-line" d="M0,60 Q40,30 80,60 T160,60 T240,60 T320,60 T400,60 T480,60 T560,60 T640,60 T720,60 T800,60 T880,60 T960,60 T1040,60 T1120,60 T1200,60" fill="none" stroke="hsl(260 60% 60%)" strokeWidth="1.5" style={{animationDelay: '1s'}}/>
          </svg>
        </div>
      </section>

      <section className="features">
        <div className="features-grid">
          <div className="feature">
            <h3>Real-Time Streaming</h3>
            <p>Process live EEG data with sub-millisecond latency from any compatible device.</p>
          </div>
          <div className="feature">
            <h3>Spectral Analysis</h3>
            <p>FFT, wavelet transforms, and power spectral density — all built in.</p>
          </div>
          <div className="feature">
            <h3>Export &amp; Share</h3>
            <p>Export to EDF+, CSV, or MATLAB formats. Collaborate seamlessly.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-inner">
          <span className="mono">© 2026 SynapseVisionLab</span>
          <div className="footer-links">
            <a 
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;