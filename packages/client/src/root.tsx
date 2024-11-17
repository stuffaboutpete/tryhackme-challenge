import { useState, useRef } from 'react';
import { getCodeSandboxHost } from "@codesandbox/utils";
import { AbortCallback } from './model/search/type/abort-callback';
import { City } from './model/entities/type/city';
import { Country } from './model/entities/type/country';
import { Hotel } from './model/entities/type/hotel';
import { SearchResult } from './model/search/type/search-result';
import { search } from './model/search/search';
import App from './component/app';

const codeSandboxHost = getCodeSandboxHost(3001);
const apiUrl = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001';

function Root() {
  const [hotels, setHotels] = useState<Array<SearchResult<Hotel>>>();
  const [countries, setCountries] = useState<Array<SearchResult<Country>>>();
  const [cities, setCities] = useState<Array<SearchResult<City>>>();
  const [showClearBtn, setShowClearBtn] = useState(false);
  const abortRequestRef = useRef<undefined | AbortCallback>();

  const fetchData = async (searchTerm: string) => {
    if (searchTerm === '') {
      setHotels([]);
      setCountries([]);
      setCities([]);
      setShowClearBtn(false);
      return;
    }

    if (abortRequestRef.current) abortRequestRef.current('Request no longer needed');

    const { abort, response } = search(searchTerm, apiUrl);

    abortRequestRef.current = abort;
    const searchResults = await response;
    abortRequestRef.current = undefined;
    setShowClearBtn(true);
    setHotels(searchResults.hotels);
    setCountries(searchResults.countries);
    setCities(searchResults.cities);
  };

  return (
    <App
      hotels={hotels}
      countries={countries}
      cities={cities}
      showClearButton={showClearBtn}
      onSearch={fetchData}
    />
  );
}

export default Root;
