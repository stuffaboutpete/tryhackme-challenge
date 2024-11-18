import { Action, Payload } from './action';

export type Dispatch = <A extends Action>(action: A, payload: Payload<A>) => void;
