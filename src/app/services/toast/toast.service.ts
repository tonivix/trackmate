import {Injectable, OnDestroy} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {UserFacade} from '../../../data/facade/user.facade';

@Injectable({
    providedIn: 'root'
})
export class ToastService implements OnDestroy {

    constructor(private toastController: ToastController,
                private userFacade: UserFacade) {
    }

    destroy$: Subject<boolean> = new Subject<boolean>();

    public setupSubscriptions() {
        this.userFacade.getCurrentUser().pipe(
            takeUntil(this.destroy$),
        ).subscribe(user => {
                if (user && user.uid) {
                    this.presentToast(`User logged in: ${user.email}`);
                } else {
                    this.presentToast(`User logged off`);
                }
            }
        );
    }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });

        await toast.present();
    }

    /*
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
    */

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }
}
