import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM, StadiaMaps } from 'ol/source';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styles: [
  ]
})
export class MapMarkerComponent implements OnInit {
map:any;

  ngOnInit(): void {
    this.initMap();
  }

  initMap(){
    this.map = new Map({
      layers:[
        new TileLayer({
          source: new StadiaMaps({
            layer:'stamen_watercolor'
          })
        })
      ],
      target:"mapMarker",
      view: new View({
        center:[0,0],
        zoom:4
      })
    })
  }
}


