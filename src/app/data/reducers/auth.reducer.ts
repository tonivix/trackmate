import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
    uid: string;
    email: string;
    displayName: string;
}

export const initialState: State = {uid: null, email: null, displayName: null};

const authReducer = createReducer(
    initialState,
    on(AuthActions.userLoggedIn, (state, newState) => (newState)),
    on(AuthActions.userLoggedOut, () => ({uid: null, email: null, displayName: null}))
);

export function reducer(state: State | undefined, action: Action) {
    return authReducer(state, action);
}

export const selectAuth = createFeatureSelector<State>(authFeatureKey);

export const selectCurrentUser = createSelector(selectAuth, (state) => state);
