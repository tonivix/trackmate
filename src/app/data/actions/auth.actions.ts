import {createAction, props} from '@ngrx/store';
import {User} from '../reducers/auth.reducer';

export const userLoggedIn = createAction('[Auth] User Logged In', props<User>());
export const userLoggedOut = createAction('[Auth] User Logged Out');
