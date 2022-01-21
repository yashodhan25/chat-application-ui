import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiserverurl } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GetallService {

  constructor( private http:HttpClient  ) { }

  getall():Observable<any>{
    return this.http.get(`${apiserverurl}getAll/`);
  }

}