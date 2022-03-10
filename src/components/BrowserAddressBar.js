import React, {useState, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ProgressBar from './ProgressBar';

const BrowserAddressBar = ({ defaultValue, onChangeText, value, onSubmitEditing , loadProgress }) => {

    const textInput = useRef(null)
    const [showCancel, setShowCancel] = useState(false)
    const [cacheText, setCacheText] = useState("")
    
    const handleInputCancel = () => {
        // textInput.clear()
    }
    const handleFocus = ({nativeEvent}) => {
        // setCacheText(nativeEvent.text)
        // console.log('focus!')
        // console.log(nativeEvent.text)
        setShowCancel(true)
    }
    const handleBlur = () => {
        //restore original value
        // console.log('blur!')
        // console.log(cacheText)
        // onChangeText(cacheText)
    }

    return (
        <View style={{justifyContent:'center'}}>
            <TextInput
                style={styles.browserAddressBar}
                defaultValue={defaultValue}
                autoCapitalize='none'
                autoCorrect={false}
                // onChangeText={onChangeText}
                // value={value}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                selectTextOnFocus={true}
                enablesReturnKeyAutomatically={true}
                textContentType='URL'
                onSubmitEditing={onSubmitEditing}
                clearButtonMode='while-editing'
                ref={textInput}
            />
            {/* {showCancel && <Pressable
                onPressOut={e => handleInputCancel()}
                style={styles.closeIcon}
            >
                <AntDesign name="closecircle" size={20} color="grey" />
            </Pressable>} */}
            <View style={{width: '99%', position:'absolute', bottom: 1, alignSelf:'center'}}>
                <ProgressBar loadProgress={loadProgress} />
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    browserAddressBar: {
        // height: 40,
        backgroundColor: 'grey',
        color: 'white',
        borderRadius: 6,
        // flex: 1,
        borderWidth: 0,
        paddingRight: 8,
        // marginRight: 12,
        paddingLeft: 8,
        paddingVertical: 8,
        fontSize: 16
    },
    closeIcon: {
        // zIndex:1,
        // backgroundColor:'red',
        position: 'absolute',
        right: 10,
    }
});


export default BrowserAddressBar