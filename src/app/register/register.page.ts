import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AngularFireAuth} from '@angular/fire/auth';

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

    constructor(public navCtrl: NavController, public fAuth: AngularFireAuth) {
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
