import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [``]
})
export class AppComponent {
  title = 'openlayers-maps';
  showmenu:boolean=false;
  constructor(private router:Router){
    this.router.events.pipe(filter((e:any)=> e instanceof NavigationEnd))
    .subscribe((res:any)=> this.showmenu = false);
  }
}
