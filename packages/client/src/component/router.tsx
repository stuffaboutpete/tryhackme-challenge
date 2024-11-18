import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import type { Router } from '@remix-run/router';
import { State } from '../model/state/type/state';
import { Dispatch } from '../model/state/type/dispatch';
import ErrorMessage from './error-message';
import PageSearch from './page-search';
import PageSingleEntity from './page-single-entity';
import WithId from './with-id';

interface Props {
  state: State;
  dispatch: Dispatch;
}

function Router(props: Props) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PageSearch
          searchTerm={props.state.searchTerm}
          hotels={props.state.searchResults?.hotels }
          countries={props.state.searchResults?.countries}
          cities={props.state.searchResults?.cities}
          searchActive={props.state.searchRequestActive ? true : false}
          showClearButton={props.state.searchResults ? true : false}
          onSearch={searchTerm => props.dispatch('SEARCH_TERM_CHANGE', searchTerm)}
          onClearResults={() => props.dispatch('CLEAR_SEARCH_RESULTS', undefined)}
        />
      ),
      errorElement: <ErrorMessage />
    },
    {
      path: '/hotels/:id',
      loader: async ({ params }) => params.id,
      element: <WithId render={id => (
        <PageSingleEntity type="Hotel" id={id} />
      )} />
    },
    {
      path: '/countries/:id',
      loader: async ({ params }) => params.id,
      element: <WithId render={id => (
        <PageSingleEntity type="Country" id={id} />
      )} />
    },
    {
      path: '/cities/:id',
      loader: async ({ params }) => params.id,
      element: <WithId render={id => (
        <PageSingleEntity type="City" id={id} />
      )} />
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
