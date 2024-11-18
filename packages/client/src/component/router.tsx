import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import type { Router } from '@remix-run/router';
import { City } from '../model/entities/type/city';
import { Country } from '../model/entities/type/country';
import { Hotel } from '../model/entities/type/hotel';
import { SearchResult } from '../model/search/type/search-result';
import ErrorMessage from './error-message';
import PageSearch from './page-search';
import PageSingleEntity from './page-single-entity';

interface Props {
  searchTerm: string;
  hotels?: SearchResult<Hotel>[];
  countries?: SearchResult<Country>[];
  cities?: SearchResult<City>[];
  showClearSearchButton: boolean;
  onSearch: (searchTerm: string) => void;
  onClearSearchResults: () => void;
}

function Router(props: Props) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PageSearch
          searchTerm={props.searchTerm}
          hotels={props.hotels}
          countries={props.countries}
          cities={props.cities}
          showClearButton={props.showClearSearchButton}
          onSearch={props.onSearch}
          onClearResults={props.onClearSearchResults}
        />
      ),
      errorElement: <ErrorMessage />
    },
    {
      path: '/temp',
      element: (
        <PageSingleEntity name="Temp" />
      )
    }
  ],
  {
    // Please not this is to disable console spam.
    // https://github.com/remix-run/react-router/issues/12245
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true
    }
  });

  return (
    <RouterProvider
      router={router}
      // Also to disable console spam
      future={{ v7_startTransition: true }}
    />
  );
}

export default Router;
