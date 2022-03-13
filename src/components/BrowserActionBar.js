import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from "expo-linking";
import { captureRef } from 'react-native-view-shot';

import {browserActionBarHeight} from '../util/appConstant';
import { Context as CurrentContext} from '../context/currentContext';
import { Context as TabContext} from '../context/tabContext';

const BrowserActionBar = ({ browserRef, canGoBack, canGoForward, setShowBottomBar,url }) => {

    const { state: currentState , setEnterTabSelect, setEnterFavSelect } = useContext(CurrentContext);
    const { state: tabState, addNewTab, updateTab, deleteOneTab, deleteAllTabs } = useContext(TabContext);

    const handleGoBack = () => {
        // console.log(browserRef)
        if (browserRef && canGoBack) {
            browserRef.current.goBack();
        }
    }
    const handleGoForward = () => {
        if (browserRef && canGoForward) {
            browserRef.current.goForward();
        }
    }
    const handleOpenUrlExternal = () => {
        // console.log('currenturl')
        // console.log(navState.url)
        if (url){
            Linking.openURL(url)
        }
    }
    const handleSelectTab = async () => {
        setEnterTabSelect(true)

        const result = await captureRef(browserRef, {
            result: 'data-uri',
            quality: 0,
            format: 'jpg',
          });
        // console.log(result)

        let updatedTab = {id:currentState.currentTab ,view:result}
        updateTab(updatedTab)
    }

    const handleSelectFavorite = () => {
        setEnterFavSelect(true)
        setShowBottomBar(false)
    }


    return (
        <View style={styles.browserOpsContainer}>
            <TouchableOpacity
                // style={styles.changeOrientationButton}
                hitSlop={{left: 20, right: 20}}
                onPress={() => handleGoBack()}
            // disabled={!navState.canGoBack}
            >
                <AntDesign name="left" size={24} color={canGoBack ? "white" : "#rgb(100,100,100)"} />
            </TouchableOpacity>
            <TouchableOpacity
                // style={styles.changeOrientationButton}
                hitSlop={{left: 20, right: 20}}
                onPress={() => handleGoForward()}
            >
                <AntDesign name="right" size={24} color={canGoForward ? "white" : "#rgb(100,100,100)"} />
            </TouchableOpacity>
            <TouchableOpacity
                // style={styles.changeOrientationButton}
                hitSlop={{left: 20, right: 20}}
                onPress={() => handleOpenUrlExternal()}
            >
                {/* <AntDesign name="upload" size={24} color="white" /> */}
                <MaterialCommunityIcons name="apple-safari" size={26} color={ url ? "white" : "#rgb(100,100,100)"} />
            </TouchableOpacity>
            <TouchableOpacity
            // style={styles.changeOrientationButton}
                hitSlop={{left: 20, right: 20}}
                onPress={()=>handleSelectFavorite()}
            >
                <AntDesign name="book" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                // style={styles.changeOrientationButton}
                hitSlop={{left: 20, right: 20}}
                onPress={() => handleSelectTab()}
            >
                <AntDesign name="select1" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    browserOpsContainer: {
        // flex:1,
        height: browserActionBarHeight,
        // position:'absolute',
        // bottom:0,
        backgroundColor: 'rgba(76,76,76,1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        // zIndex:1
    },
});


export default BrowserActionBar