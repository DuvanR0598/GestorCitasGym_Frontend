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
        dniRol: 2, //DATO QUEMADO
        nombre: 'ROLE_USER' //DATO QUEMADO
      }
    ],
    listaMembresias: [
      {
        idMembresia: '2',
        titulo: 'Basico',
        fechaInicio: '2024-06-04',
        fechaVencimiento: '2024-12-31',
        estado: 'Activo'
      }
    ]
  };

  fechaActual: string;

  constructor(
    private UserService:UserService,
    private snack:MatSnackBar) {
    // Obtenemos la fecha actual y la convertimos al formato 'YYYY-MM-DD'
    const hoy = new Date();
    this.fechaActual = hoy.toISOString().split('T')[0];
     }

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

    //Registro de usuario
    this.UserService.registrarUsuario(this.user).subscribe( data => {
      console.log(data);
      Swal.fire('Usuario guardado', 'Usuario registrado con exito en el sistema', 'success');
      this.resetForm(); // Aquí se resetea el formulario si el registro es exitoso
    }, 
    (error) => {
      console.error('Error recibido:', error); // Para depuración, revisamos el error completo

      // Intentar capturar el mensaje del backend si es un array
      if (Array.isArray(error.error) && error.error.length > 0) {
        const errorMessage = error.error[0].defaultMessage || 'Error desconocido'; 
        this.snack.open(errorMessage, 'Aceptar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      } else {
        // En caso de que el error no sea un array o no tenga el formato esperado
        this.snack.open('Ha ocurrido un error en el sistema', 'Aceptar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    }
  );
}

  resetForm() {
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
  }
}