import { useState, useCallback, useEffect } from 'react';

import PhotoView from './components/photo-view';
import WebcamApp from './components/webcam-app';

function Webcam() {
  const [initalized, setInitialized] = useState(0);
  const [webcamPermission, setWebcamPermission] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const checkWebcamPermission = useCallback(() => {
    const permissions = navigator.mediaDevices.getUserMedia({ audio: false, video: true });

    permissions.then(() => {
      setWebcamPermission(true);
    }).catch(() => {
      setWebcamPermission(false);
      alert(`Camera Permission Access Denied or Being Accessed by Another Application`);
    });
  }, []);

  useEffect(() => {
    if (initalized === 1 && window) {
      const isChrome = navigator.userAgent.indexOf("Chrome") != -1;

      console.log(isChrome, initalized,  navigator.userAgent);

      if (isChrome) {
        navigator.permissions.query({ name: 'camera' }).then((result) => {
          if (result.state === 'granted') {
            setWebcamPermission(true);
          }
        });
      }
    }
  }, [initalized]);

  useEffect(() => {
    if (initalized < 1) {
      setInitialized(initalized + 1);
    }
  }, [initalized]);

  return (
    <>
      {!webcamPermission && (
        <button onClick={checkWebcamPermission}>Grant Camera Permission</button>
      )}

      {webcamPermission && (
        <>
          <div
            style={{
              display: !imageSrc ? 'block' : 'none'
            }}
            className='webcam__content-wrapper'
          >
            <WebcamApp
              setImageSrc={setImageSrc}
            />
          </div>

          <div
            style={{
              display: imageSrc ? 'block' : 'none'
            }}
            className='webcam__content-wrapper'
          >
            <PhotoView
              setImageSrc={setImageSrc}
              imageSrc={imageSrc}
            />
          </div>
        </>
      )}
    </>
  );
}

export default Webcam;
