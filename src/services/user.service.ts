import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
// @ts-ignore
import GeoPoint = firebase.firestore.GeoPoint;

export interface User {
    uid: string;
    email: string;
    displayName: string;
    lastLocation: GeoPoint;
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

/*    public async InsertUser(id: string, user: User) {
        try {
            this.db.collection('cities').doc(id).set(user);
        } catch (e) {
            console.error(e);
        }
    }*/
}
