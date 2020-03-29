import { FETCH_ALL_NEWS } from './types/user'

const initialState = {
  news: 'Test news'
}

export default function reducer(state=initialState, {type, data}) {
  switch (type) {
    case FETCH_ALL_NEWS:
      return Object.assign({}, state, { news: data });
    default:
      return state
  }
}
