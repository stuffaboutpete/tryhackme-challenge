import { useState } from 'react';
import { getCodeSandboxHost } from "@codesandbox/utils";
import App from './component/app';
import { Hotel } from './model/hotel/type/hotel';
import { fetchAndFilterHotels } from './model/hotel/fetch-and-filter-hotels';

const codeSandboxHost = getCodeSandboxHost(3001);
const apiUrl = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001';

function Root() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showClearBtn, setShowClearBtn] = useState(false);

  const fetchData = async (searchTerm: string) => {
    if (searchTerm === '') {
      setHotels([]);
      setShowClearBtn(false);
      return;
    }

    const filteredHotels = await fetchAndFilterHotels(searchTerm, apiUrl);
    setShowClearBtn(true);
    setHotels(filteredHotels);
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
