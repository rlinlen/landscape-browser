import { useState, useRef, useContext, useEffect, useDebugValue } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Pressable } from 'react-native';
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

import { defaultUrl, searchEngines, injectedJS, addressBarHeight, version, defaultSmileToScrollThreshold } from '../util/appConstant';
import BrowserActionBar from './BrowserActionBar';
import { Context as CurrentContext } from '../context/currentContext';
import { Context as TabContext } from '../context/tabContext';
import { Context as FavoriteContext } from '../context/favoriteContext';
import { Context as PreferenceContext } from '../context/preferenceContext';
import BrowserAddressBar from './BrowserAddressBar';
import { blobToDataURLPromise } from '../util/misc';
import ProgressBar from './ProgressBar';
import FavoriteView from './FavoriteView';
import ModalPicker from './ModalPicker';
import AutoScroll from './AutoScroll';
import ModalSlider from './ModalSlider';


const Browser = ({ initInfo, containerStyle }) => {

  const browserRef = useRef(null);

  const { state: currentState, setHideSafeAreaButtom, setEnterFavSelect } = useContext(CurrentContext);
  const { state: tabState, addNewTab, updateTab, deleteOneTab, deleteAllTabs } = useContext(TabContext);
  const { addNewFav } = useContext(FavoriteContext);
  const { state: userPreference, updateUserPreference } = useContext(PreferenceContext);

  const enterFavSelect = currentState?.enterFavSelect
  const currentOrientation = currentState?.currentOrientation

  let currentTab = currentState?.currentTab
  let searchEnginePreference = userPreference?.searchEngine
  let smileToScrollThreshold = userPreference?.smileToScrollThreshold || defaultSmileToScrollThreshold


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
  const [showSearchEngineSelector, setShowSearchEngineSelector] = useState(false);
  const [showSmileToScrollThreshold, setShowSmileToScrollThreshold] = useState(false);
  const [webViewPressing, setWebViewPressing] = useState(false);
  const [videoRotateCount, setVideoRotateCount] = useState(1);
  const [isSmileToScroll, setIsSmileToScroll] = useState(false);


  // const [isScrollUp, setIsScrollUp] = useState(false);
  // const [currentUrl, setCurrentUrl] = useState('');

  // function handleDeepLink(event) {
  //   // let newURL = Linking.parse(event.url);
  //   setNewUrl(event.url);
  // }

  // useEffect(()=>{
  //   console.log('browser loaded')
  // },[])

  useEffect(() => {
    // console.log('browser load new init')
    // console.log(initInfo.url)
    // // // setNewUrl(initInfo.url)
    // console.log(`new url:${newUrl}`)
    // console.log(`nav url:${navState.url}`)
    // setForceReload(!forceReload)
  })

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

    if ([ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,ScreenOrientation.OrientationLock.LANDSCAPE_LEFT].includes(direction)){
      // disable smiletoscroll
      setIsSmileToScroll(false)
    }

    // console.log(direction)
    await ScreenOrientation.lockAsync(direction);


  }

  const handleIncreaseFontSize = () => {
    const JS = `
    var eles = document.getElementsByTagName("*");
    for (var i = 0; i < eles.length; i++) {
        var k = parseInt(eles[i].style.fontSize);
        eles[i].style.fontSize = 1.1*k;
    };
        `
    browserRef.current.injectJavaScript(JS)
  }

  const handleRotateVideo = async (browserRef) => {

    // let currentOritentation = await ScreenOrientation.getOrientationLockAsync();
    // // let direction = ScreenOrientation.OrientationLock.DEFAULT
    // if ((currentOritentation == ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT) || (currentOritentation == ScreenOrientation.OrientationLock.LANDSCAPE_LEFT)) {
    //   const rotateVideo = `
    //   var videos = document.getElementsByTagName("video");
    //   for (var i = 0; i < videos.length; i++) {
    //       videos[i].style.webkitTransform = "scale(1) rotate(90deg)";
    //       videos[i].style.transform = "scale(1) rotate(90deg)";
    //   };
    //   document.body.style.backgroundColor = 'blue';
    //   `
    //   browserRef.current.injectJavaScript(rotateVideo);
    // } else {
    //   const rotateVideo = `
    //   var videos = document.getElementsByTagName("video");
    //   for (var i = 0; i < videos.length; i++) {
    //       videos[i].style.webkitTransform = "scale(1) rotate(0deg)";
    //       videos[i].style.transform = "scale(1) rotate(0deg)";
    //   };
    //   document.body.style.backgroundColor = 'red';
    //   `
    //   browserRef.current.injectJavaScript(rotateVideo);
    // }
    let videoRotateDegree = videoRotateCount * 90;

    const rotateVideo = `
      var videos = document.getElementsByTagName("video");
      for (var i = 0; i < videos.length; i++) {
          videos[i].style.webkitTransform = "scale(1) rotate(${videoRotateDegree}deg)";
          videos[i].style.transform = "scale(1) rotate(${videoRotateDegree}deg)";
      };
      // document.body.style.backgroundColor = 'blue';
      // screen.orientation.lock('portrait');
      `
    setTimeout(() => {
      browserRef.current.injectJavaScript(rotateVideo);
      setVideoRotateCount(videoRotateCount + 1);
      Alert.alert('rotate!')
    }, 5000);


  }

  const handleNavigationStateChange = (navState) => {
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

    // console.log(`handleNavigationStateChange:${url}, loading:${loading}`)
    if (loading == false) {
      // It's important to check loading here.
      // If not, when redirect happen it will cause bounce
      setNewUrl(url);
      let updatedTab = { ...initInfo, url, title }
      updateTab(updatedTab)
    }





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
  const handleUrlSubmit = ({ nativeEvent, searchEnginePreference }) => {

    // console.log(nativeEvent.text)
    const newURL = upgradeURL(nativeEvent.text, searchEnginePreference);
    // Keyboard.dismiss();

    setNewUrl(newURL);

    setEnterFavSelect(false);
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

    // console.log(url)
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
    if (contentMode == 'desktop') {
      setContentMode('mobile')
    } else if (contentMode == 'mobile' || contentMode == 'recommended') {
      setContentMode('desktop')
    }
    // if (browserRef) {
    //   browserRef.current.reload();
    // }
    // setNewUrl(navState.url)
    setForceReload(!forceReload)
  }
  const handleTextIncrease = () => {
    const jsIncreaseFont = `
    var p=document.getElementsByTagName('*');
    for(i=0;i<p.length;i++){
      if(p[i].style.fontSize){
        var s=parseInt(p[i].style.fontSize.replace('px',''));
      }else{
        var s=16;
      }
      
      s*=1.2;
      p[i].style.fontSize=s+'px'
      p[i].style.lineHeight=1.1*s+'px'
      // p[i].style.fontSize= '1.3rem'
    };
      true;
    `
    browserRef.current.injectJavaScript(jsIncreaseFont);
  }
  const handleTextDecrease = () => {
    const jsIncreaseFont = `
    var p=document.getElementsByTagName('*');
    for(i=0;i<p.length;i++){
      if(p[i].style.fontSize){
        var s=parseInt(p[i].style.fontSize.replace('px',''));
      }else{
        var s=16;
      }
      
      s/=1.2;
      // p[i].style.fontSize=s+'px'
      p[i].style.fontSize=s+'px'
      p[i].style.lineHeight=1.1*s+'px'
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
    setWebViewPressing(true)
  }
  const handlePressOut = evt => {
    // console.log(evt.nativeEvent.locationY)
    try {
      setWebViewPressing(false)
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
  const handleSmileToScroll = () => {
    setIsSmileToScroll(!isSmileToScroll);
  }
  const handleAddFavorite = async () => {
    addNewFav({
      url: navState.url,
      title: navState.title
    })
  }
  const handleChooseSearchEngine = () => {
    setShowSearchEngineSelector(true)
  }
  const handleChooseSimleToScrollThreshold = () => {
    setShowSmileToScrollThreshold(true)
  }
  const handleAbout = () => {
    // let alertContext = `感謝您使用枕邊瀏覽器。本App並不是要取代任何瀏覽器，亦不推薦做為日常使用。只有當你發現一個網站適合你睡前側躺且橫向瀏覽時，可使用本瀏覽器來鎖定方向。由於人手僅有一人請多包涵。如果您有更多想法或是發現問題，歡迎透過以下方式聯繫我:\nlen@lenlin.org \n v${version}`
    let alertContext = `Thanks for using the app. The intention of the app is not to replace other browser, but to provide a browser where when you are on the bed in the side-lying position, and you want to surf with lock in landscape mode, then this is it. \n Smile To Scroll currently only work in portrait mode. \n v${version}`
    Alert.alert(alertContext)
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
          javaScriptCanOpenWindowsAutomatically={true}
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
          mediaPlaybackRequiresUserAction={true}
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
    <View style={[{ flex: 1 }, containerStyle]}>
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
              {
              !currentOrientation && 
              <MenuOption onSelect={() => handleSmileToScroll()}>
                <View style={styles.menuOption}>
                  <Text style={styles.menuOptionText}>{isSmileToScroll ? 'Disable' : 'Enable'} Smile to Scroll</Text>
                  <AntDesign name="smileo" size={22} color="white" />
                </View>
              </MenuOption>}
              <MenuOption onSelect={() => handleTextIncrease()}>
                <View style={styles.menuOption}>
                  <Text style={styles.menuOptionText}>Increase Font Size</Text>
                  <MaterialCommunityIcons name="format-font-size-increase" size={24} color="white" />
                </View>
              </MenuOption>
              <MenuOption onSelect={() => handleTextDecrease()}>
                <View style={styles.menuOption}>
                  <Text style={styles.menuOptionText}>Decrease Font Size</Text>
                  <MaterialCommunityIcons name="format-font-size-decrease" size={24} color="white" />
                </View>
              </MenuOption>
              {/* <MenuOption onSelect={handleChangeIncognito}>
                <View style={styles.menuOption}>
                  <Text style={styles.menuOptionText}>{incognito ? 'Turn Off Incognito' : 'Turn On Incognito'}</Text>
                  <MaterialCommunityIcons name="incognito" size={24} color="white" />
                </View>
              </MenuOption> */}
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
              <MenuOption onSelect={handleChooseSimleToScrollThreshold}>
                <View style={styles.menuOption}>
                  <Text style={styles.menuOptionText}>Set SmileToScroll Threshold</Text>
                  <MaterialCommunityIcons name="face-recognition" size={22} color="white" />
                </View>
              </MenuOption>
              <MenuOption onSelect={handleChooseSearchEngine}>
                <View style={styles.menuOption}>
                  <Text style={styles.menuOptionText}>Set Search Engine</Text>
                  <MaterialCommunityIcons name="search-web" size={25} color="white" />
                </View>
              </MenuOption>
              <MenuOption onSelect={handleAbout}>
                <View style={styles.menuOption}>
                  <Text style={styles.menuOptionText}>About</Text>
                  <MaterialCommunityIcons name="information-outline" size={22} color="white" />
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
            // onBlur={() => handleAddressBarBlur(setEnterFavSelect)}
            onSubmitEditing={({ nativeEvent }) => handleUrlSubmit({ nativeEvent, searchEnginePreference })}
            loadProgress={loadProgress}
          />
        </View>
        {currentOrientation &&
          <>
            {/* <View style={{ paddingLeft: 14 }}>
              <TouchableOpacity
                // style={styles.changeOrientationButton}
                onPress={() => handleRotateVideo(browserRef)}
                style={[styles.barTouch]}
              >
                <MaterialCommunityIcons name="format-rotate-90" size={24} color="white" />
              </TouchableOpacity>
            </View> */}
            <View style={{ paddingLeft: 20, paddingRight: 8 }}>
              <TouchableOpacity
                // style={styles.changeOrientationButton}
                onPress={() => browserRef.current.injectJavaScript(`
            window.scroll({
              top: 0, 
              left: 0, 
              behavior: 'smooth'
            })
            `
                )}
                style={[styles.barTouch]}
              >
                <MaterialCommunityIcons name="format-align-top" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </>
        }
        {enterFavSelect ? <TouchableOpacity
          // style={styles.changeOrientationButton}
          onPress={() => setEnterFavSelect(false)}
          style={[styles.barTouch]}
        >
          {/* <AntDesign name="upload" size={24} color="white" /> */}
          <Text style={[{ color: 'rgb(83,194,226)', paddingHorizontal: 14 }]} >Cancel</Text>
        </TouchableOpacity>
          :
          <View style={{ paddingHorizontal: 14 }}>
            <TouchableOpacity
              // style={styles.changeOrientationButton}
              onPress={() => handleReload()}
            >
              <MaterialCommunityIcons name="reload" size={24} color="white" />
            </TouchableOpacity>
          </View>}
      </View>}
      {currentTab == initInfo.id && isSmileToScroll && <AutoScroll 
        browserRef={browserRef} 
        isLandscape={currentOrientation}
        smileToScrollThreshold={smileToScrollThreshold}
        pause={webViewPressing}
      />
      }
      <View style={{ flex: 1, backgroundColor: 'black' }}>
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
        currentOrientation ? { width: '90%', alignSelf: 'center' } : {}
        ]} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <WebView
            // onLoadStart={handleWebViewLoad}
            contentInset={{ top: addressBarHeight }}
            // onShouldStartLoadWithRequest= {(request => {
            //   console.log(request)
            //   return true
            // })}
            // injectJavaScript={injectedJS(currentOrientation)}
            onMessage={() => { }}
            // automaticallyAdjustContentInsets={false}
            // dataDetectorTypes={['lookupSuggestion','link']}
            contentInsetAdjustmentBehavior='scrollableAxes'
            source={{ uri: newUrl }}
            containerStyle={[{ height: 0 }]}
            onNavigationStateChange={handleNavigationStateChange}
            // onLoadEnd={handleNavigationStateChange}
            incognito={incognito}
            contentMode={contentMode}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={true}
            onScroll={handleScroll}
            forceDarkOn={true}
            allowsBackForwardNavigationGestures={true}
            onLoadProgress={handleLoadProgress}
            decelerationRate="fast"
            key={forceReload}
            ref={browserRef}
          />
          {/* <WebView
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
            // key={forceReload}
            ref={browserRef}
          /> */}
        </Pressable>
        {enterFavSelect && <FavoriteView setNewUrl={setNewUrl} isLandscape={currentOrientation}></FavoriteView>}
        <ModalPicker
          visible={showSearchEngineSelector}
          setVisible={setShowSearchEngineSelector}
          items={Object.keys(searchEngines).map((searchEngine) => ({ label: searchEngine, value: searchEngine }))}
          handleValueChange={(value) => updateUserPreference({ searchEngine: value })}
          selectedValue={searchEnginePreference}
        >
        </ModalPicker>
        <ModalSlider
          visible={showSmileToScrollThreshold}
          setVisible={setShowSmileToScrollThreshold}
          dialogContent={`Set the threshold for Smile dectector (default:${defaultSmileToScrollThreshold}). Larger value means that it needs a big smile from you to trigger.`}
          handleValueChange={(value) => updateUserPreference({ smileToScrollThreshold: value })}
          selectedValue={smileToScrollThreshold}
        />
        {showBottomBar &&
          <BrowserActionBar
            canGoForward={navState.canGoForward}
            canGoBack={navState.canGoBack}
            browserRef={browserRef}
            setShowBottomBar={setShowBottomBar}
            url={navState.url}
            additionalTabSelectHandler={()=>{setIsSmileToScroll(false)}}
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