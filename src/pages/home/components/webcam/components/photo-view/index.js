import { useRef, useState, useCallback, useEffect } from 'react';

import { imagesList } from './index.constant';

import './index.css';

function SmallImage({
    name,
    onClickApply
}) {
    return (
        <div
            className="photo-view__small-image-wrapper"
            onClick={onClickApply}
        >
            <img
                className="photo-view__small-image"
                src={`/images/${name.toLowerCase()}.png`}
            />
            <div>
                {name}
            </div>
        </div>
    )
}

function PhotoView({
    setImageSrc,
    imageSrc
}) {
    const biggerCanvasRef = useRef(null);

    const [initialized, setInitialized] = useState(0);
    const [imgSrc, setImgSrc] = useState(null);

    const drawImage = useCallback((filter) => {
        const img = new Image();
        img.src = imageSrc;

        if (biggerCanvasRef && window) {
            const canvasBig = biggerCanvasRef.current;
            const contextBig = canvasBig.getContext('2d');

            img.onload = function () {
                contextBig.clearRect(0, 0, canvasBig.width, canvasBig.height);

                contextBig.scale(5, 5);

                const { width, height } = img;
                const aspectRatio = height / width;

                canvasBig.height = canvasBig.width * aspectRatio;
                contextBig.filter = filter ?? 'none';
                contextBig.drawImage(img, 0, 0, width, height, 0, 0, canvasBig.width, canvasBig.height);

                setImgSrc(canvasBig.toDataURL('image/png'));
            }
        } else {
            alert("Image couldn't be generated because missing web document")
        }
    }, [imageSrc]);

    const retakeImage = useCallback(() => {
        const canvasBig = biggerCanvasRef.current;
        const contextBig = canvasBig.getContext('2d');

        contextBig.clearRect(0, 0, canvasBig.width, canvasBig.height);

        setImageSrc(null);
        setImgSrc(null);
        setInitialized(0);
    }, [setImageSrc]);

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

    useEffect(() => {
        if (initialized === 1 && imageSrc) {
            drawImage();
        }
    }, [initialized, imageSrc, drawImage]);

    useEffect(() => {
        if (initialized < 1 && imageSrc) {
            setInitialized(initialized + 1);
        }
    }, [initialized, imageSrc]);

    return (
        <div className="photo-view">
            <div className='photo-view__button-list'>
                <button onClick={retakeImage}>Retake Image</button>
                <button onClick={downloadImage}>Download</button>
            </div>
            <div
                className='photo-view__canvas-wrapper'
            >
                <canvas
                    ref={biggerCanvasRef}
                    className="photo-view__canvas"
                    width={2000}
                />
            </div>
            <div className='photo-view__filter-list'>
                {imagesList.map(({ name, filter }) => (
                    <SmallImage
                        key={`image-filter-${name}`}
                        name={name}
                        onClickApply={() => drawImage(filter)}
                    />
                ))}
            </div>
        </div>
    );
}

export default PhotoView;
