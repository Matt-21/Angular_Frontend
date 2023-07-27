import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';
import { IContato } from '../Interfaces/i-contato';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private httpclient: HttpClient) { }

  public obterTodos (): Observable<IContato> {
    return this.httpclient.get<IContato>(`${API_PATH}contatos`);
  }

  postContato (IContato: any): Observable<IContato> {
    console.log(IContato);
    return this.httpclient.post<IContato>(`${API_PATH}contatos`, IContato);
  }

  putContatos (IContato: any): Observable<IContato> {
    return this.httpclient.put<IContato>(`${API_PATH}contatos/${IContato.id}`, IContato);
  }

  deleteContatos (Id: number): Observable<IContato> {
    return this.httpclient.delete<IContato>(`${API_PATH}contatos/${Id}`);
  }
}
