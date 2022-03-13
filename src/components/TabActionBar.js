import React, { useContext, useState, useRef } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import { Context as CurrentContext } from '../context/currentContext';
import { Context as TabContext } from '../context/tabContext';
import ModalConfirm from './ModalConfirm';



const TabActionBar = ({ tabNumber }) => {

    const { state: currentState, setEnterTabSelect } = useContext(CurrentContext);
    const { state: tabState, addNewTab, deleteOneTab, deleteAllTabs } = useContext(TabContext);

    const [showDeleteAllTabDialog, setShowDeleteAllTabDialog] = useState(false);


    const createTwoButtonAlert = () =>
        Alert.alert(
            "Close all tabs?",
            "",
            [
                {
                    text: "Cancel",
                    onPress: () => setShowDeleteAllTabDialog(false),
                    style: "cancel"
                },
                {
                    text: "Close",
                    onPress: () => handleCloseAll(),
                    style: "destructive"
                }
            ]
        );

    const handleCloseAll = () => {
        setShowDeleteAllTabDialog(false)
        deleteAllTabs()
    }
    const handleAdd = () => {
        addNewTab()
        setEnterTabSelect(false)
    }
    const handleDone = (tabNumber) => {
        if (tabNumber) {
            setEnterTabSelect(false)
        }
    }

    return (
        <View style={styles.browserOpsContainer}>
            {/* <ModalConfirm
                dialogContent="Close all tabs?"
                handleConfirm={handleCloseAll}
                handleCancel={ () => setShowDeleteAllTabDialog(false)}
                confirmText="Close"
                cancelText="Cancel"
                visible={showDeleteAllTabDialog}
            /> */}
            <TouchableOpacity
                // style={styles.changeOrientationButton}
                // onPress={() => setShowDeleteAllTabDialog(true)}
                onPress={createTwoButtonAlert}
                style={styles.barTouch}
            // disabled={!navState.canGoBack}
            >
                <Text style={[styles.barText, { textAlign: 'left' }]} >Close All</Text>
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
                onPress={() => handleDone(tabNumber)}
                style={[styles.barTouch]}
            >
                {/* <AntDesign name="upload" size={24} color="white" /> */}
                <Text style={[styles.barText, { textAlign: 'right' }]} >{tabNumber ? "Done" : ""}</Text>
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
    barTouch: {
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
        textAlign: 'center',
        // backgroundColor: 'red'
    }
});


export default TabActionBar