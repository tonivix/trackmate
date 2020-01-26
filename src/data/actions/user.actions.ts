import {createAction, props} from '@ngrx/store';
import {User} from '../reducers/user.reducer';

export interface UserLoggedInPayload {
    uid: string;
    email: string;
    displayName: string;
}

export interface UserLocationPayload {
    latitude: number;
    longitude: number;
}

export const userLoggedIn = createAction('[User] User Logged In', props<UserLoggedInPayload>());
export const userLoaded = createAction('[User] User Data Loaded from Db', props<User>());
export const userLocationUpdate = createAction('[User] User Location Update', props<UserLocationPayload>());
export const userLoggedOut = createAction('[User] User Logged Out');
