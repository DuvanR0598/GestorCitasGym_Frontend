import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

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
    listaRoles: [
      {
        dniRol: 1, //DATO QUEMADO
        nombre: 'ROLE_USER' //DATO QUEMADO
      }
    ],
    listaMembresias: [
      {
        idMembresia: '1',
        titulo: 'Premium',
        fechaInicio: '2024-05-28',
        fechaVencimiento: '2024-12-31',
        estado: 'Activo'
      }
    ]
  };

  constructor(private UserService:UserService,
    private snack:MatSnackBar) { }

  ngOnInit(): void {}

  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      this.snack.open('El nombre de usuario es requerido','Aceptar',{
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
      return;
    }

  this.UserService.registrarUsuario(this.user).subscribe( data => {
      console.log(data);
      Swal.fire('Usuario guardado', 'Usuario registrado con exito en el sistema', 'success');
      this.user = {
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
        listaRoles: [
          {
            dniRol: 0, 
            nombre: '' 
          }
        ],
        listaMembresias: [
          {
            idMembresia: '',
            titulo: '',
            fechaInicio: '',
            fechaVencimiento: '',
            estado: ''
          }
        ]
      };
    },error => {
      console.log(error);
      this.snack.open('Ha ocurrido un error en el sistema','',{
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    });
  }
}
