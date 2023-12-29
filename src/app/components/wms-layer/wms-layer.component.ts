import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS.js';
import MousePosition from 'ol/control/MousePosition.js';
import { createStringXY } from 'ol/coordinate';

@Component({
  selector: 'app-wms-layer',
  templateUrl: './wms-layer.component.html',
  styles: ['']
})
export class WmsLayerComponent implements OnInit {
  map:any;
  ngOnInit(): void {
      this.initMap();
  }

  initMap(){
    const wmslayers = getWmslayer();
    this.map = new Map({
      layers: [
        new TileLayer({
        source: new OSM()
      })
    ],
      target:"wmsMap",
      view:new View({
        center:[-10997148, 4569099],
        zoom:4
      })    
    })
    this.map.addLayer(wmslayers);
  }
}


function getWmslayer(){
  return new TileLayer({
    extent:[-13884991, 2870341, -7455066, 6338219],
    source: new TileWMS({
      url:"https://ahocevar.com/geoserver/wms",
      params:{'LAYERS':'topp:states', 'TILED':true},
      serverType:'geoserver',
      transition:0
    })
  })
}