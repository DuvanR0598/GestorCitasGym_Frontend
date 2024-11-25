import { Router } from '@angular/router';
import { ClasesService as ClaseService } from '../../../services/clases.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../../services/login.service';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../../services/categoria.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-clase',
  templateUrl: './add-clase.component.html',
  styleUrls: ['./add-clase.component.css']
})
export class AddClasesComponent implements OnInit {

  categorias:any = [];
  user:any = null;
  minDate!: string;

  claseData = {
    idClase: '',
    nombreClase: '',
    tipoClase: '',
    instructor: '',
    ubicacion: '',
    fechaClase: '',
    hora: '',
    capacidadMax: '',
    activo:true,
    categoria: {
      idCategoria: ''
    }
  }

  constructor(private categoriaService:CategoriaService,
    private loginService:LoginService,
    private snack:MatSnackBar,
    private claseService:ClaseService,
    private router:Router) { }

  ngOnInit(): void {
    const today = new Date();
    this.minDate = this.formatDate(today); // Establece la fecha mínima como la fecha actual

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

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`; // Devolvemos la fecha en el formato yyyy-MM-dd
  }

  guardarClase(){
    console.log(this.claseData);
    if(this.claseData.fechaClase.trim() == '' || this.claseData.fechaClase == null){
      this.snack.open('La fecha de la clase es requerida', '',{
        duration: 3000
      })
      return; 
    }

    this.claseService.agregarClase(this.claseData).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('Clase guardada','La clase ha sido guardada con éxito','success');
        //Despues de guardar la clase, reseteamos los campos para poder insertar una nueva clase
        this.claseData = {
          idClase: '',
          nombreClase: '',
          tipoClase: '',
          instructor: '',
          ubicacion: '',
          fechaClase: '',
          hora: '',
          capacidadMax: '',
          activo:true,
          categoria: {
            idCategoria: ''
          }
        }
        this.router.navigate(['/admin/clases']);
      },
      (error) => {
        Swal.fire('Error','Error al guardar la clase','error');
      }
    )
  }
}
