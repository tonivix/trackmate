import {AfterViewInit, Component} from '@angular/core';
import {latLng, marker, tileLayer, Map, LeafletMouseEvent, Marker} from 'leaflet';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

    map: Map;
    marker: Marker = marker(latLng(0, 0));

    options = {
        layers: [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

    constructor() {
    }

    onMapReady(map: Map) {
        this.map = map;

        navigator.geolocation.getCurrentPosition(position => {
            map.setView(latLng(position.coords.latitude, position.coords.longitude), 15);
        });
    }

    ngAfterViewInit(): void {
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
    }

    private mapClick(e: LeafletMouseEvent): void {
        this.marker.setLatLng(e.latlng);
    }

    centerMap() {
        navigator.geolocation.getCurrentPosition(position => {
            const latlng = latLng(position.coords.latitude, position.coords.longitude);
            this.map.setView(latlng, 18);
            this.marker.setLatLng(latlng);
        });
    }
}
