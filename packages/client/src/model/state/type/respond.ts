import { Action } from './action';
import { Dispatch } from './dispatch';
import { State } from './state';

export type Respond = (action: Action, oldState: State, newState: State, dispatch: Dispatch, context: Record<string, unknown>) => void;
