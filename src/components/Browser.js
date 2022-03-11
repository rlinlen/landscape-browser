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
import { blobToDataURLPromise } from '../util/misc';
import ProgressBar from './ProgressBar';
import FavoriteView from './FavoriteView';


const Browser = ({ initInfo }) => {

  const browserRef = useRef(null);

  const { state: currentState, setHideSafeAreaButtom, setEnterFavSelect } = useContext(CurrentContext);
  const { state: tabState, addNewTab, updateTab, deleteOneTab, deleteAllTabs } = useContext(TabContext);
  const { addNewFav } = useContext(FavoriteContext);

  const enterFavSelect = currentState?.enterFavSelect
  const currentOrientation = currentState?.currentOrientation


  const [forceReload, setForceReload] = useState(false);
  const [navState, setNavState] = useState({});
  // const [inputUrl, setInputUrl] = useState('');
  const [newUrl, setNewUrl] = useState(initInfo.url);
  const [incognito, setIncognito] = useState(true);
  const [contentMode, setContentMode] = useState('recommended');
  const [scrollInitPos, setScrollInitPos] = useState(0);
  const [showAddressBar, setShowAddressBar] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  

  // const [isScrollUp, setIsScrollUp] = useState(false);
  // const [currentUrl, setCurrentUrl] = useState('');

  // function handleDeepLink(event) {
  //   // let newURL = Linking.parse(event.url);
  //   setNewUrl(event.url);
  // }

  // useEffect(() => {
  //   console.log('browser load new init')
  //   console.log(initInfo.url)
  //   // // setNewUrl(initInfo.url)
  //   console.log(`new url:${newUrl}`)
  //   console.log(`nav url:${navState.url}`)
  //   // setForceReload(!forceReload)
  // })

  useEffect(() => {
    // console.log(`update initInfo:${initInfo.url}`)
    setNewUrl(initInfo.url);
  }, [initInfo])

  // useEffect(() => {
  //   if (newUrl &&  newUrl != ""){

  //     // setForceReload(!forceReload)
  //   }
  // },[newUrl])
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
    let currentDirectionPos = transformMatrix.indexOf(currentOritentation)
    if (defaultOrientation.includes(currentOritentation)) {
      let nextDirectionPos = 0
      direction = transformMatrix[nextDirectionPos]
    } else if (currentDirectionPos != -1) {
      let nextDirectionPos = currentDirectionPos + 1
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
    setNewUrl(url);


    let updatedTab = { ...initInfo, url, title }
    updateTab(updatedTab)

    setShowAddressBar(true);
    showBottomBarAndSafeArea(true);
  };

  const showBottomBarAndSafeArea = (isShowBottomBar) => {

    // setShowBar(isShowBottomBar);
    setShowBottomBar(isShowBottomBar);
    setHideSafeAreaButtom(!isShowBottomBar)

  }
  const handleAddressBarFocus = (setEnterFavSelect) => {
    setEnterFavSelect(true)
    setShowBottomBar(false)
  }
  const handleAddressBarBlur = (setEnterFavSelect) => {
    setEnterFavSelect(false)
  }
  const handleUrlSubmit = ({ nativeEvent }) => {

    // console.log(nativeEvent.text)
    const newURL = upgradeURL(nativeEvent.text, defaultSearchEngine);
    // Keyboard.dismiss();

    setNewUrl(newURL);
    // let updatedTab = { url: newURL }
    // updateTab(updatedTab)
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
    // setNewUrl('https://yahoo.com')
  }
  const handleWebViewLoad = ({ nativeEvent }) => {
    // console.log('hellow')
    const { canGoForward, canGoBack, title, url, loading } = nativeEvent;

    console.log(url)
    let updatedTab = { ...initInfo, url, title }
    // updateTab(updatedTab)
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
          setShowAddressBar(true)
          showBottomBarAndSafeArea(true)
        } else {
          // setIsScrollUp(false)
          // console.log('set show bar to false')
          setShowAddressBar(false)
          showBottomBarAndSafeArea(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleAddFavorite = async () => {

    // const getIcon = async (url) => {
    //   try {
    //     // https://stackoverflow.com/questions/10282939/how-to-get-favicons-url-from-a-generic-webpage-in-javascript
    //     // let defaultIconUrl= 'https://s2.googleusercontent.com/s2/favicons?domain_url='
    //     let defaultIconUrl = '/favicon.ico'
    //     let newUrl = url.endsWith('/') ? url.slice(0, -1) : url
    //     // const response = await fetch(`${defaultIconUrl}${url}`)
    //     let faviconUrl = `${newUrl}${defaultIconUrl}`
    //     const response = await fetch(faviconUrl)
    //     const imageBlob = await response.blob();
    //     // const imageObjectURL = URL.createObjectURL(imageBlob);
    //     // console.log(imageObjectURL)

    //     const imageDataUrl = await blobToDataURLPromise(imageBlob);
    //     // console.log(imageDataUrl)
    //     return imageDataUrl
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // let icon = await getIcon(navState.url)
    addNewFav({
      url: navState.url,
      title: navState.title
    })
  }
  const handleLoadProgress = ({ nativeEvent }) => {
    let loadingProgress = nativeEvent.progress;
    // console.log(loadingProgress)
    // 0 -> 1
    setLoadProgress(loadingProgress)
  }

  const optionsStyles = {
    optionsContainer: {
      backgroundColor: 'rgb(40,40,40)',
      borderRadius: 10,
      width: '65%'
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

  const MainFrame = ({ source, onNavigationStateChange, incognito, contentMode, onScroll, onLoadProgress,
    innerKey, innerRef }) => {
    // if (enterFavSelect) {
    //   setShowBottomBar(false)
    //   return (
    //     <FavoriteView/>
    //   )
    // } else {
    return (
      <Pressable style={{ flex: 1 }} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        {/* {webView} */}
        <WebView

          contentInset={{ top: addressBarHeight }}
          // automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior='scrollableAxes'
          // source={{ uri: newUrl ? newUrl : defaultUrl }}
          source={source}
          style={{ flex: 1 }}
          // onNavigationStateChange={onNavigationStateChange}
          // incognito={incognito}
          // contentMode={contentMode}
          allowsInlineMediaPlayback={true}
          // onScroll={onScroll}
          forceDarkOn={true}
          allowsBackForwardNavigationGestures={true}
        // onLoadProgress={onLoadProgress}
        // key={innerKey}
        // ref={innerRef}
        />
      </Pressable>
    )
    // }

  }

  return (
    <View style={{ flex: 1 }}>
      {showAddressBar && <View style={[styles.browserTitleContainer, { height: addressBarHeight }]}>
        <View style={{ paddingHorizontal: 14 }}>
          <Menu
          // renderer={renderers.Popover}
          // rendererProps={{ placement: 'bottom' }}
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
            onFocus={() => handleAddressBarFocus(setEnterFavSelect)}
            onBlur={() => handleAddressBarBlur(setEnterFavSelect)}
            onSubmitEditing={handleUrlSubmit}
            loadProgress={loadProgress}
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
      </View>}

      <View style={{ flex: 1 }}>
        {/* <MainFrame 
          source={{ uri: newUrl ? newUrl : initInfo.url }}
          onNavigationStateChange={onNavigationStateChange}
          incognito={incognito}
          contentMode={contentMode}
          onScroll={handleScroll}
          onLoadProgress={handleLoadProgress}
          innerKey={forceReload}
          innerRef={browserRef}
        /> */}
        <Pressable style={[{ flex: 1 },
          enterFavSelect ? { display: 'none' } : {},
          currentOrientation ? {width:'90%', alignSelf:'center'} : {}
        ]} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <WebView
            // onLoadStart={handleWebViewLoad}
            contentInset={{ top: addressBarHeight }}
            // automaticallyAdjustContentInsets={false}
            contentInsetAdjustmentBehavior='scrollableAxes'
            // source={{ uri: newUrl }}
            source={{ uri: newUrl }}
            style={[{ flex: 1 }]}
            onNavigationStateChange={onNavigationStateChange}
            incognito={incognito}
            contentMode={contentMode}
            allowsInlineMediaPlayback={true}
            onScroll={handleScroll}
            forceDarkOn={true}
            allowsBackForwardNavigationGestures={true}
            onLoadProgress={handleLoadProgress}
            key={forceReload}
            ref={browserRef}
          />
        </Pressable>
        {enterFavSelect && <FavoriteView setNewUrl={setNewUrl}></FavoriteView>}
        {showBottomBar &&
          <BrowserActionBar
            canGoForward={navState.canGoForward}
            canGoBack={navState.canGoBack}
            browserRef={browserRef}
            url={navState.url}
          />
        }
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'red'
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
  addressBarIcon: {
    // size:24
    fontSize: 30
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