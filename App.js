import React, { useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import Main from './src/components/Main';
import { Provider as TabProvider } from './src/context/tabContext';
import { Provider as CurrentProvider } from './src/context/currentContext';
import { Provider as FavoriteProvider } from './src/context/favoriteContext';


export default function App() {

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <CurrentProvider>
      <TabProvider>
        <FavoriteProvider>
          <Main />
        </FavoriteProvider>
      </TabProvider>
    </CurrentProvider>
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
