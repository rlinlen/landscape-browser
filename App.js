import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

import Browser from './src/components/Browser';


export default function App() {

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <>
      <SafeAreaView style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} />

      <MenuProvider>
        <View style={{ flex: 1 }}>
          <Browser />
        </View>
      </MenuProvider>
      <SafeAreaView style={[styles.container, { position: "absolute" }]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    // backgroundColor:'transparent',
    // position: "absolute",
    // bottom:0
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
