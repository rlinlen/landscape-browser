import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { Modal, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';
import { Picker } from '@react-native-picker/picker';

const ModalPicker = ({ dialogContent, visible, setVisible, items, handleValueChange, selectedValue }) => {

    // const [selectedItem, setSelectedItem] = useState(defaultItem);

    // console.log(items)

    return (
        <View>
            <Modal
                // containerStyle={}
                visible={visible}
                onTouchOutside={() => {
                    setVisible(false)
                }}
            >
                <ModalContent style={styles.contentContainer}>
                    {/* <Text style={styles.content}>{dialogContent}</Text> */}
                    <Text style={styles.content}></Text>

                </ModalContent>
                <Picker
                    // selectedValue={selectedItem}
                    // onValueChange={(itemValue, itemIndex) =>
                    //     setSelectedItem(itemValue)
                    // }>
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) =>
                        handleValueChange(itemValue)
                    }>
                    {/* <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" /> */}
                    {
                        items && items.map(item=><Picker.Item label={item.label} value={item.value} key={item.value}/>)
                    }
                </Picker>
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
    },
    button: {
        backgroundColor: 'rgba(76,76,76,1)',
        // marginHorizontal: 20
        // paddingHorizontal:30
    },
    contentContainer: {
        // backgroundColor: 'rgba(76,76,76,1)',
        paddingHorizontal: '30%',
        // width:'100%'
    },
    content: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
});


export default ModalPicker