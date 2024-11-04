import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Cafe } from './cafe';

@Injectable({
  providedIn: 'root'
})
export class CafeService {

  private apiUrl: string = environment.baseUrl + '202212_MISW4104_Grupo3.json';

  constructor(private http: HttpClient) { }

  getCafes(): Observable<Cafe[]> {
    return this.http.get<Cafe[]>(this.apiUrl);
  }

}