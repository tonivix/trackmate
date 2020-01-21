import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../data/reducers/auth.reducer';
import {Observable} from 'rxjs';

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

    public auth$: Observable<fromAuth.State> = this.store.pipe(select(fromAuth.selectCurrentUser));

    constructor(private navCtrl: NavController,
                private fAuth: AngularFireAuth,
                private store: Store<fromAuth.State>) {
        this.auth$.subscribe(auth => console.log(auth));
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
}
