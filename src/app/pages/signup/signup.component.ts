import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user ={
    cedula : '',
    nombre : '',
    apellido : '',
    genero : '',
    fechaNacimiento : '',
    celular : '',
    email : '',
    peso : '',
    altura : '',
    username : '',
    password : '',

  }

  constructor(private UserService:UserService) { }

  ngOnInit(): void {
  }

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      alert('El nombre de usuario es requerido')
      return;
    }

    this.UserService.registrarUsuario(this.user).subscribe(
      (data) => {
        console.log(data);
        alert('Usuario registrado con exito');
      },
      (error) => {
        console.log(error);
        alert('Ha ocurrido un error en el sistema')
      }
    )
  }
}
