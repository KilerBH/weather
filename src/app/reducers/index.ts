import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { cities, citiesReducer, ICitiesState } from './app.reducer';

export interface State {
  [cities]: ICitiesState;
}

export const reducers: ActionReducerMap<State> = {
  [cities]: citiesReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
