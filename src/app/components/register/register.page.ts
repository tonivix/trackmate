import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {select, Store} from '@ngrx/store';
import * as fromUser from '../../../data/reducers/user.reducer';
import {Observable} from 'rxjs';
import {auth} from 'firebase';

export class User {
    email: string;
    password: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

    public user: User = new User();

    public currentUser$: Observable<fromUser.User>;

    constructor(private navCtrl: NavController,
                private fAuth: AngularFireAuth,
                private store: Store<fromUser.User>) {
        this.currentUser$ = this.store.pipe(select(fromUser.selectCurrentUser));
    }

    async register() {
        try {
            const r = await this.fAuth.auth.createUserWithEmailAndPassword(
                this.user.email,
                this.user.password
            );
            if (r) {
                console.log('Successfully registered!');
                // this.navCtrl.setRoot('LoginPage');
            }

        } catch (err) {
            console.error(err);
        }
    }

    async logout() {
        await this.fAuth.auth.signOut();
        console.log('Successfully logged out!');
    }

    async login() {
        try {
            const r = await this.fAuth.auth.signInWithEmailAndPassword(
                this.user.email,
                this.user.password
            );
            if (r) {
                console.log('Successfully logged in!');
            }

        } catch (err) {
            console.error(err);
        }
    }

    async google() {
        await this.fAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    async facebook() {
        await this.fAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }
}
