import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPessoa } from '../Interfaces/i-pessoa';
import { API_PATH } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  constructor(private httpclient: HttpClient) { }

  getAll (): Observable<IPessoa[]> {
    return this.httpclient.get<IPessoa[]>(`${API_PATH}pessoa`);
  }

  postPessoa (IPessoa: any): Observable<IPessoa>  {
    return this.httpclient.post<IPessoa>(`${API_PATH}pessoa`, IPessoa);
  }

  putPessoa (IPessoa: any): Observable<IPessoa> {
    return this.httpclient.put<IPessoa>(`${API_PATH}pessoa/${IPessoa.id}`, IPessoa);
  }

  deletePessoa (Id: number): Observable<IPessoa> {
    return this.httpclient.delete<IPessoa>(`${API_PATH}pessoa/${Id}`);
  }
}
