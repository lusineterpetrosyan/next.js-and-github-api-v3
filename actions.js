import * as types from './types'
import Config from './config';
import {
  fetchOptions,
  parseJSON,
  checkStatus
} from './utils';

export const search = (value, page) => (
  (dispatch) => {
  
    const p = page || 1;

    if (page) {
      dispatch({ type: types.NEXT_PAGE, page: p });
    } else {
      dispatch({ type: types.SEARCH, page: 1 });
    }

    return fetch(`${Config.APIPATH}?q=${value}&page=${p}&per_page=${Config.perPage}`, fetchOptions({
      method: 'GET'
    }))
      .then(checkStatus)
      .then(parseJSON)
      .then(response => dispatch({ type: types.SEARCH_END, results: response, page: p }))
      .catch((error) => {
        dispatch({
          type: types.SEARCH_ERROR,
          error: error.message,
          status: error.status || 'server_down'
        });
      });
  })


export const edit = user => (
  dispatch => {
    let items = localStorage.getItem('results');
    items = JSON.parse(items);
    
    let foundIndex = items.findIndex(x => x.id == user.id);
    items[foundIndex] = user;
    
    dispatch({ type: types.EDIT, results: items })

  })

export const deleteUser = id => (
  dispatch => {
    let items = localStorage.getItem('results');
    items = JSON.parse(items);

    const newArray = items.filter(item => item.id !== id);
    
    dispatch({ type: types.DELETE, results: newArray })
  })



