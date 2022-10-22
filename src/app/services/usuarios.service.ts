import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }

  public generateListUsuariosPDF(){
    return this.http.get(`${baserUrl}/usuarios/exportarPDF`, {responseType: 'blob'});
  }
}
