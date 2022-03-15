import React, { useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import 'react-native-url-polyfill/auto';
import { ModalPortal } from 'react-native-modals';
import { StatusBar } from 'expo-status-bar';


import Main from './src/components/Main';
import { Provider as TabProvider } from './src/context/tabContext';
import { Provider as CurrentProvider } from './src/context/currentContext';
import { Provider as FavoriteProvider } from './src/context/favoriteContext';
import { Provider as PerferenceProvider } from './src/context/preferenceContext';


export default function App() {

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <PerferenceProvider>
      <CurrentProvider>
        <TabProvider>
          <FavoriteProvider>
            <StatusBar style="light" />
            <Main />
            <ModalPortal />
          </FavoriteProvider>
        </TabProvider>
      </CurrentProvider>
    </PerferenceProvider>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   // flex: 0,
  //   backgroundColor: 'rgba(0,0,0,0.7)',
  //   // backgroundColor:'transparent',
  //   // position: "absolute",
  //   // bottom:0
  //   // alignItems: 'center',
  //   // justifyContent: 'center',
  // },
});
