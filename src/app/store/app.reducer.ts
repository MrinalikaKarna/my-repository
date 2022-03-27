import { createReducer, on, Action } from '@ngrx/store';
import { initialAppState, IAppState, User } from '../model/app.model';
import { submitted } from './app.actions';

export const userFeatureKey = 'AppState';

export const reducer = createReducer(
  initialAppState,
  on(submitted, (state, { userData }) => ({
    ...state,
    UserData: [...state.UserData, userData],
  }))
);

export function AppReducer(state = initialAppState, action: Action) {
  return reducer(state as { UserData: User[] }, action as Action);
}

export const selectState = (state: IAppState) => state;
