import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Feature, Map, Overlay, View } from 'ol';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { OSM, StadiaMaps } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-marker.component.html',
  styles: [`
  .ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    // left: -101px;
    min-width: 180px;
  }
  
  .ol-popup:after,
  .ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  
  .ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48%;
    margin-left: -10px;
  }
  
  .ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48%;
    margin-left: -11px;
  }
  `]
})
export class MapMarkerComponent implements OnInit {
  map!: Map;
  pushPin!: Feature<Point>;
  overlay!: Overlay;

constructor(private http:HttpClient){}
  ngOnInit(): void {
    
    this.http.get<any>('assets/data/coordinates.json')
    .subscribe((data:any) => {
      this.initMap(data);
    });
   
  }

  initMap(datalist:any){
    const features = datalist.map((movement:any) => {
      const latitude = parseFloat(movement.Latitude);
      const longitude = parseFloat(movement.Longitude);
      if (!isNaN(latitude) && !isNaN(longitude)) {
        const feature = new Feature(new Point([longitude, latitude]).transform('EPSG:4326', 'EPSG:3857'));
        feature.set('Latitude', movement.Latitude);
        feature.set('Longitude', movement.Longitude);
        feature.set('Source', movement.Source);
        return feature;
      } else {
        console.warn('Invalid coordinates for movement:', movement);
        return null;
      }
    }).filter((feature:any) => feature !== null) as Feature<Point>[];

    this.pushPin = new Feature({geometry: new Point([0, 0])});

    // Style for the push pin
    const pushPinStyle = new Style({
      image: new Icon({
        src: './assets/images/marker.png',
        anchor: [5, 1],
      }),
    });

    this.pushPin.setStyle(pushPinStyle);

    // Create a vector source and layer for the push pin
    const vectorSource = new VectorSource({
      features: features,
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: this.createPinStyle  as unknown as Style | Style[],
    });

    this.map = new Map({
      layers:[
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      target:"mapMarker",
      view: new View({
        center:[0,0],
        zoom:4
      })
    })   
    
    this.overlay = new Overlay({
      element: document.getElementById('popup') as HTMLElement,
      positioning: 'bottom-center',
      stopEvent: false,
    });
    this.map.addOverlay(this.overlay);
    this.map.on('click', (event) => this.onMapClick(event));
  }

  createPinStyle = (feature: Feature): Style => {
    // console.log(feature.get('Source'))
    const iconStyle = new Icon({
      anchor: [0.5, 1],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      opacity: 1,
      scale: 1,
      src: './assets/images/marker.png'
    });

    return new Style({
      image: iconStyle,
    });
  };


  onMapClick(event: any) {
    const feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
    if (feature && feature !== this.pushPin) {
      const latitude = feature.get('Latitude');
      const longitude = feature.get('Longitude');
      const sourceDetails = feature.get('Source');

      // console.log(feature.Source);
      // Check if the clicked feature is not the fixed pushPin  
      const popupContent = document.getElementById('popup-content');
      if (popupContent) {
        popupContent.innerHTML = `<p>
        <p> Latitude : ${latitude}</p>
        <p> Longitude : ${longitude}</p>
        <p>Source : ${sourceDetails}</p>
        </p>`; // Add other details as needed
      }
      const geometry = feature.getGeometry();
      if (geometry instanceof Point) {
        const coordinate = geometry.getFlatCoordinates();
        this.overlay.setPosition(coordinate);
      }
    } else {
      // If it is the pushPin or no feature is clicked, hide the overlay
      this.overlay.setPosition(undefined);
    }
  }
}


