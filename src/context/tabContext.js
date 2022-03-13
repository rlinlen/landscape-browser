import { v4 as uuid } from 'uuid';
import { WebView } from 'react-native-webview';

import createDataContext from './createDataContext';
import { defaultUrl, defaultIcon } from '../util/appConstant';
import { storeData, getStoreData, getIcon, isEmpty } from '../util/misc';

const tabReducer = (state, action) => {
    switch (action.type) {
        case 'get_saved_tabs':{
            const firstPage = {
                url: defaultUrl,
                id: uuid(),
                title: "",
            }
            return action.payload ? action.payload : []
        }
        case 'add_tab':{
            const tabs = [...state, action.payload]
            storeData('tabs',tabs)
            return tabs;
        }
        case 'update_tab':{
            // console.log(action.payload)
            let objIndex = state.findIndex((obj => obj.id == action.payload.id));
            let updatedTab = Object.assign({}, state[objIndex])
            Object.assign(updatedTab, action.payload)
            const tabs = [...state.slice(0, objIndex), updatedTab, ...state.slice(objIndex + 1)]
            storeData('tabs',tabs)
            return tabs
        }
        case 'delete_one_tab':{
            const tabs = state.filter(tab => tab.id != action.payload.id)
            storeData('tabs',tabs)
            return tabs
        }
        case 'delete_all_tabs':{
            storeData('tabs',[])
            return []
        }
        default:
            return state;
    }
};

const getSavedTabs = dispatch => {
    return async () => {
        let newTabs = await getStoreData('tabs', [])
        // console.log(newFav)
        dispatch({ type: 'get_saved_tabs', payload: newTabs});
    };
  };

const addNewTab = dispatch => {
    return async (url) => {
        url = url ? url : defaultUrl
        let icon = ''
        if (url.startsWith('http')) {
            icon = await getIcon(url)
        } else {
            icon = defaultIcon
        }
        // tabUpdateInfo['icon'] = icon
        newTab = {
            url: url,
            title: "",
            id: uuid(),
            icon: icon
        }
        dispatch({ type: 'add_tab', payload: newTab });
    };
};

const updateTab = dispatch => {
    return async (tabUpdateInfo) => {
            let icon = ''
            // console.log(`tabUpdateInfo`)
            // console.log(tabUpdateInfo?.url)
            if (tabUpdateInfo?.url?.startsWith('http')) {
                icon = await getIcon(tabUpdateInfo.url)
                tabUpdateInfo['icon'] = icon
            } 
            dispatch({ type: 'update_tab', payload: tabUpdateInfo })

    }
}

const deleteOneTab = dispatch => {
    return (tab) => {
        dispatch({ type: 'delete_one_tab', payload: tab });
    };
};


const deleteAllTabs = dispatch => {
    return () => {
        dispatch({ type: 'delete_all_tabs' });
    };
};

export const { Context, Provider } = createDataContext(
    tabReducer,
    { getSavedTabs, addNewTab, updateTab, deleteOneTab, deleteAllTabs },
    []
);