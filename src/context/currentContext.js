import createDataContext from './createDataContext';
import { defaultUrl } from '../util/appConstant';

const currentReducer = (state, action) => {
    switch (action.type) {
        case 'set_current_tab':
            // console.log('set_current_tab')
            // console.log(action.payload.id)
            // console.log(action.payload.title)
            // console.log(action.payload.url)
            return {...state, currentTab: action.payload};
        case 'set_hide_safe_area_buttom':
            return  {...state, hideSafeAreaButtom: action.payload};
        case 'set_enter_tab_select':
            return {...state, enterTabSelect: action.payload};
        case 'set_enter_fav_select':
            return {...state, enterFavSelect: action.payload};
        case 'set_current_ori':
             return {...state, currentOrientation: action.payload};
        default:
            return state;
    }
  };

const setEnterTabSelect = dispatch => {
  return (enterTabSelect) => {
    dispatch({ type: 'set_enter_tab_select', payload: enterTabSelect });
  }
}

const setEnterFavSelect = dispatch => {
  return (enterFavSelect) => {
    dispatch({ type: 'set_enter_fav_select', payload: enterFavSelect });
  }
}

const setCurrentTab = dispatch => {
  return (currentTab) => {
    dispatch({ type: 'set_current_tab', payload: currentTab });
  };
};


const setCurrentOrientation = dispatch => {
  //true: landscape
  //false: portrait
  return (orientation) => {
    dispatch({ type: 'set_current_ori', payload: orientation });
  };
};

const setHideSafeAreaButtom = dispatch => {
    return (hideSafeAreaButtom) => {
        dispatch({ type: 'set_hide_safe_area_buttom', payload: hideSafeAreaButtom });
    }
}

export const { Context, Provider } = createDataContext(
    currentReducer,
    { setCurrentTab , setEnterFavSelect, setEnterTabSelect, setHideSafeAreaButtom , setCurrentOrientation},
    {
        currentTab: "",
        hideSafeAreaButtom: false,
        enterTabSelect: true
    }
  );