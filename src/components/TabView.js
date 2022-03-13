import React, { useContext } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import TabItem from './TabItem';
import TabActionBar from './TabActionBar';
import { Context as CurrentContext } from '../context/currentContext';
import { Context as TabContext } from '../context/tabContext';


const TabView = ({ numColumns, isLandscape }) => {

    const { state: currentState, setCurrentTab, setEnterTabSelect } = useContext(CurrentContext);
    const { state: tabState, addNewTab, deleteOneTab, deleteAllTabs } = useContext(TabContext);

    const handleTabPressOut = (item) => {
        console.log('handleTabPressOut')
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
            />
            <TabActionBar tabNumber={tabState.length} />
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