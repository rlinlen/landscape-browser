import React, { useContext, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Linking from "expo-linking";

import { Context as CurrentContext} from '../context/currentContext';
import { Context as TabContext} from '../context/tabContext';


const TabActionBar = ({ }) => {

    const { state: currentState, setEnterTabSelect } = useContext(CurrentContext);
    const { state: tabState, addNewTab , deleteOneTab , deleteAllTabs } = useContext(TabContext);


    const handleCloseAll = () => {
        deleteAllTabs()
    }
    const handleAdd = () => {
        addNewTab()
        setEnterTabSelect(false)
    }
    const handleDone = () => {
        setEnterTabSelect(false)
    }

    return (
        <View style={styles.browserOpsContainer}>
            <TouchableOpacity
                // style={styles.changeOrientationButton}
                onPress={() => handleCloseAll()}
                style={styles.barTouch}
            // disabled={!navState.canGoBack}
            >
                <Text style={[styles.barText,{textAlign: 'left'}]} >Close All</Text>
            </TouchableOpacity>
            <TouchableOpacity
                // style={styles.changeOrientationButton}
                onPress={() => handleAdd()}
                style={styles.barTouch}
            >
                <AntDesign name="plus" size={20} style={styles.barIcon} />
            </TouchableOpacity>
            <TouchableOpacity
                // style={styles.changeOrientationButton}
                onPress={() => handleDone()}
                style={[styles.barTouch]}
            >
                {/* <AntDesign name="upload" size={24} color="white" /> */}
                <Text style={[styles.barText,{textAlign: 'right'}]} >Done</Text>
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
    barTouch:{
        flex: 1,
        // flexDirection: 'row',
        // flex:1,
        // justifyContent: 'space-between',
        // flexBasis: '33%'
    },
    barText: {
        // flexBasis: 10,
        // width: '90%',
        color: 'rgb(83,194,226)',
        paddingHorizontal: 10,
        fontSize: 16
        // backgroundColor: 'red'
    },
    barIcon: {
        // flexBasis: 10,
        // width: '90%',
        color: 'rgb(83,174,226)',
        textAlign:'center',
        // backgroundColor: 'red'
    }
});


export default TabActionBar