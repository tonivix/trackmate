import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private fAuth: AngularFireAuth,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.InitAuth();
        });
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
