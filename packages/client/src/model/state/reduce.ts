import { produce } from 'immer';
import { Payload } from './type/action';
import { Reduce } from './type/reduce';

export const reduce: Reduce = (currentState, action, payload) => produce(currentState, state => {
  if (action === 'SEARCH_TERM_CHANGE') {
    state.searchTerm = payload as Payload<'SEARCH_TERM_CHANGE'>;
  }

  if (action === 'SEARCH_TERM_CHANGE' && payload as Payload<'SEARCH_TERM_CHANGE'> === '') {
    state.searchResults = undefined;
  }

  if (action === 'SEARCH_REQUEST_BEGIN') {
    state.searchRequestActive = payload as Payload<'SEARCH_REQUEST_BEGIN'>;
  }

  if (action === 'SEARCH_REQUEST_SUCCESS') {
    state.searchResults = payload as Payload<'SEARCH_REQUEST_SUCCESS'>;
    state.searchRequestActive = false;
  }

  if (action === 'CLEAR_SEARCH_RESULTS') {
    state.searchResults = undefined;
    state.searchTerm = '';
  }
});
