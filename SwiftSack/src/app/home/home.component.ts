import { Component } from '@angular/core';
import { ProductoSS } from '../interfaces/swiftsack';
import { ProyectoApiService } from '../proyecto-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productos:ProductoSS[] = []

  constructor(public objApi:ProyectoApiService){}

  cargarProductos(){
    console.log('Hola')
    this.objApi.getProducto().subscribe(
      {
        next: response=>{
      this.productos=response;
      for (const producto of this.productos) {
        if(producto.foto){
        producto.foto = `data:image/png;base64,${producto.foto}`;
        }
        else{
        producto.foto = '../../assets/img/desconocido.png';
        }
      }
    },
    error: error=>console.log(error)
  }
    );

  }

  ngOnInit(): void {
    this.cargarProductos();
  }

}
