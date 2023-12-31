import { Component, OnInit } from '@angular/core';
import { Feature, Map, View } from 'ol';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import OGCMapTile from 'ol/source/OGCMapTile';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

@Component({
  selector: 'app-map-icons',
  templateUrl: './map-icons.component.html',
  styles: []
})
export class MapIconsComponent implements OnInit {
map:any;

  ngOnInit(): void {
    this.initMap();
  }

  initMap(){
    const osmlayer = new TileLayer({source: new OSM()});
    const vectorfeature = new Feature({
      geometry: new Point([0, 0]),
      name: "Unkown Island",
      population: 4000,
      rainfall: 500
    })
    const iconstyle = new Style({
      image: new Icon({
        anchor:[0.5,46],
        anchorXUnits:'fraction',
        anchorYUnits:'pixels',
        src:"./assets/images/marker.png"
      })
    })
    vectorfeature.setStyle(iconstyle);
    const vectorlayer = new VectorLayer({
      source: new VectorSource({
        features: [vectorfeature]
      })
    })
    const rasterlayer = new TileLayer({
      source: new OGCMapTile({
        url:"https://maps.gnosis.earth/ogcapi/collections/NaturalEarth:raster:HYP_HR_SR_OB_DR/map/tiles/WebMercatorQuad",
        crossOrigin:""
      })
    })
    this.map = new Map({
    layers: [osmlayer, rasterlayer, vectorlayer],
    target:"mapIcons",
    view: new View({
      center:[80.60,27.55],
      zoom:3,
      rotation: -Math.PI/8
    })
    })
  }
}
