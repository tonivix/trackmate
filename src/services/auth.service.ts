import {Injectable} from '@angular/core';
import {userLogin, userLoggedOut} from '../data/actions/user.actions';
import {AngularFireAuth} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {State} from '../data/reducers';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private fAuth: AngularFireAuth,
                private store: Store<State>) {
    }

    public configureAuthentication() {
        this.fAuth.auth.onAuthStateChanged(userInfo => {
            if (userInfo) {
                const {uid, displayName, email} = userInfo;
                this.store.dispatch(userLogin({uid, email, displayName}));
            } else {
                this.store.dispatch(userLoggedOut());
            }
        });
    }
}
