import './index.css';

function Landing({ turnOnWebcamApp }) {
    return (
        <div className='landing'>
            <h1>
                React Webcam App
            </h1>
            <button onClick={turnOnWebcamApp}>Take a Selfie</button>
        </div>
    )
}

export default Landing;