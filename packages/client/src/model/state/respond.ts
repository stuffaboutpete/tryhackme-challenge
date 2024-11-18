/**
 * This function is used to respond
 * to actions or changes in the state
 * and perform some side effect and
 * optionally triggering new actions
 */

import { Respond } from './type/respond';
import { search } from '../search/search';

export const respond: Respond = async (action, oldState, newState, dispatch, context) => {
  if (action === 'SEARCH_TERM_CHANGE' && newState.searchTerm !== '') {
    if (oldState.searchRequestActive) {
      oldState.searchRequestActive('Request no longer needed');
    }
    const { abort, response } = search(newState.searchTerm, context.apiUrl as string);
    dispatch('SEARCH_REQUEST_BEGIN', abort);
    const searchResults = await response;
    dispatch('SEARCH_REQUEST_SUCCESS', searchResults);
    // TODO Handle error states
  }
};
