import React, { useContext } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import TabItem from './TabItem';
import TabActionBar from './TabActionBar';
import { Context as CurrentContext } from '../context/currentContext';
import { Context as TabContext } from '../context/tabContext';


const TabView = ({ }) => {

    const { state: currentState, setCurrentTab , setEnterTabSelect} = useContext(CurrentContext);
    const { state: tabState, addNewTab, deleteOneTab, deleteAllTabs } = useContext(TabContext);

    const handleTabPressOut = (item) => {
        // console.log(item)
        setCurrentTab(item)
        setEnterTabSelect(false)
    }

    const handleTabClose = (item) => {
        // console.log(item)
        deleteOneTab(item)
    } 
    return (
        <View style={styles.container}>
            <FlatList
                // style={styles.container}
                // columnWrapperStyle={{flex:1}}
                data={tabState}
                renderItem={({ item }) => (
                    <TabItem 
                        item={item} 
                        handleTabPressOut={handleTabPressOut} 
                        handleTabClose={handleTabClose}
                    />)}
                keyExtractor={item => item.id}
                numColumns={2}
            />
            <TabActionBar />
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