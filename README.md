# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Web Feature

How to use React Webcam App
1. Access the web
2. Click Take a Selfie
3. Click Grant Camera Permission
4. Grant Camera Permission to the web
5. Take a picture you like
6. Apply any color filter you want (defaulted to none). With these list of filter:
    1. Original: No filter
    2. Grayscale: 100% Grayscale color
    3. Sepia: Add sepia 125% color to image
    4. Blur: Blurring image with 10 pixel resulotion blur
    5. Inverted: Invert RGB color of image color
    6. Contrast: Hightlighting contrasting color of the image by 2x

## Compatibility Issues

The filter is not working properly in iOS as the filter developed with `CanvasRenderingContext2D: filter`.

Manually tested on device:
- Laptop Legion 5 Pro
    - Ubuntu 20.04 LTS
        - Chrome Version 119 ✅
        - Firefox 119 ✅
- Infinix HOT 11S NFC
    - Android 11
        - Chrome 118 ✅
- iPhone XR
    - iOS 17.1
        - Safari 17 ❌