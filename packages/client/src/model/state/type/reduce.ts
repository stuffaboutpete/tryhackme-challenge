import { Action, Payload } from './action';
import { State } from './state';

export type Reduce = <A extends Action>(currentState: State, action: A, payload: Payload<A>) => State;
