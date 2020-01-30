import {Action, createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    lastLocation: UserLocation;
}

export interface UserLocation {
    latitude: number;
    longitude: number;
}

export const initialState: User = {
    uid: '',
    email: '',
    displayName: '',
    lastLocation: {latitude: 1, longitude: 1}
};

const userReducer = createReducer(
    initialState,
    on(UserActions.userLoggedIn, (state: User, newState) => ({
        displayName: newState.displayName,
        email: newState.email,
        lastLocation: newState.lastLocation,
        uid: newState.uid
    })),
    on(UserActions.userLoggedOut, () => initialState)
);

export function reducer(state: User | undefined, action: Action) {
    return userReducer(state, action);
}

export const selectUser = createFeatureSelector<User>(userFeatureKey);

export const getCurrentUser = createSelector(selectUser, (state) => state);
