import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from 'src/app/interfaces/direccion';
import { Pedido } from 'src/app/interfaces/pedido';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent {
  dataSource:any=[];
  direccionSelect:any=[];
  detalles:any=[];
  items:any=[];
  datos:any=[];
  total:number = 0;

  pedido:Pedido = {
    id:0,
    fecha: new Date (),
    iduser: 0,
    idDireccion: 0,
    folio: '',
    estatus: 1
  }

  dir:Direccion = {
    idDireccion:0, 
    idUser:0, 
    nombreCompleto:'',
    calleNumero:'',
    codigoPostal:'',
    telefono:'',
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
    private objApi: ProyectoApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  obtenerPedido() {
    const idPedido = this.route.snapshot.params['id'];
    this.pedido.id = Number(idPedido);

    this.objApi.obtenerPedido(this.pedido.id).subscribe({
      next: (response: Pedido[]) => {
        this.dataSource = response;
        this.pedido.id = this.dataSource.id;
        this.pedido.fecha = this.dataSource.fecha;
        this.pedido.iduser = this.dataSource.iduser;
        this.pedido.idDireccion = this.dataSource.idDireccion;
        this.pedido.folio = this.dataSource.folio;
        this.pedido.estatus = this.dataSource.estatus;
        this.obtenerDireccion(this.pedido.idDireccion);
        this.getDetalle(idPedido);
        this.getItems(idPedido);
      },
      error: (error) => console.log(error)
    });
  }

  obtenerDireccion(id:number){
    this.objApi.obtenerDireccion(id).subscribe({
      next: (response: Direccion[]) => {
        this.direccionSelect = response;
        this.dir.idDireccion = this.direccionSelect.idDireccion;       
        this.dir.nombreCompleto = this.direccionSelect.nombreCompleto;
        this.dir.calleNumero = this.direccionSelect.calleNumero;
        this.dir.codigoPostal = this.direccionSelect.codigoPostal;
        this.dir.telefono = this.direccionSelect.telefono;        
      },
      error: (error) => console.log(error)
    });
  }

  getDetalle(id:number){
    this.objApi.getDetallePedido(id).subscribe({
      next: response=>{
        this.detalles=response;
      },
      error: error=>console.log(error)
    });
  }

  getItems(id:number){
    this.objApi.getPedidoItems(id).subscribe({
      next: response=>{
        this.items=response;
        this.cargarDatos();
      },
      error: error=>console.log(error)
    });
  }

  cargarDatos(){
    this.datos = [];
    this.total = 0;
    console.log(this.items)
    for (let i = 0; i < this.items.length; i++) {
      const element = this.items[i];
      let check = false;
      if(element.stock > this.detalles[i].cantidad){
        check = true;
      }

      this.total += this.detalles[i].costoTotal;

      const producto = {
        checkmark: check,
        nombre: element.nombre,
        cantidad: this.detalles[i].cantidad,
        subtotal: this.detalles[i].costoTotal,
      }
      this.datos.push(producto);
    }
  }

  actualizarEstatus(estatus:number){
    console.log(this.pedido);
    this.pedido.estatus = estatus;
    this.objApi.actualizarPedido(this.pedido).subscribe(
      () => {
        this.ngOnInit();
      },
      error => {
        console.error('Error al editar la tarjeta:', error);
      }
    );
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1 && this.usuario.roleId != 2){
      this.router.navigate(['/home']);
    }
    this.obtenerPedido();
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
