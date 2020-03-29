import { hostUrl } from './constants/enum';
import { FETCH_ALL_NEWS } from '../../modules/types/user'

const fetchNewsSuccess = (data) => {
  return {
    type: FETCH_ALL_NEWS,
    data
  }
};

export function fetchAllNews (pageNumber){
   const url = `${hostUrl}/v1/search?tags=front_page&page=${pageNumber}&hitsPerPage=10`;
   return (dispatch) => {
     return fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          dispatch(fetchNewsSuccess(data))
      }).catch(error => {
        throw(error);
      });
   };
};
