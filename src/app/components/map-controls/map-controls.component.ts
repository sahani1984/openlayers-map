import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import MousePosition from 'ol/control/MousePosition.js';
import { createStringXY } from 'ol/coordinate.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import {FullScreen, Rotate, ScaleLine, ZoomSlider, defaults as defaultControls} from 'ol/control.js';
import {DragRotateAndZoom, defaults as defaultInteractions} from 'ol/interaction.js'
import XYZ from 'ol/source/XYZ.js';
@Component({
  selector: 'app-map-controls',
  templateUrl: './map-controls.component.html',
  styles: []
})
export class MapControlsComponent implements OnInit {
map:any;

  ngOnInit(): void {
    this.initMap();
  }

  initMap(){
    let key = "dTKwduLkblI5kmUlEh8d"
    const osmlayer = new TileLayer({source: new OSM()});
    const xyzlayer  =  new TileLayer({
      source: new XYZ({
        url:"https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=" + key,
        maxZoom:20
      })
    })
    const mousePos = new MousePosition({
      coordinateFormat: createStringXY(2),
      projection:"EPSG:4326",
      className:'custom_mouse_position' 
    })
    const scaleLine = new ScaleLine({bar:true,text:true})
    const fullscreen = new FullScreen();
    const zoomslider = new ZoomSlider()
   

    // mousePos.setProjection('EPSG:4326');
    
      this.map = new Map({
        controls:defaultControls().extend([mousePos, scaleLine, fullscreen, zoomslider]),
        interactions:defaultInteractions().extend([new DragRotateAndZoom()]),
        layers:[xyzlayer],
        target:"mapControl",
        view: new View({
          center: [-33519607, 5616436],
          zoom:4,
          rotation: -Math.PI / 8
        })       
      })
  }

 
}
