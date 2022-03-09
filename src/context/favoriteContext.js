import { v4 as uuid } from 'uuid';

import createDataContext from './createDataContext';

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'add_fav':
            return [...state, {
                id: uuid(),
                url: action.payload.url,
                title: action.payload.title
            }];
        case 'get_all_favs':
            return [{
                id: uuid(),
                url: 'https://google.com/',
                title: 'Google'
            },{
                id: uuid(),
                url: 'https://stackoverflow.com/questions/53324080/open-url-in-specific-tabbar',
                title: 'StackOverflow'
            },{
                id: uuid(),
                url: 'https://reactjs.org/docs/react-without-jsx.html',
                title: 'React'
            },{
                id: uuid(),
                url: 'https://google.com/',
                title: 'Google'
            }]
        case 'delete_one_fav':
            return state.filter(tab => tab.id != action.payload.id)
        case 'delete_all_favs':
            return []
        default:
            return state;
    }
  };

const addNewFav = dispatch => {
  return (fav) => {
    dispatch({ type: 'add_fav', payload: fav });
  };
};


const getAllFavs = dispatch => {
    return () => {
      dispatch({ type: 'get_all_favs' });
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