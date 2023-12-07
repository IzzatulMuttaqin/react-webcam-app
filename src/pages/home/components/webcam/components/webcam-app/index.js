import { useRef, useCallback } from 'react';

import Webcam from "react-webcam";

import './index.css';

function WebcamApp({
    setImageSrc
}) {
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
    }, [setImageSrc]);

    return (
        <div className="webcam-app">
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                forceScreenshotSourceSize="true"
            />
            <button onClick={capture}>Capture photo</button>
        </div>
    );
}

export default WebcamApp;
