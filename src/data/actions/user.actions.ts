import {createAction, props} from '@ngrx/store';
import {User} from '../../services/user.service';

export interface UserLoggedInPayload {
    uid: string;
    email: string;
    displayName: string;
}
export const userLoggedIn = createAction('[Auth] User Logged In', props<UserLoggedInPayload>());
export const userLoaded = createAction('[Auth] User Data Loaded from Db', props<User>());
export const userLoggedOut = createAction('[Auth] User Logged Out');
