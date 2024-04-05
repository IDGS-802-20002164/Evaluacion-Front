import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Component, OnInit } from '@angular/core';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  currentPage: number = 1
  pageSize: number = 10
  imageWidth:number=50;
  imageMargin:number=2;
  muestraImg:boolean=true;
  listFilter:string='';
  dataSource:any=[];

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

  constructor(public productos:ProyectoApiService, private router: Router){}

  getCurrentPageItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.dataSource.slice(startIndex, endIndex);
  }


  productoIric:ProductoSS []=[
    {
    id:0,
    nombre:'',
    descripcion:'',
    tipo_producto:'',
    costo:0,
    foto:'',
    stock:0,
    receta:''
    },

  ]

  eliminarProducto(id:number){

      this.productos.eliminarProducto(id).subscribe(
        () => {
          console.log('Producto eliminado correctamente');
          this.actualizarTabla();
        },
        error => {
          console.error('Error al eliminar el producto:', error);
        }
      );

  }

  actualizarTabla(){
    this.productos.getProducto().subscribe(
      {
        next: response=>{
      this.dataSource=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1 && this.usuario.roleId != 2){
      this.router.navigate(['/home']);
    }
    this.actualizarTabla();
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
