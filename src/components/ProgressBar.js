import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Animated, Button } from 'react-native';

const ProgressBar = ({loadProgress=0}) => {

    const show = (loadProgress == 0 || loadProgress == 1) ? false : true
    // let show = true

    const counter = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        load(loadProgress)
        // console.log(loadProgress)

      }, [loadProgress]);

    const loaderValue = useRef(new Animated.Value(0)).current;
    const load = (progress) => {
        Animated.timing(counter, {
            toValue: progress, //final value
            duration: 200, //update value in 500 milliseconds
            useNativeDriver: false,
        }).start();
    };
    const width = counter.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })

    if (show){
        return (
            <View style={styles.container}>
                <View style={styles.progressBar}>
                    <Animated.View
                        style={
                            ([StyleSheet.absoluteFill],
                                { backgroundColor: 'rgb(94,204,68)', width })
                        }></Animated.View>
                </View>
            </View>
        )
    } else {
        return <></>
    }
    
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'Column',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: Constants.statusBarHeight,
        // backgroundColor: '#ecf0f1',
        // padding: 8,
    },
    progressBar: {
        height: 1,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        // borderWidth: 2,
        borderRadius: 5,
      },
});

export default ProgressBar