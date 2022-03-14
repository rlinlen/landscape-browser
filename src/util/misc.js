import AsyncStorage from '@react-native-async-storage/async-storage';

//Async
export const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`@${key}`, jsonValue)
    } catch (e) {
      // saving error
    }
  }

export const getStoreData = async (key, defaultValue=null) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`@${key}`)
      return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch(e) {
      // error reading value
      
    }
  }



//blob
export const blobToDataURL = async (blob, callback) => {
    //https://stackoverflow.com/questions/23150333/html5-javascript-dataurl-to-blob-blob-to-dataurl
    var a = new FileReader();
    a.onload = function (e) { callback(e.target.result); }
    a.readAsDataURL(blob);
  }
export const blobToDataURLPromise = (blob) => {
    return new Promise((resolve, reject) => {
      blobToDataURL(blob, data => {
        resolve(data);
      })});
  };


//getIcon
export const getIcon = async (url) => {
  try {
    // https://stackoverflow.com/questions/10282939/how-to-get-favicons-url-from-a-generic-webpage-in-javascript
    // let defaultIconUrl= 'https://s2.googleusercontent.com/s2/favicons?domain_url='
    let defaultIconUrl = 'favicon.ico'
    let newUrl = url.endsWith('/') ? url.slice(0, -1) : url
    // const response = await fetch(`${defaultIconUrl}${url}`)

    if (newUrl.startsWith('https')){

      let domain = (new URL(newUrl));
      // console.log(domain.protocol);
      // console.log(domain.hostname);

      // let faviconUrl = `${newUrl}${defaultIconUrl}`
      let faviconUrl = `${domain.protocol}//${domain.hostname}/${defaultIconUrl}`
      const response = await fetch(faviconUrl)
      const imageBlob = await response.blob();
      // const imageObjectURL = URL.createObjectURL(imageBlob);
      // console.log(imageObjectURL)
  
      const imageDataUrl = await blobToDataURLPromise(imageBlob);
      // console.log(imageDataUrl)
      return imageDataUrl
    }else{
      return ""
    }

   
  } catch (error) {
    console.log(error)
  }
}





export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}