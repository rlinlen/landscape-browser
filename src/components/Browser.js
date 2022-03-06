import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers
} from 'react-native-popup-menu';

import { defaultUrl, searchEngines, defaultSearchEngine } from '../util/appConstant';



const Browser = () => {

  const browserRef = useRef(null);

  const [navState, setNavState] = useState({});
  const [inputUrl, setInputUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [incognito, setIncognito] = useState(true);
  // const [currentUrl, setCurrentUrl] = useState('');

  async function changeScreenOrientation() {

    const defaultOrientation = [
      ScreenOrientation.OrientationLock.DEFAULT,
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    ]

    //ios does not support PORTRAIT_DOWN
    const transformMatrix = [
      ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    ]
    currentOritentation = await ScreenOrientation.getOrientationLockAsync();
    // console.log(currentOritentation)

    direction = ScreenOrientation.OrientationLock.DEFAULT
    currentDirectionPos = transformMatrix.indexOf(currentOritentation)
    if (defaultOrientation.includes(currentOritentation)) {
      nextDirectionPos = 0
      direction = transformMatrix[nextDirectionPos]
    } else if (currentDirectionPos != -1) {
      nextDirectionPos = currentDirectionPos + 1
      direction = transformMatrix[nextDirectionPos]
    }

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
  const handleChangeIncognito = () => {
    setIncognito(!incognito);
    if (browserRef) {
      browserRef.current.reload();
    }
  }
  const handleTextIncrease = () => {
    const jsIncreaseFont = `
    var p=document.getElementsByTagName('*');
    for(i=0;i<p.length;i++){
      if(p[i].style.fontSize){
        var s=parseInt(p[i].style.fontSize.replace('px',''));
      }else{
        var s=12;
      }
      
      s+=2;
      p[i].style.fontSize=s+'px'
      
    };
      true;
    `
    browserRef.current.injectJavaScript(jsIncreaseFont);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.browserTitleContainer}>
        <View style={{}}>
        <Menu
          renderer={renderers.Popover}
          rendererProps={{ placement: 'bottom' }}
          >
          <MenuTrigger>
            <AntDesign name="setting" size={24} color="black" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => handleTextIncrease()}>
              <View style={styles.menuOption}>
                <Text>A 100% A</Text>
              </View>
            </MenuOption>
            <MenuOption onSelect={() => changeScreenOrientation()}>
              <View style={styles.menuOption}>
                <Text>Force Dark Theme</Text>
                <MaterialCommunityIcons name="book-open-outline" size={24} color="black" />
              </View>
            </MenuOption>
            <MenuOption onSelect={() => changeScreenOrientation()}>
              <View style={styles.menuOption}>
                <Text>Rotate Screen</Text>
                <MaterialCommunityIcons name="phone-rotate-landscape" size={24} color="black" />
              </View>
            </MenuOption>
            <MenuOption onSelect={handleChangeIncognito}>
              <View style={styles.menuOption}>
                <Text>Turn On/Off Incognito</Text>
                <MaterialCommunityIcons name="incognito" size={24} color="black" />
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
        </View>
        <View style={{flexGrow:1, flexShrink:1}}>
          <TextInput
            style={styles.browserAddressBar}
            defaultValue={navState.url}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={setInputUrl}
            value={inputUrl}
            onSubmitEditing={handleUrlSubmit}
          />
        </View>
        <TouchableOpacity
          // style={styles.changeOrientationButton}
          onPress={() => handleReload()}
        >
          <MaterialCommunityIcons name="reload" size={24} color="black" />
        </TouchableOpacity>
        {/* <Text style={styles.browserTitle}>
          </Text> */}
      </View>
      <WebView
        source={{ uri: newUrl ? newUrl : defaultUrl }}
        style={{ flex: 1 }}
        onNavigationStateChange={onNavigationStateChange}
        incognito={incognito}
        allowsInlineMediaPlayback={true}
        onScroll={syntheticEvent => {
          const { contentOffset } = syntheticEvent.nativeEvent
          // console.log(contentOffset)
        }}
        forceDarkOn={true}
        ref={browserRef}
      />
      <View style={styles.browserOpsContainer}>
        <TouchableOpacity
          // style={styles.changeOrientationButton}
          onPress={() => handleGoBack()}
          // disabled={!navState.canGoBack}
        >
          <AntDesign name="left" size={24} color={navState.canGoBack ? "black":"#C6C6C6"} />
        </TouchableOpacity>
        <TouchableOpacity
          // style={styles.changeOrientationButton}
          onPress={() => handleGoForward()}
        >
          <AntDesign name="right" size={24} color={navState.canGoForward ? "black":"#C6C6C6"} />
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
  },
  menuOption:{
    flex:1, 
    flexDirection: 'row'
  }
});


export default Browser;