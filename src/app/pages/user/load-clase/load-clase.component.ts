import { ClasesService } from '../../../services/clases.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-clase',
  templateUrl: './load-clase.component.html',
  styleUrls: ['./load-clase.component.css']
})
export class LoadCitaComponent implements OnInit {

  idCat:any;
  clases:any;

  constructor(private route:ActivatedRoute,
    private claseService:ClasesService) { }

  ngOnInit(): void {
    this.idCat = this.route.snapshot.params['idCat'];
    if(this.idCat == 0){
      console.log("Cargando todas las clases")
      this.claseService.listarClases().subscribe(
        (data) => {
          this.clases = data;
          console.log(this.clases);
        },
        (error) => {
          console.log(error);
        }
      )
    }else{
      console.log("Cargando una clase en específico");
      this.clases = [];
    }
  }

}
