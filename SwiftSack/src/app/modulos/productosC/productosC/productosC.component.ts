import { Component } from '@angular/core';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { FormsModule } from '@angular/forms';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { Carrito } from 'src/app/interfaces/carrito';

@Component({
  selector: 'app-productos',
  templateUrl: './productosC.component.html',
  styleUrls: ['./productosC.component.css']
})
export class ProductosCComponent {
  productos:ProductoSS[] = []
  currentPage: number = 1;
  pageSize: number = 9;
  listFilter:string='';
  selectedPriceRange: string = '';

  usuario:UsuarioMod = {
    id: 0,
    name: '0',
    email: '0',
    password: '0',
    telefono: '0',
    active: false,
    confirmed_at: '0',
    roleId: 0,
  };

  onPriceRangeChange() {
    if (this.selectedPriceRange != 'all') {
      this.currentPage = 1;
    }
  }


  constructor(public objApi:ProyectoApiService, private router: Router){}

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.productos.slice(startIndex, endIndex);
  }

  cargarProductos(){
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
    this.obtenerUsuario();
    if(this.usuario.roleId != 3){
      this.router.navigate(['/home']);
    }
    this.cargarProductos();
  }

  addCarrito(cantidad:number, productId:number){
    const carrito:Carrito = {
      idCarrito:0,
      userId: this.usuario.id,
      productId: productId,
      cantidad: cantidad
    }

    console.log(carrito);

    this.objApi.addCarrito(carrito).subscribe({
      next: () => {
        console.log('Producto agregado al carrito');
        this.router.navigate(['PreviewCar']);
      },
      error: (e) => console.error(e),
      complete: () => console.info('Solicitud completada')
    });
  }

  obtenerUsuario(){
    const userData = sessionStorage.getItem('userData');

    if (userData) {
      this.usuario = JSON.parse(userData);
      console.log('Usuario: ' + this.usuario.name + ' recuperado');
    } else {
      console.log('El objeto no fue encontrado en sessionStorage.');
    }
  }
}
