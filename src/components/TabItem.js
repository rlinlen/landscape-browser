import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
// const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns =  2 ;
// const SCREEN_HEIGHT = width < height ? height : width;

const ITEM_OFFSET = 20;
const ITEM_MARGIN = ITEM_OFFSET * 2;
const ITEM_HEIGHT = (SCREEN_WIDTH - ITEM_MARGIN) / numColumns + ITEM_OFFSET;

const TabItem = ({ item, handleTabPressOut, handleTabClose }) => {
    // console.log(`item.icon:`)
    // console.log(numColumns)

    let showIcon = false
    if (item.icon && item.icon.startsWith("data:image")){
        showIcon = true
    }

    return (
        <View style={[styles.container,{
            margin: ITEM_OFFSET,
            width: (SCREEN_WIDTH) / numColumns - ITEM_MARGIN,
            // width: SCREEN_WIDTH/2,
            height: ITEM_HEIGHT,
        }]}>
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
                hitSlop={{top:5,bottom:5,left:5,right:5}}
            >
                <AntDesign name="closecircle" size={20} color="black" />
            </Pressable>
            <View style={{
                // flex:1, 
                // backgroundColor:'blue',
                paddingLeft:10,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"}}>
                {showIcon && <Image
                    style={styles.icon}
                    source={{
                        // uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
                        uri: item.icon
                    }}
                />}
                {/* <Text style={styles.title}>{item.title ? item.title : item.url}</Text> */}
                <Text style={styles.title} numberOfLines={1}>{item.title ? item.title : ''}</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'space-between',
        borderRadius: 20,
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
        borderRadius: 20
    },
    title: {
        color: 'white',
        // backgroundColor: 'red',
        margin: 8,
        textAlign: 'center',
        // paddingLeft: 1
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