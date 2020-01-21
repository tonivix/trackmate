import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    constructor(public fAuth: AngularFireAuth) {
        this.InitAuth();
    }

    private InitAuth() {
        this.fAuth.auth.onAuthStateChanged(userInfo => {
            if (userInfo) {
                console.log(userInfo.toJSON());
            } else {
                console.log(`User ${userInfo.email} has logged out`);
            }
        });
    }
}
