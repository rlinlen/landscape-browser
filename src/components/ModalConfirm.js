import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { Modal, ModalFooter, ModalButton, ModalContent } from 'react-native-modals';

const ModalConfirm = ({ dialogContent, handleCancel, handleConfirm, visible, containerStyle, confirmText = "OK", cancelText = "Cancel" }) => {
    return (
        <View>
            <Modal
                visible={visible}
                // modalStyle={{paddingHorizontal:30, backgroundColor: 'rgba(76,76,76,1)',}}
                footer={
                    <ModalFooter
                        bordered={false}
                        // style={{borderColor:'white'}}
                    >
                        <ModalButton
                            text={cancelText}
                            onPress={handleCancel}
                            style={styles.button}
                            textStyle={{ color: 'rgb(83,194,226)', }}
                        />
                        <ModalButton
                            text={confirmText}
                            onPress={handleConfirm}
                            style={styles.button}
                            textStyle={{ color: 'red' }}
                        />
                    </ModalFooter>
                }
            >
                <ModalContent style={styles.contentContainer}>
                    <Text style={styles.content}>{dialogContent}</Text>
                </ModalContent>
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
    contentContainer:{
        backgroundColor: 'rgba(76,76,76,1)',
        paddingHorizontal:100,
    },
    content: {
        color: 'white',
        fontWeight:'bold',
        fontSize: 16
    }
});


export default ModalConfirm