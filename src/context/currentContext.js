import createDataContext from './createDataContext';
import { defaultUrl } from '../util/appConstant';

const currentReducer = (state, action) => {
    switch (action.type) {
        case 'set_current_tab':
            return {...state, currentTab: action.payload};
        case 'set_hide_safe_area_buttom':
            return  {...state, hideSafeAreaButtom: action.payload};
        case 'set_enter_tab_select':
            return {...state, enterTabSelect: action.payload}
        default:
            return state;
    }
  };

const setEnterTabSelect = dispatch => {
  return (enterTabSelect) => {
    dispatch({ type: 'set_enter_tab_select', payload: enterTabSelect });
  }
}

const setCurrentTab = dispatch => {
  return (currentTab) => {
    dispatch({ type: 'set_current_tab', payload: currentTab });
  };
};

const setHideSafeAreaButtom = dispatch => {
    return (hideSafeAreaButtom) => {
        dispatch({ type: 'set_hide_safe_area_buttom', payload: hideSafeAreaButtom });
    }
}

export const { Context, Provider } = createDataContext(
    currentReducer,
    { setCurrentTab , setEnterTabSelect, setHideSafeAreaButtom },
    {
        currentTab: {
          // url: defaultUrl
        },
        hideSafeAreaButtom: false,
        enterTabSelect: true
    }
  );