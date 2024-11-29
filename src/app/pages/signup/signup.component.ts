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
        idMembresia: '1',
        titulo: 'Premium',
        fechaInicio: '2024-06-01',
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
      
      if (Array.isArray(error)) {
        // Caso 1: El error es un array de objetos con mensajes
        // Mapear todos los mensajes de error y unirlos en una cadena
        const errorMessages = error
          .map((err: any) => err.defaultMessage || 'Error desconocido')
          .join(' ');
        this.snack.open(errorMessages, 'Aceptar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      } else if (error.error && Array.isArray(error.error)) {
        // Mapear todos los mensajes de error dentro de error.error
        const errorMessages = error.error
          .map((err: any) => err.defaultMessage || 'Error desconocido')
          .join(' ');
        this.snack.open(errorMessages, 'Aceptar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      } else if (error.error?.defaultMessage) {
        // Si el error tiene un solo mensaje
        this.snack.open(error.error.defaultMessage, 'Aceptar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }else if (typeof error === 'string') {
        // Caso 3: Angular mapea el mensaje a error.message
        this.snack.open(error, 'Aceptar', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }else {
        // Error genéricoo desconocido
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