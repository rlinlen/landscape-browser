import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable, Button, Alert } from 'react-native';

import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import {smooothScrollMinJs044} from '../util/appConstant';

const AutoScroll = ({browserRef, isLandscape, smileToScrollThreshold, pause}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [debounceScrollDown, setDebounceScrollDown] = useState(false);
    
    // https://stackoverflow.com/questions/56011205/is-there-a-safari-equivalent-for-scroll-behavior-smooth
    

    const scrollUp = `
        ${smooothScrollMinJs044}
        window.scrollBy({
            top:-window.innerHeight / 2,
            left: 0,
            behavior: 'smooth'
        });
        // document.body.style.backgroundColor = 'blue';
    `
    const scrollDown = `
        ${smooothScrollMinJs044}
        window.scrollBy({
            top:window.innerHeight / 2,
            left: 0,
            behavior: 'smooth'
        });
        // document.body.style.backgroundColor = 'red';
    `

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleFacesDetected = (faces, isLandscape) => {
        // console.log(faces)
        // only allow it in protrait mode, as it's not reliable in detection in landscape mode
        // if (faces.length && !isLandscape){
        if (faces.length && !pause){
            let {leftEyeOpenProbability, rightEyeOpenProbability, smilingProbability, rollAngle, yawAngle} = faces[0]
            // console.log(`${leftEyeOpenProbability} ${rightEyeOpenProbability} ${smilingProbability}`)
            // console.log(browserRef.current.props.source.uri)

            // not very reliable. try to enhance in the future
            // if (leftEyeOpenProbability < 0.15 && rightEyeOpenProbability > 0.80){
            //     // setDebounceScrollDown(true)
            //     console.log(`scroll up-left  ${leftEyeOpenProbability} ${rightEyeOpenProbability}`)
                
            //     browserRef.current.injectJavaScript(scrollUp)
            //     // setTimeout(() => {
            //     //     console.log('====>')
            //     //     setDebounceScrollDown(false)
            //     //   }, 1000)
            // } else if (leftEyeOpenProbability > 0.80 && rightEyeOpenProbability < 0.15 ){
            //     console.log(`scroll up-right ${leftEyeOpenProbability} ${rightEyeOpenProbability}`)
            //     // setDebounceScrollDown(true)
                
            //     browserRef.current.injectJavaScript(scrollUp)
            // } 
            // else if (leftEyeOpenProbability > 0.2
            //     && leftEyeOpenProbability < 0.3
            //     && rightEyeOpenProbability > 0.01
            //     && rightEyeOpenProbability < 0.5){
            //     console.log(`scroll up-right ${leftEyeOpenProbability} ${rightEyeOpenProbability}`)
            //     browserRef.current.injectJavaScript(scrollUp)
            // } else if (leftEyeOpenProbability > 0.01 
            //     && leftEyeOpenProbability < 0.05
            //     && rightEyeOpenProbability > 0.2
            //     && rightEyeOpenProbability < 0.3){
            //     console.log(`scroll up-left ${leftEyeOpenProbability} ${rightEyeOpenProbability}`)
            //     browserRef.current.injectJavaScript(scrollUp)
            // } 
            
            // else 
            if (isLandscape){
                // landscape will take smile as not smile...
                // still inaccurate
                // if (smilingProbability < smileToScrollThreshold && !debounceScrollDown) {
                //     setDebounceScrollDown(true)
                //     console.log('scroll down')
                //     browserRef.current.injectJavaScript(scrollDown)
    
                //     setTimeout(() => {
                //         console.log('====>')
                //         setDebounceScrollDown(false)
                //     }, 1000)
                // }

            }else {
                if (smilingProbability > smileToScrollThreshold && !debounceScrollDown) {
                    setDebounceScrollDown(true)
                    console.log('scroll down')
                    browserRef.current.injectJavaScript(scrollDown)
    
                    setTimeout(() => {
                        // console.log('====>')
                        setDebounceScrollDown(false)
                    }, 1000)
                }
            }
           
        }
    }

    if (hasPermission === null) {
        return <></>;
    }
    if (hasPermission === false) {
        // return <Text>No access to camera</Text>;
        return <></>
    }

    return (
        <View style={styles.container}>
            <Camera 
                style={styles.camera} 
                type={type}
                onFacesDetected={({faces}) => handleFacesDetected(faces, isLandscape)}
                faceDetectorSettings={{
                    mode: FaceDetector.FaceDetectorMode.fast,
                    detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
                    runClassifications: FaceDetector.FaceDetectorClassifications.all,
                    minDetectionInterval: 300,
                    tracking: false,
                }}   
            >
            </Camera>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'space-between',
        // borderRadius: 10,
        // backgroundColor: 'white',
        // flexDirection: 'column',
        // overflow: 'hidden'
    }
});

export default AutoScroll