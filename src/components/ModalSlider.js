import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { Modal, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import Slider from '@react-native-community/slider';


const ModalSlider = ({ dialogContent, visible, setVisible, handleValueChange, selectedValue }) => {

    // const [selectedItem, setSelectedItem] = useState(defaultItem);

    // console.log(items)

    return (
        <View>
            <Modal
                containerStyle={styles.container}
                visible={visible}
                onTouchOutside={() => {
                    setVisible(false)
                }}
            >
                <ModalContent style={styles.contentContainer}>
                    <Text style={styles.content}>{dialogContent}</Text>
                    <Text style={styles.content}></Text>
                    <Text style={styles.content}>Current value: {selectedValue}</Text>
                    {/* <Text style={styles.content}></Text> */}

                </ModalContent>
                <Slider
                    style={styles.slider}
                    step={0.01}
                    minimumValue={0}
                    maximumValue={1}
                    // minimumTrackTintColor="#FFFFFF"
                    // maximumTrackTintColor="#000000"
                    onValueChange={value => handleValueChange(value.toFixed(2))}
                    value={selectedValue}
                />
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // position:
        // // backgroundColor: 'rgba(76,76,76,1)',
        // alignItems: 'center',
        // justifyContent: 'center',
        // padding:30
        // paddingHorizontal:30
        // justifyContent:'center',
        // alignContent:'center',
        // alignItems:'center'
    },
    contentContainer: {
        // backgroundColor: 'rgba(76,76,76,1)',
        // paddingHorizontal: '30%',
        // width:'100%'
    },
    content: {
        // color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf:'center'
    },
    slider:{
        width: '80%', 
        height: 40,
        alignSelf:'center'
    }
});


export default ModalSlider