import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {

  constructor(private http:HttpClient) { }

  public listarClases(){
    return this.http.get(`${baserUrl}/clases/lista-clases`);
  }

  public agregarClase(clase:any){
    return this.http.post(`${baserUrl}/clases/guardar-clase`, clase);
  }

  public eliminarClase(idClase:any){
    return this.http.delete(`${baserUrl}/clases/eliminar-clase/${idClase}`);
  }

  public obtenerClase(idClases:any){
    return this.http.get(`${baserUrl}/clases/buscar-clase/${idClases}`);
  }

  public actualizarClase(clase:any){
    return this.http.put(`${baserUrl}/clases/actualizar-clase`, clase);
  }

  public listarClasesDeUnaCategoria(idCategoria:any){
    return this.http.get(`${baserUrl}/clases/clasesbycategoria/${idCategoria}`);
  }

  public listarClasesActivas(){
    return this.http.get(`${baserUrl}/clases/clases-activas`);
  }

  public listarClasesActivasDeUnaCategoria(idCategoria:any){
    return this.http.get(`${baserUrl}/clases/clasesactivasbycategoria/${idCategoria}`);
  }
}
