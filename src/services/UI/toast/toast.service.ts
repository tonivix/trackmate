import {Injectable, OnDestroy} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {select, Store} from '@ngrx/store';
import * as fromAuth from '../../../data/reducers/user.reducer';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ToastService implements OnDestroy {

    constructor(public toastController: ToastController,
                private store: Store<fromAuth.User>) {
    }

    destroy$: Subject<boolean> = new Subject<boolean>();

    public initialize() {
        const currentUser$: Observable<fromAuth.User> = this.store.pipe(select(fromAuth.selectCurrentUser),
            takeUntil(this.destroy$));
        currentUser$.subscribe(user => this.presentToast(`${user.email} has logged in`));
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });

        await toast.present();
    }

    async presentToastWithOptions() {
        const toast = await this.toastController.create({
            header: 'Toast header',
            message: 'Click to Close',
            position: 'top',
            buttons: [
                {
                    side: 'start',
                    icon: 'star',
                    text: 'Favorite',
                    handler: () => {
                        console.log('Favorite clicked');
                    }
                }, {
                    text: 'Done',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        await toast.present();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}
