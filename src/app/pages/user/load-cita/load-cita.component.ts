import { CitasService } from './../../../services/citas.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-cita',
  templateUrl: './load-cita.component.html',
  styleUrls: ['./load-cita.component.css']
})
export class LoadCitaComponent implements OnInit {

  idCat:any;
  citas:any;

  constructor(private route:ActivatedRoute,
    private citaService:CitasService) { }

  ngOnInit(): void {
    this.idCat = this.route.snapshot.params['idCat'];
    if(this.idCat == 0){
      console.log("Cargando todas las citas")
      this.citaService.listarCitas().subscribe(
        (data) => {
          this.citas = data;
          console.log(this.citas);
        },
        (error) => {
          console.log(error);
        }
      )
    }else{
      console.log("Cargando una cita en específico")
    }
  }

}
