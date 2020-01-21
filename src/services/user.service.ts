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
        try {
            const doc = this.db.doc<User>(`users/${id}`);
            return doc.valueChanges();
        } catch (e) {
            console.error(e);
        }
    }

    public GetUsers(): Observable<User[]> {
        try {
            const collection = this.db.collection<User>(`users`);
            return collection.valueChanges();
        } catch (e) {
            console.error(e);
        }
    }

    public async UpdateUser(id: string, user: User) {
        try {
            const doc = this.db.doc<User>(`users/${id}`);
            await doc.update(user);
        } catch (err) {
            console.error(err);
        }
    }
}
