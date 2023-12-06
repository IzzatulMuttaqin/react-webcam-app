import { useRef, useState, useCallback } from 'react';

import Webcam from "react-webcam";

import './index.css';

function Home() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    const img = new Image();
    img.src = imageSrc;

    if (canvasRef) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      img.onload = function () {
        const { width, height } = img;
        const aspectRatio = height / width;
        canvas.height = canvas.width * aspectRatio;
        context.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
        setImgSrc(canvas.toDataURL());
      }
    }
  }, [webcamRef]);

  const downloadImage = useCallback(() => {
    if (document) {
      var a = document.createElement("a");
      a.href = imgSrc;
      a.download = "Image.png";
      a.click();
    } else {
      alert('No web dom is detected');
    }
  }, [imgSrc]);

  console.log(imgSrc);

  return (
    <div className="Home">
      <header className="Home-header">
        <div className="Home-content">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            forceScreenshotSourceSize="true"
            width="100%"
          />
          <button onClick={capture}>Capture photo</button>
          <canvas
            ref={canvasRef}
            id="react-canvas"
            width="400"
            height="400"
          />
          <button onClick={downloadImage}>Download</button>
        </div>
      </header>
    </div>
  );
}

export default Home;
