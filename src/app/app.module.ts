import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SimpleMapComponent } from './components/simple-map/simple-map.component';
import { WmsLayerComponent } from './components/wms-layer/wms-layer.component';
import { MapControlsComponent } from './components/map-controls/map-controls.component';

const routes: Routes = [
  {path:"", redirectTo:"/simple-map", pathMatch:"full"},
  {path:"simple-map", component:SimpleMapComponent },
  {path:"map-controls", component:MapControlsComponent},
  {path:"wms-layer", component:SimpleMapComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SimpleMapComponent,
    WmsLayerComponent,
    MapControlsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
