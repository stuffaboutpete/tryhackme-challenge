import { AbortCallback } from '../../search/type/abort-callback';
import { AllSearchResults } from '../../search/type/all-search-results';

export interface ActionPayloadMap {
  SEARCH_TERM_CHANGE: string;
  SEARCH_REQUEST_BEGIN: AbortCallback;
  SEARCH_REQUEST_SUCCESS: AllSearchResults;
  CLEAR_SEARCH_RESULTS: undefined;
}

export type Payload<A extends Action> = ActionPayloadMap[A];

export type Action = keyof ActionPayloadMap;
