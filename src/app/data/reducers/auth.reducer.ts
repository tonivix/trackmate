import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import GeoPoint = firebase.firestore.GeoPoint;

export const authFeatureKey = 'auth';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    lastLocation: GeoPoint;
}

export const initialState: User = {uid: null, email: null, displayName: null, lastLocation: null};

const authReducer = createReducer(
    initialState,
    on(AuthActions.userLoggedIn, (state, newState) => (newState)),
    on(AuthActions.userLoggedOut, () => ({uid: null, email: null, displayName: null}))
);

export function reducer(state: User | undefined, action: Action) {
    return authReducer(state, action);
}

export const selectAuth = createFeatureSelector<User>(authFeatureKey);

export const selectCurrentUser = createSelector(selectAuth, (state) => state);
