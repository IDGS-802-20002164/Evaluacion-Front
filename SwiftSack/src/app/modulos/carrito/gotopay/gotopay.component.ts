import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Direccion } from 'src/app/interfaces/direccion';
import { DetallePedido, Pedido } from 'src/app/interfaces/pedido';
import { ProductoSS } from 'src/app/interfaces/swiftsack';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-gotopay',
  templateUrl: './gotopay.component.html',
  styleUrls: ['./gotopay.component.css']
})
export class GotopayComponent {
  tarjetas:Tarjeta[]=[];
  direcciones:Direccion[]=[];
  direccionSelect:any = [];
  tarjetaSelect:any = [];
  carrito: any = [];
  items:ProductoSS[] = [];
  subtotal:number = 0;
  detallespedido:DetallePedido[] = [];

  tar:Tarjeta = {
    idTarjeta:0,
    idUser:0,
    numeroTarjeta:'',
    numTarEncryp:'',
    nombreTarjeta:'',
    mesVencimiento:'',
    annioVencimiento:'',
    ccv:'',
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

  pedido:Pedido = {
    id:0,
    fecha: new Date (),
    iduser: 0,
    idDireccion: 0,
    folio: '',
    estatus:1
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder, public objApi:ProyectoApiService, private router:Router){}

  getTarjetas(){
    this.objApi.getTarjeta(this.usuario.id).subscribe(
      {
        next: response=>{
      this.tarjetas=response;
    },
    error: error=>console.log(error)
  }
    );
  }

  getDirecciones(){
    this.objApi.getDireccion(this.usuario.id).subscribe({
      next: response=>{
        this.direcciones=response;

      },
      error: error=>console.log(error)
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

  cargarPreview(){
    const iddireccionSelect = this.firstFormGroup.get('firstCtrl')?.value;
    const idtarjetaSelect = this.secondFormGroup.get('secondCtrl')?.value;

    if(iddireccionSelect){
      this.objApi.obtenerDireccion(parseInt(iddireccionSelect)).subscribe({
        next: (response: Direccion[]) => {
          this.direccionSelect = response;
          this.dir.idDireccion = this.direccionSelect.idDireccion;
          this.dir.nombreCompleto = this.direccionSelect.nombreCompleto;
          this.dir.calleNumero = this.direccionSelect.calleNumero;
          this.dir.codigoPostal = this.direccionSelect.codigoPostal;
          this.dir.telefono = this.direccionSelect.telefono;
          this.dir.idUser = this.direccionSelect.idUser;
        },
        error: (error) => console.log(error)
      });
    }

    if(idtarjetaSelect){
      this.objApi.obtenerTarjeta(parseInt(idtarjetaSelect)).subscribe({
        next: (response: Tarjeta[]) => {
          this.tarjetaSelect = response;
          this.tar.idUser = this.tarjetaSelect.idTarjeta;
          this.tar.numeroTarjeta = this.tarjetaSelect.numeroTarjeta;
          this.tar.numTarEncryp = this.tarjetaSelect.numTarEncryp;
          this.tar.nombreTarjeta = this.tarjetaSelect.nombreTarjeta;
          this.tar.mesVencimiento = this.tarjetaSelect.mesVencimiento;
          this.tar.annioVencimiento = this.tarjetaSelect.annioVencimiento;
        },
        error: (error) => console.log(error)
      });
    }
  }

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
        this.calcularsubtotal();
      },
      error: (error) => console.log(error),
    });
  }

  calcularsubtotal(){
    for (let i = 0; i < this.carrito.length; i++) {
      const sub = this.items[i].costo * this.carrito[i].cantidad;
      this.subtotal += sub;

      const pedido:DetallePedido ={
        id: 0,
        idPedido: 0,
        idProducto: this.carrito[i].productId,
        cantidad: this.carrito[i].cantidad,
        costoTotal: sub,
      }

      this.detallespedido.push(pedido);
    }
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 3){
      this.router.navigate(['/home']);
    }
    this.getTarjetas();
    this.getDirecciones();
    this.getCarrito();
    this.getItems();
  }

  setPedido(){
    const uniqueFolio: string = uuidv4();
    console.log(this.dir)
    let pedido:Pedido = {
      id:0,
      fecha: new Date (),
      iduser: this.usuario.id,
      idDireccion: this.dir.idDireccion,
      folio: uniqueFolio,
      estatus:0
    }

    console.log(pedido);

    this.objApi.addPedido(pedido).subscribe({
      next: response => {
        this.pedido = response;
        this.insertDetallePedido(this.pedido.id);
        console.log(this.pedido.id)
        console.log('Pedido agregado correctamente');
      },
      error: (e) => console.error(e),
      complete: () => console.info('Pedido completado')
    });
  }

  insertDetallePedido(idPedido:number){
    this.detallespedido.forEach(element => {
      element.idPedido = idPedido;
      console.log(element);
      this.objApi.addDetallePedido(element).subscribe({
        next: () => {
          console.log('Detalle de compra agregado correctamente');
        },
        error: (e) => console.error(e),
        complete: () => console.info('Solicitud completada')
      });
    });
    console.log('Detalles de pedido agregados correctamente');
    this.limpiarCarrito(this.usuario.id);
    this.router.navigate(['MisPedidos']);
  }

  limpiarCarrito(id:number){
    this.objApi.eliminarItemsByUser(id).subscribe(
      () => {
        console.log('Direccion eliminada correctamente');
      },
      (error) => {
        console.error('Error al eliminar direccion', error);
      }
    );
  }

}
