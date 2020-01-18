import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import Timestamp = firebase.firestore.Timestamp;
import GeoPoint = firebase.firestore.GeoPoint;
// noinspection ES6UnusedImports
import * as firebase from 'firebase';

export interface User {
    name: string;
    lastLocation: GeoPoint;
    birthday: Timestamp;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private db: AngularFirestore) {
    }

    public GetUserById(id: string): Observable<User> {
        const doc = this.db.doc<User>(`users/${id}`);
        return doc.valueChanges();
    }

    public GetUsers(): Observable<User[]> {
        const collection = this.db.collection<User>(`users`);
        return collection.valueChanges();
    }

    public UpdateUser(id: string, user: User) {
        const doc = this.db.doc<User>(`users/${id}`);
        doc.update(user);
    }
}
