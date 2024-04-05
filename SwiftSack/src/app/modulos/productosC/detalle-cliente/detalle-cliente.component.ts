import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrito } from 'src/app/interfaces/carrito';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent {
  cantidad:number = 1;
  dataSource:any=[];
  id:number = 0;
  producto:ProductoSS = {
    id:0,
    nombre:'',
    descripcion:'',
    costo:0,
    foto:'',
    tipo_producto:'',
    receta:'',
    stock:0
  }

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

  constructor(
    private objApi:ProyectoApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  obtenerIdProducto() {
    const idProducto = this.route.snapshot.params['id'];
    this.producto.id = Number(idProducto);
    this.id = Number(idProducto);
    console.log(this.id);

    this.objApi.obtenerProducto(this.id).subscribe({
      next: (response: ProductoSS[]) => {
        this.dataSource = response;
        this.producto.id = this.dataSource.id;
        this.producto.nombre = this.dataSource.nombre;
        this.producto.descripcion = this.dataSource.descripcion;
        this.producto.costo = this.dataSource.costo;
        this.producto.foto = this.dataSource.foto;
        this.producto.tipo_producto = this.dataSource.tipo_producto;
        this.producto.receta = this.dataSource.receta;
        this.producto.stock = this.dataSource.stock;

          if(this.producto.foto){
            this.producto.foto = `data:image/png;base64,${this.producto.foto}`;
          }
          else{
            this.producto.foto = '../../assets/img/desconocido.png';
          }

      },
      error: (error) => console.log(error)
    });
  }

  addCarrito(cantidad:number){
    const carrito:Carrito = {
      idCarrito:0,
      userId: this.usuario.id,
      productId: this.producto.id,
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

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 3){
      this.router.navigate(['/home']);
    }
    this.obtenerIdProducto();
  }

  sumar(){
    this.cantidad += 1;
  }

  restar(){
    this.cantidad -= 1;
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
