import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

export const userFeatureKey = 'user';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    lastLocation: GeoPoint;
}

export const initialState: User = {
    uid: '',
    email: '',
    displayName: '',
    lastLocation: new GeoPoint(1, 1)
};

const userReducer = createReducer(
    initialState,
    on(UserActions.userLoaded, (state: User, newState) => (newState)),
    on(UserActions.userLoggedOut, () => initialState)
);

export function reducer(state: User | undefined, action: Action) {
    return userReducer(state, action);
}

export const selectUser = createFeatureSelector<User>(userFeatureKey);

export const selectCurrentUser = createSelector(selectUser, (state) => state);
