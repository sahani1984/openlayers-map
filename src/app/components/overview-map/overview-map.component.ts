import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import { OverviewMap, ZoomSlider, defaults as defaultControls } from 'ol/control';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { constants } from 'src/app/shared/constant';

@Component({
  selector: 'app-overview-map',
  templateUrl: './overview-map.component.html',
  styleUrls: ['./overview-map.component.scss']
})
export class OverviewMapComponent implements OnInit {
map:any;
  activeMapType: string ="overviewMap";
 ngOnInit(): void {
    this.initMap();
 }

  initMap(){
    const overviewMap = new OverviewMap({
      layers: [new TileLayer({source: new OSM()})]
    })
    const customOverviewMap = new OverviewMap({
      className:"ol-overviewmap ol-custom-overviewmap",
      layers:[
        new TileLayer({
          source:new OSM({
            url: "https://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey="+ constants.key
          })
        })
      ],
      collapseLabel:"\u00BB",
      label:"\u00AB",
      collapsed:false
    })
    const zoomslider = new ZoomSlider()
      this.map = new Map({
        controls: defaultControls().extend([zoomslider, customOverviewMap]),
        layers: [
          new TileLayer({
            source: new OSM()
        })
      ],
        target:"overviewMap",
        view: new View({
          center:[0,0],
          zoom:4,
          rotation: -Math.PI/8
        })
      })
  }

  setActiveMap(params:any){
    

    this.activeMapType = params;
  }
}
