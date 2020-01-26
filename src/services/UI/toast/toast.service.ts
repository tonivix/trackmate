import {Injectable, OnDestroy} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToastService implements OnDestroy {

    constructor(private toastController: ToastController) {
    }

    destroy$: Subject<boolean> = new Subject<boolean>();

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
