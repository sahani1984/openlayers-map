import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SimpleMapComponent } from './components/simple-map/simple-map.component';
import { WmsLayerComponent } from './components/wms-layer/wms-layer.component';
import { MapControlsComponent } from './components/map-controls/map-controls.component';
import { OverviewMapComponent } from './components/overview-map/overview-map.component';
import { MapIconsComponent } from './components/map-icons/map-icons.component';
import { ClusterMapComponent } from './components/cluster-map/cluster-map.component';

const routes: Routes = [
  {path:"", redirectTo:"/simple-map", pathMatch:"full"},
  {path:"simple-map", component:SimpleMapComponent },
  {path:"map-controls", component:MapControlsComponent},
  {path:"overview-map", component:OverviewMapComponent},
  {path:"map-icons", component:MapIconsComponent},
  {path:"wms-layer", component:SimpleMapComponent},
  {path:"cluster-map", component:ClusterMapComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SimpleMapComponent,
    WmsLayerComponent,
    MapControlsComponent,
    OverviewMapComponent,
    MapIconsComponent,
    ClusterMapComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
