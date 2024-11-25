import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import baserUrl from './helper';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public registrarUsuario(user:any){
    return this.httpClient.post(`${baserUrl}/registrar`, user)
    .pipe(
      catchError(this.handleError) //catchError Este operador captura cualquier error que ocurra en la solicitud HTTP y lo pasa al método handleError.
    )
  }

  public listarUsuarios(){
    return this.httpClient.get(`${baserUrl}/usuarios/lista-usuarios`);
  }

  public actualizarUsuario(clase:any){
    return this.httpClient.put(`${baserUrl}/usuarios/actualizar-usuario`, clase, { responseType: 'text' });
  }

  // Método para manejar errores, este método revisa si el error proviene del lado del cliente o del servidor
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error inesperado';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.status === 400 && error.error) {
        errorMessage = error.error; // Capturamos el error enviado desde el backend (como los mensajes de validación)
      } else if (error.status === 500) {
        errorMessage = 'Error interno del servidor';
      }
    }

    return throwError(errorMessage); // Devolvemos el error
  }

}
