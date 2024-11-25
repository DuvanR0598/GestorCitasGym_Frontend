import { Component, OnInit } from '@angular/core';
import { ClasesService } from 'src/app/services/clases.service'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-inscripciones',
  templateUrl: './load-inscripciones.component.html',
  styleUrls: ['./load-inscripciones.component.css']
})
export class LoadInscripcionesComponent implements OnInit {

  clases: any[] = [];
  usuarioId: any = 333; // Esto debe obtenerse desde la sesión de usuario (JWT o localStorage)

  constructor(private clasesService:ClasesService, 
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarClasesInscritas(this.usuarioId);
  }

  cargarClasesInscritas(usuarioId: number) {
    this.clasesService.listarClasesPorUsuario(this.usuarioId).subscribe(
      (data: any) => {
        this.clases = data;
        console.log('Clases', this.clases);
      },
      (error) => {
        this.snackBar.open('Error al cargar las clases', 'Cerrar', { duration: 3000 });
      }
    );
  }

  cancelarInscrip(idClase: number) {
    Swal.fire({
      title:'Eliminar Incripción',
      text:'¿Estás seguro de cancelar la incripción?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        
      this.clasesService.cancelarInscripcion(idClase).subscribe(
        (response: string) => {
          console.log('Cancelación exitosa', response);
          this.snackBar.open('Cancelación exitosa', 'Cerrar', {
            duration: 3000,
          });  
        },
        (error) => {
          console.error('Error en la cancelacion de la inscripción', error);
          this.snackBar.open('Error en la cancelacion de la inscripción', 'Cerrar', {
            duration: 3000,
          });
        });
      }
    })
  }
}
