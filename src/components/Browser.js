import { useState, useRef, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
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

import { defaultUrl, searchEngines, defaultSearchEngine, addressBarHeight } from '../util/appConstant';
import BrowserActionBar from './BrowserActionBar';
import { Context as CurrentContext } from '../context/currentContext';
import { Context as TabContext } from '../context/tabContext';
import { Context as FavoriteContext } from '../context/favoriteContext';
import BrowserAddressBar from './BrowserAddressBar';



const Browser = ({ initInfo }) => {

  const browserRef = useRef(null);

  const { setHideSafeAreaButtom } = useContext(CurrentContext);
  const { state: tabState, addNewTab, updateTab, deleteOneTab, deleteAllTabs } = useContext(TabContext);
  const { addNewFav } = useContext(FavoriteContext);
  


  const [forceReload, setForceReload] = useState(false);
  const [navState, setNavState] = useState({});
  // const [inputUrl, setInputUrl] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [incognito, setIncognito] = useState(true);
  const [contentMode, setContentMode] = useState('recommended');
  const [scrollInitPos, setScrollInitPos] = useState(0);
  const [showBar, setShowBar] = useState(true);

  // const [isScrollUp, setIsScrollUp] = useState(false);
  // const [currentUrl, setCurrentUrl] = useState('');

  // function handleDeepLink(event) {
  //   // let newURL = Linking.parse(event.url);
  //   setNewUrl(event.url);
  // }

  useEffect(() => {
    // console.log(initInfo)
  })
  // useEffect(() => {
  //   Linking.addEventListener("url", handleDeepLink);
  //   return () => {
  //     Linking.removeEventListener("url");
  //   };
  // }, []);
  // useEffect(() => {
  //   setNewUrl()
  // });


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
    let currentOritentation = await ScreenOrientation.getOrientationLockAsync();
    // console.log('?')
    // console.log(currentOritentation)

    let direction = ScreenOrientation.OrientationLock.DEFAULT
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

    // setInputUrl(url);


    let updatedTab = {...initInfo, url, title}
    updateTab(updatedTab)

    showBottomBar(true);
  };

  const showBottomBar = (isShowBottomBar) => {

    setShowBar(isShowBottomBar);
    setHideSafeAreaButtom(!isShowBottomBar)

  }
  const handleUrlSubmit = ({nativeEvent}) => {

    // console.log(nativeEvent.text)
    const newURL = upgradeURL(nativeEvent.text, defaultSearchEngine);
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


  const handleReload = () => {
    if (browserRef) {
      browserRef.current.reload();
    }
  }

  const handleChangeIncognito = () => {
    setIncognito(!incognito);
    // if (browserRef) {
    //   browserRef.current.reload();
    // }
    setNewUrl(navState.url)
    setForceReload(!forceReload)
  }
  const handleChangeContentMode = () => {
    // console.log(contentMode)
    if (contentMode == 'desktop' || contentMode == 'recommended') {
      setContentMode('mobile')
    } else if (contentMode == 'mobile') {
      setContentMode('desktop')
    }
    // if (browserRef) {
    //   browserRef.current.reload();
    // }
    setNewUrl(navState.url)
    setForceReload(!forceReload)
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

  const handleScroll = syntheticEvent => {
    // const { contentOffset } = syntheticEvent.nativeEvent
    // console.log(contentOffset);

  }
  const handlePressIn = evt => {
    // console.log(evt.nativeEvent.locationY)
    setScrollInitPos(evt.nativeEvent.locationY)
  }
  const handlePressOut = evt => {
    // console.log(evt.nativeEvent.locationY)
    try {
      let scrollFinPos = evt?.nativeEvent.locationY ? evt?.nativeEvent.locationY : 0
      // console.log(scrollFinPos)
      if (scrollInitPos && scrollFinPos) {
        if (scrollFinPos - scrollInitPos > addressBarHeight) {
          //scroll up
          // setIsScrollUp(true)
          showBottomBar(true)
        } else {
          // setIsScrollUp(false)
          showBottomBar(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleAddFavorite = () => {
    addNewFav({
      url: navState.url,
      title: navState.title
    })
  }

  const optionsStyles = {
    optionsContainer: {
      backgroundColor: 'rgb(40,40,40)',
      borderRadius: 10,
      width: '100%'
      // padding: 5,
    },
    optionsWrapper: {
      // backgroundColor: 'purple',
      // padding:10
    },
    optionWrapper: {
      // backgroundColor: 'yellow',
      // margin: 5,
      // padding:10
    },
    optionTouchable: {
      // underlayColor: 'gold',
      // activeOpacity: 70,
    },
    optionText: {
      // color: 'brown',
    },
  };

  return (
    <View style={{ flex: 1 }}>
      {showBar && <View style={[styles.browserTitleContainer, { height: addressBarHeight }]}>
        <View style={{ paddingHorizontal: 14 }}>
          <Menu
            renderer={renderers.Popover}
            rendererProps={{ placement: 'bottom' }}
          // anchorStyle={{backgroundColor:'black'}}
          >
            <MenuTrigger>
              {/* <AntDesign name="setting" size={28} color="white" /> */}
              <MaterialCommunityIcons name="account-settings-outline" style={styles.addressBarIcon} color="white" />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              {/* <MenuOption onSelect={() => handleTextIncrease()}>
                <View style={styles.menuOption}>
                  <Text>A 100% A</Text>
                </View>
              </MenuOption> */}
              {/* <MenuOption onSelect={() => changeScreenOrientation()}>
                <View style={styles.menuOption}>
                  <Text>Force Dark Theme</Text>
                  <MaterialCommunityIcons name="book-open-outline" size={24} color="black" />
                </View>
              </MenuOption> */}
              <MenuOption onSelect={() => changeScreenOrientation()}>
                <View style={styles.menuOption}>
                  <Text style={styles.menuOptionText}>Rotate Screen</Text>
                  <MaterialCommunityIcons name="phone-rotate-landscape" size={24} color="white" />
                </View>
              </MenuOption>
              <MenuOption onSelect={handleChangeIncognito}>
                <View style={styles.menuOption}>
                  <Text style={styles.menuOptionText}>{incognito ? 'Turn Off Incognito' : 'Turn On Incognito'}</Text>
                  <MaterialCommunityIcons name="incognito" size={24} color="white" />
                </View>
              </MenuOption>
              <MenuOption onSelect={handleChangeContentMode}>
                <View style={styles.menuOption}>
                  <Text style={styles.menuOptionText}>{['recommended', 'mobile'].includes(contentMode) ? 'Request Desktop Mode' : 'Request Mobile Mode'}</Text>
                  <MaterialCommunityIcons name="desktop-mac" size={24} color="white" />
                </View>
              </MenuOption>
              <MenuOption onSelect={handleAddFavorite}>
                <View style={styles.menuOption}>
                  <Text style={styles.menuOptionText}>Add Page to Favorite</Text>
                  <MaterialCommunityIcons name="bookmark-check" size={24} color="white" />
                </View>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <View style={{ flexGrow: 1, flexShrink: 1 }}>
          <BrowserAddressBar
            defaultValue={navState.url}
            // onChangeText={setInputUrl}
            // value={inputUrl}
            onSubmitEditing={handleUrlSubmit}
          />
          </View>
        <View style={{ paddingHorizontal: 14 }}>
          <TouchableOpacity
            // style={styles.changeOrientationButton}
            onPress={() => handleReload()}
          >
            <MaterialCommunityIcons name="reload" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* <Text style={styles.browserTitle}>
          </Text> */}
      </View>}
      <View style={{ flex: 1 }}>
        <Pressable style={{ flex: 1 }} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          {/* {webView} */}
          <WebView
            contentInset={{ top: addressBarHeight }}
            // automaticallyAdjustContentInsets={false}
            contentInsetAdjustmentBehavior='scrollableAxes'
            // source={{ uri: newUrl ? newUrl : defaultUrl }}
            source={{ uri: newUrl ? newUrl : initInfo.url }}
            style={{ flex: 1 }}
            onNavigationStateChange={onNavigationStateChange}
            incognito={incognito}
            contentMode={contentMode}
            allowsInlineMediaPlayback={true}
            onScroll={handleScroll}
            forceDarkOn={true}
            allowsBackForwardNavigationGestures={true}
            key={forceReload}
            ref={browserRef}
          />
        </Pressable>
        {showBar &&
          <BrowserActionBar
            canGoForward={navState.canGoForward}
            canGoBack={navState.canGoBack}
            browserRef={browserRef}
            url={navState.url}
          />}
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
    zIndex: 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: 'rgba(76,76,76,1)',
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 10
    // paddingLeft: 8
  },
  browserTitle: {
    fontWeight: 'bold',
    // backgroundColor: 'red'
    // color: 'white'
  },
  addressBarIcon:{
    // size:24
    fontSize:30
  }, 
  changeOrientationButton: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  menuOption: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(76,76,76,1)',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10
    // width:'75%'
  },
  menuOptionText: {
    color: 'white',
    paddingRight: 20,
    fontSize: 16
  }
});


export default Browser;