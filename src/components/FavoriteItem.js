import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable ,Button, Alert} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
// import { captureRef } from 'react-native-view-shot';

const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const isSmallDevice = SCREEN_WIDTH <= 414;
const numColumns = isSmallDevice ? 4 : 8;
// const SCREEN_HEIGHT = width < height ? height : width;

const ITEM_OFFSET = 10;
const ITEM_MARGIN = ITEM_OFFSET * 2;
const ITEM_HEIGHT = (SCREEN_WIDTH - ITEM_MARGIN) / numColumns;

const FavoriteItem = ({item, handleItemSelect, handleItemDelete}) => {
    const createTwoButtonAlert = () =>
    Alert.alert(
      "Delete",
      "Do you want to delete the favorite item?",
      [
        {
          text: "Cancel",
        //   onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => handleItemDelete(item) }
      ]
    );

    return (
        <View style={styles.container}>
            <Pressable
                onPress={(e)=>handleItemSelect(item)}
                onLongPress={createTwoButtonAlert}
            >
                <Image 
                    style={styles.image}
                    source={{
                        uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
                        // uri: item.url
                    }}
                />
            </Pressable>
            {/* <Pressable
                onPress={e=>handleItemDelete(item)}
                style={styles.closeIcon}
            >
                <AntDesign name="closecircle" size={20} color="black" />
            </Pressable> */}
            <Text style={styles.title}>{item.title ? item.title : item.url}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        // justifyContent: 'space-between',
        margin: ITEM_MARGIN,
        borderRadius: 10,
        width: (SCREEN_WIDTH - ITEM_MARGIN) / numColumns - ITEM_MARGIN -ITEM_OFFSET,
        height: (SCREEN_WIDTH - ITEM_MARGIN) / numColumns - ITEM_MARGIN -ITEM_OFFSET,
        backgroundColor: 'white',
        flexDirection: 'column',
        // overflow: 'hidden'
    },
    image:{
        // width: '50%',
        // flex:1,
        height: '100%',
        
    },
    title:{
        color: 'white',
        // backgroundColor: 'red',
        margin: 10,
        textAlign:'center'
    },
    closeIcon:{
        // zIndex:1,
        // backgroundColor:'red',
        position: 'absolute',
        top: 5,
        right: 5,
    }
});

export default FavoriteItem