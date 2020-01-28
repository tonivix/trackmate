import {createAction, props} from '@ngrx/store';
import {User} from '../reducers/user.reducer';

export interface UserAuthUpdated {
    uid: string;
    email: string;
    displayName: string;
}

export interface UserLocationPayload {
    latitude: number;
    longitude: number;
}

export const userLogin = createAction('[User] User Logged In', props<UserAuthUpdated>());
export const userLoggedIn = createAction('[User] User Data Loaded from Db', props<User>());
export const userLocationUpdate = createAction('[User] User Location Update', props<UserLocationPayload>());
export const userLoggedOut = createAction('[User] User Logged Out');
