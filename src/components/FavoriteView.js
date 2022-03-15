import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, TextInput, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import FavoriteItem from './FavoriteItem';
import FavoriteActionBar from './FavoriteActionBar';
import {addressBarHeight} from '../util/appConstant';
import { Context as CurrentContext } from '../context/currentContext';
import { Context as TabContext } from '../context/tabContext';
import { Context as FavoriteContext } from '../context/favoriteContext';

const FavoriteHeader = () => {
    return (
        <Text style={{
            fontSize:20,
            fontWeight:'bold',
            color:'white',
            padding: 16
        }}>
            Favorites
        </Text>
    )
}

const FavoriteView = ({setNewUrl, isLandscape}) => {

    const { state: currentState, setCurrentTab , setEnterTabSelect, setEnterFavSelect} = useContext(CurrentContext);
    const { state: tabState, addNewTab, deleteOneTab, deleteAllTabs } = useContext(TabContext);
    const { state: favState, getAllFavs, deleteOneFav} = useContext(FavoriteContext);

    let currentOrientation = currentState?.currentOrientation
    let numColumns= currentOrientation ? 8 : 4

    const handleItemSelect = (item) => {
        // console.log(`favitemselected:${item.id}`)
        // console.log(item.url)
        // setCurrentTab(item.id)
        setNewUrl(item.url)
        // addNewTab(item.url)
        setEnterFavSelect(false)
        setEnterTabSelect(false)
    }

    const handleItemDelete = (item) => {
        // console.log(item)
        deleteOneFav(item)
    } 
    const landscapeStyle = isLandscape ? {width:'90%', alignSelf:'center'} : {}
    return (
        <View style={styles.container}>
            {/* <Pressable
                // onPress={setEnterFavSelect(false)}
            > */}
            <FlatList
                style={[styles.flatlistContainer, landscapeStyle]}
                // columnWrapperStyle={{flex:1}}
                data={favState}
                renderItem={({ item }) => (
                    <FavoriteItem 
                        item={item} 
                        handleItemSelect={handleItemSelect} 
                        handleItemDelete={handleItemDelete}
                        numColumns={4}
                    />)}
                keyExtractor={item => item.id}
                numColumns={numColumns}
                ListHeaderComponent={FavoriteHeader()}
                key={currentOrientation}
            />
            {/* </Pressable> */}
            {/* <FavoriteActionBar /> */}
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