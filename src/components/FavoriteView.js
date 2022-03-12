import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import FavoriteItem from './FavoriteItem';
import FavoriteActionBar from './FavoriteActionBar';
import {addressBarHeight} from '../util/appConstant';
import { Context as CurrentContext } from '../context/currentContext';
import { Context as TabContext } from '../context/tabContext';
import { Context as FavoriteContext } from '../context/favoriteContext';


const FavoriteView = ({setNewUrl}) => {

    const { state: currentState, setCurrentTab , setEnterTabSelect, setEnterFavSelect} = useContext(CurrentContext);
    const { state: tabState, addNewTab, deleteOneTab, deleteAllTabs } = useContext(TabContext);
    const { state: favState, getAllFavs, deleteOneFav} = useContext(FavoriteContext);

    

    const handleItemSelect = (item) => {
        // console.log(item.url)
        // console.log(item.url)
        setCurrentTab(item.id)
        setNewUrl(item.url)
        // addNewTab(item.url)
        setEnterFavSelect(false)
        setEnterTabSelect(false)
    }

    const handleItemDelete = (item) => {
        // console.log(item)
        deleteOneFav(item)
    } 
    return (
        <View style={styles.container}>
            <FlatList
                style={styles.flatlistContainer}
                // columnWrapperStyle={{flex:1}}
                data={favState}
                renderItem={({ item }) => (
                    <FavoriteItem 
                        item={item} 
                        handleItemSelect={handleItemSelect} 
                        handleItemDelete={handleItemDelete}
                    />)}
                keyExtractor={item => item.id}
                numColumns={4}
            />
            <FavoriteActionBar />
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,1)'
    },
    flatlistContainer:{
        // position:'relative',
        // top:addressBarHeight,
        paddingTop: addressBarHeight
    }
});


export default FavoriteView