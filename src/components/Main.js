import React, { useContext , useEffect, useRef} from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

import Browser from './Browser';
import BrowserActionBar from './BrowserActionBar';
import TabView from './TabView';
import { Context as CurrentContext } from '../context/currentContext';
import { Context as TabContext} from '../context/tabContext';

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

    let safeAreaPosition = currentState?.hideSafeAreaButtom ? 'absolute' : 'relative'
    let currentTab = currentState?.currentTab
    let enterTabSelect = currentState?.enterTabSelect

    
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
    } else{
        return (
            <>
                <SafeAreaView style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />
    
                <MenuProvider>
                    <View style={{ flex: 1 }}>
                        <Browser initInfo={currentTab}/>
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