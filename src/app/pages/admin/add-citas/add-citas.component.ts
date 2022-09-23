import { Router } from '@angular/router';
import { CitasService } from './../../../services/citas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './../../../services/login.service';
import Swal from 'sweetalert2';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-citas',
  templateUrl: './add-citas.component.html',
  styleUrls: ['./add-citas.component.css']
})
export class AddCitasComponent implements OnInit {

  categorias:any = [];
  user:any = null;

  citaData = {
    idCita: '',
    fecha: '',
    hora: '',
    duracion: '',
    categoriaEnt: {
      idCategoria: ''
    },
    usuarioEnt: {
      cedula: ''
    }
  }

  constructor(private categoriaService:CategoriaService,
    private loginService:LoginService,
    private snack:MatSnackBar,
    private citaService:CitasService,
    private router:Router) { }

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe(
      (dato) => {
        this.categorias = dato;
        console.log(this.categorias); 
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error al cargar los datos', 'error')
      }
    )
    this.user = this.loginService.getUser(); //obtenemos el usuario actual logeado en el sistema
  }

  guardarCita(){
    console.log(this.citaData);
    if(this.citaData.duracion.trim() == '' || this.citaData.duracion == null){
      this.snack.open('La duración de la clase es requerido', '',{
        duration: 3000
      })
      return;
    }

    this.citaService.agregarCita(this.citaData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Cita guardada','La cita ha sido guardada con éxito','success');
        //Despues de guardar la cita, reseteamos los campos para poder insertar una nueva cita
        this.citaData = {
          idCita : '',
          fecha : '',
          hora : '',
          duracion : '',
          categoriaEnt:{
            idCategoria:''
          },
          usuarioEnt:{
            cedula:''
          }
        }
        this.router.navigate(['/admin/citas-grupales']);
      },
      (error) => {
        Swal.fire('Error','Error al guardar la cita','error');
      }
    )
  }
}
