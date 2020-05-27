import { combineReducers } from 'redux'
import * as types from './types'

const initState = {
  search: false,
  loading: false,
  results: [],
  total_count: 0,
  current_page: 1,
  error: false
}

const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SEARCH:
      return {...state, search: true, current_page: action.page }
    case types.NEXT_PAGE:
      return {...state, loading: true, current_page: action.page }
    case types.SEARCH_END:
      localStorage.setItem('results', JSON.stringify(action.results.items))
      localStorage.setItem('total_count', action.results.total_count)

      return {...state,
        loading: false,
        search: false,
        results: action.results.items,
        total_count: action.results.total_count,
        current_page: action.page || 1
      }

    case types.DELETE:
      const total = state.total_count - 1;
      localStorage.setItem('results', JSON.stringify(action.results))
      localStorage.setItem('total_count', total)

      return {...state,
        results: action.results,
        total_count: total,
      }

    case types.EDIT:
      localStorage.setItem('results', JSON.stringify(action.results))

      return {...state,
        results: action.results,
      }


    case types.SEARCH_ERROR:
      return {...initState, error: 'ERror message from server' } // error: action.error
    default:
      return state
  }
}

const reducers = {
  search: searchReducer
}

export default combineReducers(reducers)
