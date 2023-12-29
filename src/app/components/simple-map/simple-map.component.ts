import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
@Component({
  selector: 'app-simple-map',
  templateUrl: './simple-map.component.html'
})
export class SimpleMapComponent implements OnInit {
 map:any;
   ngOnInit(): void {
     this.initmap();
   }

   initmap(){
    const tileslayers = getOsmLayer();

    this.map = new Map({
        target:"simpleMap",
        view: new View({
          center:[0,0],
          zoom:4
        })
      })
      this.map.addLayer(tileslayers);
   }
}


function getOsmLayer(){
  return new TileLayer({
    source:new OSM()
  })
}