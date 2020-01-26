import {
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import {environment} from '../../../environments/environment';

export interface State {
    auth: fromAuth.User;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
