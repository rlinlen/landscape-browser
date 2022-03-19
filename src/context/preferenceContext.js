import createDataContext from './createDataContext';
import { defaultSearchEngine, defaultSmileToScrollThreshold } from '../util/appConstant';
import { storeData, getStoreData, getIcon, isEmpty } from '../util/misc';

const preferenceReducer = (state, action) => {
    switch (action.type) {
        case 'get_user_perference':{
            const defaultPreference = {
                searchEngine: defaultSearchEngine,
                smileToScrollThreshold: defaultSmileToScrollThreshold
            }
            return action.payload ? action.payload : defaultPreference
        }
        case 'update_user_perference':{
            newPreference = {...state, ...action.payload}
            storeData('userPreference',newPreference)
            return newPreference
        }
        default:
            return state;
    }
};

const getUserPreference = dispatch => {
    return async () => {
        let userPreference = await getStoreData('userPreference', [])
        // console.log(newFav)
        dispatch({ type: 'get_user_perference', payload: userPreference});
    };
  };

const updateUserPreference = dispatch => {
    return async (newPreferencePiece) => {
        dispatch({ type: 'update_user_perference', payload: newPreferencePiece});
    };
  };



export const { Context, Provider } = createDataContext(
    preferenceReducer,
    { getUserPreference, updateUserPreference },
    {}
);