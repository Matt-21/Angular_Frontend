import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISuporte } from '../Interfaces/i-suporte';
import { API_PATH } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuporteService {

  constructor(private httpclient: HttpClient) { }

  postSuporte (ISuporte: any): Observable<ISuporte>  {
    console.log(ISuporte);
    return this.httpclient.post<ISuporte>(`${API_PATH}suporte`, ISuporte);
  }
}
