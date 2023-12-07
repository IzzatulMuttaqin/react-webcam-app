import { useState, useCallback } from 'react';

import Landing from './components/landing';
import Webcam from './components/webcam';

import './index.css';

function Home() {
  const [showWebcamApp, setShowWebcamApp] = useState(false);

  const turnOnWebcamApp = useCallback(() => { setShowWebcamApp(true) }, []);

  return (
    <div className="home">
      {!showWebcamApp && (
        <Landing
          turnOnWebcamApp={turnOnWebcamApp}
        />
      )}

      {showWebcamApp && (
        <Webcam />
      )}
    </div>
  );
}

export default Home;
