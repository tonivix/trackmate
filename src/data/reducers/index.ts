import {
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
import * as fromUser from './user.reducer';
import {environment} from '../../environments/environment';

export interface State {
    user: fromUser.User;
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
