import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http:HttpClient) { }

  public listarCitas(){
    return this.http.get(`${baserUrl}/citas/lista-citas`);
  }

  public agregarCita(cita:any){
    return this.http.post(`${baserUrl}/citas/agregar-cita`, cita);
  }

  public eliminarCita(idCita:any){
    return this.http.delete(`${baserUrl}/citas/eliminar-cita/${idCita}`);
  }

  public obtenerCita(idCita:any){
    return this.http.get(`${baserUrl}/citas/buscar-cita/${idCita}`);
  }

  public actualizarCita(cita:any){
    return this.http.put(`${baserUrl}/citas/actualizar-cita`, cita)
  }
}
