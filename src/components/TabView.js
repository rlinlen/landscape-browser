import React, { useContext, useEffect ,useRef } from 'react';
import { StyleSheet, Text, Dimensions, View, TextInput, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import TabItem from './TabItem';
import TabActionBar from './TabActionBar';
import { Context as CurrentContext } from '../context/currentContext';
import { Context as TabContext } from '../context/tabContext';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 2 : 3;

const ITEM_OFFSET = 10;
const ITEM_MARGIN = ITEM_OFFSET * 2;
const ITEM_HEIGHT = (SCREEN_WIDTH - ITEM_MARGIN) / numColumns;

const TabView = ({ numColumns, isLandscape }) => {

    const { state: currentState, setCurrentTab, setEnterTabSelect } = useContext(CurrentContext);
    const { state: tabState, addNewTab, deleteOneTab, deleteAllTabs } = useContext(TabContext);

    const tabviewRef = useRef(null);

    
    useEffect(()=>{
        let currentTab = currentState?.currentTab

        // console.log(currentTab)
        // tabviewRef.current.scrollToItem({
        //     animated: false,
        //     item:{
        //         id: currentTab
        //     }
        // })
        // tabviewRef.current.scrollToOffset({animated:false,offset:100})
        if(tabState.length){
            // let row = Math.floor((tabState.length-1)/2)
            let tabIndex = tabState.findIndex(item => item.id==currentTab)
            let row =  Math.floor((tabIndex)/2)
            tabviewRef.current.scrollToIndex({
                'animated':false,
                'index': row,
                'viewOffset':30
                // 'viewPosition':0
            })
        }
        
    },[])

    const handleTabPressOut = (item) => {
        // console.log('handleTabPressOut')
        setCurrentTab(item.id)
        setEnterTabSelect(false)
    }

    const handleTabClose = (item) => {
        // console.log(item)
        deleteOneTab(item)
    }

    const ShowHello = ({ data }) => {
        if (data.length == 0) {
            // console.log('tes')
            return (
                <>
                    <Text style={{
                        color: 'white',
                        fontSize: 30,
                        paddingVertical: 20
                    }}>
                        Welcome to Landscape Browser! {"\n"}
                    </Text>
                    <Text style={{
                        color: 'white',
                        fontSize: 20
                    }}>
                        Click + to add new tab. {"\n"}
                        {"\n"}
                        When navigating, Click setting icon top left to rotate the screen in lock mode.
                    </Text>
                </>

            )
        } else {
            // console.log(data)
            return (
                <></>
            )
        }

    }
    return (
        <View style={[styles.container]}>
            <ShowHello data={tabState} />
            <FlatList
                style={isLandscape ? { width: '90%', alignSelf: 'center' } : {}}
                // columnWrapperStyle={{flex:1}}
                data={tabState}
                renderItem={({ item }) => (
                    <TabItem
                        item={item}
                        handleTabPressOut={handleTabPressOut}
                        handleTabClose={handleTabClose}
                    />)}
                keyExtractor={item => item.id}
                numColumns={numColumns}
                ref={tabviewRef}
                // onContentSizeChange={()=>tabviewRef.current.scrollToEnd()}
                getItemLayout={(data, index) => (
                    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                  )}
                ListFooterComponent={<View style={{padding:20}}></View>}
            />
            <TabActionBar tabNumber={tabState.length}/>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,1)'
    },

});


export default TabView