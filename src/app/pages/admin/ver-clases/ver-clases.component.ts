import Swal from 'sweetalert2';
import { ClasesService } from '../../../services/clases.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-clases',
  templateUrl: './ver-clases.component.html',
  styleUrls: ['./ver-clases.component.css']
})
export class VerClasesComponent implements OnInit {

  clases:any = []

  constructor(private clasesService:ClasesService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.clasesService.listarClases().subscribe(
      (dato:any) => {
        this.clases = dato;
        console.log(this.clases);
      },
      (error) => {
        console.error(error);
        Swal.fire('Error', 'Error al cargar los datos', 'error');
      }
    ) 
  }

  eliminarClase(idClase:any){
    Swal.fire({
      title:'Eliminar clase',
      text:'¿Estás seguro de eliminar la clase?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.clasesService.eliminarClase(idClase).subscribe(
          (data: string) => {
            this.clases = this.clases.filter((clase:any) => clase.idClases !== idClase);
            Swal.fire('Clase eliminada','La clase ha sido eliminada con éxito','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar la clase','error');
          }
        )
      }
    })
  }

}
