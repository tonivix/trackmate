import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {User} from '../data/reducers/user.reducer';

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
