import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Pressable ,Button, Alert} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
// import { captureRef } from 'react-native-view-shot';


const FavoriteItem = ({item, handleItemSelect, handleItemDelete , numColumns}) => {
    const { width, height } = Dimensions.get('window');
    // orientation must fixed
    // const SCREEN_WIDTH = width < height ? width : height;
    const SCREEN_SHORT_LENGTH = width < height ? width : height;
    const isSmallDevice = SCREEN_SHORT_LENGTH <= 414;
    // const numColumns = isSmallDevice ? 4 : 8;
    // const numColumns = isLandscape ? 4 : 8
    // const SCREEN_HEIGHT = width < height ? height : width;

    const ITEM_OFFSET = 10;
    const ITEM_MARGIN = ITEM_OFFSET * 2;

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

    // console.log(`item.icon:`)
    // console.log(isLandscape)
    // console.log((SCREEN_SHORT_LENGTH - ITEM_MARGIN) / numColumns - ITEM_MARGIN)
    // console.log(`SCREEN_HEIGHT:${SCREEN_HEIGHT}`)
    return (
        <View style={[styles.container, {
            width: (SCREEN_SHORT_LENGTH - ITEM_MARGIN) / numColumns - ITEM_MARGIN ,
            height: (SCREEN_SHORT_LENGTH - ITEM_MARGIN) / numColumns - ITEM_MARGIN,
            marginHorizontal: ITEM_OFFSET ,
            marginVertical: ITEM_MARGIN,
        }]}>
            <Pressable
                onPress={(e)=>handleItemSelect(item)}
                onLongPress={createTwoButtonAlert}
            >
                <Image 
                    style={styles.image}
                    source={{
                        // uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
                        uri: item.icon
                    }}
                />
            </Pressable>
            {/* <Pressable
                onPress={e=>handleItemDelete(item)}
                style={styles.closeIcon}
            >
                <AntDesign name="closecircle" size={20} color="black" />
            </Pressable> */}
            <Text style={styles.title} numberOfLines={2}>{item.title ? item.title : item.url}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container:{
        // justifyContent: 'space-between',
        borderRadius: 10,
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
        margin: 8,
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