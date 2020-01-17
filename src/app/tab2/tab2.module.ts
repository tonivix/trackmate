import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab2Page} from './tab2.page';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MapComponent} from '../map/map.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: Tab2Page}]),
        LeafletModule.forRoot(),
    ],
    declarations: [Tab2Page, MapComponent]
})
export class Tab2PageModule {
}
