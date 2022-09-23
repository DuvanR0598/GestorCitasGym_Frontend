import Swal from 'sweetalert2';
import { CitasService } from './../../../services/citas.service';
import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-ver-citas',
  templateUrl: './ver-citas.component.html',
  styleUrls: ['./ver-citas.component.css']
})
export class VerCitasComponent implements OnInit {

  citas:any = []

  constructor(private citasService:CitasService) { }

  ngOnInit(): void {
    this.citasService.listarCitas().subscribe(
      (dato:any) => {
        this.citas = dato;
        console.log(this.citas);
      },
      (error) => {
        console.error(error);
        Swal.fire('Error', 'Error al cargar los datos', 'error');
      }
    )
  }

  eliminarCita(idCita:any){
    Swal.fire({
      title:'Eliminar cita',
      text:'¿Estás seguro de eliminar la cita?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if(result.isConfirmed){
        this.citasService.eliminarCita(idCita).subscribe(
          (data) => {
            this.citas = this.citas.filter((cita:any) => cita.idCita != idCita);
            Swal.fire('Cita eliminada','La cita ha sido eliminada con éxito','success');
          },
          (error) => {
            Swal.fire('Error','Error al eliminar la cita','error');
          }
        )
      }
    })
  }

}
