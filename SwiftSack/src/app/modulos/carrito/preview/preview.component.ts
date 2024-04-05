import { Component, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css'],
})
export class PreviewComponent {
  dataSource:any = [];
  subtotal:number = 0;
  usuario: UsuarioMod = {
    id: 0,
    name: '0',
    email: '0',
    password: '0',
    telefono: '0',
    active: false,
    confirmed_at: '0',
    roleId: 0,
  };

  carrito: any = [];
  items:ProductoSS[] = []

  constructor(public objApi: ProyectoApiService, private router: Router) {}

  getCarrito() {
    this.objApi.getCarritoUser(this.usuario.id).subscribe({
      next: (response) => {
        this.carrito = response;
        console.log(this.carrito)
      },
      error: (error) => console.log(error),
    });
  }

  getItems() {
    this.objApi.getCarritoItems(this.usuario.id).subscribe({
      next: (response) => {
        this.items = response;
        this.cargarItems();
      },
      error: (error) => console.log(error),
    });
  }

  eliminarItem(id: number) {
    this.objApi.eliminarItem(id).subscribe(
      () => {
        console.log('Elemento eliminado correctamente');
        this.ngOnInit();
      },
      (error) => {
        console.error('Error al eliminar direccion', error);
      }
    );
  }

  obtenerUsuario() {
    const userData = sessionStorage.getItem('userData');
    if (userData) {
      this.usuario = JSON.parse(userData);
      console.log('Usuario: ' + this.usuario.name + ' recuperado');
      this.getCarrito();
      this.getItems();
    } else {
      console.log('El objeto no fue encontrado en sessionStorage.');
    }
  }

  cargarItems() {
    this.subtotal = 0;
    this.dataSource = [];
    for (let i = 0; i < this.carrito.length; i++) {
      const sub = this.items[i].costo * this.carrito[i].cantidad;
      this.subtotal += sub;
      const newRowData = {
        nombre: this.items[i].nombre,
        cantidad: this.carrito[i].cantidad,
        precio: this.items[i].costo,
        subtotal: sub,
        idCarrito: this.carrito[i].idCarrito
      };
      this.dataSource.push(newRowData);
    }
  }
  

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 3){
      this.router.navigate(['/home']);
    }
  }
}
