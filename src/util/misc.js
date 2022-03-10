import AsyncStorage from '@react-native-async-storage/async-storage';

//Async
export const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(`@$${key}`, jsonValue)
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
