import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private Http:HttpClient) { }

  //generamos el token
  public generateToken(loginData:any){
    return this.Http.post(`${baserUrl}/iniciar-sesion`, loginData);
  }

  //iniciamos sesion y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token', token);
  }

  //Metodo para comprabar si estoy conectado o no
  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  //cerramos sesion y eliminamos el token y el usuario del localStorage
  public logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getToken(){
    return localStorage.getItem('token');
  }

  //establecemos un usuario
  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  //obtenemos el usuario
  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logOut();
      return null;
    }
  }

  //obtener un usuario con su rol.
  public getUserRol(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

  //obtener el usuario actual en el sistema
  public getUsuarioActual(){
    return this.Http.get(`${baserUrl}/usuario-actual`);
  }
}
