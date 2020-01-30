import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {getCurrentUser, User} from '../reducers/user.reducer';
import {Observable} from 'rxjs';
import {UserLocationPayload, updateCurrentUserLocation} from '../actions/user.actions';

@Injectable({
    providedIn: 'root'
})
export class UserFacade {

    constructor(private store: Store<User>
    ) {
    }

    public getCurrentUser(): Observable<User> {
        return this.store.pipe(select(getCurrentUser));
    }

    public updateCurrentUserLocation(userLocation: UserLocationPayload) {
        this.store.dispatch(updateCurrentUserLocation(userLocation));
    }
}
