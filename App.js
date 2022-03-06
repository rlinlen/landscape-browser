import { StyleSheet, Text, View , SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';
import { MenuProvider } from 'react-native-popup-menu';

import Browser from './src/components/Browser';




export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <SafeAreaView style={styles.container}>
      <MenuProvider>
        <View style={{ flex: 1 }}>
          <Browser/>
        </View>
      </MenuProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
