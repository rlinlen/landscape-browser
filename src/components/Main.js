import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import * as ScreenOrientation from 'expo-screen-orientation';

import Browser from './Browser';
import TabView from './TabView';
import FavoriteView from './FavoriteView'
import { Context as CurrentContext } from '../context/currentContext';
import { Context as TabContext } from '../context/tabContext';
import { Context as FavoriteContext } from '../context/favoriteContext';
import { Context as PreferenceContext } from '../context/preferenceContext';
import { isEmpty } from '../util/appConstant'
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}



const Main = () => {

    const { state: currentState, setCurrentTab, setCurrentOrientation } = useContext(CurrentContext);
    const { state: tabState, getSavedTabs, deleteOneTab, deleteAllTabs } = useContext(TabContext);
    const { state: favState, getAllFavs } = useContext(FavoriteContext);
    const { state: preferenceState, getUserPreference } = useContext(PreferenceContext);

    const [numTabColumns, setNumTabColumns] = useState(2);

    const prevTabState = usePrevious(tabState);
    useEffect(() => {
        // console.log(`tabstate updated detected!:${JSON.stringify(tabState)}`)
        // let currentTab = currentState?.currentTab
        // console.log(currentTab?.id)
        // if new tab is added
        if (prevTabState && (tabState.length > prevTabState.length)) {
            // console.log('tabState changed:')
            // console.log(tabState)
            newTab = tabState[tabState.length - 1]
            setCurrentTab(newTab.id)
        }
    }, [tabState])

    useEffect(() => {
        getSavedTabs()
        getAllFavs()
        getUserPreference()
    }, [])

    useEffect(()=>{
        (async () => {
            const { status } = await requestTrackingPermissionsAsync();
            if (status === 'granted') {
            //   console.log('Yay! I have user permission to track data');
            }
          })();
    },[])

    let safeAreaPosition = currentState?.hideSafeAreaButtom ? 'absolute' : 'relative'
    let currentTab = currentState?.currentTab
    // console.log('Main')
    // console.log(currentTab.url)
    let enterTabSelect = currentState?.enterTabSelect
    let currentOrientation = currentState?.currentOrientation

    // let webView = currentTab.webView
    // console.log(webView)

    useEffect(async () => {

        const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {

            const landscape_enums = [
                ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
                ScreenOrientation.Orientation.LANDSCAPE_LEFT
            ]

            let currentOritentation = evt.orientationInfo.orientation
            setCurrentOrientation(currentOritentation)
            // console.log(currentOritentation)
            // console.log(ScreenOrientation.Orientation.LANDSCAPE_RIGHT)

            if (landscape_enums.includes(currentOritentation)) {
                // console.log(currentOritentation)
                setCurrentOrientation(true)
                setNumTabColumns(4)
            } else {
                setCurrentOrientation(false)
                setNumTabColumns(2)
            }
        });

        return () => {
            ScreenOrientation.removeOrientationChangeListener(subscription);
        }

    }, []);



    return (
        <>
            <SafeAreaView style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
            <View style={[enterTabSelect ? { display: 'none', height: 0 } : { flex: 1 }]}>
                <MenuProvider>
                    {/* <Browser initInfo={currentTab} containerStyle={{display: 'none'}}/> */}
                    {
                        tabState.map((item) => {
                            // console.log(`item.id:${item?.id}`)
                            // console.log(`currentTab.id:${currentTab}`)
                            return(
                                <Browser 
                                    initInfo={item} 
                                    containerStyle={currentTab==item.id? {}:{display: 'none', height: 0}}
                                    key={item.id}
                                /> 
                            )
                        })
                    }
                    
                   
                </MenuProvider>
            </View>

            {enterTabSelect && <TabView numColumns={numTabColumns} isLandscape={currentOrientation}/>}
            <SafeAreaView style={[styles.container, { position: safeAreaPosition }]} />
        </>
    )
    // }

}

const styles = StyleSheet.create({
    container: {
        // flex: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        // backgroundColor:'transparent',
        // position: "absolute",
        // bottom:0
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});


export default Main