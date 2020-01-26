import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {userLoaded, userLocationUpdate, userLoggedIn} from '../actions/user.actions';
import {map, switchMap, tap} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {select, Store} from '@ngrx/store';
import * as fromUser from '../reducers/user.reducer';
import {selectCurrentUser} from '../reducers/user.reducer';
import {ToastService} from '../../services/UI/toast/toast.service';
import GeoPoint = firebase.firestore.GeoPoint;
import * as firebase from 'firebase';

@Injectable()
export class UserEffects {

    userLoggedIn$ = createEffect(() => this.actions$.pipe(
        ofType(userLoggedIn),
        switchMap(action => this.userService.GetUserById(action.uid)
            .pipe(
                tap(user => this.toastService.presentToast(`User logged in: ${user.email}`)),
                map(user => userLoaded({
                    displayName: user.displayName,
                    uid: user.uid,
                    email: user.email,
                    lastLocation: { latitude: user.lastLocation.latitude, longitude: user.lastLocation.longitude}
                })) // todo: Ajustar Store / DB pois há conflitos
            ))
    ));

    userLocationUpdate$ = createEffect(() => this.actions$.pipe(
        ofType(userLocationUpdate),
        switchMap(location => this.store.pipe(select(selectCurrentUser))
            .pipe(
                tap(currentUser => this.userService.UpdateUser(currentUser.uid, ({
                    ...currentUser,
                    lastLocation: new GeoPoint(location.latitude, location.longitude)
                })))
            ))
    ), {dispatch: false});

    constructor(private toastService: ToastService,
                private actions$: Actions,
                private userService: UserService,
                private store: Store<fromUser.User>) {
    }

}
