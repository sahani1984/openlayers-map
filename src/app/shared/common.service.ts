import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }

  getIndiaCities():Observable<any>{
    return this.http.get<any>('./assets/data/india_cities_population.json');
  }
}
