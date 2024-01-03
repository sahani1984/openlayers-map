import { Component } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { Map } from 'ol';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import Cluster from 'ol/source/Cluster.js'
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style.js';
import { Circle, Stroke, Fill, Text } from 'ol/style.js'
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { StadiaMaps } from 'ol/source';

const styleCache: any = {};
@Component({
  selector: 'app-cluster-sample-one',
  templateUrl: './cluster-sample-one.component.html',
  styles: [
  ]
})
export class ClusterSampleOneComponent {
  map!: Map;

  constructor(private commonservice: CommonService) { }

  ngOnInit(): void {
    this.commonservice.getIndiaCities().subscribe({
      next: (res: any) => {
        let data = res.map((d: any) => [Number(d.lng), Number(d.lat)]);
        this.initMap(data)
      }
    })

  }


  initMap(datalist: any): void {
    const features = datalist.map((coord: any) => {
      const feature = new Feature(new Point(coord).transform('EPSG:4326', 'EPSG:3857'));
      return feature;
    });

    const clusterSource = new Cluster({
      distance: 70,
      source: new VectorSource({
        features: features,
      })
    });

    const vectorLayer = new VectorLayer({
      source: clusterSource,
      style: getStyle as any,
    });
    
    const osmlayer = new TileLayer({
      source:  new OSM()
    })
    const stadialayer = new TileLayer({
      source: new StadiaMaps({layer:'stamen_watercolor'})
    })

    this.map = new Map({      
      layers: [osmlayer, vectorLayer],
      target: 'clusterSampleOne',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }

}


function getStyle(feature: any, resolution: any) {
  let size = feature.get('features').length;
  let style: any = styleCache[size];
  if (!style) {
    let color = size > 100 ? '255,0,0' : size > 50 ? '243,156,18' : size > 25 ? '125, 206,160' : size > 10 ? '0,150,0' : size > 0.99 ? '0,255,0' : '192,192,192';
    let radius: any = Math.max(8, Math.min(size * 0.75, 20));
    var dash: any = 2 * Math.PI * radius / 6;
    dash = [0, dash, dash, dash, dash, dash, dash];
    style = styleCache[size] = new Style({
      image: new Circle({
        radius: radius,
        stroke: new Stroke({
          color: "rgba(" + color + ",0.5)",
          width: 15,
          lineDash: dash,
          lineCap: "butt"
        }),
        fill: new Fill({
          color: "rgba(" + color + ",1)"
        })
      }),
      text: new Text({
        text: size.toString(),
        fill: new Fill({
          color: '#fff'
        })
      })
    });
  }
  return style;
}