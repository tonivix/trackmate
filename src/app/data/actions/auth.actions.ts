import {createAction, props} from '@ngrx/store';
import {State} from '../reducers/auth.reducer';

export const userLoggedIn = createAction('[Auth] User Logged In', props<State>());
export const userLoggedOut = createAction('[Auth] User Logged Out');
