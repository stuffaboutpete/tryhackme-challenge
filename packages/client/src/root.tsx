import { getCodeSandboxHost } from "@codesandbox/utils";
import { useEffect, useRef, useState } from 'react';
import { Dispatch } from './model/state/type/dispatch';
import { initialState } from './model/state/data/initial-state';
import { reduce } from './model/state/reduce';
import { respond } from './model/state/respond';
import Router from './component/router';

const codeSandboxHost = getCodeSandboxHost(3001);
const apiUrl = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001';

function Root() {
  const [state, setState] = useState(initialState);
  const latestState = useRef(state);

  useEffect(() => dispatch('INIT', undefined), []);

  const dispatch: Dispatch = (action, payload) => {
    const newState = reduce(latestState.current, action, payload);
    const oldState = latestState;
    setState(newState);
    latestState.current = newState;
    respond(action, oldState.current, newState, dispatch, { apiUrl, path: window.location.pathname });
  };

  return (
    <Router
      state={state}
      dispatch={dispatch}
    />
  );
}

export default Root;
