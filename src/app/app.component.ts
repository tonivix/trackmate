import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AngularFireAuth} from '@angular/fire/auth';
import {Store} from '@ngrx/store';
import {State} from '../data/reducers';
import {userLoggedIn, userLoggedOut} from '../data/actions/user.actions';
import {ToastService} from '../services/UI/toast/toast.service';

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
        private store: Store<State>,
        private toasterService: ToastService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.InitAuth();
            this.toasterService.initialize();
        });
    }

    private InitAuth() {
        this.fAuth.auth.onAuthStateChanged(userInfo => {
            if (userInfo) {
                const {uid, displayName, email} = userInfo;
                this.store.dispatch(userLoggedIn({uid, email, displayName}));
            } else {
                this.store.dispatch(userLoggedOut());
            }
        });
    }
}
