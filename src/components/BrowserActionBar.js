import React, { useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from "expo-linking";
import { captureRef } from 'react-native-view-shot';

import { Context as CurrentContext} from '../context/currentContext';
import { Context as TabContext} from '../context/tabContext';

const BrowserActionBar = ({ browserRef, canGoBack, canGoForward, url }) => {

    const { state: currentState, setCurrentTab , setEnterTabSelect } = useContext(CurrentContext);
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
        // setCurrentTab({})
        setEnterTabSelect(true)

        const result = await captureRef(browserRef, {
            result: 'data-uri',
            quality: 0,
            format: 'jpg',
          });
        // console.log(result)

        let updatedTab = {id:currentState.currentTab?.id ,view:result}
        updateTab(updatedTab)
    }


    return (
        <View style={styles.browserOpsContainer}>
            <TouchableOpacity
                // style={styles.changeOrientationButton}
                onPress={() => handleGoBack()}
            // disabled={!navState.canGoBack}
            >
                <AntDesign name="left" size={24} color={canGoBack ? "white" : "#rgb(100,100,100)"} />
            </TouchableOpacity>
            <TouchableOpacity
                // style={styles.changeOrientationButton}
                onPress={() => handleGoForward()}
            >
                <AntDesign name="right" size={24} color={canGoForward ? "white" : "#rgb(100,100,100)"} />
            </TouchableOpacity>
            <TouchableOpacity
                // style={styles.changeOrientationButton}
                onPress={() => handleOpenUrlExternal()}
            >
                {/* <AntDesign name="upload" size={24} color="white" /> */}
                <MaterialCommunityIcons name="apple-safari" size={26} color={ url ? "white" : "#rgb(100,100,100)"} />
            </TouchableOpacity>
            <TouchableOpacity
            // style={styles.changeOrientationButton}
            // onPress={()=>handleGoForward()}
            >
                <AntDesign name="book" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                // style={styles.changeOrientationButton}
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
        height: 40,
        // position:'absolute',
        // bottom:0,
        backgroundColor: 'rgba(76,76,76,1)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '3%',
        // zIndex:1
    },
});


export default BrowserActionBar