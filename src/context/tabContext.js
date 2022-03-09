import { v4 as uuid } from 'uuid';

import createDataContext from './createDataContext';
import { defaultUrl } from '../util/appConstant';

const tabReducer = (state, action) => {
    switch (action.type) {
        case 'add_tab':
            return [...state, {
                url: defaultUrl,
                title: "",
                id: uuid()
            }];
        case 'update_tab':
            let objIndex = state.findIndex((obj => obj.id == action.payload.id));
            let updatedTab = Object.assign({}, state[objIndex])
            Object.assign(updatedTab, action.payload)
            return [...state.slice(0, objIndex), updatedTab, ...state.slice(objIndex + 1)]
        case 'delete_one_tab':
            return state.filter(tab => tab.id != action.payload.id)
        case 'delete_all_tabs':
            return []
        default:
            return state;
    }
  };

const addNewTab = dispatch => {
  return () => {
    dispatch({ type: 'add_tab' });
  };
};

const updateTab = dispatch => {
    return (tabUpdateInfo) => {
        dispatch({type: 'update_tab', payload: tabUpdateInfo})
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
    { addNewTab , updateTab, deleteOneTab , deleteAllTabs },
    []
  );