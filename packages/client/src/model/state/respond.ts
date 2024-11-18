/**
 * This function is used to respond
 * to actions or changes in the state
 * and perform some side effect and
 * optionally triggering new actions
 */

import { City } from '../entities/type/city';
import { Country } from '../entities/type/country';
import { Hotel } from '../entities/type/hotel';
import { Respond } from './type/respond';
import { id } from '../url/id';
import { entity } from '../url/entity';
import { load } from '../entities/load';
import { search } from '../search/search';

export const respond: Respond = async (action, oldState, newState, dispatch, context) => {
  if (action === 'INIT') {
    const pageEntity = entity(context.path as string);
    const entityId = id(context.path as string) as string

    if (pageEntity) {
      if (oldState.dataRequestActive) oldState.dataRequestActive('Request no longer needed');

      const { abort, response } = load(pageEntity, entityId, context.apiUrl as string);

      if (pageEntity === 'hotel') {
        dispatch('HOTEL_REQUEST_BEGIN', abort);
      } else if (pageEntity === 'country') {
        dispatch('COUNTRY_REQUEST_BEGIN', abort);
      } else if (pageEntity === 'city') {
        dispatch('CITY_REQUEST_BEGIN', abort);
      }

      const entity = await response;

      if (pageEntity === 'hotel') {
        dispatch('HOTEL_REQUEST_SUCCESS', entity as Hotel);
      } else if (pageEntity === 'country') {
        dispatch('COUNTRY_REQUEST_SUCCESS', entity as Country);
      } else if (pageEntity === 'city') {
        dispatch('CITY_REQUEST_SUCCESS', entity as City);
      }

      // TODO Handle error states
    }
  }

  if (action === 'SEARCH_TERM_CHANGE' && newState.searchTerm !== '') {
    if (oldState.dataRequestActive) oldState.dataRequestActive('Request no longer needed');

    const { abort, response } = search(newState.searchTerm, context.apiUrl as string);

    dispatch('SEARCH_REQUEST_BEGIN', abort);
    const searchResults = await response;
    dispatch('SEARCH_REQUEST_SUCCESS', searchResults);

    // TODO Handle error states
  }
};
