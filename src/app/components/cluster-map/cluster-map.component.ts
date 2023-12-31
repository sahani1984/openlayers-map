import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import * as ol from 'ol';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import Cluster from 'ol/source/Cluster.js'
import {Vector} from 'ol/source.js';
import Style from 'ol/style/Style.js';
import { Circle, Stroke, Fill, Text} from 'ol/style.js'

const styleCache: any = {};

@Component({
  selector: 'app-cluster-map',
  templateUrl: './cluster-map.component.html',
  styles: [
  ]
})
export class ClusterMapComponent implements OnInit {
 map:any;
  ngOnInit(): void {
    this.initMap();
  }

  initMap(){
    const osmlayer = new TileLayer({
      source: new OSM()
    })

    // const clusterSource = new Cluster({
    //   distance:75,
    //   source: new Vector()
    // })
    // const clusterlayer = new AnimatedCluster({  
    //   source: clusterSource,
    //   animationDuration: 1000,
    //   style: getStyle
    // })

    this.map = new Map({
      layers: [osmlayer],
      target:"clusterMap",
        view: new View({
          center:[0,0],
          zoom:4
        })
    })
    // this.map.addLayer(clusterlayer);
  }



}


// function getStyle(feature:any, resolution:any){
// let size = feature.get('features').length;
//   let style:any = styleCache[size];
//   if(!style){
//     let color = size > 100?'255,0,0':size>50?'243,156,18':size>25?'125, 206,160':size>10?'0,150,0':size>0.99?'0,255,0':'192,192,192';
//     let radius:any = Math.max(8, Math.min(size*0.75, 20));
//     var dash:any = 2 * Math.PI * radius / 6;
//         dash = [0, dash, dash, dash, dash, dash, dash];
//         style = styleCache[size] = new Style({
//           image: new Circle({
//             radius: radius,
//             stroke: new Stroke({
//               color: "rgba(" + color + ",0.5)",
//               width: 15,
//               lineDash: dash,
//               lineCap: "butt"
//             }),
//             fill: new Fill({
//               color: "rgba(" + color + ",1)"
//             })
//           }),
//           text: new Text({
//             text: size.toString(),         
//             fill: new Fill({
//               color: '#fff'
//             })
//           })
//         });
//   }
//   return style;
// }