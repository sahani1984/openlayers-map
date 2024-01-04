import { Component, OnInit } from '@angular/core';

import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import LayerTile from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { BingMaps, OSM, StadiaMaps, XYZ } from 'ol/source';
import LayerSwitcher from 'ol-layerswitcher';
import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';
import LayerGroup from 'ol/layer/Group';
import SourceOSM from 'ol/source/OSM';
import { constants } from 'src/app/shared/constant';
@Component({
  selector: 'app-layer-switcher',
  templateUrl: './layer-switcher.component.html',
  styleUrls:['./layer-switcher.component.scss']
})
export class LayerSwitcherComponent implements OnInit {
  map!: Map;

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {    
    const osmlayer = new TileLayer({
      title:"OSMLayer",
      source: new OSM(),
      visible:true
    } as BaseLayerOptions);

    const stadiamap = new TileLayer({
      title:"StadiaMap",
      source: new StadiaMaps({ layer: "stamen_toner" }),
      visible:false
    } as BaseLayerOptions);

    const osmHumaniterian = new TileLayer({
    title:"OSMHumaniterian",
     source: new OSM({
      url:"https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
     }),
     visible:false
    } as BaseLayerOptions);

    const xyzstamen = new TileLayer({
      title:"XYZStamen",
      source: new XYZ({
        url:"https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=dTKwduLkblI5kmUlEh8d",
        maxZoom:20
      }),
      visible:false
    } as BaseLayerOptions);

    const stadiamapwatercolor = new TileLayer({
      title:"StadiaMapWatercolor",
      source: new StadiaMaps({layer:"stamen_watercolor"}),
      visible:false
    } as BaseLayerOptions);

    //'RoadOnDemand','Aerial','AerialWithLabelsOnDemand','CanvasDark','OrdnanceSurvey',
    const wingmap = new TileLayer({
      title:"WingMap",
      source:new BingMaps({
        key:constants.arcGisKey,
        imagerySet:'RoadOnDemand'
      }),
      visible:false
    } as BaseLayerOptions)

    const layergroup = new LayerGroup({
      layers: [osmlayer, stadiamap, osmHumaniterian, xyzstamen, stadiamapwatercolor]
    } as GroupLayerOptions);
    

    this.map = new Map({
      layers: [layergroup],
      target: "layerSwither",
      view: new View({
        center: fromLonLat([78.9629, 20.5937]),
        zoom: 4.5,
        rotation: -Math.PI / 8
      })

    })

   
    /*LAYER SWICHER LOGIC*/
    const layerElements = document.querySelectorAll('.sidebar li input[type="radio"]');
       layerElements.forEach((el:any)=>{
        el.addEventListener('change', (e:any)=>{
          const layerElementValue = e.target.value;
          layergroup.getLayers().forEach((element:any, index:any, array:any)=>{
              const layerTitle = element.get('title');
              element.setVisible(layerTitle===layerElementValue);
          })
        })
       })
  
    

  }
}
