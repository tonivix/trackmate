import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectCurrentUser, User} from '../reducers/user.reducer';
import {Observable} from 'rxjs';
import {UserLocationPayload, userLocationUpdate} from '../actions/user.actions';

@Injectable({
    providedIn: 'root'
})
export class UserFacade {

    constructor(private store: Store<User>
    ) {
    }

    public getCurrentUser(): Observable<User> {
        return this.store.pipe(select(selectCurrentUser));
    }

    public updateCurrentUserLocation(userLocation: UserLocationPayload) {
        this.store.dispatch(userLocationUpdate(userLocation));
    }
}
