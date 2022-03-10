import { v4 as uuid } from 'uuid';

import createDataContext from './createDataContext';
import { storeData, getStoreData } from '../util/misc';


const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'add_fav':{
            const newFav = [...state, {
                id: uuid(),
                url: action.payload.url,
                title: action.payload.title,
                icon: action.payload.icon

            }]
            storeData('favorite',newFav)
            return newFav;
        }
        case 'get_all_favs':{
            // newFav = [{
            //     id: uuid(),
            //     url: 'https://google.com/',
            //     title: 'Google'
            // },{
            //     id: uuid(),
            //     url: 'https://stackoverflow.com/questions/53324080/open-url-in-specific-tabbar',
            //     title: 'StackOverflow'
            // },{
            //     id: uuid(),
            //     url: 'https://reactjs.org/docs/react-without-jsx.html',
            //     title: 'React'
            // },{
            //     id: uuid(),
            //     url: 'https://google.com/',
            //     title: 'Google'
            // }]
            return action.payload
        }
        case 'delete_one_fav':{
            const newFav = state.filter(tab => tab.id != action.payload.id)
            storeData('favorite',newFav)
            return newFav
        }
        case 'delete_all_favs':{
            const newFav = [];
            storeData('favorite',newFav)
            return newFav
        }
        default:
            return state;
    }
  };

const addNewFav = dispatch => {
  return (fav) => {
    //   console.log(fav)
    dispatch({ type: 'add_fav', payload: fav });
  };
};


const getAllFavs = dispatch => {
    return async () => {
        let newFav = await getStoreData('favorite', [])
        // console.log(newFav)
        dispatch({ type: 'get_all_favs', payload: newFav});
    };
  };

  
const deleteOneFav = dispatch => {
    return (fav) => {
        dispatch({ type: 'delete_one_fav', payload: fav });
    };
};


const deleteAllFavs = dispatch => {
    return () => {
        dispatch({ type: 'delete_all_favs' });
    };
};

export const { Context, Provider } = createDataContext(
    favoriteReducer,
    { addNewFav , getAllFavs, deleteOneFav , deleteAllFavs },
    []
  );