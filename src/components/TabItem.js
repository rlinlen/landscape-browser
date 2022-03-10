import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
// import { captureRef } from 'react-native-view-shot';

const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 2 : 3;
// const SCREEN_HEIGHT = width < height ? height : width;

const ITEM_OFFSET = 10;
const ITEM_MARGIN = ITEM_OFFSET * 2;
const ITEM_HEIGHT = (SCREEN_WIDTH - ITEM_MARGIN) / numColumns;

const TabItem = ({ item, handleTabPressOut, handleTabClose }) => {
    console.log(item.icon)
    return (
        <View style={styles.container}>
            <Pressable
                onPress={(e) => handleTabPressOut(item)}
            >
                <Image
                    style={styles.image}
                    source={{
                        // uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
                        uri: item.view
                    }}
                />
            </Pressable>
            <Pressable
                onPress={e => handleTabClose(item)}
                style={styles.closeIcon}
            >
                <AntDesign name="closecircle" size={20} color="black" />
            </Pressable>
            <View style={{
                // flex:1, 
                // backgroundColor:'blue',
                flexDirection: "row",
                // justifyContent: "space-between",
                alignItems: "center"}}>
                <Image
                    style={styles.icon}
                    source={{
                        // uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
                        uri: item.icon
                    }}
                />
                <Text style={styles.title}>{item.title ? item.title : item.url}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'space-between',
        margin: ITEM_MARGIN,
        borderRadius: 10,
        width: (SCREEN_WIDTH - ITEM_MARGIN) / numColumns - ITEM_MARGIN - ITEM_OFFSET,
        height: ITEM_HEIGHT,
        backgroundColor: 'white',
        flexDirection: 'column',
        // overflow: 'hidden'
    },
    icon: {
        height: 16,
        width: 16,
        // backgroundColor:'red'
    },
    image: {
        // width: '50%',
        // flex:1,
        height: '100%',

    },
    title: {
        color: 'white',
        // backgroundColor: 'red',
        margin: 10,
        textAlign: 'center'
    },
    closeIcon: {
        // zIndex:1,
        // backgroundColor:'red',
        position: 'absolute',
        top: 5,
        right: 5,
    }
});

export default TabItem