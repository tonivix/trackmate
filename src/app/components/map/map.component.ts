import {Component, OnDestroy} from '@angular/core';
import {latLng, marker, tileLayer, Map, LeafletMouseEvent, Marker, LatLngExpression} from 'leaflet';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {User} from '../../../data/reducers/user.reducer';
import {takeUntil} from 'rxjs/operators';
import {UserFacade} from '../../../data/facade/user.facade';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy {

    map: Map;
    marker: Marker = marker(latLng(0, 0));
    userObservable: Observable<User>;
    user: User;
    initialLatLng: LatLngExpression;

    options = {
        layers: [
            tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
            }),
        ],
        zoom: 10,
        center: latLng(46.879966, -121.726909)
    };

    layers = [
        this.marker
    ];

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private store: Store<User>,
                private userFacade: UserFacade,
    ) {
        userFacade.getCurrentUser()
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
                this.initialLatLng = latLng(user.lastLocation.latitude, user.lastLocation.longitude);
                this.user = user;
                if (this.map) {
                    this.setInitialMapLocation();
                }
            });
    }

    setInitialMapLocation() {
        this.map.panTo(this.initialLatLng);
        this.marker.setLatLng(this.initialLatLng);
    }

    onMapReady(map: Map) {
        this.map = map;

        this.setInitialMapLocation();
    }

    mapClick(e: LeafletMouseEvent): void {
        this.userFacade.updateCurrentUserLocation({latitude: e.latlng.lat, longitude: e.latlng.lng});
    }

    centerMap() {
        navigator.geolocation.getCurrentPosition(position => {
            const latlng = latLng(position.coords.latitude, position.coords.longitude);
            this.map.setView(latlng, 18);
            this.marker.setLatLng(latlng);
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
    }

    /*    ngAfterViewInit(): void {
            //this.initMap();
        }

        initMap(): void {
            this.map = new Map('map').setView([33.6396965, -84.4304574], 23);

            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            navigator.geolocation.getCurrentPosition(position => {
                this.map.setView(latLng(position.coords.latitude, position.coords.longitude), 15);
            });
        }*/
}
