import { useState, useRef } from 'react';
import { getCodeSandboxHost } from "@codesandbox/utils";
import App from './component/app';
import { HotelWithSearchTermGroups } from './model/hotel/type/hotel-with-search-term-groups';
import { fetchAndFilterHotels } from './model/hotel/fetch-and-filter-hotels';

const codeSandboxHost = getCodeSandboxHost(3001);
const apiUrl = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001';

function Root() {
  const [hotels, setHotels] = useState<HotelWithSearchTermGroups[]>();
  const [showClearBtn, setShowClearBtn] = useState(false);
  const abortRequestRef = useRef<undefined | ((reason: string) => void)>();

  const fetchData = async (searchTerm: string) => {
    if (searchTerm === '') {
      setHotels([]);
      setShowClearBtn(false);
      return;
    }

    if (abortRequestRef.current) {
      abortRequestRef.current('Request no longer needed');
    }

    const { abort, hotels: hotelsPromise } = fetchAndFilterHotels(searchTerm, apiUrl);

    abortRequestRef.current = abort;

    const hotels = await hotelsPromise;

    abortRequestRef.current = undefined;
    setShowClearBtn(true);
    setHotels(hotels);
  };

  return (
    <App
      hotels={hotels}
      showClearButton={showClearBtn}
      onSearch={fetchData}
    />
  );
}

export default Root;
