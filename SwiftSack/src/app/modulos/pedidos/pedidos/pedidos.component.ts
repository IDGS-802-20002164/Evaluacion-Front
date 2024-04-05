import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/interfaces/pedido';
import { UsuarioMod } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  pedidos:Pedido[] = [];

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

  constructor(public objApi:ProyectoApiService, private router:Router){}

  obtenerPedidos(){
    this.objApi.getPedidos().subscribe({
      next: response=>{
        this.pedidos=response;
      },
      error: error=>console.log(error)
    });
  }

  ngOnInit(): void {
    this.obtenerUsuario();
    if(this.usuario.roleId != 1 && this.usuario.roleId != 2){
      this.router.navigate(['/home']);
    }
    this.obtenerPedidos();
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
