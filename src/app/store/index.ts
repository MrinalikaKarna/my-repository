import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IAppState } from '../model/app.model';
import { AppReducer } from './app.reducer';

export const reducers: ActionReducerMap<IAppState> = { AppState: AppReducer };
export const metaReducers: MetaReducer<IAppState>[] = [];
