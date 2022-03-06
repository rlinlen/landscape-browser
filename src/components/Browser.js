import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AntDesign } from '@expo/vector-icons';

import { defaultUrl, searchEngines, defaultSearchEngine } from '../util/appConstant';



const Browser = () => {

  const browserRef = useRef(null);

  const [navState, setNavState] = useState({});
  const [inputUrl, setInputUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  // const [currentUrl, setCurrentUrl] = useState('');

  async function changeScreenOrientation(direction = ScreenOrientation.OrientationLock.LANDSCAPE_LEFT) {
    await ScreenOrientation.lockAsync(direction);
  }

  const onNavigationStateChange = (navState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { canGoForward, canGoBack, title, url, loading } = navState;
    setNavState({ canGoForward, canGoBack, title, url, loading });
    // console.log(navState)

    setInputUrl(url);
  };


  const handleUrlSubmit = () => {

    const newURL = upgradeURL(inputUrl, defaultSearchEngine);
    // Keyboard.dismiss();

    setNewUrl(newURL);
  }

  const upgradeURL = (uri, searchEngine = 'google') => {
    const isURL = uri.split(' ').length === 1 && uri.includes('.');
    if (isURL) {
      if (!uri.startsWith('http')) {
        return 'https://' + uri;
      }
      return uri;
    }
    // search for the text in the search engine
    const encodedURI = encodeURI(uri);
    return searchEngines[searchEngine](encodedURI);
  }

  const handleGoBack = () => {
    if (browserRef && navState?.canGoBack) {
      browserRef.current.goBack();
    }
  }
  const handleGoForward = () => {
    if (browserRef && navState?.canGoForward) {
      browserRef.current.goForward();
    }
  }
  const handleReload = () => {
    if (browserRef) {
      browserRef.current.reload();
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.browserTitleContainer}>
        <TextInput
          style={styles.browserAddressBar}
          defaultValue={navState.url}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={setInputUrl}
          value={inputUrl}
          onSubmitEditing={handleUrlSubmit}
        />
        <TouchableOpacity
          style={styles.changeOrientationButton}
          onPress={() => changeScreenOrientation()}
        />
        <TouchableOpacity
          // style={styles.changeOrientationButton}
          onPress={() => handleReload()}
        >
          <AntDesign name="reload1" size={24} color="black" />
        </TouchableOpacity>
        {/* <Text style={styles.browserTitle}>
          </Text> */}
      </View>
      <WebView
        source={{ uri: newUrl ? newUrl : defaultUrl }}
        style={{ flex: 1 }}
        onNavigationStateChange={onNavigationStateChange}
        ref={browserRef}
      />
      <View style={styles.browserOpsContainer}>
        <TouchableOpacity
          // style={styles.changeOrientationButton}
          onPress={() => handleGoBack()}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          // style={styles.changeOrientationButton}
          onPress={() => handleGoForward()}
        >
          <AntDesign name="right" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
        // style={styles.changeOrientationButton}
        // onPress={()=>handleGoForward()}
        >
          <AntDesign name="upload" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
        // style={styles.changeOrientationButton}
        // onPress={()=>handleGoForward()}
        >
          <AntDesign name="book" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
        // style={styles.changeOrientationButton}
        // onPress={()=>handleGoForward()}
        >
          <AntDesign name="select1" size={24} color="black" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  browserTitleContainer: {
    // flex: 1,
    height: 30,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    // paddingLeft: 8
  },
  browserTitle: {
    fontWeight: 'bold',
    // backgroundColor: 'red'
    // color: 'white'
  },

  browserOpsContainer: {
    // flex:1,
    height: 40,
    backgroundColor: 'steelblue',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '3%'
  },
  browserAddressBar: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 3,
    // flex: 1,
    borderWidth: 0,
    marginRight: 8,
    paddingLeft: 8
  },
  changeOrientationButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});


export default Browser;