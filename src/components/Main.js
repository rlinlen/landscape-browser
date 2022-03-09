import React, { useContext , useEffect, useRef} from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

import Browser from './Browser';
import TabView from './TabView';
import FavoriteView from './FavoriteView'
import { Context as CurrentContext } from '../context/currentContext';
import { Context as TabContext} from '../context/tabContext';
import { Context as FavoriteContext } from '../context/favoriteContext';

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

const Main = () => {

    const { state: currentState, setCurrentTab } = useContext(CurrentContext);
    const { state: tabState, addNewTab , deleteOneTab , deleteAllTabs } = useContext(TabContext);
    const { state: favState, getAllFavs} = useContext(FavoriteContext);

    const prevTabState = usePrevious(tabState);
    useEffect(()=>{
        // console.log(prevTabState)
        if (prevTabState && (tabState.length > prevTabState.length)){
            // console.log('tabState changed:')
            // console.log(tabState)
            newTab = tabState[tabState.length - 1]
            setCurrentTab(newTab)
        }
    },[tabState])

    useEffect(()=>{
        getAllFavs()
    },[])

    let safeAreaPosition = currentState?.hideSafeAreaButtom ? 'absolute' : 'relative'
    let currentTab = currentState?.currentTab
    let enterTabSelect = currentState?.enterTabSelect
    let enterFavSelect = currentState?.enterFavSelect

    // let webView = currentTab.webView
    // console.log(webView)

    
    if (enterTabSelect){
        return (
            <>
                <SafeAreaView style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />

                <TabView/>
                {/* <BrowserActionBar
                    canGoForward={false}
                    canGoBack={false}
                    browserRef={null}
                    url={false}
                /> */}
                <SafeAreaView style={[styles.container, { position: safeAreaPosition }]} />
            </>
        )
    } else if (enterFavSelect){
        return (
            <>
                <SafeAreaView style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />

                <FavoriteView/>
                <SafeAreaView style={[styles.container, { position: safeAreaPosition }]} />
            </>
        )
    } else {
        return (
            <>
                <SafeAreaView style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
    
                <MenuProvider>
                    <View style={{ flex: 1 }}>
                    <Browser initInfo={currentTab}/>
                        {/* <Browser initInfo={currentTab} webView={webView}/> */}
                    </View>
                </MenuProvider>
    
                <SafeAreaView style={[styles.container, { position: safeAreaPosition }]} />
            </>
        )
    }
    
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